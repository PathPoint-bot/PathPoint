import type { SignOptions } from "jsonwebtoken";
import {env} from "./env.js"

export const accessTokenConfig = {
    secret: (env.jwt.secret || 'default-access-secret') as string,
    expiresIn: "1h" as NonNullable<SignOptions["expiresIn"]> // Skip typescript validation
}

export const refreshTokenConfig = {
    secret: (env.jwt.refreshTokenSecret || 'default-refresh-secret') as string,
    expiresIn: "7d" as NonNullable<SignOptions["expiresIn"]> // Skip typescript validation
}