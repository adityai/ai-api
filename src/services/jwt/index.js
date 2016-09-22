'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.signSync = exports.sign = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtSign = _bluebird2.default.promisify(_jsonwebtoken2.default.sign);
var jwtVerify = _bluebird2.default.promisify(_jsonwebtoken2.default.verify);

var sign = exports.sign = function sign(id, options) {
  var method = arguments.length <= 2 || arguments[2] === undefined ? jwtSign : arguments[2];
  return method({ id: id }, _config.jwtSecret, options);
};

var signSync = exports.signSync = function signSync(id, options) {
  return sign(id, options, _jsonwebtoken2.default.sign);
};

var verify = exports.verify = function verify(token) {
  return jwtVerify(token, _config.jwtSecret);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9qd3QvaW5kZXguanMiXSwibmFtZXMiOlsiand0U2lnbiIsInByb21pc2lmeSIsInNpZ24iLCJqd3RWZXJpZnkiLCJ2ZXJpZnkiLCJpZCIsIm9wdGlvbnMiLCJtZXRob2QiLCJzaWduU3luYyIsInRva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsVUFBVSxtQkFBUUMsU0FBUixDQUFrQix1QkFBSUMsSUFBdEIsQ0FBaEI7QUFDQSxJQUFNQyxZQUFZLG1CQUFRRixTQUFSLENBQWtCLHVCQUFJRyxNQUF0QixDQUFsQjs7QUFFTyxJQUFNRixzQkFBTyxTQUFQQSxJQUFPLENBQUNHLEVBQUQsRUFBS0MsT0FBTDtBQUFBLE1BQWNDLE1BQWQseURBQXVCUCxPQUF2QjtBQUFBLFNBQ2xCTyxPQUFPLEVBQUVGLE1BQUYsRUFBUCxxQkFBMEJDLE9BQTFCLENBRGtCO0FBQUEsQ0FBYjs7QUFHQSxJQUFNRSw4QkFBVyxTQUFYQSxRQUFXLENBQUNILEVBQUQsRUFBS0MsT0FBTDtBQUFBLFNBQWlCSixLQUFLRyxFQUFMLEVBQVNDLE9BQVQsRUFBa0IsdUJBQUlKLElBQXRCLENBQWpCO0FBQUEsQ0FBakI7O0FBRUEsSUFBTUUsMEJBQVMsU0FBVEEsTUFBUyxDQUFDSyxLQUFEO0FBQUEsU0FBV04sVUFBVU0sS0FBVixvQkFBWDtBQUFBLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IHsgand0U2VjcmV0IH0gZnJvbSAnLi4vLi4vY29uZmlnJ1xuXG5jb25zdCBqd3RTaWduID0gUHJvbWlzZS5wcm9taXNpZnkoand0LnNpZ24pXG5jb25zdCBqd3RWZXJpZnkgPSBQcm9taXNlLnByb21pc2lmeShqd3QudmVyaWZ5KVxuXG5leHBvcnQgY29uc3Qgc2lnbiA9IChpZCwgb3B0aW9ucywgbWV0aG9kID0gand0U2lnbikgPT5cbiAgbWV0aG9kKHsgaWQgfSwgand0U2VjcmV0LCBvcHRpb25zKVxuXG5leHBvcnQgY29uc3Qgc2lnblN5bmMgPSAoaWQsIG9wdGlvbnMpID0+IHNpZ24oaWQsIG9wdGlvbnMsIGp3dC5zaWduKVxuXG5leHBvcnQgY29uc3QgdmVyaWZ5ID0gKHRva2VuKSA9PiBqd3RWZXJpZnkodG9rZW4sIGp3dFNlY3JldClcbiJdfQ==