import passport from "passport";
import {env} from "../../../config/env.js"
import { Strategy } from "./strategy.js"




// Create google strategy
const googleStrategy = new Strategy(
    env.Oauth.google.clientId,
    env.Oauth.google.clientSecret,
    env.Oauth.google.callbackUrl
);

// Create facebook strategy
const facebookStrategy = new Strategy(
    env.Oauth.facebook.clientId,
    env.Oauth.facebook.clientSecret,
    env.Oauth.facebook.callbackUrl
);
// Set providers
facebookStrategy.setProvider('facebook');
googleStrategy.setProvider('google');


// Use strategies
passport.use(facebookStrategy.createStrategy());
passport.use(googleStrategy.createStrategy());


export default passport;
