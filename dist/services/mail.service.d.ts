export declare const sendMail: (to: string, subject: string, html: string) => Promise<{
    response: import("http").IncomingMessage;
    body: import("@getbrevo/brevo").CreateSmtpEmail;
}>;
export declare const sendVerificationEmail: (to: string, username: string) => Promise<string>;
