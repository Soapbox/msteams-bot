"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Strip bot mentions from the message text
class StripBotAtMentions {
    constructor() {
        this.botbuilder = (session, next) => {
            let message = session.message;
            if (message) {
                let botMri = message.address.bot.id.toLowerCase();
                let botAtMention = message.entities && message.entities.find((entity) => (entity.type === "mention") && (entity.mentioned.id.toLowerCase() === botMri));
                if (botAtMention) {
                    // Save original text as property of the message
                    message.textWithBotMentions = message.text;
                    if (message.text) {
                        message.text = message.text.replace(botAtMention.text, "").trim();
                    }
                }
            }
            next();
        };
    }
}
exports.StripBotAtMentions = StripBotAtMentions;
