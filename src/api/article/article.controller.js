'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.index = exports.create = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _response = require('../../services/response/');

var _2 = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref, res, next) {
  var user = _ref.user;
  var body = _ref.bodymen.body;
  return _2.Article.create((0, _extends3.default)({}, body, { user: user })).then(function (article) {
    return article.view(true);
  }).then((0, _response.success)(res, 201)).catch(next);
};

var index = exports.index = function index(_ref2, res, next) {
  var _ref2$querymen = _ref2.querymen;
  var query = _ref2$querymen.query;
  var select = _ref2$querymen.select;
  var cursor = _ref2$querymen.cursor;
  return _2.Article.find(query, select, cursor).then(function (articles) {
    return articles.map(function (article) {
      return article.view();
    });
  }).then((0, _response.success)(res)).catch(next);
};

var show = exports.show = function show(_ref3, res, next) {
  var params = _ref3.params;
  return _2.Article.findById(params.id).then((0, _response.notFound)(res)).then(function (article) {
    return article ? article.view() : null;
  }).then((0, _response.success)(res)).catch(next);
};

var update = exports.update = function update(_ref4, res, next) {
  var user = _ref4.user;
  var body = _ref4.bodymen.body;
  var params = _ref4.params;
  return _2.Article.findById(params.id).then((0, _response.notFound)(res)).then(function (article) {
    if (!article) return null;
    var isAdmin = user.role === 'admin';
    var isSameUser = article.user.equals(user.id);
    if (!isSameUser && !isAdmin) {
      res.status(401).end();
      return null;
    }
    return article;
  }).then(function (article) {
    return article ? _lodash2.default.merge(article, body).save() : null;
  }).then(function (article) {
    return article ? article.view(true) : null;
  }).then((0, _response.success)(res)).catch(next);
};

var destroy = exports.destroy = function destroy(_ref5, res, next) {
  var user = _ref5.user;
  var params = _ref5.params;
  return _2.Article.findById(params.id).then((0, _response.notFound)(res)).then(function (article) {
    if (!article) return null;
    var isAdmin = user.role === 'admin';
    var isSameUser = article.user.equals(user.id);
    if (!isSameUser && !isAdmin) {
      res.status(401).end();
      return null;
    }
    return article;
  }).then(function (article) {
    return article ? article.remove() : null;
  }).then((0, _response.success)(res, 204)).catch(next);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXJ0aWNsZS9hcnRpY2xlLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwicmVzIiwibmV4dCIsInVzZXIiLCJib2R5IiwiYm9keW1lbiIsInRoZW4iLCJhcnRpY2xlIiwidmlldyIsImNhdGNoIiwiaW5kZXgiLCJxdWVyeW1lbiIsInF1ZXJ5Iiwic2VsZWN0IiwiY3Vyc29yIiwiZmluZCIsImFydGljbGVzIiwibWFwIiwic2hvdyIsInBhcmFtcyIsImZpbmRCeUlkIiwiaWQiLCJ1cGRhdGUiLCJpc0FkbWluIiwicm9sZSIsImlzU2FtZVVzZXIiLCJlcXVhbHMiLCJzdGF0dXMiLCJlbmQiLCJtZXJnZSIsInNhdmUiLCJkZXN0cm95IiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSwwQkFBUyxTQUFUQSxNQUFTLE9BQThCQyxHQUE5QixFQUFtQ0MsSUFBbkM7QUFBQSxNQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxNQUFvQkMsSUFBcEIsUUFBU0MsT0FBVCxDQUFvQkQsSUFBcEI7QUFBQSxTQUNwQixXQUFRSixNQUFSLDRCQUFvQkksSUFBcEIsSUFBMEJELFVBQTFCLEtBQ0dHLElBREgsQ0FDUSxVQUFDQyxPQUFEO0FBQUEsV0FBYUEsUUFBUUMsSUFBUixDQUFhLElBQWIsQ0FBYjtBQUFBLEdBRFIsRUFFR0YsSUFGSCxDQUVRLHVCQUFRTCxHQUFSLEVBQWEsR0FBYixDQUZSLEVBR0dRLEtBSEgsQ0FHU1AsSUFIVCxDQURvQjtBQUFBLENBQWY7O0FBTUEsSUFBTVEsd0JBQVEsU0FBUkEsS0FBUSxRQUEwQ1QsR0FBMUMsRUFBK0NDLElBQS9DO0FBQUEsNkJBQUdTLFFBQUg7QUFBQSxNQUFlQyxLQUFmLGtCQUFlQSxLQUFmO0FBQUEsTUFBc0JDLE1BQXRCLGtCQUFzQkEsTUFBdEI7QUFBQSxNQUE4QkMsTUFBOUIsa0JBQThCQSxNQUE5QjtB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QnRCLFVBQUkwQixNQUFKLENBQVcsR0FBWCxFQUFnQkMsR0FBaEI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNELFdBQU9yQixPQUFQO0FBQ0QsR0FYSCxFQVlHRCxJQVpILENBWVEsVUFBQ0MsT0FBRDtBQUFBLFdBQWFBLFVBQVVBLFFBQVF5QixNQUFSLEVBQVYsR0FBNkIsSUFBMUM7QUFBQSxHQVpSLEVBYUcxQixJQWJILENBYVEsdUJBQVFMLEdBQVIsRUFBYSxHQUFiLENBYlIsRUFjR1EsS0FkSCxDQWNTUCxJQWRULENBRHFCO0FBQUEsQ0FBaEIiLCJmaWxlIjoiYXJ0aWNsZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgc3VjY2Vzcywgbm90Rm91bmQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZXNwb25zZS8nXG5pbXBvcnQgeyBBcnRpY2xlIH0gZnJvbSAnLidcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7IHVzZXIsIGJvZHltZW46IHsgYm9keSB9IH0sIHJlcywgbmV4dCkgPT5cbiAgQXJ0aWNsZS5jcmVhdGUoeyAuLi5ib2R5LCB1c2VyIH0pXG4gICAgLnRoZW4oKGFydGljbGUpID0+IGFydGljbGUudmlldyh0cnVlKSlcbiAgICAudGhlbihzdWNjZXNzKHJlcywgMjAxKSlcbiAgICAuY2F0Y2gobmV4dClcblxuZXhwb3J0IGNvbnN0IGluZGV4ID0gKHsgcXVlcnltZW46IHsgcXVlcnksIHNlbGVjdCwgY3Vyc29yIH0gfSwgcmVzLCBuZXh0KSA9PlxuICBBcnRpY2xlLmZpbmQocXVlcnksIHNlbGVjdCwgY3Vyc29yKVxuICAgIC50aGVuKChhcnRpY2xlcykgPT4gYXJ0aWNsZXMubWFwKChhcnRpY2xlKSA9PiBhcnRpY2xlLnZpZXcoKSkpXG4gICAgLnRoZW4oc3VjY2VzcyhyZXMpKVxuICAgIC5jYXRjaChuZXh0KVxuXG5leHBvcnQgY29uc3Qgc2hvdyA9ICh7IHBhcmFtcyB9LCByZXMsIG5leHQpID0+XG4gIEFydGljbGUuZmluZEJ5SWQocGFyYW1zLmlkKVxuICAgIC50aGVuKG5vdEZvdW5kKHJlcykpXG4gICAgLnRoZW4oKGFydGljbGUpID0+IGFydGljbGUgPyBhcnRpY2xlLnZpZXcoKSA6IG51bGwpXG4gICAgLnRoZW4oc3VjY2VzcyhyZXMpKVxuICAgIC5jYXRjaChuZXh0KVxuXG5leHBvcnQgY29uc3QgdXBkYXRlID0gKHsgdXNlciwgYm9keW1lbjogeyBib2R5IH0sIHBhcmFtcyB9LCByZXMsIG5leHQpID0+XG4gIEFydGljbGUuZmluZEJ5SWQocGFyYW1zLmlkKVxuICAgIC50aGVuKG5vdEZvdW5kKHJlcykpXG4gICAgLnRoZW4oKGFydGljbGUpID0+IHtcbiAgICAgIGlmICghYXJ0aWNsZSkgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IGlzQWRtaW4gPSB1c2VyLnJvbGUgPT09ICdhZG1pbidcbiAgICAgIGNvbnN0IGlzU2FtZVVzZXIgPSBhcnRpY2xlLnVzZXIuZXF1YWxzKHVzZXIuaWQpXG4gICAgICBpZiAoIWlzU2FtZVVzZXIgJiYgIWlzQWRtaW4pIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICByZXR1cm4gYXJ0aWNsZVxuICAgIH0pXG4gICAgLnRoZW4oKGFydGljbGUpID0+IGFydGljbGUgPyBfLm1lcmdlKGFydGljbGUsIGJvZHkpLnNhdmUoKSA6IG51bGwpXG4gICAgLnRoZW4oKGFydGljbGUpID0+IGFydGljbGUgPyBhcnRpY2xlLnZpZXcodHJ1ZSkgOiBudWxsKVxuICAgIC50aGVuKHN1Y2Nlc3MocmVzKSlcbiAgICAuY2F0Y2gobmV4dClcblxuZXhwb3J0IGNvbnN0IGRlc3Ryb3kgPSAoeyB1c2VyLCBwYXJhbXMgfSwgcmVzLCBuZXh0KSA9PlxuICBBcnRpY2xlLmZpbmRCeUlkKHBhcmFtcy5pZClcbiAgICAudGhlbihub3RGb3VuZChyZXMpKVxuICAgIC50aGVuKChhcnRpY2xlKSA9PiB7XG4gICAgICBpZiAoIWFydGljbGUpIHJldHVybiBudWxsXG4gICAgICBjb25zdCBpc0FkbWluID0gdXNlci5yb2xlID09PSAnYWRtaW4nXG4gICAgICBjb25zdCBpc1NhbWVVc2VyID0gYXJ0aWNsZS51c2VyLmVxdWFscyh1c2VyLmlkKVxuICAgICAgaWYgKCFpc1NhbWVVc2VyICYmICFpc0FkbWluKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgcmV0dXJuIGFydGljbGVcbiAgICB9KVxuICAgIC50aGVuKChhcnRpY2xlKSA9PiBhcnRpY2xlID8gYXJ0aWNsZS5yZW1vdmUoKSA6IG51bGwpXG4gICAgLnRoZW4oc3VjY2VzcyhyZXMsIDIwNCkpXG4gICAgLmNhdGNoKG5leHQpXG4iXX0=