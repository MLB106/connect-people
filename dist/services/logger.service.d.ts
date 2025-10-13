import winston from 'winston';
export declare const logger: winston.Logger;
export declare const log: {
    admin: (action: string, username: string, details?: Record<string, unknown>) => winston.Logger;
    user: (action: string, username: string, details?: Record<string, unknown>) => winston.Logger;
};
