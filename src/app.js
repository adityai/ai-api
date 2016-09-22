'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./config');

var _mongoose = require('./config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(_routes2.default);
var server = _http2.default.createServer(app);

_mongoose2.default.connect(_config.mongo.uri);

(0, _setImmediate3.default)(function () {
  server.listen(_config.port, _config.ip, function () {
    console.log('Express server listening on http://%s:%d, in %s mode', _config.ip, _config.port, _config.env);
  });
});

exports.default = app;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiYXBwIiwic2VydmVyIiwiY3JlYXRlU2VydmVyIiwiY29ubmVjdCIsInVyaSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsTUFBTSx3Q0FBWjtBQUNBLElBQU1DLFNBQVMsZUFBS0MsWUFBTCxDQUFrQkYsR0FBbEIsQ0FBZjs7QUFFQSxtQkFBU0csT0FBVCxDQUFpQixjQUFNQyxHQUF2Qjs7QUFFQSw0QkFBYSxZQUFNO0FBQ2pCSCxTQUFPSSxNQUFQLDJCQUF3QixZQUFNO0FBQzVCQyxZQUFRQyxHQUFSLENBQVksc0RBQVo7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7a0JBTWVQLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCB7IGVudiwgbW9uZ28sIHBvcnQsIGlwIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnLi9jb25maWcvbW9uZ29vc2UnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICcuL2NvbmZpZy9leHByZXNzJ1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcydcblxuY29uc3QgYXBwID0gZXhwcmVzcyhyb3V0ZXMpXG5jb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApXG5cbm1vbmdvb3NlLmNvbm5lY3QobW9uZ28udXJpKVxuXG5zZXRJbW1lZGlhdGUoKCkgPT4ge1xuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGlwLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0V4cHJlc3Mgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vJXM6JWQsIGluICVzIG1vZGUnLCBpcCwgcG9ydCwgZW52KVxuICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iXX0=