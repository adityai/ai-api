'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _mockgoose = require('mockgoose');

var _mockgoose2 = _interopRequireDefault(_mockgoose);

var _jwt = require('../../services/jwt');

var _express = require('../../config/express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('../../config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../user');

var _ = require('.');

var _2 = _interopRequireDefault(_);

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
    var _ref3, _ref4, user, anotherUser, admin, userSession, anotherSession, adminSession, article;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.User.create([{ email: 'a@a.com', password: '123456' }, { email: 'b@b.com', password: '123456' }, { email: 'c@c.com', password: '123456', role: 'admin' }]);

          case 2:
            _ref3 = _context2.sent;
            _ref4 = (0, _slicedToArray3.default)(_ref3, 3);
            user = _ref4[0];
            anotherUser = _ref4[1];
            admin = _ref4[2];
            userSession = (0, _jwt.signSync)(user.id);
            anotherSession = (0, _jwt.signSync)(anotherUser.id);
            adminSession = (0, _jwt.signSync)(admin.id);
            _context2.next = 12;
            return _.Article.create({ user: user });

          case 12:
            article = _context2.sent;

            t.context = (0, _extends3.default)({}, t.context, { userSession: userSession, anotherSession: anotherSession, adminSession: adminSession, article: article });

          case 14:
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
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(t) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _bluebird2.default.all([_user.User.remove(), _.Article.remove()]);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /articles 201 (user)', function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(t) {
    var userSession, _ref7, status, body;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userSession = t.context.userSession;
            _context4.next = 3;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: userSession, title: 'test', content: 'test' });

          case 3:
            _ref7 = _context4.sent;
            status = _ref7.status;
            body = _ref7.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.title === 'test');
            t.true(body.content === 'test');

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref6.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /articles 401', function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(t) {
    var _ref9, status;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/');

          case 2:
            _ref9 = _context5.sent;
            status = _ref9.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5) {
    return _ref8.apply(this, arguments);
  };
}());

_ava2.default.serial('GET /articles 200', function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(t) {
    var _ref11, status, body;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/');

          case 2:
            _ref11 = _context6.sent;
            status = _ref11.status;
            body = _ref11.body;

            t.true(status === 200);
            t.true(Array.isArray(body));

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x6) {
    return _ref10.apply(this, arguments);
  };
}());

_ava2.default.serial('GET /articles/:id 200', function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(t) {
    var article, _ref13, status, body;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            article = t.context.article;
            _context7.next = 3;
            return (0, _supertestAsPromised2.default)(app()).get('/' + article.id);

          case 3:
            _ref13 = _context7.sent;
            status = _ref13.status;
            body = _ref13.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.id === article.id);

          case 9:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x7) {
    return _ref12.apply(this, arguments);
  };
}());

_ava2.default.serial('GET /articles/:id 404', function () {
  var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(t) {
    var _ref15, status;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/123456789098765432123456');

          case 2:
            _ref15 = _context8.sent;
            status = _ref15.status;

            t.true(status === 404);

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x8) {
    return _ref14.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /articles/:id 200 (user)', function () {
  var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(t) {
    var _t$context, userSession, article, _ref17, status, body;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _t$context = t.context;
            userSession = _t$context.userSession;
            article = _t$context.article;
            _context9.next = 5;
            return (0, _supertestAsPromised2.default)(app()).put('/' + article.id).send({ access_token: userSession, title: 'test', content: 'test' });

          case 5:
            _ref17 = _context9.sent;
            status = _ref17.status;
            body = _ref17.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.id === article.id);
            t.true(body.title === 'test');
            t.true(body.content === 'test');

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x9) {
    return _ref16.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /articles/:id 401 (user) - another user', function () {
  var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(t) {
    var _t$context2, anotherSession, article, _ref19, status;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _t$context2 = t.context;
            anotherSession = _t$context2.anotherSession;
            article = _t$context2.article;
            _context10.next = 5;
            return (0, _supertestAsPromised2.default)(app()).put('/' + article.id).send({ access_token: anotherSession, title: 'test', content: 'test' });

          case 5:
            _ref19 = _context10.sent;
            status = _ref19.status;

            t.true(status === 401);

          case 8:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x10) {
    return _ref18.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /articles/:id 401', function () {
  var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(t) {
    var article, _ref21, status;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            article = t.context.article;
            _context11.next = 3;
            return (0, _supertestAsPromised2.default)(app()).put('/' + article.id);

          case 3:
            _ref21 = _context11.sent;
            status = _ref21.status;

            t.true(status === 401);

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x11) {
    return _ref20.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /articles/:id 404 (user)', function () {
  var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(t) {
    var anotherSession, _ref23, status;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            anotherSession = t.context.anotherSession;
            _context12.next = 3;
            return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456').send({ access_token: anotherSession, title: 'test', content: 'test' });

          case 3:
            _ref23 = _context12.sent;
            status = _ref23.status;

            t.true(status === 404);

          case 6:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x12) {
    return _ref22.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /articles/:id 204 (user)', function () {
  var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(t) {
    var _t$context3, userSession, article, _ref25, status;

    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _t$context3 = t.context;
            userSession = _t$context3.userSession;
            article = _t$context3.article;
            _context13.next = 5;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + article.id).query({ access_token: userSession });

          case 5:
            _ref25 = _context13.sent;
            status = _ref25.status;

            t.true(status === 204);

          case 8:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x13) {
    return _ref24.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /articles/:id 401 (user) - another user', function () {
  var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(t) {
    var _t$context4, anotherSession, article, _ref27, status;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _t$context4 = t.context;
            anotherSession = _t$context4.anotherSession;
            article = _t$context4.article;
            _context14.next = 5;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + article.id).send({ access_token: anotherSession });

          case 5:
            _ref27 = _context14.sent;
            status = _ref27.status;

            t.true(status === 401);

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function (_x14) {
    return _ref26.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /articles/:id 401', function () {
  var _ref28 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(t) {
    var article, _ref29, status;

    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            article = t.context.article;
            _context15.next = 3;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + article.id);

          case 3:
            _ref29 = _context15.sent;
            status = _ref29.status;

            t.true(status === 401);

          case 6:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function (_x15) {
    return _ref28.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /articles/:id 404 (user)', function () {
  var _ref30 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(t) {
    var anotherSession, _ref31, status;

    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            anotherSession = t.context.anotherSession;
            _context16.next = 3;
            return (0, _supertestAsPromised2.default)(app()).delete('/123456789098765432123456').query({ access_token: anotherSession });

          case 3:
            _ref31 = _context16.sent;
            status = _ref31.status;

            t.true(status === 404);

          case 6:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function (_x16) {
    return _ref30.apply(this, arguments);
  };
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXJ0aWNsZS9hcnRpY2xlLnJvdXRlci50ZXN0LmpzIl0sIm5hbWVzIjpbImFwcCIsImJlZm9yZSIsInQiLCJjb25uZWN0IiwiYmVmb3JlRWFjaCIsImNyZWF0ZSIsImVtYWlsIiwicGFzc3dvcmQiLCJyb2xlIiwidXNlciIsImFub3RoZXJVc2VyIiwiYWRtaW4iLCJ1c2VyU2Vzc2lvbiIsImlkIiwiYW5vdGhlclNlc3Npb24iLCJhZG1pblNlc3Npb24iLCJhcnRpY2xlIiwiY29udGV4dCIsImFmdGVyRWFjaCIsImFsd2F5cyIsImFsbCIsInJlbW92ZSIsInNlcmlhbCIsInBvc3QiLCJzZW5kIiwiYWNjZXNzX3Rva2VuIiwidGl0bGUiLCJjb250ZW50Iiwic3RhdHVzIiwiYm9keSIsInRydWUiLCJnZXQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXQiLCJkZWxldGUiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU07QUFBQSxTQUFNLGtDQUFOO0FBQUEsQ0FBWjs7QUFFQSxjQUFLQyxNQUFMO0FBQUEsd0VBQVksaUJBQU9DLENBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0osNENBREk7O0FBQUE7QUFBQTtBQUFBLG1CQUVKLG1CQUFTQyxPQUFULENBQWlCLEVBQWpCLENBRkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQSxjQUFLQyxVQUFMO0FBQUEseUVBQWdCLGtCQUFPRixDQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUM2QixXQUFLRyxNQUFMLENBQVksQ0FDckQsRUFBRUMsT0FBTyxTQUFU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QUFBQTtBQUFBOztBQVFBLGNBQUtOLE1BQUwsQ0FBWSwwQkFBWjtBQUFBLDBFQUF3QyxtQkFBT3BCLENBQVA7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM5QmMsbUJBRDhCLEdBQ2xCZCxFQUFFZSxPQURnQixDQUM5QkQsT0FEOEI7QUFBQTtBQUFBLG1CQUViLG1DQUFRaEIsS0FBUixFQUN0Qm1DLE1BRHNCLE9BQ1huQixRQUFRSCxFQURHLENBRmE7O0FBQUE7QUFBQTtBQUU5QmUsa0JBRjhCLFVBRTlCQSxNQUY4Qjs7QUFJdEMxQixjQUFFNEIsSUFBRixDQUFPRixXQUFXLEdBQWxCOztBQUpzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF4Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPQSxjQUFLTixNQUFMLENBQVksaUNBQVo7QUFBQSwwRUFBK0MsbUJBQU9wQixDQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDckNZLDBCQURxQyxHQUNsQlosRUFBRWUsT0FEZ0IsQ0FDckNILGNBRHFDO0FBQUE7QUFBQSxtQkFFcEIsbUNBQVFkLEtBQVIsRUFDdEJtQyxNQURzQixDQUNmLDJCQURlLEVBRXRCQyxLQUZzQixDQUVoQixFQUFFWCxjQUFjWCxjQUFoQixFQUZnQixDQUZvQjs7QUFBQTtBQUFBO0FBRXJDYyxrQkFGcUMsVUFFckNBLE1BRnFDOztBQUs3QzFCLGNBQUU0QixJQUFGLENBQU9GLFdBQVcsR0FBbEI7O0FBTDZDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQS9DOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImFydGljbGUucm91dGVyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVydGVzdC1hcy1wcm9taXNlZCdcbmltcG9ydCBtb2NrZ29vc2UgZnJvbSAnbW9ja2dvb3NlJ1xuaW1wb3J0IHsgc2lnblN5bmMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9qd3QnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICcuLi8uLi9jb25maWcvZXhwcmVzcydcbmltcG9ydCBtb25nb29zZSBmcm9tICcuLi8uLi9jb25maWcvbW9uZ29vc2UnXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcidcbmltcG9ydCByb3V0ZXMsIHsgQXJ0aWNsZSB9IGZyb20gJy4nXG5cbmNvbnN0IGFwcCA9ICgpID0+IGV4cHJlc3Mocm91dGVzKVxuXG50ZXN0LmJlZm9yZShhc3luYyAodCkgPT4ge1xuICBhd2FpdCBtb2NrZ29vc2UobW9uZ29vc2UpXG4gIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QoJycpXG59KVxuXG50ZXN0LmJlZm9yZUVhY2goYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgWyB1c2VyLCBhbm90aGVyVXNlciwgYWRtaW4gXSA9IGF3YWl0IFVzZXIuY3JlYXRlKFtcbiAgICB7IGVtYWlsOiAnYUBhLmNvbScsIHBhc3N3b3JkOiAnMTIzNDU2JyB9LFxuICAgIHsgZW1haWw6ICdiQGIuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0sXG4gICAgeyBlbWFpbDogJ2NAYy5jb20nLCBwYXNzd29yZDogJzEyMzQ1NicsIHJvbGU6ICdhZG1pbicgfVxuICBdKVxuICBjb25zdCBbIHVzZXJTZXNzaW9uLCBhbm90aGVyU2Vzc2lvbiwgYWRtaW5TZXNzaW9uIF0gPSBbXG4gICAgc2lnblN5bmModXNlci5pZCksIHNpZ25TeW5jKGFub3RoZXJVc2VyLmlkKSwgc2lnblN5bmMoYWRtaW4uaWQpXG4gIF1cbiAgY29uc3QgYXJ0aWNsZSA9IGF3YWl0IEFydGljbGUuY3JlYXRlKHsgdXNlciB9KVxuICB0LmNvbnRleHQgPSB7IC4uLnQuY29udGV4dCwgdXNlclNlc3Npb24sIGFub3RoZXJTZXNzaW9uLCBhZG1pblNlc3Npb24sIGFydGljbGUgfVxufSlcblxudGVzdC5hZnRlckVhY2guYWx3YXlzKGFzeW5jICh0KSA9PiB7XG4gIGF3YWl0IFByb21pc2UuYWxsKFtVc2VyLnJlbW92ZSgpLCBBcnRpY2xlLnJlbW92ZSgpXSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC9hcnRpY2xlcyAyMDEgKHVzZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyB1c2VyU2Vzc2lvbiB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogdXNlclNlc3Npb24sIHRpdGxlOiAndGVzdCcsIGNvbnRlbnQ6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSAyMDEpXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LnRpdGxlID09PSAndGVzdCcpXG4gIHQudHJ1ZShib2R5LmNvbnRlbnQgPT09ICd0ZXN0Jylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC9hcnRpY2xlcyA0MDEnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdHRVQgL2FydGljbGVzIDIwMCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5nZXQoJy8nKVxuICB0LnRydWUoc3RhdHVzID09PSAyMDApXG4gIHQudHJ1ZShBcnJheS5pc0FycmF5KGJvZHkpKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvYXJ0aWNsZXMvOmlkIDIwMCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgYXJ0aWNsZSB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5nZXQoYC8ke2FydGljbGUuaWR9YClcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5pZCA9PT0gYXJ0aWNsZS5pZClcbn0pXG5cbnRlc3Quc2VyaWFsKCdHRVQgL2FydGljbGVzLzppZCA0MDQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZ2V0KCcvMTIzNDU2Nzg5MDk4NzY1NDMyMTIzNDU2JylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDA0KVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvYXJ0aWNsZXMvOmlkIDIwMCAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHVzZXJTZXNzaW9uLCBhcnRpY2xlIH0gPSB0LmNvbnRleHRcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dChgLyR7YXJ0aWNsZS5pZH1gKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB1c2VyU2Vzc2lvbiwgdGl0bGU6ICd0ZXN0JywgY29udGVudDogJ3Rlc3QnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkuaWQgPT09IGFydGljbGUuaWQpXG4gIHQudHJ1ZShib2R5LnRpdGxlID09PSAndGVzdCcpXG4gIHQudHJ1ZShib2R5LmNvbnRlbnQgPT09ICd0ZXN0Jylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQVVQgL2FydGljbGVzLzppZCA0MDEgKHVzZXIpIC0gYW5vdGhlciB1c2VyJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBhbm90aGVyU2Vzc2lvbiwgYXJ0aWNsZSB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke2FydGljbGUuaWR9YClcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogYW5vdGhlclNlc3Npb24sIHRpdGxlOiAndGVzdCcsIGNvbnRlbnQ6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC9hcnRpY2xlcy86aWQgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBhcnRpY2xlIH0gPSB0LmNvbnRleHRcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dChgLyR7YXJ0aWNsZS5pZH1gKVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC9hcnRpY2xlcy86aWQgNDA0ICh1c2VyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgYW5vdGhlclNlc3Npb24gfSA9IHQuY29udGV4dFxuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KCcvMTIzNDU2Nzg5MDk4NzY1NDMyMTIzNDU2JylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogYW5vdGhlclNlc3Npb24sIHRpdGxlOiAndGVzdCcsIGNvbnRlbnQ6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDQpXG59KVxuXG50ZXN0LnNlcmlhbCgnREVMRVRFIC9hcnRpY2xlcy86aWQgMjA0ICh1c2VyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgdXNlclNlc3Npb24sIGFydGljbGUgfSA9IHQuY29udGV4dFxuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZGVsZXRlKGAvJHthcnRpY2xlLmlkfWApXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiB1c2VyU2Vzc2lvbiB9KVxuICB0LnRydWUoc3RhdHVzID09PSAyMDQpXG59KVxuXG50ZXN0LnNlcmlhbCgnREVMRVRFIC9hcnRpY2xlcy86aWQgNDAxICh1c2VyKSAtIGFub3RoZXIgdXNlcicsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgYW5vdGhlclNlc3Npb24sIGFydGljbGUgfSA9IHQuY29udGV4dFxuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZGVsZXRlKGAvJHthcnRpY2xlLmlkfWApXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IGFub3RoZXJTZXNzaW9uIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdERUxFVEUgL2FydGljbGVzLzppZCA0MDEnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IGFydGljbGUgfSA9IHQuY29udGV4dFxuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZGVsZXRlKGAvJHthcnRpY2xlLmlkfWApXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdERUxFVEUgL2FydGljbGVzLzppZCA0MDQgKHVzZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBhbm90aGVyU2Vzc2lvbiB9ID0gdC5jb250ZXh0XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5kZWxldGUoJy8xMjM0NTY3ODkwOTg3NjU0MzIxMjM0NTYnKVxuICAgIC5xdWVyeSh7IGFjY2Vzc190b2tlbjogYW5vdGhlclNlc3Npb24gfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDA0KVxufSlcbiJdfQ==