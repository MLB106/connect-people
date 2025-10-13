import { logger } from './logger.service';
const SECRET = process.env.TURNSTILE_SECRET;
const ENDPOINT = process.env.TURNSTILE_ENDPOINT;
export async function verifyTurnstile(token, ip) {
    if (!token)
        return false;
    const body = new URLSearchParams({
        secret: SECRET,
        response: token,
        remoteip: ip,
    });
    try {
        const r = await fetch(ENDPOINT, { method: 'POST', body });
        const data = (await r.json());
        logger.debug('Turnstile result', { ip, success: data.success, errors: data['error-codes'] });
        return data.success === true;
    }
    catch (err) {
        logger.error('Turnstile verification failed', { error: err.message });
        return false;
    }
}
//# sourceMappingURL=turnstile.service.js.map