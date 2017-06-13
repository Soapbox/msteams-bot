import { ChannelAccount, TeamsChatConnector, TeamsMessage } from 'botbuilder-teams'
import { IChatConnectorAddress, IConversationUpdate, Session } from 'botbuilder'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { Team } from '../Team'
import { Bot } from '../Bot'

export class Accounts {
    public static list(data: IConversationUpdate): Promise<ChannelAccount[]> {
        let address = data.address;
        let session = Sessions.load(Bot.getInstance(), address);

        return new Promise<ChannelAccount[]>((resolve, reject) => {
            session.then((session: Session) => {
                let connector: TeamsChatConnector = Team.getInstance();
                let address: IChatConnectorAddress = session.message.address;
                let serviceUrl = (<IChatConnectorAddress>session.message.address).serviceUrl;
                let messages: Array<string> = new Array<string>();

                if (serviceUrl === undefined) {
                    let message = 'Unexpected undefined session.message.address.serviceUrl.';
                    Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }

                if (address.conversation === undefined) {
                    let message = 'Unexpected undefinded session.message.address.conversation.';
                    Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }

                if (address.conversation.id === undefined) {
                    let message = 'Unexpected undefined session.message.address.conversation.id.';
                    Logger.debug('microsoft.accounts.list', message);
                    messages.push(message);
                }

                if (messages.length > 0) {
                    reject(new Error(messages.join(' ')));
                }

                connector.fetchMemberList(
                    serviceUrl,
                    session.message.address.conversation.id,
                    TeamsMessage.getTenantId(data),
                    (error: Error, result: ChannelAccount[]) => {
                        if (!error) {
                            resolve(result);
                        } else {
                            Logger.debug('microsoft.accounts.list', 'Could not fetch memeber list.');
                            reject(error);
                        }
                    }
                );
            }).catch((error: Error) => {
                Logger.debug('microsoft.accounts.list', 'Could not load a session');
                reject(error);
            });
        });
    }
}