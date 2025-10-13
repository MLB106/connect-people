// src/services/mail.service.ts
import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import crypto from 'crypto';
const api = new TransactionalEmailsApi();
api.setApiKey(0, process.env.BREVO_API_KEY); // 0 = clé « api-key »
export const sendMail = async (to, subject, html) => {
    const mail = new SendSmtpEmail();
    mail.to = [{ email: to }];
    mail.subject = subject;
    mail.htmlContent = html;
    mail.sender = { name: 'Connect-People', email: 'noreply@connect-people.com' };
    return api.sendTransacEmail(mail);
};
export const sendVerificationEmail = async (to, username) => {
    const token = crypto.randomBytes(32).toString('hex');
    const url = `${process.env.FRONT_URL}/verify-email?token=${token}`;
    const html = `
    <h1>Bienvenue sur Connect-People, ${username} !</h1>
    <p>Merci de vous être inscrit. Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p>
    <a href="${url}" style="background:#4CAF50;color:white;padding:8px 16px;text-decoration:none;">Vérifier mon email</a>
    <p>Si vous n'avez pas demandé cette inscription, ignorez cet email.</p>
    <p>Cordialement,<br/>L’équipe Connect-People</p>
  `;
    await sendMail(to, 'Vérification de votre email', html);
    return token; // à stocker en base
};
// Dans cette ligne :
// TypeScript
// api.setApiKey(0, process.env.BREVO_API_KEY!);
//     0 indique au SDK d’utiliser la clé d’authentification de type « api-key ».
//     la vraie clé est lue dans process.env.BREVO_API_KEY, que tu définis dans ton .env :
// BREVO_API_KEY=votre-clé-obtenue-dans-le-dashboard-brevo
// C’est tout ce qu’il faut pour que Brevo sache qui tu es.s
// UTILISATION 
// await sendMail('user@example.com', 'Bienvenue', '<h1>Hello</h1>');
//# sourceMappingURL=mail.service.js.map