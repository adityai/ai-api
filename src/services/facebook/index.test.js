'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _ = require('.');

var facebook = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('getMe', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(t) {
    var fbUser, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fbUser = {
              id: '123',
              name: 'Test name',
              email: 'email@example.com',
              picture: { data: { url: 'test.jpg' } }
            };


            _nock2.default.restore() && _nock2.default.isActive() || _nock2.default.activate();
            (0, _nock2.default)('https://graph.facebook.com').get('/me').query(true).reply(200, fbUser);

            _context.next = 5;
            return facebook.getMe({ accessToken: '123', fields: 'id, name, email, picture' });

          case 5:
            data = _context.sent;

            t.true(data.id === fbUser.id);
            t.true(data.name === fbUser.name);
            t.true(data.email === fbUser.email);
            t.true(data.picture.data.url === fbUser.picture.data.url);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9mYWNlYm9vay9pbmRleC50ZXN0LmpzIl0sIm5hbWVzIjpbImZhY2Vib29rIiwidCIsImZiVXNlciIsImlkIiwibmFtZSIsImVtYWlsIiwicGljdHVyZSIsImRhdGEiLCJ1cmwiLCJyZXN0b3JlIiwiaXNBY3RpdmUiLCJhY3RpdmF0ZSIsImdldCIsInF1ZXJ5IiwicmVwbHkiLCJnZXRNZSIsImFjY2Vzc1Rva2VuIiwiZmllbGRzIiwidHJ1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsUTs7Ozs7O0FBRVosbUJBQUssT0FBTDtBQUFBLHdFQUFjLGlCQUFPQyxDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNOQyxrQkFETSxHQUNHO0FBQ2JDLGtCQUFJLEtBRFM7QUFFYkMsb0JBQU0sV0FGTztBQUdiQyxxQkFBTyxtQkFITTtBQUliQyx1QkFBUyxFQUFFQyxNQUFNLEVBQUVDLEtBQUssVUFBUCxFQUFSO0FBSkksYUFESDs7O0FBUVosMkJBQUtDLE9BQUwsTUFBa0IsZUFBS0MsUUFBTCxFQUFsQixJQUFxQyxlQUFLQyxRQUFMLEVBQXJDO0FBQ0EsZ0NBQUssNEJBQUwsRUFBbUNDLEdBQW5DLENBQXVDLEtBQXZDLEVBQThDQyxLQUE5QyxDQUFvRCxJQUFwRCxFQUEwREMsS0FBMUQsQ0FBZ0UsR0FBaEUsRUFBcUVaLE1BQXJFOztBQVRZO0FBQUEsbUJBV09GLFNBQVNlLEtBQVQsQ0FBZSxFQUFFQyxhQUFhLEtBQWYsRUFBc0JDLFFBQVEsMEJBQTlCLEVBQWYsQ0FYUDs7QUFBQTtBQVdOVixnQkFYTTs7QUFZWk4sY0FBRWlCLElBQUYsQ0FBT1gsS0FBS0osRUFBTCxLQUFZRCxPQUFPQyxFQUExQjtBQUNBRixjQUFFaUIsSUFBRixDQUFPWCxLQUFLSCxJQUFMLEtBQWNGLE9BQU9FLElBQTVCO0FBQ0FILGNBQUVpQixJQUFGLENBQU9YLEtBQUtGLEtBQUwsS0FBZUgsT0FBT0csS0FBN0I7QUFDQUosY0FBRWlCLElBQUYsQ0FBT1gsS0FBS0QsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxHQUFsQixLQUEwQk4sT0FBT0ksT0FBUCxDQUFlQyxJQUFmLENBQW9CQyxHQUFyRDs7QUFmWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFkOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImluZGV4LnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgbm9jayBmcm9tICdub2NrJ1xuaW1wb3J0ICogYXMgZmFjZWJvb2sgZnJvbSAnLidcblxudGVzdCgnZ2V0TWUnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCBmYlVzZXIgPSB7XG4gICAgaWQ6ICcxMjMnLFxuICAgIG5hbWU6ICdUZXN0IG5hbWUnLFxuICAgIGVtYWlsOiAnZW1haWxAZXhhbXBsZS5jb20nLFxuICAgIHBpY3R1cmU6IHsgZGF0YTogeyB1cmw6ICd0ZXN0LmpwZycgfSB9XG4gIH1cblxuICBub2NrLnJlc3RvcmUoKSAmJiBub2NrLmlzQWN0aXZlKCkgfHwgbm9jay5hY3RpdmF0ZSgpXG4gIG5vY2soJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tJykuZ2V0KCcvbWUnKS5xdWVyeSh0cnVlKS5yZXBseSgyMDAsIGZiVXNlcilcblxuICBjb25zdCBkYXRhID0gYXdhaXQgZmFjZWJvb2suZ2V0TWUoeyBhY2Nlc3NUb2tlbjogJzEyMycsIGZpZWxkczogJ2lkLCBuYW1lLCBlbWFpbCwgcGljdHVyZScgfSlcbiAgdC50cnVlKGRhdGEuaWQgPT09IGZiVXNlci5pZClcbiAgdC50cnVlKGRhdGEubmFtZSA9PT0gZmJVc2VyLm5hbWUpXG4gIHQudHJ1ZShkYXRhLmVtYWlsID09PSBmYlVzZXIuZW1haWwpXG4gIHQudHJ1ZShkYXRhLnBpY3R1cmUuZGF0YS51cmwgPT09IGZiVXNlci5waWN0dXJlLmRhdGEudXJsKVxufSlcbiJdfQ==