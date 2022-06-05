const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { 
  oauthClientID, 
  oauthClientSecret,
  facebookAppID,
  facebookAppSecret,
  production, 
  callbackURL,
  callbackURLDev
} = require("../config");

const callbackUrl = provider => `${production?callbackURL:callbackURLDev}/api/auth/${provider}/callback`;
const useGoogleStrategy = () => {
  return new GoogleStrategy({
    clientID: oauthClientID,
    clientSecret: oauthClientSecret,
    callbackURL: callbackUrl("google")
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {profile});
  });
};
const useFacebookStrategy = () => {
  return new FacebookStrategy({
    clientID: facebookAppID,
    clientSecret: facebookAppSecret,
    callbackURL: callbackUrl("facebook")
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {profile});
  })
}

module.exports = {
  useGoogleStrategy,
  useFacebookStrategy
};