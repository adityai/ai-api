'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.User = undefined;

var _user = require('./user.model');

Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _user.schema;
  }
});

var _express = require('express');

var _querymen = require('querymen');

var _bodymen = require('bodymen');

var _passport = require('../../services/passport');

var _user2 = require('./user.controller');

var _user3 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.User = _user3.default;


var router = new _express.Router();
var _schema$tree = _user.schema.tree;
var email = _schema$tree.email;
var password = _schema$tree.password;
var name = _schema$tree.name;
var picture = _schema$tree.picture;
var role = _schema$tree.role;

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */

router.get('/', (0, _passport.session)({ required: true, roles: ['admin'] }), (0, _querymen.middleware)(), _user2.index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me', (0, _passport.session)({ required: true }), _user2.showMe);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id', _user2.show);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/', (0, _passport.master)(), (0, _bodymen.middleware)({ email: email, password: password, name: name, picture: picture, role: role }), _user2.create);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id', (0, _passport.session)({ required: true }), (0, _bodymen.middleware)({ name: name, picture: picture }), _user2.update);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password', (0, _passport.basic)(), (0, _bodymen.middleware)({ password: password }), _user2.updatePassword);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id', (0, _passport.session)({ required: true, roles: ['admin'] }), _user2.destroy);

exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvdXNlci91c2VyLnJvdXRlci5qcyJdLCJuYW1lcyI6WyJzY2hlbWEiLCJVc2VyIiwicm91dGVyIiwidHJlZSIsImVtYWlsIiwicGFzc3dvcmQiLCJuYW1lIiwicGljdHVyZSIsInJvbGUiLCJnZXQiLCJyZXF1aXJlZCIsInJvbGVzIiwicG9zdCIsInB1dCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOzs7OztpQkFDZUEsTTs7OztBQU5mOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7UUFFT0MsSTs7O0FBRVAsSUFBTUMsU0FBUyxxQkFBZjttQkFDaUQsYUFBT0MsSTtJQUFoREMsSyxnQkFBQUEsSztJQUFPQyxRLGdCQUFBQSxRO0lBQVVDLEksZ0JBQUFBLEk7SUFBTUMsTyxnQkFBQUEsTztJQUFTQyxJLGdCQUFBQSxJOztBQUV4Qzs7Ozs7Ozs7Ozs7O0FBV0FOLE9BQU9PLEdBQVAsQ0FBVyxHQUFYLEVBQ0UsdUJBQVEsRUFBRUMsVUFBVSxJQUFaLEVBQWtCQyxPQUFPLENBQUMsT0FBRCxDQUF6QixFQUFSLENBREYsRUFFRSwyQkFGRjs7QUFLQTs7Ozs7Ozs7QUFRQVQsT0FBT08sR0FBUCxDQUFXLEtBQVgsRUFDRSx1QkFBUSxFQUFFQyxVQUFVLElBQVosRUFBUixDQURGOztBQUlBOzs7Ozs7OztBQVFBUixPQUFPTyxHQUFQLENBQVcsTUFBWDs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQVAsT0FBT1UsSUFBUCxDQUFZLEdBQVosRUFDRSx1QkFERixFQUVFLHlCQUFLLEVBQUVSLFlBQUYsRUFBU0Msa0JBQVQsRUFBbUJDLFVBQW5CLEVBQXlCQyxnQkFBekIsRUFBa0NDLFVBQWxDLEVBQUwsQ0FGRjs7QUFLQTs7Ozs7Ozs7Ozs7OztBQWFBTixPQUFPVyxHQUFQLENBQVcsTUFBWCxFQUNFLHVCQUFRLEVBQUVILFVBQVUsSUFBWixFQUFSLENBREYsRUFFRSx5QkFBSyxFQUFFSixVQUFGLEVBQVFDLGdCQUFSLEVBQUwsQ0FGRjs7QUFLQTs7Ozs7Ozs7Ozs7QUFXQUwsT0FBT1csR0FBUCxDQUFXLGVBQVgsRUFDRSxzQkFERixFQUVFLHlCQUFLLEVBQUVSLGtCQUFGLEVBQUwsQ0FGRjs7QUFLQTs7Ozs7Ozs7OztBQVVBSCxPQUFPWSxNQUFQLENBQWMsTUFBZCxFQUNFLHVCQUFRLEVBQUVKLFVBQVUsSUFBWixFQUFrQkMsT0FBTyxDQUFDLE9BQUQsQ0FBekIsRUFBUixDQURGOztrQkFJZVQsTSIsImZpbGUiOiJ1c2VyLnJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgeyBtaWRkbGV3YXJlIGFzIHF1ZXJ5IH0gZnJvbSAncXVlcnltZW4nXG5pbXBvcnQgeyBtaWRkbGV3YXJlIGFzIGJvZHkgfSBmcm9tICdib2R5bWVuJ1xuaW1wb3J0IHsgYmFzaWMsIG1hc3Rlciwgc2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Bhc3Nwb3J0J1xuaW1wb3J0IHsgaW5kZXgsIHNob3dNZSwgc2hvdywgY3JlYXRlLCB1cGRhdGUsIHVwZGF0ZVBhc3N3b3JkLCBkZXN0cm95IH0gZnJvbSAnLi91c2VyLmNvbnRyb2xsZXInXG5pbXBvcnQgeyBzY2hlbWEgfSBmcm9tICcuL3VzZXIubW9kZWwnXG5leHBvcnQgVXNlciwgeyBzY2hlbWEgfSBmcm9tICcuL3VzZXIubW9kZWwnXG5cbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKVxuY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG5hbWUsIHBpY3R1cmUsIHJvbGUgfSA9IHNjaGVtYS50cmVlXG5cbi8qKlxuICogQGFwaSB7Z2V0fSAvdXNlcnMgUmV0cmlldmUgdXNlcnNcbiAqIEBhcGlOYW1lIFJldHJpZXZlVXNlcnNcbiAqIEBhcGlHcm91cCBVc2VyXG4gKiBAYXBpUGVybWlzc2lvbiBhZG1pblxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiBVc2VyIGFjY2Vzc190b2tlbi5cbiAqIEBhcGlVc2UgbGlzdFBhcmFtc1xuICogQGFwaVN1Y2Nlc3Mge09iamVjdFtdfSB1c2VycyBMaXN0IG9mIHVzZXJzLlxuICogQGFwaUVycm9yIHtPYmplY3R9IDQwMCBTb21lIHBhcmFtZXRlcnMgbWF5IGNvbnRhaW4gaW52YWxpZCB2YWx1ZXMuXG4gKiBAYXBpRXJyb3IgNDAxIEFkbWluIGFjY2VzcyBvbmx5LlxuICovXG5yb3V0ZXIuZ2V0KCcvJyxcbiAgc2Vzc2lvbih7IHJlcXVpcmVkOiB0cnVlLCByb2xlczogWydhZG1pbiddIH0pLFxuICBxdWVyeSgpLFxuICBpbmRleClcblxuLyoqXG4gKiBAYXBpIHtnZXR9IC91c2Vycy9tZSBSZXRyaWV2ZSBjdXJyZW50IHVzZXJcbiAqIEBhcGlOYW1lIFJldHJpZXZlQ3VycmVudFVzZXJcbiAqIEBhcGlHcm91cCBVc2VyXG4gKiBAYXBpUGVybWlzc2lvbiB1c2VyXG4gKiBAYXBpUGFyYW0ge1N0cmluZ30gYWNjZXNzX3Rva2VuIFVzZXIgYWNjZXNzX3Rva2VuLlxuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gdXNlciBVc2VyJ3MgZGF0YS5cbiAqL1xucm91dGVyLmdldCgnL21lJyxcbiAgc2Vzc2lvbih7IHJlcXVpcmVkOiB0cnVlIH0pLFxuICBzaG93TWUpXG5cbi8qKlxuICogQGFwaSB7Z2V0fSAvdXNlcnMvOmlkIFJldHJpZXZlIHVzZXJcbiAqIEBhcGlOYW1lIFJldHJpZXZlVXNlclxuICogQGFwaUdyb3VwIFVzZXJcbiAqIEBhcGlQZXJtaXNzaW9uIHB1YmxpY1xuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gdXNlciBVc2VyJ3MgZGF0YS5cbiAqIEBhcGlFcnJvciA0MDQgVXNlciBub3QgZm91bmQuXG4gKi9cbnJvdXRlci5nZXQoJy86aWQnLFxuICBzaG93KVxuXG4vKipcbiAqIEBhcGkge3Bvc3R9IC91c2VycyBDcmVhdGUgdXNlclxuICogQGFwaU5hbWUgQ3JlYXRlVXNlclxuICogQGFwaUdyb3VwIFVzZXJcbiAqIEBhcGlQZXJtaXNzaW9uIG1hc3RlclxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiBNYXN0ZXIgYWNjZXNzX3Rva2VuLlxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGVtYWlsIFVzZXIncyBlbWFpbC5cbiAqIEBhcGlQYXJhbSB7U3RyaW5nezYuLn19IHBhc3N3b3JkIFVzZXIncyBwYXNzd29yZC5cbiAqIEBhcGlQYXJhbSB7U3RyaW5nfSBbbmFtZV0gVXNlcidzIG5hbWUuXG4gKiBAYXBpUGFyYW0ge1N0cmluZ30gW3BpY3R1cmVdIFVzZXIncyBwaWN0dXJlLlxuICogQGFwaVBhcmFtIHtTdHJpbmc9dXNlcixhZG1pbn0gW3JvbGU9dXNlcl0gVXNlcidzIHBpY3R1cmUuXG4gKiBAYXBpU3VjY2VzcyAoU3VjZXNzIDIwMSkge09iamVjdH0gdXNlciBVc2VyJ3MgZGF0YS5cbiAqIEBhcGlFcnJvciB7T2JqZWN0fSA0MDAgU29tZSBwYXJhbWV0ZXJzIG1heSBjb250YWluIGludmFsaWQgdmFsdWVzLlxuICogQGFwaUVycm9yIDQwMSBNYXN0ZXIgYWNjZXNzIG9ubHkuXG4gKiBAYXBpRXJyb3IgNDA5IEVtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZC5cbiAqL1xucm91dGVyLnBvc3QoJy8nLFxuICBtYXN0ZXIoKSxcbiAgYm9keSh7IGVtYWlsLCBwYXNzd29yZCwgbmFtZSwgcGljdHVyZSwgcm9sZSB9KSxcbiAgY3JlYXRlKVxuXG4vKipcbiAqIEBhcGkge3B1dH0gL3VzZXJzLzppZCBVcGRhdGUgdXNlclxuICogQGFwaU5hbWUgVXBkYXRlVXNlclxuICogQGFwaUdyb3VwIFVzZXJcbiAqIEBhcGlQZXJtaXNzaW9uIHVzZXJcbiAqIEBhcGlQYXJhbSB7U3RyaW5nfSBhY2Nlc3NfdG9rZW4gVXNlciBhY2Nlc3NfdG9rZW4uXG4gKiBAYXBpUGFyYW0ge1N0cmluZ30gW25hbWVdIFVzZXIncyBuYW1lLlxuICogQGFwaVBhcmFtIHtTdHJpbmd9IFtwaWN0dXJlXSBVc2VyJ3MgcGljdHVyZS5cbiAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IHVzZXIgVXNlcidzIGRhdGEuXG4gKiBAYXBpRXJyb3Ige09iamVjdH0gNDAwIFNvbWUgcGFyYW1ldGVycyBtYXkgY29udGFpbiBpbnZhbGlkIHZhbHVlcy5cbiAqIEBhcGlFcnJvciA0MDEgQ3VycmVudCB1c2VyIG9yIGFkbWluIGFjY2VzcyBvbmx5LlxuICogQGFwaUVycm9yIDQwNCBVc2VyIG5vdCBmb3VuZC5cbiAqL1xucm91dGVyLnB1dCgnLzppZCcsXG4gIHNlc3Npb24oeyByZXF1aXJlZDogdHJ1ZSB9KSxcbiAgYm9keSh7IG5hbWUsIHBpY3R1cmUgfSksXG4gIHVwZGF0ZSlcblxuLyoqXG4gKiBAYXBpIHtwdXR9IC91c2Vycy86aWQvcGFzc3dvcmQgVXBkYXRlIHBhc3N3b3JkXG4gKiBAYXBpTmFtZSBVcGRhdGVQYXNzd29yZFxuICogQGFwaUdyb3VwIFVzZXJcbiAqIEBhcGlIZWFkZXIge1N0cmluZ30gQXV0aG9yaXphdGlvbiBCYXNpYyBhdXRob3JpemF0aW9uIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkLlxuICogQGFwaVBhcmFtIHtTdHJpbmd7Ni4ufX0gcGFzc3dvcmQgVXNlcidzIG5ldyBwYXNzd29yZC5cbiAqIEBhcGlTdWNjZXNzIChTdWNjZXNzIDIwMSkge09iamVjdH0gdXNlciBVc2VyJ3MgZGF0YS5cbiAqIEBhcGlFcnJvciB7T2JqZWN0fSA0MDAgU29tZSBwYXJhbWV0ZXJzIG1heSBjb250YWluIGludmFsaWQgdmFsdWVzLlxuICogQGFwaUVycm9yIDQwMSBDdXJyZW50IHVzZXIgYWNjZXNzIG9ubHkuXG4gKiBAYXBpRXJyb3IgNDA0IFVzZXIgbm90IGZvdW5kLlxuICovXG5yb3V0ZXIucHV0KCcvOmlkL3Bhc3N3b3JkJyxcbiAgYmFzaWMoKSxcbiAgYm9keSh7IHBhc3N3b3JkIH0pLFxuICB1cGRhdGVQYXNzd29yZClcblxuLyoqXG4gKiBAYXBpIHtkZWxldGV9IC91c2Vycy86aWQgRGVsZXRlIHVzZXJcbiAqIEBhcGlOYW1lIERlbGV0ZVVzZXJcbiAqIEBhcGlHcm91cCBVc2VyXG4gKiBAYXBpUGVybWlzc2lvbiBhZG1pblxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiBVc2VyIGFjY2Vzc190b2tlbi5cbiAqIEBhcGlTdWNjZXNzIChTdWNjZXNzIDIwNCkgMjA0IE5vIENvbnRlbnQuXG4gKiBAYXBpRXJyb3IgNDAxIEFkbWluIGFjY2VzcyBvbmx5LlxuICogQGFwaUVycm9yIDQwNCBVc2VyIG5vdCBmb3VuZC5cbiAqL1xucm91dGVyLmRlbGV0ZSgnLzppZCcsXG4gIHNlc3Npb24oeyByZXF1aXJlZDogdHJ1ZSwgcm9sZXM6IFsnYWRtaW4nXSB9KSxcbiAgZGVzdHJveSlcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyXG4iXX0=