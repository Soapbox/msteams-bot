import * as builder from 'botbuilder'

export class Sessions {
    public static load(bot: builder.UniversalBot, address: builder.IAddress): Promise<builder.Session> {
        return new Promise<builder.Session>((resolve, reject) => {
            bot.loadSession(address, (err: any, session: builder.Session) => {
                if (!err) {
                    resolve(session);
                } else {
                    reject(err);
                }
            });
        });
    }
}