import { IChatConnectorAddress, IConversationUpdate, Session } from 'botbuilder'
import { ChannelInfo, TeamsChatConnector } from 'botbuilder-teams'
import { Sessions } from '../Utilities/Sessions'
import { Logger } from '../Utilities/Logger'
import { Team } from '../Team'
import { Bot } from '../Bot'

export class Channels {
    public static list(data: IConversationUpdate): Promise<ChannelInfo[]> {
        let address = data.address;
        let session = Sessions.load(Bot.getInstance(), address);

        return new Promise<ChannelInfo>((resolve, reject) => {
            session.then((session: Session) => {
                let connector: TeamsChatConnector = Team.getInstance();
                let address: IChatConnectorAddress = session.message.address;
                let serviceUrl = (<IChatConnectorAddress>session.message.address).serviceUrl;
                let teamId = session.message.sourceEvent.team.id;

                connector.fetchChannelList(
                    serviceUrl,
                    teamId,
                    (err: Error, result: ChannelInfo[]) => {
                        if (!err) {
                            resolve(result);
                        } else {
                            Logger.debug('microsoft.channels.list', 'Could not fetch channel list.');
                            reject(err);
                        }
                    }
                );
            }).catch((error: Error) => {
                Logger.debug('microsoft.channels.list', 'Could not load session');
                reject(error);
            });
        });
    }
}