module.exports = function serveStatic (sails) {

    let serveStaticHandler;
  
    if ('production' !== sails.config.environment) {

      // Only initializing the module in non-production environment.
      const serveStatic = require('serve-static');
      var staticFilePublic = sails.config.appPath + '/public';
      serveStaticHandler = serveStatic(staticFilePublic);
      sails.log.info('Serving static files from: «%s»', staticFilePublic);
    }
  
    // Adding middleware, make sure to enable it in your config.
    sails.config.http.middleware.serveStatic = function (req, res, procced) {
      if (serveStaticHandler) {
        serveStaticHandler.apply(serveStaticHandler, arguments);
      } else {
        procced();
      }
    };
  
  
    return {};
  
  };
