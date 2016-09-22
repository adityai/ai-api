'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth.controller');

var _passport = require('../../services/passport');

var router = new _express.Router();

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission master
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/', (0, _passport.master)(), (0, _passport.basic)(), _auth.login);

/**
 * @api {post} /auth/facebook Authenticate with Facebook
 * @apiName AuthenticateFacebook
 * @apiGroup Auth
 * @apiParam {String} access_token Facebook user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/facebook', (0, _passport.facebook)(), _auth.login);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXV0aC9hdXRoLnJvdXRlci5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNQSxTQUFTLHFCQUFmOztBQUVBOzs7Ozs7Ozs7OztBQVdBQSxPQUFPQyxJQUFQLENBQVksR0FBWixFQUNFLHVCQURGLEVBRUUsc0JBRkY7O0FBS0E7Ozs7Ozs7OztBQVNBRCxPQUFPQyxJQUFQLENBQVksV0FBWixFQUNFLHlCQURGOztrQkFJZUQsTSIsImZpbGUiOiJhdXRoLnJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJy4vYXV0aC5jb250cm9sbGVyJ1xuaW1wb3J0IHsgYmFzaWMsIG1hc3RlciwgZmFjZWJvb2sgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wYXNzcG9ydCdcblxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXG5cbi8qKlxuICogQGFwaSB7cG9zdH0gL2F1dGggQXV0aGVudGljYXRlXG4gKiBAYXBpTmFtZSBBdXRoZW50aWNhdGVcbiAqIEBhcGlHcm91cCBBdXRoXG4gKiBAYXBpUGVybWlzc2lvbiBtYXN0ZXJcbiAqIEBhcGlIZWFkZXIge1N0cmluZ30gQXV0aG9yaXphdGlvbiBCYXNpYyBhdXRob3JpemF0aW9uIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkLlxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiBNYXN0ZXIgYWNjZXNzX3Rva2VuLlxuICogQGFwaVN1Y2Nlc3MgKFN1Y2Nlc3MgMjAxKSB7U3RyaW5nfSB0b2tlbiBVc2VyIGBhY2Nlc3NfdG9rZW5gIHRvIGJlIHBhc3NlZCB0byBvdGhlciByZXF1ZXN0cy5cbiAqIEBhcGlTdWNjZXNzIChTdWNjZXNzIDIwMSkge09iamVjdH0gdXNlciBDdXJyZW50IHVzZXIncyBkYXRhLlxuICogQGFwaUVycm9yIDQwMSBNYXN0ZXIgYWNjZXNzIG9ubHkgb3IgaW52YWxpZCBjcmVkZW50aWFscy5cbiAqL1xucm91dGVyLnBvc3QoJy8nLFxuICBtYXN0ZXIoKSxcbiAgYmFzaWMoKSxcbiAgbG9naW4pXG5cbi8qKlxuICogQGFwaSB7cG9zdH0gL2F1dGgvZmFjZWJvb2sgQXV0aGVudGljYXRlIHdpdGggRmFjZWJvb2tcbiAqIEBhcGlOYW1lIEF1dGhlbnRpY2F0ZUZhY2Vib29rXG4gKiBAYXBpR3JvdXAgQXV0aFxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiBGYWNlYm9vayB1c2VyIGFjY2Vzc1Rva2VuLlxuICogQGFwaVN1Y2Nlc3MgKFN1Y2Nlc3MgMjAxKSB7U3RyaW5nfSB0b2tlbiBVc2VyIGBhY2Nlc3NfdG9rZW5gIHRvIGJlIHBhc3NlZCB0byBvdGhlciByZXF1ZXN0cy5cbiAqIEBhcGlTdWNjZXNzIChTdWNjZXNzIDIwMSkge09iamVjdH0gdXNlciBDdXJyZW50IHVzZXIncyBkYXRhLlxuICogQGFwaUVycm9yIDQwMSBJbnZhbGlkIGNyZWRlbnRpYWxzLlxuICovXG5yb3V0ZXIucG9zdCgnL2ZhY2Vib29rJyxcbiAgZmFjZWJvb2soKSxcbiAgbG9naW4pXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlclxuIl19