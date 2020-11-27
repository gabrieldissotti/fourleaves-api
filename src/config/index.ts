export const FacebookConfig = {
  baseURL: 'https://graph.facebook.com',
  appId: process.env.FACEBOOK_APP_ID,
  apiVersion: 'v8.0',
  redirectURI: process.env.FACEBOOK_REDIRECT_URI,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
};

export const JWTConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1d',
};

export const ConfigFrontend = {
  baseURL: process.env.FRONTEND_URL,
};
