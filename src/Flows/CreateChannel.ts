import { IChatConnectorAddress, IConversationUpdate, Message, Session } from 'botbuilder'
import { Service as ChannelsService } from '../GoodTalk/Channels/Service'
import { Channels as MicrosoftChannels } from '../Microsoft/Channels'
import { Accounts as MicrosoftAccounts } from '../Microsoft/Accounts'
import { Service as UsersService } from '../GoodTalk/Users/Service'
import { ChannelAccount, ChannelInfo } from 'botbuilder-teams'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { AxiosResponse } from 'axios'
import { Bot } from '../Bot'

export class CreateChannel {
    constructor() {}

    createGoodTalkChannel(tenantId: string, actor: ChannelAccount, channel: ChannelInfo): Promise<ChannelInfo> {
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

    addUsers(actor: ChannelAccount, channel: ChannelInfo, accounts: ChannelAccount[]): Promise<void> {
        return new Promise<void>((resolve) => {
            (async function loop() {
                for (let i = 0; i <= accounts.length; ++i) {

                    if (accounts[i]) {
                        // console.log(accounts[i]);

                        await UsersService.create(channel, actor, accounts[i]);
                    }
                }

                resolve();
            })();
        })
    }
}
