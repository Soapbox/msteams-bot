import { IChatConnectorAddress, IConversationUpdate, Message, Session } from 'botbuilder'
import { Service as ChannelsService } from '../GoodTalk/Channels/Service'
import { Channels as MicrosoftChannels } from '../Microsoft/Channels'
import { Accounts as MicrosoftAccounts } from '../Microsoft/Accounts'
import { ChannelAccount, ChannelInfo } from 'botbuilder-teams'
import { Channel } from '../GoodTalk/Channels/Channel'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { sprintf } from 'sprintf-js'
import { Flow } from './Flow'
import { Bot } from '../Bot'

export class CreateChannels implements Flow {
    userId: string = '';
    channelId: string = '';

    constructor(protected data: IConversationUpdate) {
        this.channelId = data.address.conversation.id;
        this.userId = data.user.id;
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
                id: user.id,
                name: user.givenName
            },
            bot: {
                id: data.address.bot.id,
                name: data.address.bot.name
            },
            conversation: {
                id: sprintf(
                    '19:%s_%s@unq.gbl.spaces',
                    user.id,
                    data.address.bot.id
                ),
                isGroup: false
            },
            serviceUrl: (<IChatConnectorAddress>data.address).serviceUrl,
            useAuth: false
        }

        console.log(address);
        console.log(data.address);

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

    private getMicrosoftChannel(channelId: string, data: IConversationUpdate): Promise<ChannelInfo> {
        let channelsList = MicrosoftChannels.list(data.sourceEvent.team.id, data);

        return new Promise<ChannelInfo>((resolve, reject) => {
            channelsList.then((channels: ChannelInfo[]) => {
                channels.forEach((channel: ChannelInfo) => {
                    if (channel.id == channelId) {
                        resolve(channel);
                        return;
                    }
                });
                reject(new Error('Could not find requested microsoft channel.'));
            }).catch((error: Error) => {
                Logger.debug('flows.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
                reject(error);
            });
        });
    }

    private createGoodTalkChannel(channel: ChannelInfo): Promise<Channel> {
        let result = ChannelsService.createOrFind(channel);

        return new Promise<Channel>((resolve, reject) => {
            result.then((channel: Channel) => {
                resolve(channel);
            }).catch((error: Error) => {
                Logger.debug('flows.createChannel.createGoodTalkChannel', 'Could not create channel on GoodTalk.');
                reject(error);
            });
        })
    }

    private addUsers(channel: Channel): Promise<Channel> {
        let usersList = MicrosoftAccounts.list(this.data);

        return new Promise<Channel>((resolve, reject) => {
            usersList.then((accounts: ChannelAccount[]) => {
                console.log(accounts);
                accounts.forEach((account: ChannelAccount) => {
                    // Add the user on GoodTalk, and add it to our channel.
                });
                resolve(channel);
            }).catch((error: Error) => {
                Logger.debug('flows.createChannel.addUsers', 'Could not list microsoft accounts.');
                reject(error);
            });
        });
    }

    private doneNotificationMicrosoftChannel(): void {
        let message = new Message();

        message.address(this.data.address);
        message.text(
            "Good news everybody!! Your channel is now set up on GoodTalk. To add a new agenda " +
            "item, in the channel say: `@goodtalk add [Your discussion item]`"
        );

        Bot.getInstance().send(message);
    }

    handle(): void {
        let self: CreateChannels = this;

        self.getMicrosoftUser(self.userId, self.data)
            .then((user: ChannelAccount) => {
                Logger.log('flows.createChannel.handle', 'Found the Microsoft user.');
                self.greetUser(user, self.data);
                return self.getMicrosoftChannel(self.channelId, self.data);
            }).then((channel: ChannelInfo) => {
                Logger.log('flows.createChannel.handle', 'Found the Microsoft channel.');
                return self.createGoodTalkChannel(channel);
            }).then((channel: Channel) => {
                Logger.log('flows.createChannel.handle', 'Created the channel on GoodTalk.');
                console.log(channel);
                return self.addUsers(channel);
            }).then((channel: Channel) => {
                console.log(channel);
                self.doneNotificationMicrosoftChannel();
            }).catch((error: Error) => {
                Logger.debug('flows.channelCreated.handle', 'Could not handle create channel.');
            });
    }
}