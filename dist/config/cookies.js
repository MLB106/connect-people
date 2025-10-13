/**
 * @file src/config/cookies.ts
 * Helpers Express pour poser / effacer les cookies
 * (access, refresh, CSRF) – user et admin
 */
// import i18n from '../config/i18n'; 
const defaultOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
};
export const setTokenCookie = (res, token, name, maxAgeMs) => {
    res.cookie(name, token, maxAgeMs ? { ...defaultOpts, maxAge: maxAgeMs } : defaultOpts);
};
export const clearTokenCookie = (res, name) => {
    res.clearCookie(name);
};
export const logout = (res) => {
    ['accessToken', 'refreshToken', 'csrfToken',
        'adminAccessToken', 'adminRefreshToken', 'adminCsrfToken']
        .forEach(n => clearTokenCookie(res, n));
};
/* ---------- USER ---------- */
export const setAuthCookies = (res, access, refresh, csrf) => {
    setTokenCookie(res, access, 'accessToken', 15 * 60 * 1000); // 15 min
    setTokenCookie(res, refresh, 'refreshToken', 7 * 24 * 60 * 60 * 1000); // 7 j
    setTokenCookie(res, csrf, 'csrfToken', 60 * 60 * 1000); // 1 h
};
/* ---------- ADMIN ---------- */
export const setAdminAuthCookies = (res, access, refresh, csrf) => {
    setTokenCookie(res, access, 'adminAccessToken', 15 * 60 * 1000);
    setTokenCookie(res, refresh, 'adminRefreshToken', 7 * 24 * 60 * 60 * 1000);
    setTokenCookie(res, csrf, 'adminCsrfToken', 60 * 60 * 1000);
};
// Petit rappel :
//     Les durées sont lues dans src/config/tokens.ts ; plus besoin de parseInt(...) partout.
//     Les cookies d’« entité » (ad_XXX, alert_XXX) 
//     peuvent être ajoutés plus tard si vraiment utile, mais n’ont pas l’air indispensables pour l’instant.
// UTILISATION POUR LES MESSAGES D'ERREUR 
// throw new Error(i18n.__('COOKIE_ERROR'));
//# sourceMappingURL=cookies.js.map