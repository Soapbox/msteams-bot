import { Service as ChannelsService } from '../GoodTalk/Channels/Service'
import { Channels as MicrosoftChannels } from '../Microsoft/Channels'
import { Accounts as MicrosoftAccounts } from '../Microsoft/Accounts'
import { ChannelAccount, ChannelInfo } from 'botbuilder-teams'
import { IConversationUpdate, Message } from 'botbuilder'
import { Channel } from '../GoodTalk/Channels/Channel'
import { Logger } from '../Utilities/Logger'
import { sprintf } from 'sprintf-js'
import { Flow } from './Flow'
import { Bot } from '../Bot'

export class CreateChannel implements Flow {
    userId: string = '';
    channelId: string = '';

    constructor(protected data: IConversationUpdate) {
        this.channelId = data.address.channelId;
        this.userId = data.user.id;
    }

    private getMicrosoftUser(userId: string): Promise<ChannelAccount> {
        let usersList = MicrosoftAccounts.list(this.data);

        return new Promise<ChannelAccount>((resolve, reject) => {
            usersList.then((accounts: ChannelAccount[]) => {
                accounts.forEach((account: ChannelAccount) => {
                    if (account.id === userId) {
                        resolve(account);
                        return;
                    }
                });
                Logger.debug('events.createChannel.getMicrosoftUser', 'Could not find the requested microsoft user.');
                reject(new Error('Could not find requested microsoft user.'));
            }).catch((error: Error) => {
                Logger.debug('events.createChannel.getMicrosoftUser', 'Could not list microsoft users.');
                reject(error);
            });
        });
    }

    private greetNotificationMicrosoftChannel(user: ChannelAccount, channel: ChannelInfo): void {
        let message = new Message();

        message.address(this.data.address);
        message.text(sprintf(
            "Hello #%s!! @%s has invited me here to set up your GoodTalk team! 😁 \n" +
            "I'll let you know when everything is ready.",
            channel.name,
            user.givenName
        ));

        Bot.getInstance().send(message);
    }

    private getMicrosoftChannel(channelId: string): Promise<ChannelInfo> {
        let channelsList = MicrosoftChannels.list(this.data);

        return new Promise<ChannelInfo>((resolve, reject) => {
            channelsList.then((channels: ChannelInfo[]) => {
                channels.forEach((channel: ChannelInfo) => {
                    if (channel.id === channelId) {
                        resolve(channel);
                        return;
                    }
                });
                Logger.debug('events.createChannel.getMicrosoftChannel', 'Could not find requested microsoft channel.');
                reject(new Error('Could not find requested microsoft channel.'));
            }).catch((error: Error) => {
                Logger.debug('events.createChannel.getMicrosoftChannel', 'Could not list microsoft channels.');
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
                Logger.debug('events.createChannel.createGoodTalkChannel', 'Could not create channel on GoodTalk.');
                reject(error);
            });
        })
    }

    private addUsers(channel: Channel): Promise<Channel> {
        let usersList = MicrosoftAccounts.list(this.data);

        return new Promise<Channel>((resolve, reject) => {
            usersList.then((accounts: ChannelAccount[]) => {
                accounts.forEach((account: ChannelAccount) => {
                    // Add the user on GoodTalk, and add it to our channel.
                });
                resolve(channel);
            }).catch((error: Error) => {
                Logger.debug('events.createChannel.addUsers', 'Could not list microsoft accounts.');
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
        let self: CreateChannel = this;

        this.getMicrosoftUser(this.userId)
            .then((user: ChannelAccount) => {
                Logger.log('events.createChannel.handle', 'Found the Microsoft user.');
                return new Promise<any>((resolve, reject) => {
                    self.getMicrosoftChannel(self.channelId).then((channel: ChannelInfo) => {
                        resolve({user, channel});
                    }).catch((error: Error) => {
                        reject(error);
                    });
                });
            }).then((result: any) => {
                self.greetNotificationMicrosoftChannel(result.user, result.channel);
                Logger.log('events.createChannel.handle', 'Found the Microsoft channel.');
                return self.createGoodTalkChannel(result.channel);
            }).then((channel: Channel) => {
                Logger.log('events.createChannel.handle', 'Created the channel on GoodTalk.');
                return self.addUsers(channel);
            }).then((channel: Channel) => {
                self.doneNotificationMicrosoftChannel();
            }).catch((error: Error) => {
                Logger.debug('events.channelCreated.handle', 'Could not handle create channel.');
            });
    }
}