var sprintf = require('sprintf-js').sprintf;

export class Logger {
    /**
     * Logs the tag and message to the console.
     * 
     * @param tag
     *        The tag for the message.
     * @param message 
     *        The message to log.
     */
    static log(tag: string, message: string | undefined): void {
        if (message !== undefined) {
            let text = sprintf("%s: %s", tag, message);
            console.log(text);
        }
    }
}