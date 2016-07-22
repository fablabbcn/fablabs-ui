/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fablabs-ui',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    // config/environment.js
    contentSecurityPolicy: {
      // Deny everything by default
      'default-src': "'none'",

      // Allow scripts from
      'script-src': ["'self'", "*"],

      // Allow fonts to be loaded from http://fonts.gstatic.com
      'font-src': ["'self'", "http://fonts.gstatic.com"],

      // Allow data (ajax/websocket) from
      'connect-src': ["'self'", "*"],

      // Allow images from the origin itself (i.e. current domain)
      'img-src': "'self'",

      // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'style-src': ["'self'", "'unsafe-inline'", "http://fonts.googleapis.com"],

      // `media-src` will be omitted from policy
      // Browser will fallback to default-src for media resources (which is to deny, see above).
      'media-src': null
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'me',
    routeIfAlreadyAuthenticated: 'me',
    authorizer: 'authorizer:fablabs',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
