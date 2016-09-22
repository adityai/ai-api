'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mockgoose = require('mockgoose');

var _mockgoose2 = _interopRequireDefault(_mockgoose);

var _mongoose = require('../../config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.beforeEach(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(t) {
    var mongo, User, user;
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
            User = mongo.model('User', _.schema);
            _context.next = 8;
            return User.create({ name: 'user', email: 'a@a.com', password: '123456' });

          case 8:
            user = _context.sent;


            t.context = (0, _extends3.default)({}, t.context, { User: User, user: user });

          case 10:
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
  var user = t.context.user;

  var fullView = user.view(true);
  t.true(fullView.id === user.id);
  t.true(fullView.name === user.name);
  t.true(fullView.email === user.email);
  t.true(fullView.picture === user.picture);
  t.true(fullView.createdAt === user.createdAt);
});

(0, _ava2.default)('name', function (t) {
  t.context.user.name = '';
  t.context.user.email = 'test@example.com';
  t.true(t.context.user.name === 'test');
});

(0, _ava2.default)('picture', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(t) {
    var user, hash;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = t.context.user;
            hash = _crypto2.default.createHash('md5').update(user.email).digest('hex');

            t.true(user.picture === 'https://gravatar.com/avatar/' + hash + '?d=identicon');

            user.picture = 'test.jpg';
            user.email = 'test@example.com';
            _context2.next = 7;
            return user.save();

          case 7:
            t.true(user.picture === 'test.jpg');

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

(0, _ava2.default)('authenticate', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(t) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = t;
            _context3.next = 3;
            return t.context.user.authenticate('123456');

          case 3:
            _context3.t1 = _context3.sent;

            _context3.t0.truthy.call(_context3.t0, _context3.t1);

            _context3.t2 = t;
            _context3.next = 8;
            return t.context.user.authenticate('blah');

          case 8:
            _context3.t3 = _context3.sent;

            _context3.t2.falsy.call(_context3.t2, _context3.t3);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

(0, _ava2.default)('createFromFacebook', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(t) {
    var _t$context, User, user, fbUser, updatedUser, updatedFbUser, createdFbUser;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _t$context = t.context;
            User = _t$context.User;
            user = _t$context.user;
            fbUser = {
              id: '123',
              name: 'Test Name',
              email: 'test@test.com',
              picture: { data: { url: 'test.jpg' } }
            };
            _context4.next = 6;
            return User.createFromFacebook((0, _extends3.default)({}, fbUser, { email: 'a@a.com' }));

          case 6:
            updatedUser = _context4.sent;

            t.true(updatedUser.id === user.id);
            t.true(updatedUser.facebook.id === fbUser.id);
            t.true(updatedUser.name === fbUser.name);
            t.true(updatedUser.email === user.email);
            t.true(updatedUser.picture === fbUser.picture.data.url);

            _context4.next = 14;
            return User.createFromFacebook(fbUser);

          case 14:
            updatedFbUser = _context4.sent;

            t.true(updatedFbUser.id === user.id);
            t.true(updatedFbUser.facebook.id === fbUser.id);
            t.true(updatedFbUser.name === fbUser.name);
            t.true(updatedFbUser.email === user.email);
            t.true(updatedFbUser.picture === fbUser.picture.data.url);

            _context4.next = 22;
            return User.createFromFacebook((0, _extends3.default)({}, fbUser, { id: '321' }));

          case 22:
            createdFbUser = _context4.sent;

            t.true(createdFbUser.id !== user.id);
            t.true(createdFbUser.facebook.id === '321');
            t.true(createdFbUser.name === fbUser.name);
            t.true(createdFbUser.email === fbUser.email);
            t.true(createdFbUser.picture === fbUser.picture.data.url);

          case 28:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvdXNlci91c2VyLm1vZGVsLnRlc3QuanMiXSwibmFtZXMiOlsiYmVmb3JlRWFjaCIsInQiLCJtb25nbyIsIk1vbmdvb3NlIiwiY29ubmVjdCIsIlVzZXIiLCJtb2RlbCIsImNyZWF0ZSIsIm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlciIsImNvbnRleHQiLCJjYiIsImFmdGVyIiwiYWx3YXlzIiwicmVzZXQiLCJlbmQiLCJmdWxsVmlldyIsInZpZXciLCJ0cnVlIiwiaWQiLCJwaWN0dXJlIiwiY3JlYXRlZEF0IiwiaGFzaCIsImNyZWF0ZUhhc2giLCJ1cGRhdGUiLCJkaWdlc3QiLCJzYXZlIiwiYXV0aGVudGljYXRlIiwidHJ1dGh5IiwiZmFsc3kiLCJmYlVzZXIiLCJkYXRhIiwidXJsIiwiY3JlYXRlRnJvbUZhY2Vib29rIiwidXBkYXRlZFVzZXIiLCJmYWNlYm9vayIsInVwZGF0ZWRGYlVzZXIiLCJjcmVhdGVkRmJVc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxjQUFLQSxVQUFMO0FBQUEsd0VBQWdCLGlCQUFPQyxDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNSQyxpQkFEUSxHQUNBLElBQUksbUJBQVNDLFFBQWIsRUFEQTtBQUFBO0FBQUEsbUJBRVIseUJBQVVELEtBQVYsQ0FGUTs7QUFBQTtBQUFBO0FBQUEsbUJBR1JBLE1BQU1FLE9BQU4sQ0FBYyxFQUFkLENBSFE7O0FBQUE7QUFJUkMsZ0JBSlEsR0FJREgsTUFBTUksS0FBTixDQUFZLE1BQVosV0FKQztBQUFBO0FBQUEsbUJBS0tELEtBQUtFLE1BQUwsQ0FBWSxFQUFFQyxNQUFNLE1BQVIsRUFBZ0JDLE9BQU8sU0FBdkIsRUFBa0NDLFVBQVUsUUFBNUMsRUFBWixDQUxMOztBQUFBO0FBS1JDLGdCQUxROzs7QUFPZFYsY0FBRVcsT0FBRiw4QkFBaUJY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LENBQU9rQixjQUFjaEIsT0FBZCxLQUEwQlUsT0FBT1YsT0FBUCxDQUFlVyxJQUFmLENBQW9CQyxHQUFyRDs7QUFyQnlCO0FBQUEsbUJBdUJHN0IsS0FBSzhCLGtCQUFMLDRCQUE2QkgsTUFBN0IsSUFBcUNYLElBQUksS0FBekMsSUF2Qkg7O0FBQUE7QUF1Qm5Ca0IseUJBdkJtQjs7QUF3QnpCdEMsY0FBRW1CLElBQUYsQ0FBT21CLGNBQWNsQixFQUFkLEtBQXFCVixLQUFLVSxFQUFqQztBQUNBcEIsY0FBRW1CLElBQUYsQ0FBT21CLGNBQWNGLFFBQWQsQ0FBdUJoQixFQUF2QixLQUE4QixLQUFyQztBQUNBcEIsY0FBRW1CLElBQUYsQ0FBT21CLGNBQWMvQixJQUFkLEtBQXVCd0IsT0FBT3hCLElBQXJDO0FBQ0FQLGNBQUVtQixJQUFGLENBQU9tQixjQUFjOUIsS0FBZCxLQUF3QnVCLE9BQU92QixLQUF0QztBQUNBUixjQUFFbUIsSUFBRixDQUFPbUIsY0FBY2pCLE9BQWQsS0FBMEJVLE9BQU9WLE9BQVAsQ0FBZVcsSUFBZixDQUFvQkMsR0FBckQ7O0FBNUJ5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUEzQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJ1c2VyLm1vZGVsLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCBtb2NrZ29vc2UgZnJvbSAnbW9ja2dvb3NlJ1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJy4uLy4uL2NvbmZpZy9tb25nb29zZSdcbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJy4nXG5cbnRlc3QuYmVmb3JlRWFjaChhc3luYyAodCkgPT4ge1xuICBjb25zdCBtb25nbyA9IG5ldyBtb25nb29zZS5Nb25nb29zZSgpXG4gIGF3YWl0IG1vY2tnb29zZShtb25nbylcbiAgYXdhaXQgbW9uZ28uY29ubmVjdCgnJylcbiAgY29uc3QgVXNlciA9IG1vbmdvLm1vZGVsKCdVc2VyJywgc2NoZW1hKVxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoeyBuYW1lOiAndXNlcicsIGVtYWlsOiAnYUBhLmNvbScsIHBhc3N3b3JkOiAnMTIzNDU2JyB9KVxuXG4gIHQuY29udGV4dCA9IHsgLi4udC5jb250ZXh0LCBVc2VyLCB1c2VyIH1cbn0pXG5cbnRlc3QuY2IuYWZ0ZXIuYWx3YXlzKCh0KSA9PiB7XG4gIG1vY2tnb29zZS5yZXNldCh0LmVuZClcbn0pXG5cbnRlc3QoJ3ZpZXcnLCAodCkgPT4ge1xuICBjb25zdCB7IHVzZXIgfSA9IHQuY29udGV4dFxuICBjb25zdCBmdWxsVmlldyA9IHVzZXIudmlldyh0cnVlKVxuICB0LnRydWUoZnVsbFZpZXcuaWQgPT09IHVzZXIuaWQpXG4gIHQudHJ1ZShmdWxsVmlldy5uYW1lID09PSB1c2VyLm5hbWUpXG4gIHQudHJ1ZShmdWxsVmlldy5lbWFpbCA9PT0gdXNlci5lbWFpbClcbiAgdC50cnVlKGZ1bGxWaWV3LnBpY3R1cmUgPT09IHVzZXIucGljdHVyZSlcbiAgdC50cnVlKGZ1bGxWaWV3LmNyZWF0ZWRBdCA9PT0gdXNlci5jcmVhdGVkQXQpXG59KVxuXG50ZXN0KCduYW1lJywgKHQpID0+IHtcbiAgdC5jb250ZXh0LnVzZXIubmFtZSA9ICcnXG4gIHQuY29udGV4dC51c2VyLmVtYWlsID0gJ3Rlc3RAZXhhbXBsZS5jb20nXG4gIHQudHJ1ZSh0LmNvbnRleHQudXNlci5uYW1lID09PSAndGVzdCcpXG59KVxuXG50ZXN0KCdwaWN0dXJlJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyB1c2VyIH0gPSB0LmNvbnRleHRcbiAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUodXNlci5lbWFpbCkuZGlnZXN0KCdoZXgnKVxuICB0LnRydWUodXNlci5waWN0dXJlID09PSBgaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaH0/ZD1pZGVudGljb25gKVxuXG4gIHVzZXIucGljdHVyZSA9ICd0ZXN0LmpwZydcbiAgdXNlci5lbWFpbCA9ICd0ZXN0QGV4YW1wbGUuY29tJ1xuICBhd2FpdCB1c2VyLnNhdmUoKVxuICB0LnRydWUodXNlci5waWN0dXJlID09PSAndGVzdC5qcGcnKVxufSlcblxudGVzdCgnYXV0aGVudGljYXRlJywgYXN5bmMgKHQpID0+IHtcbiAgdC50cnV0aHkoYXdhaXQgdC5jb250ZXh0LnVzZXIuYXV0aGVudGljYXRlKCcxMjM0NTYnKSlcbiAgdC5mYWxzeShhd2FpdCB0LmNvbnRleHQudXNlci5hdXRoZW50aWNhdGUoJ2JsYWgnKSlcbn0pXG5cbnRlc3QoJ2NyZWF0ZUZyb21GYWNlYm9vaycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgVXNlciwgdXNlciB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IGZiVXNlciA9IHtcbiAgICBpZDogJzEyMycsXG4gICAgbmFtZTogJ1Rlc3QgTmFtZScsXG4gICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICBwaWN0dXJlOiB7IGRhdGE6IHsgdXJsOiAndGVzdC5qcGcnIH0gfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZUZyb21GYWNlYm9vayh7IC4uLmZiVXNlciwgZW1haWw6ICdhQGEuY29tJyB9KVxuICB0LnRydWUodXBkYXRlZFVzZXIuaWQgPT09IHVzZXIuaWQpXG4gIHQudHJ1ZSh1cGRhdGVkVXNlci5mYWNlYm9vay5pZCA9PT0gZmJVc2VyLmlkKVxuICB0LnRydWUodXBkYXRlZFVzZXIubmFtZSA9PT0gZmJVc2VyLm5hbWUpXG4gIHQudHJ1ZSh1cGRhdGVkVXNlci5lbWFpbCA9PT0gdXNlci5lbWFpbClcbiAgdC50cnVlKHVwZGF0ZWRVc2VyLnBpY3R1cmUgPT09IGZiVXNlci5waWN0dXJlLmRhdGEudXJsKVxuXG4gIGNvbnN0IHVwZGF0ZWRGYlVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZUZyb21GYWNlYm9vayhmYlVzZXIpXG4gIHQudHJ1ZSh1cGRhdGVkRmJVc2VyLmlkID09PSB1c2VyLmlkKVxuICB0LnRydWUodXBkYXRlZEZiVXNlci5mYWNlYm9vay5pZCA9PT0gZmJVc2VyLmlkKVxuICB0LnRydWUodXBkYXRlZEZiVXNlci5uYW1lID09PSBmYlVzZXIubmFtZSlcbiAgdC50cnVlKHVwZGF0ZWRGYlVzZXIuZW1haWwgPT09IHVzZXIuZW1haWwpXG4gIHQudHJ1ZSh1cGRhdGVkRmJVc2VyLnBpY3R1cmUgPT09IGZiVXNlci5waWN0dXJlLmRhdGEudXJsKVxuXG4gIGNvbnN0IGNyZWF0ZWRGYlVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZUZyb21GYWNlYm9vayh7IC4uLmZiVXNlciwgaWQ6ICczMjEnIH0pXG4gIHQudHJ1ZShjcmVhdGVkRmJVc2VyLmlkICE9PSB1c2VyLmlkKVxuICB0LnRydWUoY3JlYXRlZEZiVXNlci5mYWNlYm9vay5pZCA9PT0gJzMyMScpXG4gIHQudHJ1ZShjcmVhdGVkRmJVc2VyLm5hbWUgPT09IGZiVXNlci5uYW1lKVxuICB0LnRydWUoY3JlYXRlZEZiVXNlci5lbWFpbCA9PT0gZmJVc2VyLmVtYWlsKVxuICB0LnRydWUoY3JlYXRlZEZiVXNlci5waWN0dXJlID09PSBmYlVzZXIucGljdHVyZS5kYXRhLnVybClcbn0pXG4iXX0=