import { ChannelInfo, ChannelAccount } from 'botbuilder-teams'
import axios, { AxiosResponse } from 'axios'
import { Constants } from '../Constants'

export class Service {
    public static create(tenantId: string, actor: ChannelAccount, channel: ChannelInfo): Promise<AxiosResponse> {
        //let url = Constants.ROOT_URL + 'channels';
        let url = 'http://webhook.site/72c58b88-f92f-4c56-84a7-9491f123cdbc';

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