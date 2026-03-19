import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import type { Strategy as StrategyType } from "passport";
import {createAccount} from "../auth.service.js"
import type { IUser , ITokenPayload} from "../auth.types.js"
import ApiError from "../../../utils/ApiError.js";
// strategy class for oauth2 providers (google, facebook)
export class Strategy {
    protected clientID: string;
    protected clientSecret: string;
    protected callbackURL: string;
    private provider: 'google' | 'facebook' | null = null;
    
    constructor(clientID: string, clientSecret: string, callbackURL: string) {
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.callbackURL = callbackURL;
    }
    
    setProvider(provider: 'google' | 'facebook') {
        this.provider = provider;
    }
    
    createStrategy(): StrategyType {
        if (this.provider === 'google') {
            return new GoogleStrategy(
                {
                    clientID: this.clientID,
                    clientSecret: this.clientSecret,
                    callbackURL: this.callbackURL,
                    passReqToCallback: true
                }, 
                async (_req: any, _accessToken: any, _refreshToken: any, profile: any, done: any) => {
                    try {
                        let user = await createAccount(profile.id, this.provider!, profile.emails[0].value, profile.displayName);
                        if (!user) {
                            return done(new Error('User not found'), null);
                        }
                        let payload : ITokenPayload = {
                            userId: user._id.toString(),
                            role: user.role,
                            name: user.name,
                            email: user.email
                        };
                        return done(null, payload);
                    } catch (error) {
                        return done(error, undefined);
                    }
                }
            );
        } else if (this.provider === 'facebook') {
            return new FacebookStrategy(
                {
                    clientID: this.clientID,
                    clientSecret: this.clientSecret,
                    callbackURL: this.callbackURL,
                    passReqToCallback: true
                }, 
                async (_req: any, _accessToken: any, _refreshToken: any, profile: any, done: any) => {
                    try {
                        if (!profile.emails || profile.emails.length === 0) {
                            throw new ApiError("Please enable email sharing in Facebook settings to login", 400);
                        }
                        let user : IUser |
                         null = await createAccount(profile.id, this.provider!, profile.emails[0].value, profile.displayName);
                        if (!user) {
                            return done(new Error('User not found'), null);
                        }
                        let payload : ITokenPayload = {
                            userId: user._id.toString(),
                            role: user.role,
                            name: user.name,
                            email: user.email
                        };
                        return done(null, payload);
                    } catch (error) {
                        return done(error, undefined);
                    }
                }
            );
        }
        
        throw new Error('Provider not set');
    }
}
