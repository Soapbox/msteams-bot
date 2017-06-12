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
const Dialog_1 = require("./Dialog");
class Default extends Dialog_1.Dialog {
    getDialogId() {
        return '/';
    }
    getMatches() {
        return [];
    }
    getActions() {
        return [
            Default.handle
        ];
    }
    static handle(session) {
        return __awaiter(this, void 0, void 0, function* () {
            session.endDialog();
        });
    }
    initialize() {
        let newActionList = new Array();
        newActionList = newActionList.concat(this.getActions());
        this.bot.dialog(this.getDialogId(), newActionList);
    }
}
exports.Default = Default;
