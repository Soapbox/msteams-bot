import { IChatConnectorAddress, IConversationUpdate, Message, Session } from 'botbuilder'
import { Service as ChannelsService } from '../GoodTalk/Channels/Service'
import { Channels as MicrosoftChannels } from '../Microsoft/Channels'
import { Accounts as MicrosoftAccounts } from '../Microsoft/Accounts'
import { Service as UsersService } from '../GoodTalk/Users/Service'
import { ChannelAccount, ChannelInfo } from 'botbuilder-teams'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { AxiosResponse } from 'axios'
import { sprintf } from 'sprintf-js'
import { Flow } from './Flow'
import { Bot } from '../Bot'

export class CreateChannels implements Flow {
    userId: string = '';
    channelId: string = '';
    tenantId: string = '';

    constructor(protected data: IConversationUpdate) {
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
        this.tenantId = data.sourceEvent.tenant.id;
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

    private greetUser(user: ChannelAccount, data: IConversationUpdate): void {
        let address = { 
            channelId: data.address.channelId,
            user: {
                id: user.id
            },
            channelData: {
                tenant:{
                    id: data.sourceEvent.tenant.id
                }
            },
            bot: { 
                id: data.address.bot.id,
                name: data.address.bot.name 
            },
            serviceUrl: (<IChatConnectorAddress>data.address).serviceUrl,
            useAuth: true
        }

        let session = Sessions.load(Bot.getInstance(), address);

        session.then((session: Session) => {
            session.send(sprintf(
                "Blurb about running better meetings with GoodTalk"
            ));
            session.send(sprintf(
                "Blurb about setting up things in background and to wait"
            ));
        }).catch((error: Error) => {
            Logger.debug('flows.createChannel.greetUser', 'Could not create a new session.');
        });
    }

    private getMicrosoftChannels(data: IConversationUpdate): Promise<ChannelInfo[]> {
        let channelsList = MicrosoftChannels.list(data.sourceEvent.team.id, data);

        return new Promise<ChannelInfo[]>((resolve, reject) => {
            channelsList.then((channels: ChannelInfo[]) => {
                resolve(channels);
            }).catch((error: Error) => {
                Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
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

    private addUsers(actor: ChannelAccount, channel: ChannelInfo): void {
        let usersList = MicrosoftAccounts.list(this.data);

        usersList.then((accounts: ChannelAccount[]) => {
            (async function loop() {
                for (let i = 0; i <= accounts.length; ++i) {
                    console.log(accounts[i]);
                    await UsersService.create(channel, actor, accounts[i]);
                }
            })();

            // let asyncArray = [];

            // accounts.forEach((account: ChannelAccount) => {
            //     asyncArray.push(UsersService.create(channel, actor, account));
            // });
            
            // let chain = Promise.resolve();

            // for (let func of asyncArray) {
            //     chain = chain.then().catch((error: Error) => {
            //         console.log(error);
            //     });
            // }
        });
    }

    private doneNotificationMicrosoftChannel(user: ChannelAccount, data: IConversationUpdate): void {
        let address = { 
            channelId: data.address.channelId,
            user: {
                id: user.id
            },
            channelData: {
                tenant:{
                    id: data.sourceEvent.tenant.id
                }
            },
            bot: { 
                id: data.address.bot.id,
                name: data.address.bot.name 
            },
            serviceUrl: (<IChatConnectorAddress>data.address).serviceUrl,
            useAuth: true
        }

        let session = Sessions.load(Bot.getInstance(), address);

        session.then((session: Session) => {
            session.send(sprintf(
                "Instructions on how to add tab app to team channel."
            ));
        }).catch((error: Error) => {
            Logger.debug('flows.createChannel.greetUser', 'Could not create a new session.');
        });
    }

    handle(): void {
        let self: CreateChannels = this;

        self.getMicrosoftUser(self.userId, self.data)
            .then((user: ChannelAccount) => {
                Logger.log('flows.createChannel.handle', 'Found the Microsoft user.');
                self.greetUser(user, self.data);

                return new Promise<any>((resolve, reject) => {
                    self.getMicrosoftChannels(self.data)
                        .then((channels: ChannelInfo[]) => {
                            resolve({user, channels});
                        }).catch((error: Error) => {
                            reject(error);
                        });
                });
            }).then((result: any) => {
                (async function loop() {
                    for (let i = 0; i <= result.channels.length; ++i) {
                        await self.createGoodTalkChannel(self.tenantId, result.user, result.channels[i]);
                    }
                    console.log('all dem channels added');
                    for (let i = 0; i <= result.channels.length; ++i) {
                        console.log(result.user);
                        console.log(result.channels[i]);
                        await self.addUsers(result.user, result.channels[i]);
                    }
                    self.doneNotificationMicrosoftChannel(result.user, self.data);
                })();
            }).catch((error: Error) => {
                Logger.debug('flows.channelCreated.handle', 'Could not handle create channel.');
                console.log(error);
            });

    }
}