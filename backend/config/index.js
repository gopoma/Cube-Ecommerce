require("dotenv").config();

const config = {
  production: process.env.NODE_ENV === "production",
  development: process.env.NODE_ENV === "development",
  jwtSecret: process.env.JWT_SECRET,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  oauthClientID: process.env.OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
  facebookAppID: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  callbackURLDev: process.env.CALLBACK_URL_DEVELOPMENT
};
config.port = config.production ? process.env.PORT : 4000;

module.exports = config;