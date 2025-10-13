export declare function requireEnv(key: string): string;
export declare const env: {
    readonly port: number;
    readonly nodeEnv: string;
    readonly fallbackPorts: readonly [4001, 4002, 4003, 5000, 5001, 5002, 8000, 8001, 8002];
    readonly databaseUrl: string;
    readonly db: {
        readonly host: string;
        readonly port: number;
        readonly name: string;
        readonly user: string;
        readonly password: string;
    };
    readonly redis: {
        readonly host: string;
        readonly port: number;
        readonly password: string | undefined;
    };
    readonly session: {
        readonly secret: string;
        readonly name: string;
    };
    readonly jwt: {
        readonly secret: string;
        readonly expiresIn: string;
    };
    readonly mail: {
        readonly host: string;
        readonly port: number;
        readonly secure: boolean;
        readonly user: string;
        readonly pass: string;
    };
    readonly corsOrigin: string[];
    readonly rateLimit: {
        readonly windowMs: number;
        readonly max: number;
    };
    readonly csrfSecret: string;
};
