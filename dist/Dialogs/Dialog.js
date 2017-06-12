"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Dialog {
    constructor(bot) {
        this.bot = bot;
        this.initialize();
    }
    initialize() {
        let newActionList = new Array();
        newActionList.push((session, args, next) => {
            this.setDialogIdAsCurrent(session, args, next);
        });
        newActionList = newActionList.concat(this.getActions());
        this.bot.dialog(this.getDialogId(), newActionList)
            .triggerAction({
            matches: this.getMatches(),
        });
    }
    setDialogIdAsCurrent(session, args, next) {
        return __awaiter(this, void 0, void 0, function* () {
            session.conversationData.currentDialogName = this.getDialogId();
            if (next) {
                next(args);
            }
        });
    }
}
exports.Dialog = Dialog;
