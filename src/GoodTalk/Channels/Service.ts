import { ChannelInfo, ChannelAccount } from 'botbuilder-teams'
import axios, { AxiosResponse } from 'axios'
import { Constants } from '../Constants'

export class Service {
    public static create(tenantId: string, actor: ChannelAccount, channel: ChannelInfo): Promise<AxiosResponse> {
        //let url = Constants.ROOT_URL + 'channels';
        let url = 'http://webhook.site/dbc84a27-12ee-46f4-832a-42ccc9b41141';

        let name = 'General';

        if (!(channel.name) || channel.name.length === 0) {
            channel.name = name;
        }

        return new Promise<AxiosResponse>((resolve, reject) => {
            axios.post(url, {
                tenant: {
                    id: tenantId
                },
                actor: {
                    id: actor.id,
                    name: actor.givenName,
                    email: actor.email
                },
                channel: {
                    id: channel.id,
                    name: channel.name
                }
            }).then((response: AxiosResponse) => {
                resolve(response);
            }).catch((error: Error) => {
                reject(error);
            });
        });
    }
}