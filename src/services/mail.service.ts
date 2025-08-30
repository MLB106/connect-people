// src/services/mail.service.ts

import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';

const api = new TransactionalEmailsApi();
api.setApiKey(0, process.env.BREVO_API_KEY!);   // 0 = clé « api-key »

export const sendMail = async (to: string, subject: string, html: string) => {
  const mail = new SendSmtpEmail();
  mail.to = [{ email: to }];
  mail.subject = subject;
  mail.htmlContent = html;
  mail.sender = { name: 'Connect-People', email: 'noreply@connect-people.com' };
  return api.sendTransacEmail(mail);
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