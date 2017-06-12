import * as builder from 'botbuilder'
import { Sessions } from '../Utilities/Sessions'
import { Bot } from '../Bot'
import * as teams from 'botbuilder-teams'

export class Users {
    public static lookup(address: builder.IAddress) {
        let session = Sessions.load(Bot.getInstance(), address);

        session.then((session: builder.Session) => {
            let connector: teams.TeamsChatConnector = 
                new teams.TeamsChatConnector(session.connector);
            let address: builder.IChatConnectorAddress = session.message.address;
            let serviceUrl = address.serviceUrl;

            if (serviceUrl && address.conversation && address.conversation.id) {
                connector.fetchMemberList(
                    serviceUrl,
                    address.conversation.id,
                    teams.TeamsMessage.getTenantId(session.message),
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