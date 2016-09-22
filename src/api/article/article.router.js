'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.Article = undefined;

var _article = require('./article.model');

Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _article.schema;
  }
});

var _express = require('express');

var _querymen = require('querymen');

var _bodymen = require('bodymen');

var _passport = require('../../services/passport');

var _article2 = require('./article.controller');

var _article3 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Article = _article3.default;


var router = new _express.Router();
var _schema$tree = _article.schema.tree;
var title = _schema$tree.title;
var content = _schema$tree.content;

/**
 * @api {post} /articles Create article
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 user access only.
 */

router.post('/', (0, _passport.session)({ required: true }), (0, _bodymen.middleware)({ title: title, content: content }), _article2.create);

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiUse listParams
 * @apiSuccess {Object[]} articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', (0, _querymen.middleware)(), _article2.index);

/**
 * @api {get} /articles/:id Retrieve article
 * @apiName RetrieveArticle
 * @apiGroup Article
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 */
router.get('/:id', _article2.show);

/**
 * @api {put} /articles/:id Update article
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Article's title.
 * @apiParam content Article's content.
 * @apiSuccess {Object} article Article's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Article not found.
 * @apiError 401 user access only.
 */
router.put('/:id', (0, _passport.session)({ required: true }), (0, _bodymen.middleware)({ title: title, content: content }), _article2.update);

/**
 * @api {delete} /articles/:id Delete article
 * @apiName DeleteArticle
 * @apiGroup Article
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Article not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', (0, _passport.session)({ required: true }), _article2.destroy);

exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXJ0aWNsZS9hcnRpY2xlLnJvdXRlci5qcyJdLCJuYW1lcyI6WyJzY2hlbWEiLCJBcnRpY2xlIiwicm91dGVyIiwidHJlZSIsInRpdGxlIiwiY29udGVudCIsInBvc3QiLCJyZXF1aXJlZCIsImdldCIsInB1dCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOzs7OztvQkFDa0JBLE07Ozs7QUFObEI7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztRQUVPQyxPOzs7QUFFUCxJQUFNQyxTQUFTLHFCQUFmO21CQUMyQixnQkFBT0MsSTtJQUExQkMsSyxnQkFBQUEsSztJQUFPQyxPLGdCQUFBQSxPOztBQUVmOzs7Ozs7Ozs7Ozs7OztBQWFBSCxPQUFPSSxJQUFQLENBQVksR0FBWixFQUNFLHVCQUFRLEVBQUVDLFVBQVUsSUFBWixFQUFSLENBREYsRUFFRSx5QkFBSyxFQUFFSCxZQUFGLEVBQVNDLGdCQUFULEVBQUwsQ0FGRjs7QUFLQTs7Ozs7Ozs7QUFRQUgsT0FBT00sR0FBUCxDQUFXLEdBQVgsRUFDRSwyQkFERjs7QUFJQTs7Ozs7Ozs7QUFRQU4sT0FBT00sR0FBUCxDQUFXLE1BQVg7O0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFhQU4sT0FBT08sR0FBUCxDQUFXLE1BQVgsRUFDRSx1QkFBUSxFQUFFRixVQUFVLElBQVosRUFBUixDQURGLEVBRUUseUJBQUssRUFBRUgsWUFBRixFQUFTQyxnQkFBVCxFQUFMLENBRkY7O0FBS0E7Ozs7Ozs7Ozs7QUFVQUgsT0FBT1EsTUFBUCxDQUFjLE1BQWQsRUFDRSx1QkFBUSxFQUFFSCxVQUFVLElBQVosRUFBUixDQURGOztrQkFJZUwsTSIsImZpbGUiOiJhcnRpY2xlLnJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgeyBtaWRkbGV3YXJlIGFzIHF1ZXJ5IH0gZnJvbSAncXVlcnltZW4nXG5pbXBvcnQgeyBtaWRkbGV3YXJlIGFzIGJvZHkgfSBmcm9tICdib2R5bWVuJ1xuaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Bhc3Nwb3J0J1xuaW1wb3J0IHsgY3JlYXRlLCBpbmRleCwgc2hvdywgdXBkYXRlLCBkZXN0cm95IH0gZnJvbSAnLi9hcnRpY2xlLmNvbnRyb2xsZXInXG5pbXBvcnQgeyBzY2hlbWEgfSBmcm9tICcuL2FydGljbGUubW9kZWwnXG5leHBvcnQgQXJ0aWNsZSwgeyBzY2hlbWEgfSBmcm9tICcuL2FydGljbGUubW9kZWwnXG5cbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKVxuY29uc3QgeyB0aXRsZSwgY29udGVudCB9ID0gc2NoZW1hLnRyZWVcblxuLyoqXG4gKiBAYXBpIHtwb3N0fSAvYXJ0aWNsZXMgQ3JlYXRlIGFydGljbGVcbiAqIEBhcGlOYW1lIENyZWF0ZUFydGljbGVcbiAqIEBhcGlHcm91cCBBcnRpY2xlXG4gKiBAYXBpUGVybWlzc2lvbiB1c2VyXG4gKiBAYXBpUGFyYW0ge1N0cmluZ30gYWNjZXNzX3Rva2VuIHVzZXIgYWNjZXNzIHRva2VuLlxuICogQGFwaVBhcmFtIHRpdGxlIEFydGljbGUncyB0aXRsZS5cbiAqIEBhcGlQYXJhbSBjb250ZW50IEFydGljbGUncyBjb250ZW50LlxuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gYXJ0aWNsZSBBcnRpY2xlJ3MgZGF0YS5cbiAqIEBhcGlFcnJvciB7T2JqZWN0fSA0MDAgU29tZSBwYXJhbWV0ZXJzIG1heSBjb250YWluIGludmFsaWQgdmFsdWVzLlxuICogQGFwaUVycm9yIDQwNCBBcnRpY2xlIG5vdCBmb3VuZC5cbiAqIEBhcGlFcnJvciA0MDEgdXNlciBhY2Nlc3Mgb25seS5cbiAqL1xucm91dGVyLnBvc3QoJy8nLFxuICBzZXNzaW9uKHsgcmVxdWlyZWQ6IHRydWUgfSksXG4gIGJvZHkoeyB0aXRsZSwgY29udGVudCB9KSxcbiAgY3JlYXRlKVxuXG4vKipcbiAqIEBhcGkge2dldH0gL2FydGljbGVzIFJldHJpZXZlIGFydGljbGVzXG4gKiBAYXBpTmFtZSBSZXRyaWV2ZUFydGljbGVzXG4gKiBAYXBpR3JvdXAgQXJ0aWNsZVxuICogQGFwaVVzZSBsaXN0UGFyYW1zXG4gKiBAYXBpU3VjY2VzcyB7T2JqZWN0W119IGFydGljbGVzIExpc3Qgb2YgYXJ0aWNsZXMuXG4gKiBAYXBpRXJyb3Ige09iamVjdH0gNDAwIFNvbWUgcGFyYW1ldGVycyBtYXkgY29udGFpbiBpbnZhbGlkIHZhbHVlcy5cbiAqL1xucm91dGVyLmdldCgnLycsXG4gIHF1ZXJ5KCksXG4gIGluZGV4KVxuXG4vKipcbiAqIEBhcGkge2dldH0gL2FydGljbGVzLzppZCBSZXRyaWV2ZSBhcnRpY2xlXG4gKiBAYXBpTmFtZSBSZXRyaWV2ZUFydGljbGVcbiAqIEBhcGlHcm91cCBBcnRpY2xlXG4gKiBAYXBpU3VjY2VzcyB7T2JqZWN0fSBhcnRpY2xlIEFydGljbGUncyBkYXRhLlxuICogQGFwaUVycm9yIHtPYmplY3R9IDQwMCBTb21lIHBhcmFtZXRlcnMgbWF5IGNvbnRhaW4gaW52YWxpZCB2YWx1ZXMuXG4gKiBAYXBpRXJyb3IgNDA0IEFydGljbGUgbm90IGZvdW5kLlxuICovXG5yb3V0ZXIuZ2V0KCcvOmlkJyxcbiAgc2hvdylcblxuLyoqXG4gKiBAYXBpIHtwdXR9IC9hcnRpY2xlcy86aWQgVXBkYXRlIGFydGljbGVcbiAqIEBhcGlOYW1lIFVwZGF0ZUFydGljbGVcbiAqIEBhcGlHcm91cCBBcnRpY2xlXG4gKiBAYXBpUGVybWlzc2lvbiB1c2VyXG4gKiBAYXBpUGFyYW0ge1N0cmluZ30gYWNjZXNzX3Rva2VuIHVzZXIgYWNjZXNzIHRva2VuLlxuICogQGFwaVBhcmFtIHRpdGxlIEFydGljbGUncyB0aXRsZS5cbiAqIEBhcGlQYXJhbSBjb250ZW50IEFydGljbGUncyBjb250ZW50LlxuICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gYXJ0aWNsZSBBcnRpY2xlJ3MgZGF0YS5cbiAqIEBhcGlFcnJvciB7T2JqZWN0fSA0MDAgU29tZSBwYXJhbWV0ZXJzIG1heSBjb250YWluIGludmFsaWQgdmFsdWVzLlxuICogQGFwaUVycm9yIDQwNCBBcnRpY2xlIG5vdCBmb3VuZC5cbiAqIEBhcGlFcnJvciA0MDEgdXNlciBhY2Nlc3Mgb25seS5cbiAqL1xucm91dGVyLnB1dCgnLzppZCcsXG4gIHNlc3Npb24oeyByZXF1aXJlZDogdHJ1ZSB9KSxcbiAgYm9keSh7IHRpdGxlLCBjb250ZW50IH0pLFxuICB1cGRhdGUpXG5cbi8qKlxuICogQGFwaSB7ZGVsZXRlfSAvYXJ0aWNsZXMvOmlkIERlbGV0ZSBhcnRpY2xlXG4gKiBAYXBpTmFtZSBEZWxldGVBcnRpY2xlXG4gKiBAYXBpR3JvdXAgQXJ0aWNsZVxuICogQGFwaVBlcm1pc3Npb24gdXNlclxuICogQGFwaVBhcmFtIHtTdHJpbmd9IGFjY2Vzc190b2tlbiB1c2VyIGFjY2VzcyB0b2tlbi5cbiAqIEBhcGlTdWNjZXNzIChTdWNjZXNzIDIwNCkgMjA0IE5vIENvbnRlbnQuXG4gKiBAYXBpRXJyb3IgNDA0IEFydGljbGUgbm90IGZvdW5kLlxuICogQGFwaUVycm9yIDQwMSB1c2VyIGFjY2VzcyBvbmx5LlxuICovXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJyxcbiAgc2Vzc2lvbih7IHJlcXVpcmVkOiB0cnVlIH0pLFxuICBkZXN0cm95KVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXJcbiJdfQ==