'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./api/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./api/auth');

var _auth2 = _interopRequireDefault(_auth);

var _article = require('./api/article');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', _user2.default);
router.use('/auth', _auth2.default);
router.use('/articles', _article2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMuanMiXSwibmFtZXMiOlsicm91dGVyIiwidXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMscUJBQWY7O0FBRUE7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7O0FBS0E7Ozs7Ozs7O0FBUUFBLE9BQU9DLEdBQVAsQ0FBVyxRQUFYO0FBQ0FELE9BQU9DLEdBQVAsQ0FBVyxPQUFYO0FBQ0FELE9BQU9DLEdBQVAsQ0FBVyxXQUFYOztrQkFFZUQsTSIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHVzZXIgZnJvbSAnLi9hcGkvdXNlcidcbmltcG9ydCBhdXRoIGZyb20gJy4vYXBpL2F1dGgnXG5pbXBvcnQgYXJ0aWNsZSBmcm9tICcuL2FwaS9hcnRpY2xlJ1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcblxuLyoqXG4gKiBAYXBpRGVmaW5lIG1hc3RlciBNYXN0ZXIgYWNjZXNzIG9ubHlcbiAqIFlvdSBtdXN0IHBhc3MgYGFjY2Vzc190b2tlbmAgcGFyYW1ldGVyIG9yIGEgQmVhcmVyIFRva2VuIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gKiB0byBhY2Nlc3MgdGhpcyBlbmRwb2ludC5cbiAqL1xuLyoqXG4gKiBAYXBpRGVmaW5lIGFkbWluIEFkbWluIGFjY2VzcyBvbmx5XG4gKiBZb3UgbXVzdCBwYXNzIGBhY2Nlc3NfdG9rZW5gIHBhcmFtZXRlciBvciBhIEJlYXJlciBUb2tlbiBhdXRob3JpemF0aW9uIGhlYWRlclxuICogdG8gYWNjZXNzIHRoaXMgZW5kcG9pbnQuXG4gKi9cbi8qKlxuICogQGFwaURlZmluZSB1c2VyIFVzZXIgYWNjZXNzIG9ubHlcbiAqIFlvdSBtdXN0IHBhc3MgYGFjY2Vzc190b2tlbmAgcGFyYW1ldGVyIG9yIGEgQmVhcmVyIFRva2VuIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gKiB0byBhY2Nlc3MgdGhpcyBlbmRwb2ludC5cbiAqL1xuLyoqXG4gKiBAYXBpRGVmaW5lIGxpc3RQYXJhbXNcbiAqIEBhcGlQYXJhbSB7U3RyaW5nfSBbcV0gUXVlcnkgdG8gc2VhcmNoLlxuICogQGFwaVBhcmFtIHtOdW1iZXJ7MS4uMzB9fSBbcGFnZT0xXSBQYWdlIG51bWJlci5cbiAqIEBhcGlQYXJhbSB7TnVtYmVyezEuLjEwMH19IFtsaW1pdD0zMF0gQW1vdW50IG9mIHJldHVybmVkIGl0ZW1zLlxuICogQGFwaVBhcmFtIHtTdHJpbmdbXX0gW3NvcnQ9LWNyZWF0ZWRBdF0gT3JkZXIgb2YgcmV0dXJuZWQgaXRlbXMuXG4gKiBAYXBpUGFyYW0ge1N0cmluZ1tdfSBbZmllbGRzXSBGaWVsZHMgdG8gYmUgcmV0dXJuZWQuXG4gKi9cbnJvdXRlci51c2UoJy91c2VycycsIHVzZXIpXG5yb3V0ZXIudXNlKCcvYXV0aCcsIGF1dGgpXG5yb3V0ZXIudXNlKCcvYXJ0aWNsZXMnLCBhcnRpY2xlKVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXJcbiJdfQ==