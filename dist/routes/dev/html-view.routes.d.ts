declare const router: import("express-serve-static-core").Router;
declare global {
    namespace Express {
        interface Request {
            __: (key: string) => string;
        }
    }
}
export default router;
