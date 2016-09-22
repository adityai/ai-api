'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressForceSsl = require('express-force-ssl');

var _expressForceSsl2 = _interopRequireDefault(_expressForceSsl);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _querymen = require('querymen');

var _bodymen = require('bodymen');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (routes) {
  var app = (0, _express2.default)();

  /* istanbul ignore next */
  if (_.env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    });
    app.use(_expressForceSsl2.default);
  }

  /* istanbul ignore next */
  if (_.env === 'production' || _.env === 'development') {
    app.use((0, _cors2.default)());
    app.use((0, _compression2.default)());
    app.use((0, _morgan2.default)('dev'));
  }

  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  app.use((0, _methodOverride2.default)());
  app.use(routes);
  app.use((0, _querymen.errorHandler)());
  app.use((0, _bodymen.errorHandler)());

  return app;
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvZXhwcmVzcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJhcHAiLCJzZXQiLCJlbmFibGUzMDFSZWRpcmVjdHMiLCJ0cnVzdFhGUEhlYWRlciIsInVzZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7a0JBRWUsVUFBQ0EsTUFBRCxFQUFZO0FBQ3pCLE1BQU1DLE1BQU0sd0JBQVo7O0FBRUE7QUFDQSxNQUFJLFVBQVEsWUFBWixFQUEwQjtBQUN4QkEsUUFBSUMsR0FBSixDQUFRLGlCQUFSLEVBQTJCO0FBQ3pCQywwQkFBb0IsS0FESztBQUV6QkMsc0JBQWdCO0FBRlMsS0FBM0I7QUFJQUgsUUFBSUksR0FBSjtBQUNEOztBQUVEO0FBQ0EsTUFBSSxVQUFRLFlBQVIsSUFBd0IsVUFBUSxhQUFwQyxFQUFtRDtBQUNqREosUUFBSUksR0FBSixDQUFRLHFCQUFSO0FBQ0FKLFFBQUlJLEdBQUosQ0FBUSw0QkFBUjtBQUNBSixRQUFJSSxHQUFKLENBQVEsc0JBQU8sS0FBUCxDQUFSO0FBQ0Q7O0FBRURKLE1BQUlJLEdBQUosQ0FBUSxxQkFBV0MsVUFBWCxDQUFzQixFQUFFQyxVQUFVLEtBQVosRUFBdEIsQ0FBUjtBQUNBTixNQUFJSSxHQUFKLENBQVEscUJBQVdHLElBQVgsRUFBUjtBQUNBUCxNQUFJSSxHQUFKLENBQVEsK0JBQVI7QUFDQUosTUFBSUksR0FBSixDQUFRTCxNQUFSO0FBQ0FDLE1BQUlJLEdBQUosQ0FBUSw2QkFBUjtBQUNBSixNQUFJSSxHQUFKLENBQVEsNEJBQVI7O0FBRUEsU0FBT0osR0FBUDtBQUNELEMiLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgZm9yY2VTU0wgZnJvbSAnZXhwcmVzcy1mb3JjZS1zc2wnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJ1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcidcbmltcG9ydCBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnXG5pbXBvcnQgeyBlcnJvckhhbmRsZXIgYXMgcXVlcnlFcnJvckhhbmRsZXIgfSBmcm9tICdxdWVyeW1lbidcbmltcG9ydCB7IGVycm9ySGFuZGxlciBhcyBib2R5RXJyb3JIYW5kbGVyIH0gZnJvbSAnYm9keW1lbidcbmltcG9ydCB7IGVudiB9IGZyb20gJy4vJ1xuXG5leHBvcnQgZGVmYXVsdCAocm91dGVzKSA9PiB7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChlbnYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFwcC5zZXQoJ2ZvcmNlU1NMT3B0aW9ucycsIHtcbiAgICAgIGVuYWJsZTMwMVJlZGlyZWN0czogZmFsc2UsXG4gICAgICB0cnVzdFhGUEhlYWRlcjogdHJ1ZVxuICAgIH0pXG4gICAgYXBwLnVzZShmb3JjZVNTTClcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChlbnYgPT09ICdwcm9kdWN0aW9uJyB8fCBlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBhcHAudXNlKGNvcnMoKSlcbiAgICBhcHAudXNlKGNvbXByZXNzaW9uKCkpXG4gICAgYXBwLnVzZShtb3JnYW4oJ2RldicpKVxuICB9XG5cbiAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpXG4gIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpXG4gIGFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSlcbiAgYXBwLnVzZShyb3V0ZXMpXG4gIGFwcC51c2UocXVlcnlFcnJvckhhbmRsZXIoKSlcbiAgYXBwLnVzZShib2R5RXJyb3JIYW5kbGVyKCkpXG5cbiAgcmV0dXJuIGFwcFxufVxuIl19