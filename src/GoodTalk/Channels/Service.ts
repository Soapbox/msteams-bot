import { ChannelInfo } from 'botbuilder-teams'
import { Channel } from './Channel'

export class Service {
    public static createOrFind(channel: ChannelInfo): Promise<Channel> {
        return new Promise<Channel>((resolve, reject) => {
            resolve(new Channel('name'));
        });
    }
}