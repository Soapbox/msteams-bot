import { ChannelInfo, ChannelAccount } from 'botbuilder-teams'
import axios, { AxiosResponse } from 'axios'
import { Constants } from '../Constants'

export class Service {
    public static create(channel: ChannelInfo, actor: ChannelAccount, user: ChannelAccount, role: string = "employee"): Promise<AxiosResponse> {
        //let url = Constants.ROOT_URL + 'users/invite';
        let url = 'http://webhook.site/72c58b88-f92f-4c56-84a7-9491f123cdbc';

        return new Promise<AxiosResponse>((resolve, reject) => {
            axios.post(url, {
                channel: {
                    id: channel.id
                },
                actor: {
                    id: actor.id,
                    name: actor.givenName,
                    email: actor.email
                },
                user: {
                    id: user.id,
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