export class Configurations {
    private static convertToBoolean(truthy: any): boolean {
        return truthy === true || truthy === 'true';
    }

    public static isDebugging(): boolean {
        return Configurations.convertToBoolean(process.env.ENABLE_DEBUGGING || true);
    }
}