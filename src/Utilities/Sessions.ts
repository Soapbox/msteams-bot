import { IAddress, Session, UniversalBot } from 'botbuilder'

export class Sessions {
    public static load(bot: UniversalBot, address: IAddress): Promise<Session> {
        return new Promise<Session>((resolve, reject) => {
            bot.loadSession(address, (err: any, session: Session) => {
                if (!err) {
                    resolve(session);
                } else {
                    reject(err);
                }
            });
        });
    }
}