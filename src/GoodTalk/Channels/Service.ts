import { ChannelInfo, ChannelAccount } from 'botbuilder-teams'
import { Constants } from '../Constants'
import { Channel } from './Channel'
import axios, { AxiosResponse } from 'axios'

export class Service {
    public static createOrFind(channel: ChannelInfo): Promise<Channel> {
        return new Promise<Channel>((resolve, reject) => {
            resolve(new Channel('name'));
        });
    }

    public static create(tenantId: string, actor: ChannelAccount, channel: ChannelInfo): Promise<AxiosResponse> {
        let url = Constants.ROOT_URL;

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