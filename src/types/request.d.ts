import { ITokenPayload } from "../modules/auth/auth.types.js";

declare global {
    namespace Express {
        interface User extends ITokenPayload {}
        interface Request {
            user?: User;
        }
    }
}

export {};
