import { IChatConnectorAddress, IConversationUpdate, Message, Session } from 'botbuilder'
import { Service as ChannelsService } from '../GoodTalk/Channels/Service'
import { Channels as MicrosoftChannels } from '../Microsoft/Channels'
import { Accounts as MicrosoftAccounts } from '../Microsoft/Accounts'
import { Service as UsersService } from '../GoodTalk/Users/Service'
import { ChannelAccount, ChannelInfo } from 'botbuilder-teams'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { AxiosResponse } from 'axios'
import { Flow } from './Flow'
import { Bot } from '../Bot'

export class CreateChannel implements Flow {
    userId: string = '';
    channelId: string = '';
    tenantId: string = '';
    channel: ChannelInfo;
    user: ChannelAccount;

    constructor(protected data: IConversationUpdate) {
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
        this.tenantId = data.sourceEvent.tenant.id;

        this.channel = new ChannelInfo(data.sourceEvent.channel.name, data.sourceEvent.channel.id);
    }

    handle(): void {
        let self: CreateChannel = this;

        self.getMicrosoftUser(self.userId, self.data)
            .then((u: ChannelAccount) => {
                self.user = u;

                return self.createGoodTalkChannel(self.tenantId, self.user, self.channel);
            })
            .then((channel: any) => {
                return self.addUsers(self.user, self.channel);
            })
            .then(function() {
                console.log('i dunno lol probably finished');
            });
    }

    private getMicrosoftUser(userId: string, data: IConversationUpdate): Promise<ChannelAccount> {
        let usersList = MicrosoftAccounts.list(data);

        return new Promise<ChannelAccount>((resolve, reject) => {
            usersList.then((accounts: ChannelAccount[]) => {
                accounts.forEach((account: ChannelAccount) => {
                    if (account.id == userId) {
                        resolve(account);
                        return;
                    }
                });
                reject(new Error('Could not find requested microsoft user.'));
            }).catch((error: Error) => {
                Logger.debug('flows.createChannel.getMicrosoftUser', 'Could not list microsoft users.');
                reject(error);
            });
        });
    }

    private createGoodTalkChannel(tenantId: string, actor: ChannelAccount, channel: ChannelInfo): Promise<ChannelInfo> {
        let result = ChannelsService.create(tenantId, actor, channel);

        return new Promise<ChannelInfo>((resolve, reject) => {
            result.then((response: AxiosResponse) => {
                resolve(channel);
            }).catch((error: Error) => {
                Logger.debug('', 'Could not create channel on GoodTalk.');
                reject(error);
            });
        });
    }

    private addUsers(actor: ChannelAccount, channel: ChannelInfo): Promise<void> {
        console.log('adding users');

        let usersList = MicrosoftAccounts.list(this.data);

        return new Promise<void>((resolve) => {
            usersList.then((accounts: ChannelAccount[]) => {
                console.log(accounts);

                (async function loop() {
                    for (let i = 0; i <= accounts.length; ++i) {
                        if (accounts[i]) {
                            console.log(accounts[i]);

                            await UsersService.create(channel, actor, accounts[i]);
                        }
                    }

                    resolve();
                })();
            });
        })
    }
}
