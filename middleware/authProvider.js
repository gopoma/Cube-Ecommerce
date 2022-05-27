const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { 
  oauthClientID, 
  oauthClientSecret,
  production, 
  callbackURL,
  callbackURLDev
} = require("../config");

const useGoogleStrategy = () => {
  return new GoogleStrategy({
    clientID: oauthClientID,
    clientSecret: oauthClientSecret,
    callbackURL: `${production?callbackURL:callbackURLDev}/api/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {profile});
  });
};

module.exports = {
  useGoogleStrategy
};