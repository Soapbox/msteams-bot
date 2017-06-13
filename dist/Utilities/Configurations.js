"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configurations {
    static convertToBoolean(truthy) {
        return truthy === true || truthy === 'true';
    }
    static isDebugging() {
        return Configurations.convertToBoolean(process.env.ENABLE_DEBUGGING || true);
    }
}
exports.Configurations = Configurations;
