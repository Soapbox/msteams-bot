var sprintf = require('sprintf-js').sprintf;
import { Configurations } from './Configurations'

export class Logger {
    public static debug(tag: string, message: string | undefined): void {
        if (Configurations.isDebugging()) {
            Logger.log(tag, message);
        }
    }

    public static log(tag: string, message: string | undefined): void {
        if (message) {
            console.log(sprintf('%s: %s', tag, message));
        }
    }
}