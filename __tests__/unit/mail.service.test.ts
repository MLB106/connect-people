// __tests__/unit/mail.service.test.ts

/* 1.  Mocks Brevo */
const mockSendTransacEmail = jest.fn().mockResolvedValue({ messageId: 'fake-id' });

jest.mock('@getbrevo/brevo', () => ({
  TransactionalEmailsApi: jest.fn(() => ({
    setApiKey: jest.fn(),
    sendTransacEmail: mockSendTransacEmail,
  })),
  SendSmtpEmail: jest.fn(function (this: any) {
    this.to      = [];
    this.subject = '';
    this.htmlContent = '';
    this.sender  = {};
    return this;
  }),
}));

/* 2.  Imports après les mocks */
import { sendMail, sendVerificationEmail } from '../../src/services/mail.service';

describe('mail.service', () => {
  afterEach(() => jest.clearAllMocks());

  it('sendMail construit le mail et appelle Brevo', async () => {
    await sendMail('toto@test.com', 'Hello', '<h1>Hi</h1>');

    expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
    const mail = mockSendTransacEmail.mock.calls[0][0];
    expect(mail.to).toEqual([{ email: 'toto@test.com' }]);
    expect(mail.subject).toBe('Hello');
    expect(mail.htmlContent).toBe('<h1>Hi</h1>');
    expect(mail.sender).toEqual({
      name: 'Connect-People',
      email: 'noreply@connect-people.com',
    });
  });

  it('sendVerificationEmail renvoie un token hex 64 chars', async () => {
    process.env.FRONT_URL = 'https://app.example';

    const token = await sendVerificationEmail('user@example.com', 'Alice');

    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect(mockSendTransacEmail).toHaveBeenCalledTimes(1);
    const mail = mockSendTransacEmail.mock.calls[0][0];
    expect(mail.to).toEqual([{ email: 'user@example.com' }]);
    expect(mail.subject).toBe('Vérification de votre email');
    expect(mail.htmlContent).toContain('Alice');
    expect(mail.htmlContent).toContain('https://app.example/verify-email?token=' + token);
  });
});