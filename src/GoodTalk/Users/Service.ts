import { ChannelInfo, ChannelAccount } from 'botbuilder-teams'
import axios, { AxiosResponse } from 'axios'
import { Constants } from '../Constants'

export class Service {
    public static create(channel: ChannelInfo, actor: ChannelAccount, user: ChannelAccount, role: string = "employee"): Promise<AxiosResponse> {
        let url = Constants.ROOT_URL + 'users/invite';
        //let url = 'http://webhook.site/90ce2e64-5317-4075-9abe-f24a28fe1ea4';

        return new Promise<AxiosResponse>((resolve, reject) => {
            axios.post(url, {
                channel: {
                    id: channel.id
                },
                actor: {
                    id: actor.objectId,
                    name: actor.givenName,
                    email: actor.email
                },
                user: {
                    id: user.objectId,
                    name: user.givenName,
                    email: user.email,
                    role: role
                }
            }).then((response: AxiosResponse) => {
                resolve(response);
            }).catch((error: Error) => {
                reject(error);
            });
        });
    }
}