import * as builder from 'botbuilder'
import { Sessions } from '../Utilities/Sessions'
import { Bot } from '../Bot'
import { Team } from '../Team'
import * as teams from 'botbuilder-teams'
import { Logger } from '../Interceptors/Logger'

export class Users {
    public static lookup(data: any) {
        let address = data.address;
        let session = Sessions.load(Bot.getInstance(), address);

        Logger.log('Users.lookup', 'Looking up users');
        console.log(address);

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
                            let response = "";
                            for (let i = 0; i < result.length; i++) {
                                response += result[i].givenName + " " + result[i].surname + "<br>";
                            }
                            console.log(response);
                            session.send(response);
                        } else {
                            session.error(err);
                        }
                        session.endDialog();
                    }
                );
            }
        }).catch((reason: any) => {
            console.log("Could not get users");
        });
    }
}