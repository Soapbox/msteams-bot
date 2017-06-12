import * as builder from 'botbuilder'
import { Sessions } from '../Utilities/Sessions'
import { Bot } from '../Bot'
import { Team } from '../Team'
import * as teams from 'botbuilder-teams'

export class Accounts {
    public static list(data: any): Promise<teams.ChannelAccount[]> {
        let address = data.address;
        let session = Sessions.load(Bot.getInstance(), address);

        return new Promise<teams.ChannelAccount[]>((resolve, reject) => {
            session.then((session: builder.Session) => {
                let connector: teams.TeamsChatConnector = Team.getInstance();
                let address: builder.IChatConnectorAddress = session.message.address;
                let serviceUrl = 
                    (<builder.IChatConnectorAddress>session.message.address).serviceUrl;

                if (serviceUrl && address.conversation && address.conversation.id) {
                    connector.fetchMemberList(
                        serviceUrl,
                        session.message.address.conversation.id,
                        teams.TeamsMessage.getTenantId(data),
                        (err: Error, result: teams.ChannelAccount[]) => {
                            if (!err) {
                                resolve(result);
                            } else {
                                reject(err);
                            }
                        }
                    );
                }
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
}