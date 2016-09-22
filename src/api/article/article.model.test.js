'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _mockgoose = require('mockgoose');

var _mockgoose2 = _interopRequireDefault(_mockgoose);

var _mongoose = require('../../config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ = require('.');

var _user = require('../user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.beforeEach(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(t) {
    var mongo, Article, User, user, article;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongo = new _mongoose2.default.Mongoose();
            _context.next = 3;
            return (0, _mockgoose2.default)(mongo);

          case 3:
            _context.next = 5;
            return mongo.connect('');

          case 5:
            Article = mongo.model('Article', _.schema);
            User = mongo.model('User', _user.schema);
            _context.next = 9;
            return User.create({ email: 'a@a.com', password: '123456' });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return Article.create({ user: user, title: 'test', content: 'test' });

          case 12:
            article = _context.sent;


            t.context = (0, _extends3.default)({}, t.context, { Article: Article, article: article, user: user });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_ava2.default.cb.after.always(function (t) {
  _mockgoose2.default.reset(t.end);
});

(0, _ava2.default)('view', function (t) {
  var _t$context = t.context;
  var article = _t$context.article;
  var user = _t$context.user;

  var view = article.view();
  t.true((typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)) === 'object');
  t.true(view.id === article.id);
  t.true((0, _typeof3.default)(view.user) === 'object');
  t.true(view.user.id === user.id);
  t.true(view.title === article.title);
  t.true(view.content === article.content);
  t.truthy(view.createdAt);
  t.truthy(view.updatedAt);
});

(0, _ava2.default)('full view', function (t) {
  var _t$context2 = t.context;
  var article = _t$context2.article;
  var user = _t$context2.user;

  var view = article.view(true);
  t.true((typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)) === 'object');
  t.true(view.id === article.id);
  t.true((0, _typeof3.default)(view.user) === 'object');
  t.true(view.user.id === user.id);
  t.true(view.title === article.title);
  t.true(view.content === article.content);
  t.truthy(view.createdAt);
  t.truthy(view.updatedAt);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXJ0aWNsZS9hcnRpY2xlLm1vZGVsLnRlc3QuanMiXSwibmFtZXMiOlsiYmVmb3JlRWFjaCIsInQiLCJtb25nbyIsIk1vbmdvb3NlIiwiY29ubmVjdCIsIkFydGljbGUiLCJtb2RlbCIsIlVzZXIiLCJjcmVhdGUiLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlciIsInRpdGxlIiwiY29udGVudCIsImFydGljbGUiLCJjb250ZXh0IiwiY2IiLCJhZnRlciIsImFsd2F5cyIsInJlc2V0IiwiZW5kIiwidmlldyIsInRydWUiLCJpZCIsInRydXRoeSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxjQUFLQSxVQUFMO0FBQUEsd0VBQWdCLGlCQUFPQyxDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNSQyxpQkFEUSxHQUNBLElBQUksbUJBQVNDLFFBQWIsRUFEQTtBQUFBO0FBQUEsbUJBRVIseUJBQVVELEtBQVYsQ0FGUTs7QUFBQTtBQUFBO0FBQUEsbUJBR1JBLE1BQU1FLE9BQU4sQ0FBYyxFQUFkLENBSFE7O0FBQUE7QUFJUkMsbUJBSlEsR0FJRUgsTUFBTUksS0FBTixDQUFZLFNBQVosV0FKRjtBQUtSQyxnQkFMUSxHQUtETCxNQUFNSSxLQUFOLENBQVksTUFBWixlQUxDO0FBQUE7QUFBQSxtQkFNS0MsS0FBS0MsTUFBTCxDQUFZLEVBQUVDLE9BQU8sU0FBVCxFQUFvQkMsVUFBVSxRQUE5QixFQUFaLENBTkw7O0FBQUE7QUFNUkMsZ0JBTlE7QUFBQTtBQUFBLG1CQU9RTixRQUFRRyxNQUFSLENBQWUsRUFBRUcsVUFBRixFQUFRQyxPQUFPLE1BQWYsRUFBdUJDLFNBQVMsTUFBaEMsRUFBZixDQVBSOztBQUFBO0FBT1JDLG1CQVBROzs7QUFTZGIsY0FBRWMsT0FBRiw4QkFBaUJkLEVBQUVjLE9BQW5CLElBQTRCVixnQkFBNUIsRUFBcUNTLGdCQUFyQyxFQUE4Q0gsVUFBOUM7O0FBVGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBaEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBWUEsY0FBS0ssRUFBTCxDQUFRQyxLQUFSLENBQWNDLE1BQWQsQ0FBcUIsVUFBQ2pCLENBQUQsRUFBTztBQUMxQixzQkFBVWtCLEtBQVYsQ0FBZ0JsQixFQUFFbUIsR0FBbEI7QUFDRCxDQUZEOztBQUlBLG1CQUFLLE1BQUwsRUFBYSxVQUFDbkIsQ0FBRCxFQUFPO0FBQUEsbUJBQ1FBLEVBQUVjLE9BRFY7QUFBQSxNQUNWRCxPQURVLGNBQ1ZBLE9BRFU7QUFBQSxNQUNESCxJQURDLGNBQ0RBLElBREM7O0FBRWxCLE1BQU1VLE9BQU9QLFFBQVFPLElBQVIsRUFBYjtBQUNBcEIsSUFBRXFCLElBQUYsQ0FBTyxRQUFPRCxJQUFQLHVEQUFPQSxJQUFQLE9BQWdCLFFBQXZCO0FBQ0FwQixJQUFFcUIsSUFBRixDQUFPRCxLQUFLRSxFQUFMLEtBQVlULFFBQVFTLEVBQTNCO0FBQ0F0QixJQUFFcUIsSUFBRixDQUFPLHNCQUFPRCxLQUFLVixJQUFaLE1BQXFCLFFBQTVCO0FBQ0FWLElBQUVxQixJQUFGLENBQU9ELEtBQUtWLElBQUwsQ0FBVVksRUFBVixLQUFpQlosS0FBS1ksRUFBN0I7QUFDQXRCLElBQUVxQixJQUFGLENBQU9ELEtBQUtULEtBQUwsS0FBZUUsUUFBUUYsS0FBOUI7QUFDQVgsSUFBRXFCLElBQUYsQ0FBT0QsS0FBS1IsT0FBTCxLQUFpQkMsUUFBUUQsT0FBaEM7QUFDQVosSUFBRXVCLE1BQUYsQ0FBU0gsS0FBS0ksU0FBZDtBQUNBeEIsSUFBRXVCLE1BQUYsQ0FBU0gsS0FBS0ssU0FBZDtBQUNELENBWEQ7O0FBYUEsbUJBQUssV0FBTCxFQUFrQixVQUFDekIsQ0FBRCxFQUFPO0FBQUEsb0JBQ0dBLEVBQUVjLE9BREw7QUFBQSxNQUNmRCxPQURlLGVBQ2ZBLE9BRGU7QUFBQSxNQUNOSCxJQURNLGVBQ05BLElBRE07O0FBRXZCLE1BQU1VLE9BQU9QLFFBQVFPLElBQVIsQ0FBYSxJQUFiLENBQWI7QUFDQXBCLElBQUVxQixJQUFGLENBQU8sUUFBT0QsSUFBUCx1REFBT0EsSUFBUCxPQUFnQixRQUF2QjtBQUNBcEIsSUFBRXFCLElBQUYsQ0FBT0QsS0FBS0UsRUFBTCxLQUFZVCxRQUFRUyxFQUEzQjtBQUNBdEIsSUFBRXFCLElBQUYsQ0FBTyxzQkFBT0QsS0FBS1YsSUFBWixNQUFxQixRQUE1QjtBQUNBVixJQUFFcUIsSUFBRixDQUFPRCxLQUFLVixJQUFMLENBQVVZLEVBQVYsS0FBaUJaLEtBQUtZLEVBQTdCO0FBQ0F0QixJQUFFcUIsSUFBRixDQUFPRCxLQUFLVCxLQUFMLEtBQWVFLFFBQVFGLEtBQTlCO0FBQ0FYLElBQUVxQixJQUFGLENBQU9ELEtBQUtSLE9BQUwsS0FBaUJDLFFBQVFELE9BQWhDO0FBQ0FaLElBQUV1QixNQUFGLENBQVNILEtBQUtJLFNBQWQ7QUFDQXhCLElBQUV1QixNQUFGLENBQVNILEtBQUtLLFNBQWQ7QUFDRCxDQVhEIiwiZmlsZSI6ImFydGljbGUubW9kZWwudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSdcbmltcG9ydCBtb2NrZ29vc2UgZnJvbSAnbW9ja2dvb3NlJ1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJy4uLy4uL2NvbmZpZy9tb25nb29zZSdcbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJy4nXG5pbXBvcnQgeyBzY2hlbWEgYXMgdXNlclNjaGVtYSB9IGZyb20gJy4uL3VzZXInXG5cbnRlc3QuYmVmb3JlRWFjaChhc3luYyAodCkgPT4ge1xuICBjb25zdCBtb25nbyA9IG5ldyBtb25nb29zZS5Nb25nb29zZSgpXG4gIGF3YWl0IG1vY2tnb29zZShtb25nbylcbiAgYXdhaXQgbW9uZ28uY29ubmVjdCgnJylcbiAgY29uc3QgQXJ0aWNsZSA9IG1vbmdvLm1vZGVsKCdBcnRpY2xlJywgc2NoZW1hKVxuICBjb25zdCBVc2VyID0gbW9uZ28ubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKVxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoeyBlbWFpbDogJ2FAYS5jb20nLCBwYXNzd29yZDogJzEyMzQ1NicgfSlcbiAgY29uc3QgYXJ0aWNsZSA9IGF3YWl0IEFydGljbGUuY3JlYXRlKHsgdXNlciwgdGl0bGU6ICd0ZXN0JywgY29udGVudDogJ3Rlc3QnIH0pXG5cbiAgdC5jb250ZXh0ID0geyAuLi50LmNvbnRleHQsIEFydGljbGUsIGFydGljbGUsIHVzZXIgfVxufSlcblxudGVzdC5jYi5hZnRlci5hbHdheXMoKHQpID0+IHtcbiAgbW9ja2dvb3NlLnJlc2V0KHQuZW5kKVxufSlcblxudGVzdCgndmlldycsICh0KSA9PiB7XG4gIGNvbnN0IHsgYXJ0aWNsZSwgdXNlciB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IHZpZXcgPSBhcnRpY2xlLnZpZXcoKVxuICB0LnRydWUodHlwZW9mIHZpZXcgPT09ICdvYmplY3QnKVxuICB0LnRydWUodmlldy5pZCA9PT0gYXJ0aWNsZS5pZClcbiAgdC50cnVlKHR5cGVvZiB2aWV3LnVzZXIgPT09ICdvYmplY3QnKVxuICB0LnRydWUodmlldy51c2VyLmlkID09PSB1c2VyLmlkKVxuICB0LnRydWUodmlldy50aXRsZSA9PT0gYXJ0aWNsZS50aXRsZSlcbiAgdC50cnVlKHZpZXcuY29udGVudCA9PT0gYXJ0aWNsZS5jb250ZW50KVxuICB0LnRydXRoeSh2aWV3LmNyZWF0ZWRBdClcbiAgdC50cnV0aHkodmlldy51cGRhdGVkQXQpXG59KVxuXG50ZXN0KCdmdWxsIHZpZXcnLCAodCkgPT4ge1xuICBjb25zdCB7IGFydGljbGUsIHVzZXIgfSA9IHQuY29udGV4dFxuICBjb25zdCB2aWV3ID0gYXJ0aWNsZS52aWV3KHRydWUpXG4gIHQudHJ1ZSh0eXBlb2YgdmlldyA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZSh2aWV3LmlkID09PSBhcnRpY2xlLmlkKVxuICB0LnRydWUodHlwZW9mIHZpZXcudXNlciA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZSh2aWV3LnVzZXIuaWQgPT09IHVzZXIuaWQpXG4gIHQudHJ1ZSh2aWV3LnRpdGxlID09PSBhcnRpY2xlLnRpdGxlKVxuICB0LnRydWUodmlldy5jb250ZW50ID09PSBhcnRpY2xlLmNvbnRlbnQpXG4gIHQudHJ1dGh5KHZpZXcuY3JlYXRlZEF0KVxuICB0LnRydXRoeSh2aWV3LnVwZGF0ZWRBdClcbn0pXG4iXX0=