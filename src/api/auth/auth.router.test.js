'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _mockgoose = require('mockgoose');

var _mockgoose2 = _interopRequireDefault(_mockgoose);

var _config = require('../../config');

var _jwt = require('../../services/jwt');

var _express = require('../../config/express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('../../config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _user = require('../user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app() {
  return (0, _express2.default)(_2.default);
};

_ava2.default.before(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(t) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mockgoose2.default)(_mongoose2.default);

          case 2:
            _context.next = 4;
            return _mongoose2.default.connect('');

          case 4:
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

_ava2.default.beforeEach(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(t) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.User.create({ email: 'a@a.com', password: '123456' });

          case 2:
            t.context.user = _context2.sent;

          case 3:
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

_ava2.default.afterEach.always(function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(t) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user.User.remove();

          case 2:
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

_ava2.default.serial('POST /auth 201 (master)', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(t) {
    var _ref5, status, body;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('a@a.com', '123456');

          case 2:
            _ref5 = _context4.sent;
            status = _ref5.status;
            body = _ref5.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(typeof body.token === 'string');
            t.true((0, _typeof3.default)(body.user) === 'object');
            t.true(body.user.id === t.context.user.id);
            t.notThrows((0, _jwt.verify)(body.token));

          case 11:
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

_ava2.default.serial('POST /auth 400 (master) - invalid email', function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(t) {
    var _ref7, status, body;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('invalid', '123456');

          case 2:
            _ref7 = _context5.sent;
            status = _ref7.status;
            body = _ref7.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'email');

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5) {
    return _ref6.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 400 (master) - invalid password', function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(t) {
    var _ref9, status, body;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('a@a.com', '123');

          case 2:
            _ref9 = _context6.sent;
            status = _ref9.status;
            body = _ref9.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x6) {
    return _ref8.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 400 (master) - invalid password', function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(t) {
    var _ref11, status, body;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('a@a.com', '123');

          case 2:
            _ref11 = _context7.sent;
            status = _ref11.status;
            body = _ref11.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x7) {
    return _ref10.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 401 (master) - user does not exist', function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(t) {
    var _ref13, status;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('b@b.com', '123456');

          case 2:
            _ref13 = _context8.sent;
            status = _ref13.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x8) {
    return _ref12.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 401 (master) - wrong password', function () {
  var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(t) {
    var _ref15, status;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey }).auth('a@a.com', '654321');

          case 2:
            _ref15 = _context9.sent;
            status = _ref15.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x9) {
    return _ref14.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 401 (master) - missing access_token', function () {
  var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(t) {
    var _ref17, status;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').auth('a@a.com', '123456');

          case 2:
            _ref17 = _context10.sent;
            status = _ref17.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x10) {
    return _ref16.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth 401 (master) - missing auth', function () {
  var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(t) {
    var _ref19, status;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').query({ access_token: _config.masterKey });

          case 2:
            _ref19 = _context11.sent;
            status = _ref19.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x11) {
    return _ref18.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth/facebook 201', function () {
  var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(t) {
    var fbUser, _ref21, status, body;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            fbUser = {
              id: '123',
              name: 'user',
              email: 'b@b.com',
              picture: { data: { url: 'test.jpg' } }
            };

            _nock2.default.restore() && _nock2.default.isActive() || _nock2.default.activate();
            (0, _nock2.default)('https://graph.facebook.com').get('/me').query(true).reply(200, fbUser);
            _context12.next = 5;
            return (0, _supertestAsPromised2.default)(app()).post('/facebook').send({ access_token: '123' });

          case 5:
            _ref21 = _context12.sent;
            status = _ref21.status;
            body = _ref21.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(typeof body.token === 'string');
            t.true((0, _typeof3.default)(body.user) === 'object');
            t.notThrows((0, _jwt.verify)(body.token));

          case 13:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x12) {
    return _ref20.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /auth/facebook 401 - missing token', function () {
  var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(t) {
    var _ref23, status;

    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/facebook');

          case 2:
            _ref23 = _context13.sent;
            status = _ref23.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x13) {
    return _ref22.apply(this, arguments);
  };
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXV0aC9hdXRoLnJvdXRlci50ZXN0LmpzIl0sIm5hbWVzIjpbImFwcCIsImJlZm9yZSIsInQiLCJjb25uZWN0IiwiYmVmb3JlRWFjaCIsImNyZWF0ZSIsImVtYWlsIiwicGFzc3dvcmQiLCJjb250ZXh0IiwidXNlciIsImFmdGVyRWFjaCIsImFsd2F5cyIsInJlbW92ZSIsInNlcmlhbCIsInBvc3QiLCJxdWVyeSIsImFjY2Vzc190b2tlbiIsImF1dGgiLCJzdGF0dXMiLCJib2R5IiwidHJ1ZSIsInRva2VuIiwiaWQiLCJub3RUaHJvd3MiLCJwYXJhbSIsImZiVXNlciIsIm5hbWUiLCJwaWN0dXJlIiwiZGF0YSIsInVybCIsInJlc3RvcmUiLCJpc0FjdGl2ZSIsImFjdGl2YXRlIiwiZ2V0IiwicmVwbHkiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU07QUFBQSxTQUFNLGtDQUFOO0FBQUEsQ0FBWjs7QUFFQSxjQUFLQyxNQUFMO0FBQUEsd0VBQVksaUJBQU9DLENBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0osNENBREk7O0FBQUE7QUFBQTtBQUFBLG1CQUVKLG1CQUFTQyxPQUFULENBQWlCLEVBQWpCLENBRkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQSxjQUFLQyxVQUFMO0FBQUEseUVBQWdCLGtCQUFPRixDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNTLFdBQUtHLE1BQUwsQ0FBWSxFQUFFQyxPQUFPLFNBQVQsRUFBb0JDLFVBQVUsUUFBOUIsRUFBWixDQURUOztBQUFBO0FBQ2RMLGNBQUVNLE9B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cUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBdkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbUJBLGNBQUtSLE1BQUwsQ0FBWSx5Q0FBWjtBQUFBLDBFQUF1RCxtQkFBT1gsQ0FBUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDNUIsbUNBQVFGLEtBQVIsRUFBZWMsSUFBZixDQUFvQixXQUFwQixDQUQ0Qjs7QUFBQTtBQUFBO0FBQzdDSSxrQkFENkMsVUFDN0NBLE1BRDZDOztBQUVyRGhCLGNBQUVrQixJQUFGLENBQU9GLFdBQVcsR0FBbEI7O0FBRnFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXZEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImF1dGgucm91dGVyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgbm9jayBmcm9tICdub2NrJ1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJ0ZXN0LWFzLXByb21pc2VkJ1xuaW1wb3J0IG1vY2tnb29zZSBmcm9tICdtb2NrZ29vc2UnXG5pbXBvcnQgeyBtYXN0ZXJLZXkgfSBmcm9tICcuLi8uLi9jb25maWcnXG5pbXBvcnQgeyB2ZXJpZnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9qd3QnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICcuLi8uLi9jb25maWcvZXhwcmVzcydcbmltcG9ydCBtb25nb29zZSBmcm9tICcuLi8uLi9jb25maWcvbW9uZ29vc2UnXG5pbXBvcnQgcm91dGVzIGZyb20gJy4nXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcidcblxuY29uc3QgYXBwID0gKCkgPT4gZXhwcmVzcyhyb3V0ZXMpXG5cbnRlc3QuYmVmb3JlKGFzeW5jICh0KSA9PiB7XG4gIGF3YWl0IG1vY2tnb29zZShtb25nb29zZSlcbiAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdCgnJylcbn0pXG5cbnRlc3QuYmVmb3JlRWFjaChhc3luYyAodCkgPT4ge1xuICB0LmNvbnRleHQudXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHsgZW1haWw6ICdhQGEuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0pXG59KVxuXG50ZXN0LmFmdGVyRWFjaC5hbHdheXMoYXN5bmMgKHQpID0+IHtcbiAgYXdhaXQgVXNlci5yZW1vdmUoKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL2F1dGggMjAxIChtYXN0ZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5xdWVyeSh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5IH0pXG4gICAgLmF1dGgoJ2FAYS5jb20nLCAnMTIzNDU2JylcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAxKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUodHlwZW9mIGJvZHkudG9rZW4gPT09ICdzdHJpbmcnKVxuICB0LnRydWUodHlwZW9mIGJvZHkudXNlciA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LnVzZXIuaWQgPT09IHQuY29udGV4dC51c2VyLmlkKVxuICB0Lm5vdFRocm93cyh2ZXJpZnkoYm9keS50b2tlbikpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvYXV0aCA0MDAgKG1hc3RlcikgLSBpbnZhbGlkIGVtYWlsJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5xdWVyeSh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5IH0pXG4gICAgLmF1dGgoJ2ludmFsaWQnLCAnMTIzNDU2JylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5wYXJhbSA9PT0gJ2VtYWlsJylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC9hdXRoIDQwMCAobWFzdGVyKSAtIGludmFsaWQgcGFzc3dvcmQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiBtYXN0ZXJLZXkgfSlcbiAgICAuYXV0aCgnYUBhLmNvbScsICcxMjMnKVxuICB0LnRydWUoc3RhdHVzID09PSA0MDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LnBhcmFtID09PSAncGFzc3dvcmQnKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL2F1dGggNDAwIChtYXN0ZXIpIC0gaW52YWxpZCBwYXNzd29yZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAucXVlcnkoeyBhY2Nlc3NfdG9rZW46IG1hc3RlcktleSB9KVxuICAgIC5hdXRoKCdhQGEuY29tJywgJzEyMycpXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdwYXNzd29yZCcpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvYXV0aCA0MDEgKG1hc3RlcikgLSB1c2VyIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5xdWVyeSh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5IH0pXG4gICAgLmF1dGgoJ2JAYi5jb20nLCAnMTIzNDU2JylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL2F1dGggNDAxIChtYXN0ZXIpIC0gd3JvbmcgcGFzc3dvcmQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiBtYXN0ZXJLZXkgfSlcbiAgICAuYXV0aCgnYUBhLmNvbScsICc2NTQzMjEnKVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvYXV0aCA0MDEgKG1hc3RlcikgLSBtaXNzaW5nIGFjY2Vzc190b2tlbicsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuYXV0aCgnYUBhLmNvbScsICcxMjM0NTYnKVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvYXV0aCA0MDEgKG1hc3RlcikgLSBtaXNzaW5nIGF1dGgnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiBtYXN0ZXJLZXkgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL2F1dGgvZmFjZWJvb2sgMjAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgZmJVc2VyID0ge1xuICAgIGlkOiAnMTIzJyxcbiAgICBuYW1lOiAndXNlcicsXG4gICAgZW1haWw6ICdiQGIuY29tJyxcbiAgICBwaWN0dXJlOiB7IGRhdGE6IHsgdXJsOiAndGVzdC5qcGcnIH0gfVxuICB9XG4gIG5vY2sucmVzdG9yZSgpICYmIG5vY2suaXNBY3RpdmUoKSB8fCBub2NrLmFjdGl2YXRlKClcbiAgbm9jaygnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20nKS5nZXQoJy9tZScpLnF1ZXJ5KHRydWUpLnJlcGx5KDIwMCwgZmJVc2VyKVxuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnL2ZhY2Vib29rJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogJzEyMycgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAxKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUodHlwZW9mIGJvZHkudG9rZW4gPT09ICdzdHJpbmcnKVxuICB0LnRydWUodHlwZW9mIGJvZHkudXNlciA9PT0gJ29iamVjdCcpXG4gIHQubm90VGhyb3dzKHZlcmlmeShib2R5LnRva2VuKSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC9hdXRoL2ZhY2Vib29rIDQwMSAtIG1pc3NpbmcgdG9rZW4nLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSkucG9zdCgnL2ZhY2Vib29rJylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcbiJdfQ==