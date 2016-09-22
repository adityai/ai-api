'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
    var _ref3, _ref4, user1, user2, admin, session1, session2, adminSession;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _.User.create([{ name: 'user', email: 'a@a.com', password: '123456' }, { name: 'user', email: 'b@b.com', password: '123456' }, { email: 'c@c.com', password: '123456', role: 'admin' }]);

          case 2:
            _ref3 = _context2.sent;
            _ref4 = (0, _slicedToArray3.default)(_ref3, 3);
            user1 = _ref4[0];
            user2 = _ref4[1];
            admin = _ref4[2];
            session1 = (0, _jwt.signSync)(user1.id);
            session2 = (0, _jwt.signSync)(user2.id);
            adminSession = (0, _jwt.signSync)(admin.id);

            t.context = (0, _extends3.default)({}, t.context, { user1: user1, user2: user2, session1: session1, session2: session2, adminSession: adminSession });

          case 11:
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
            return _.User.remove();

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

_ava2.default.serial('GET /users 200 (admin)', function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(t) {
    var _ref7, status, body;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: t.context.adminSession });

          case 2:
            _ref7 = _context4.sent;
            status = _ref7.status;
            body = _ref7.body;

            t.true(status === 200);
            t.true(Array.isArray(body));

          case 7:
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

_ava2.default.serial('GET /users?page=2&limit=1 200 (admin)', function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(t) {
    var _ref9, status, body;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: t.context.adminSession, page: 2, limit: 1 });

          case 2:
            _ref9 = _context5.sent;
            status = _ref9.status;
            body = _ref9.body;

            t.true(status === 200);
            t.true(Array.isArray(body));
            t.true(body.length === 1);

          case 8:
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

_ava2.default.serial('GET /users?q=user 200 (admin)', function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(t) {
    var _ref11, status, body;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: t.context.adminSession, q: 'user' });

          case 2:
            _ref11 = _context6.sent;
            status = _ref11.status;
            body = _ref11.body;

            t.true(status === 200);
            t.true(Array.isArray(body));
            t.true(body.length === 2);

          case 8:
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

_ava2.default.serial('GET /users?fields=name 200 (admin)', function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(t) {
    var _ref13, status, body;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: t.context.adminSession, fields: 'name' });

          case 2:
            _ref13 = _context7.sent;
            status = _ref13.status;
            body = _ref13.body;

            t.true(status === 200);
            t.true(Array.isArray(body));
            t.deepEqual((0, _keys2.default)(body[0]), ['id', 'name']);

          case 8:
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

_ava2.default.serial('GET /users 401 (user)', function () {
  var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(t) {
    var _ref15, status;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: t.context.session1 });

          case 2:
            _ref15 = _context8.sent;
            status = _ref15.status;

            t.true(status === 401);

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

_ava2.default.serial('GET /users 401', function () {
  var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(t) {
    var _ref17, status;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/');

          case 2:
            _ref17 = _context9.sent;
            status = _ref17.status;

            t.true(status === 401);

          case 5:
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

_ava2.default.serial('GET /users/me 200 (user)', function () {
  var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(t) {
    var _ref19, status, body;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/me').query({ access_token: t.context.session1 });

          case 2:
            _ref19 = _context10.sent;
            status = _ref19.status;
            body = _ref19.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.id === t.context.user1.id);

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

_ava2.default.serial('GET /users/me 401', function () {
  var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(t) {
    var _ref21, status;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/me');

          case 2:
            _ref21 = _context11.sent;
            status = _ref21.status;

            t.true(status === 401);

          case 5:
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

_ava2.default.serial('GET /users/:id 200', function () {
  var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(t) {
    var _ref23, status, body;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/' + t.context.user1.id);

          case 2:
            _ref23 = _context12.sent;
            status = _ref23.status;
            body = _ref23.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.id === t.context.user1.id);

          case 8:
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

_ava2.default.serial('GET /users/:id 404', function () {
  var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(t) {
    var _ref25, status;

    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _supertestAsPromised2.default)(app()).get('/123456789098765432123456');

          case 2:
            _ref25 = _context13.sent;
            status = _ref25.status;

            t.true(status === 404);

          case 5:
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

_ava2.default.serial('POST /users 201 (master)', function () {
  var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(t) {
    var _ref27, status, body;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456' });

          case 2:
            _ref27 = _context14.sent;
            status = _ref27.status;
            body = _ref27.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'd@d.com');

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

_ava2.default.serial('POST /users 201 (master)', function () {
  var _ref28 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(t) {
    var _ref29, status, body;

    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'user' });

          case 2:
            _ref29 = _context15.sent;
            status = _ref29.status;
            body = _ref29.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'd@d.com');

          case 8:
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

_ava2.default.serial('POST /users 201 (master)', function () {
  var _ref30 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(t) {
    var _ref31, status, body;

    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'admin' });

          case 2:
            _ref31 = _context16.sent;
            status = _ref31.status;
            body = _ref31.body;

            t.true(status === 201);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'd@d.com');

          case 8:
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

_ava2.default.serial('POST /users 409 (master) - duplicated email', function () {
  var _ref32 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(t) {
    var _ref33, status, body;

    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'a@a.com', password: '123456' });

          case 2:
            _ref33 = _context17.sent;
            status = _ref33.status;
            body = _ref33.body;

            t.true(status === 409);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'email');

          case 8:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function (_x17) {
    return _ref32.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 400 (master) - invalid email', function () {
  var _ref34 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(t) {
    var _ref35, status, body;

    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'invalid', password: '123456' });

          case 2:
            _ref35 = _context18.sent;
            status = _ref35.status;
            body = _ref35.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'email');

          case 8:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function (_x18) {
    return _ref34.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 400 (master) - missing email', function () {
  var _ref36 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(t) {
    var _ref37, status, body;

    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, password: '123456' });

          case 2:
            _ref37 = _context19.sent;
            status = _ref37.status;
            body = _ref37.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'email');

          case 8:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function (_x19) {
    return _ref36.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 400 (master) - invalid password', function () {
  var _ref38 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(t) {
    var _ref39, status, body;

    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123' });

          case 2:
            _ref39 = _context20.sent;
            status = _ref39.status;
            body = _ref39.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function (_x20) {
    return _ref38.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 400 (master) - missing password', function () {
  var _ref40 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(t) {
    var _ref41, status, body;

    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com' });

          case 2:
            _ref41 = _context21.sent;
            status = _ref41.status;
            body = _ref41.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function (_x21) {
    return _ref40.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 400 (master) - invalid role', function () {
  var _ref42 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(t) {
    var _ref43, status, body;

    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'invalid' });

          case 2:
            _ref43 = _context22.sent;
            status = _ref43.status;
            body = _ref43.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'role');

          case 8:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  }));

  return function (_x22) {
    return _ref42.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 401 (admin)', function () {
  var _ref44 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(t) {
    var _ref45, status;

    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: t.context.adminSession, email: 'd@d.com', password: '123456' });

          case 2:
            _ref45 = _context23.sent;
            status = _ref45.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context23.stop();
        }
      }
    }, _callee23, undefined);
  }));

  return function (_x23) {
    return _ref44.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 401 (user)', function () {
  var _ref46 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(t) {
    var _ref47, status;

    return _regenerator2.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: t.context.session1, email: 'd@d.com', password: '123456' });

          case 2:
            _ref47 = _context24.sent;
            status = _ref47.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context24.stop();
        }
      }
    }, _callee24, undefined);
  }));

  return function (_x24) {
    return _ref46.apply(this, arguments);
  };
}());

_ava2.default.serial('POST /users 401', function () {
  var _ref48 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25(t) {
    var _ref49, status;

    return _regenerator2.default.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.next = 2;
            return (0, _supertestAsPromised2.default)(app()).post('/').send({ email: 'd@d.com', password: '123456' });

          case 2:
            _ref49 = _context25.sent;
            status = _ref49.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context25.stop();
        }
      }
    }, _callee25, undefined);
  }));

  return function (_x25) {
    return _ref48.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me 200 (user)', function () {
  var _ref50 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26(t) {
    var _ref51, status, body;

    return _regenerator2.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me').send({ access_token: t.context.session1, name: 'test' });

          case 2:
            _ref51 = _context26.sent;
            status = _ref51.status;
            body = _ref51.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.name === 'test');

          case 8:
          case 'end':
            return _context26.stop();
        }
      }
    }, _callee26, undefined);
  }));

  return function (_x26) {
    return _ref50.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me 200 (user)', function () {
  var _ref52 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27(t) {
    var _ref53, status, body;

    return _regenerator2.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me').send({ access_token: t.context.session1, email: 'test@test.com' });

          case 2:
            _ref53 = _context27.sent;
            status = _ref53.status;
            body = _ref53.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'a@a.com');

          case 8:
          case 'end':
            return _context27.stop();
        }
      }
    }, _callee27, undefined);
  }));

  return function (_x27) {
    return _ref52.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me 401', function () {
  var _ref54 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28(t) {
    var _ref55, status;

    return _regenerator2.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me').send({ name: 'test' });

          case 2:
            _ref55 = _context28.sent;
            status = _ref55.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context28.stop();
        }
      }
    }, _callee28, undefined);
  }));

  return function (_x28) {
    return _ref54.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 200 (user)', function () {
  var _ref56 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29(t) {
    var _ref57, status, body;

    return _regenerator2.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id).send({ access_token: t.context.session1, name: 'test' });

          case 2:
            _ref57 = _context29.sent;
            status = _ref57.status;
            body = _ref57.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.name === 'test');

          case 8:
          case 'end':
            return _context29.stop();
        }
      }
    }, _callee29, undefined);
  }));

  return function (_x29) {
    return _ref56.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 200 (user)', function () {
  var _ref58 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee30(t) {
    var _ref59, status, body;

    return _regenerator2.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id).send({ access_token: t.context.session1, email: 'test@test.com' });

          case 2:
            _ref59 = _context30.sent;
            status = _ref59.status;
            body = _ref59.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'a@a.com');

          case 8:
          case 'end':
            return _context30.stop();
        }
      }
    }, _callee30, undefined);
  }));

  return function (_x30) {
    return _ref58.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 200 (admin)', function () {
  var _ref60 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee31(t) {
    var _ref61, status, body;

    return _regenerator2.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id).send({ access_token: t.context.adminSession, name: 'test' });

          case 2:
            _ref61 = _context31.sent;
            status = _ref61.status;
            body = _ref61.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.name === 'test');

          case 8:
          case 'end':
            return _context31.stop();
        }
      }
    }, _callee31, undefined);
  }));

  return function (_x31) {
    return _ref60.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 401 (user) - another user', function () {
  var _ref62 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee32(t) {
    var _ref63, status;

    return _regenerator2.default.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            _context32.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id).send({ access_token: t.context.session2, name: 'test' });

          case 2:
            _ref63 = _context32.sent;
            status = _ref63.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context32.stop();
        }
      }
    }, _callee32, undefined);
  }));

  return function (_x32) {
    return _ref62.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 401', function () {
  var _ref64 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee33(t) {
    var _ref65, status;

    return _regenerator2.default.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            _context33.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id).send({ name: 'test' });

          case 2:
            _ref65 = _context33.sent;
            status = _ref65.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context33.stop();
        }
      }
    }, _callee33, undefined);
  }));

  return function (_x33) {
    return _ref64.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id 404 (admin)', function () {
  var _ref66 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee34(t) {
    var _ref67, status;

    return _regenerator2.default.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            _context34.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456').send({ access_token: t.context.adminSession, name: 'test' });

          case 2:
            _ref67 = _context34.sent;
            status = _ref67.status;

            t.true(status === 404);

          case 5:
          case 'end':
            return _context34.stop();
        }
      }
    }, _callee34, undefined);
  }));

  return function (_x34) {
    return _ref66.apply(this, arguments);
  };
}());

var passwordMatch = function () {
  var _ref68 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee35(password, userId) {
    var user;
    return _regenerator2.default.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            _context35.next = 2;
            return _.User.findById(userId);

          case 2:
            user = _context35.sent;
            _context35.next = 5;
            return user.authenticate(password);

          case 5:
            return _context35.abrupt('return', !!_context35.sent);

          case 6:
          case 'end':
            return _context35.stop();
        }
      }
    }, _callee35, undefined);
  }));

  return function passwordMatch(_x35, _x36) {
    return _ref68.apply(this, arguments);
  };
}();

_ava2.default.serial('PUT /users/me/password 200 (user)', function () {
  var _ref69 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee36(t) {
    var _ref70, status, body;

    return _regenerator2.default.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            _context36.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me/password').auth('a@a.com', '123456').send({ password: '654321' });

          case 2:
            _ref70 = _context36.sent;
            status = _ref70.status;
            body = _ref70.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'a@a.com');
            _context36.t0 = t;
            _context36.next = 11;
            return passwordMatch('654321', body.id);

          case 11:
            _context36.t1 = _context36.sent;

            _context36.t0.true.call(_context36.t0, _context36.t1);

          case 13:
          case 'end':
            return _context36.stop();
        }
      }
    }, _callee36, undefined);
  }));

  return function (_x37) {
    return _ref69.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me/password 400 (user) - invalid password', function () {
  var _ref71 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee37(t) {
    var _ref72, status, body;

    return _regenerator2.default.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            _context37.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me/password').auth('a@a.com', '123456').send({ password: '321' });

          case 2:
            _ref72 = _context37.sent;
            status = _ref72.status;
            body = _ref72.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context37.stop();
        }
      }
    }, _callee37, undefined);
  }));

  return function (_x38) {
    return _ref71.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me/password 401 (user) - invalid authentication method', function () {
  var _ref73 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee38(t) {
    var _ref74, status;

    return _regenerator2.default.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            _context38.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me/password').send({ access_token: t.context.session1, password: '654321' });

          case 2:
            _ref74 = _context38.sent;
            status = _ref74.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context38.stop();
        }
      }
    }, _callee38, undefined);
  }));

  return function (_x39) {
    return _ref73.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/me/password 401', function () {
  var _ref75 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee39(t) {
    var _ref76, status;

    return _regenerator2.default.wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            _context39.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/me/password').send({ password: '654321' });

          case 2:
            _ref76 = _context39.sent;
            status = _ref76.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context39.stop();
        }
      }
    }, _callee39, undefined);
  }));

  return function (_x40) {
    return _ref75.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 200 (user)', function () {
  var _ref77 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee40(t) {
    var _ref78, status, body;

    return _regenerator2.default.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            _context40.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id + '/password').auth('a@a.com', '123456').send({ password: '654321' });

          case 2:
            _ref78 = _context40.sent;
            status = _ref78.status;
            body = _ref78.body;

            t.true(status === 200);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.email === 'a@a.com');
            _context40.t0 = t;
            _context40.next = 11;
            return passwordMatch('654321', body.id);

          case 11:
            _context40.t1 = _context40.sent;

            _context40.t0.true.call(_context40.t0, _context40.t1);

          case 13:
          case 'end':
            return _context40.stop();
        }
      }
    }, _callee40, undefined);
  }));

  return function (_x41) {
    return _ref77.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 400 (user) - invalid password', function () {
  var _ref79 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee41(t) {
    var _ref80, status, body;

    return _regenerator2.default.wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            _context41.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id + '/password').auth('a@a.com', '123456').send({ password: '321' });

          case 2:
            _ref80 = _context41.sent;
            status = _ref80.status;
            body = _ref80.body;

            t.true(status === 400);
            t.true((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object');
            t.true(body.param === 'password');

          case 8:
          case 'end':
            return _context41.stop();
        }
      }
    }, _callee41, undefined);
  }));

  return function (_x42) {
    return _ref79.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 401 (user) - another user', function () {
  var _ref81 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee42(t) {
    var _ref82, status;

    return _regenerator2.default.wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            _context42.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id + '/password').auth('b@b.com', '123456').send({ password: '654321' });

          case 2:
            _ref82 = _context42.sent;
            status = _ref82.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context42.stop();
        }
      }
    }, _callee42, undefined);
  }));

  return function (_x43) {
    return _ref81.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 401 (user) - invalid authentication method', function () {
  var _ref83 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee43(t) {
    var _ref84, status;

    return _regenerator2.default.wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            _context43.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id + '/password').send({ access_token: t.context.session1, password: '654321' });

          case 2:
            _ref84 = _context43.sent;
            status = _ref84.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context43.stop();
        }
      }
    }, _callee43, undefined);
  }));

  return function (_x44) {
    return _ref83.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 401', function () {
  var _ref85 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee44(t) {
    var _ref86, status;

    return _regenerator2.default.wrap(function _callee44$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            _context44.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/' + t.context.user1.id + '/password').send({ password: '654321' });

          case 2:
            _ref86 = _context44.sent;
            status = _ref86.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context44.stop();
        }
      }
    }, _callee44, undefined);
  }));

  return function (_x45) {
    return _ref85.apply(this, arguments);
  };
}());

_ava2.default.serial('PUT /users/:id/password 404 (user)', function () {
  var _ref87 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee45(t) {
    var _ref88, status;

    return _regenerator2.default.wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            _context45.next = 2;
            return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456/password').auth('a@a.com', '123456').send({ password: '654321' });

          case 2:
            _ref88 = _context45.sent;
            status = _ref88.status;

            t.true(status === 404);

          case 5:
          case 'end':
            return _context45.stop();
        }
      }
    }, _callee45, undefined);
  }));

  return function (_x46) {
    return _ref87.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /users/:id 204 (admin)', function () {
  var _ref89 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee46(t) {
    var _ref90, status;

    return _regenerator2.default.wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            _context46.next = 2;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + t.context.user1.id).send({ access_token: t.context.adminSession });

          case 2:
            _ref90 = _context46.sent;
            status = _ref90.status;

            t.true(status === 204);

          case 5:
          case 'end':
            return _context46.stop();
        }
      }
    }, _callee46, undefined);
  }));

  return function (_x47) {
    return _ref89.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /users/:id 401 (user)', function () {
  var _ref91 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee47(t) {
    var _ref92, status;

    return _regenerator2.default.wrap(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            _context47.next = 2;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + t.context.user1.id).send({ access_token: t.context.session1 });

          case 2:
            _ref92 = _context47.sent;
            status = _ref92.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context47.stop();
        }
      }
    }, _callee47, undefined);
  }));

  return function (_x48) {
    return _ref91.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /users/:id 401', function () {
  var _ref93 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee48(t) {
    var _ref94, status;

    return _regenerator2.default.wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            _context48.next = 2;
            return (0, _supertestAsPromised2.default)(app()).delete('/' + t.context.user1.id);

          case 2:
            _ref94 = _context48.sent;
            status = _ref94.status;

            t.true(status === 401);

          case 5:
          case 'end':
            return _context48.stop();
        }
      }
    }, _callee48, undefined);
  }));

  return function (_x49) {
    return _ref93.apply(this, arguments);
  };
}());

_ava2.default.serial('DELETE /users/:id 404 (admin)', function () {
  var _ref95 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee49(t) {
    var _ref96, status;

    return _regenerator2.default.wrap(function _callee49$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            _context49.next = 2;
            return (0, _supertestAsPromised2.default)(app()).delete('/123456789098765432123456').send({ access_token: t.context.adminSession });

          case 2:
            _ref96 = _context49.sent;
            status = _ref96.status;

            t.true(status === 404);

          case 5:
          case 'end':
            return _context49.stop();
        }
      }
    }, _callee49, undefined);
  }));

  return function (_x50) {
    return _ref95.apply(this, arguments);
  };
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvdXNlci91c2VyLnJvdXRlci50ZXN0LmpzIl0sIm5hbWVzIjpbImFwcCIsImJlZm9yZSIsInQiLCJjb25uZWN0IiwiYmVmb3JlRWFjaCIsImNyZWF0ZSIsIm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwicm9sZSIsInVzZXIxIiwidXNlcjIiLCJhZG1pbiIsInNlc3Npb24xIiwiaWQiLCJzZXNzaW9uMiIsImFkbWluU2Vzc2lvbiIsImNvbnRleHQiLCJhZnRlckVhY2giLCJhbHdheXMiLCJyZW1vdmUiLCJzZXJpYWwiLCJnZXQiLCJxdWVyeSIsImFjY2Vzc190b2tlbiIsInN0YXR1cyIsImJvZHkiLCJ0cnVlIiwiQXJyYXkiLCJpc0FycmF5IiwicGFnZSIsImxpbWl0IiwibGVuZ3RoIiwicSIsImZpZWxkcyIsImRlZXBFcXVhbCIsInBvc3QiLCJzZW5kIiwicGFyYW0iLCJwdXQiLCJwYXNzd29yZE1hdGNoIiwidXNlcklkIiwiZmluZEJ5SWQiLCJ1c2VyIiwiYXV0aGVudGljYXRlIiwiYXV0aCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTTtBQUFBLFNBQU0sa0NBQU47QUFBQSxDQUFaOztBQUVBLGNBQUtDLE1BQUw7QUFBQSx3RUFBWSxpQkFBT0MsQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDSiw0Q0FESTs7QUFBQTtBQUFBO0FBQUEsbUJBRUosbUJBQVNDLE9BQVQsQ0FBaUIsRUFBakIsQ0FGSTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtBLGNBQUtDLFVBQUw7QUFBQSx5RUFBZ0Isa0JBQU9GLENBQVA7QUFBQTs7QUFB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNWLG1DQUFRRixLQUFSLEVBQ3RCOEMsTUFEc0IsT0FDWDVDLEVBQUVlLE9BQUYsQ0FBVVAsS0FBVixDQUFnQkksRUFETCxDQURVOztBQUFBO0FBQUE7QUFDM0JXLGtCQUQyQixVQUMzQkEsTUFEMkI7O0FBR25DdkIsY0FBRXlCLElBQUYsQ0FBT0YsV0FBVyxHQUFsQjs7QUFIbUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBckM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUEsY0FBS0osTUFBTCxDQUFZLCtCQUFaO0FBQUEsMEVBQTZDLG1CQUFPbkIsQ0FBUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDbEIsbUNBQVFGLEtBQVIsRUFDdEI4QyxNQURzQixDQUNmLDJCQURlLEVBRXRCVCxJQUZzQixDQUVqQixFQUFFYixjQUFjdEIsRUFBRWUsT0FBRixDQUFVRCxZQUExQixFQUZpQixDQURrQjs7QUFBQTtBQUFBO0FBQ25DUyxrQkFEbUMsVUFDbkNBLE1BRG1DOztBQUkzQ3ZCLGNBQUV5QixJQUFGLENBQU9GLFdBQVcsR0FBbEI7O0FBSjJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQTdDOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InVzZXIucm91dGVyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcnRlc3QtYXMtcHJvbWlzZWQnXG5pbXBvcnQgbW9ja2dvb3NlIGZyb20gJ21vY2tnb29zZSdcbmltcG9ydCB7IG1hc3RlcktleSB9IGZyb20gJy4uLy4uL2NvbmZpZydcbmltcG9ydCB7IHNpZ25TeW5jIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvand0J1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnLi4vLi4vY29uZmlnL2V4cHJlc3MnXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnLi4vLi4vY29uZmlnL21vbmdvb3NlJ1xuaW1wb3J0IHJvdXRlcywgeyBVc2VyIH0gZnJvbSAnLidcblxuY29uc3QgYXBwID0gKCkgPT4gZXhwcmVzcyhyb3V0ZXMpXG5cbnRlc3QuYmVmb3JlKGFzeW5jICh0KSA9PiB7XG4gIGF3YWl0IG1vY2tnb29zZShtb25nb29zZSlcbiAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdCgnJylcbn0pXG5cbnRlc3QuYmVmb3JlRWFjaChhc3luYyAodCkgPT4ge1xuICBjb25zdCBbIHVzZXIxLCB1c2VyMiwgYWRtaW4gXSA9IGF3YWl0IFVzZXIuY3JlYXRlKFtcbiAgICB7IG5hbWU6ICd1c2VyJywgZW1haWw6ICdhQGEuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0sXG4gICAgeyBuYW1lOiAndXNlcicsIGVtYWlsOiAnYkBiLmNvbScsIHBhc3N3b3JkOiAnMTIzNDU2JyB9LFxuICAgIHsgZW1haWw6ICdjQGMuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnLCByb2xlOiAnYWRtaW4nIH1cbiAgXSlcbiAgY29uc3QgWyBzZXNzaW9uMSwgc2Vzc2lvbjIsIGFkbWluU2Vzc2lvbiBdID0gW1xuICAgIHNpZ25TeW5jKHVzZXIxLmlkKSxcbiAgICBzaWduU3luYyh1c2VyMi5pZCksXG4gICAgc2lnblN5bmMoYWRtaW4uaWQpXG4gIF1cbiAgdC5jb250ZXh0ID0geyAuLi50LmNvbnRleHQsIHVzZXIxLCB1c2VyMiwgc2Vzc2lvbjEsIHNlc3Npb24yLCBhZG1pblNlc3Npb24gfVxufSlcblxudGVzdC5hZnRlckVhY2guYWx3YXlzKGFzeW5jICh0KSA9PiB7XG4gIGF3YWl0IFVzZXIucmVtb3ZlKClcbn0pXG5cbnRlc3Quc2VyaWFsKCdHRVQgL3VzZXJzIDIwMCAoYWRtaW4pJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmdldCgnLycpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuYWRtaW5TZXNzaW9uIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwMClcbiAgdC50cnVlKEFycmF5LmlzQXJyYXkoYm9keSkpXG59KVxuXG50ZXN0LnNlcmlhbCgnR0VUIC91c2Vycz9wYWdlPTImbGltaXQ9MSAyMDAgKGFkbWluKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5nZXQoJy8nKVxuICAgIC5xdWVyeSh7IGFjY2Vzc190b2tlbjogdC5jb250ZXh0LmFkbWluU2Vzc2lvbiwgcGFnZTogMiwgbGltaXQ6IDEgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUoQXJyYXkuaXNBcnJheShib2R5KSlcbiAgdC50cnVlKGJvZHkubGVuZ3RoID09PSAxKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvdXNlcnM/cT11c2VyIDIwMCAoYWRtaW4pJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmdldCgnLycpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuYWRtaW5TZXNzaW9uLCBxOiAndXNlcicgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUoQXJyYXkuaXNBcnJheShib2R5KSlcbiAgdC50cnVlKGJvZHkubGVuZ3RoID09PSAyKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvdXNlcnM/ZmllbGRzPW5hbWUgMjAwIChhZG1pbiknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZ2V0KCcvJylcbiAgICAucXVlcnkoeyBhY2Nlc3NfdG9rZW46IHQuY29udGV4dC5hZG1pblNlc3Npb24sIGZpZWxkczogJ25hbWUnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwMClcbiAgdC50cnVlKEFycmF5LmlzQXJyYXkoYm9keSkpXG4gIHQuZGVlcEVxdWFsKE9iamVjdC5rZXlzKGJvZHlbMF0pLCBbJ2lkJywgJ25hbWUnXSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdHRVQgL3VzZXJzIDQwMSAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZ2V0KCcvJylcbiAgICAucXVlcnkoeyBhY2Nlc3NfdG9rZW46IHQuY29udGV4dC5zZXNzaW9uMSB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnR0VUIC91c2VycyA0MDEnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAuZ2V0KCcvJylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvdXNlcnMvbWUgMjAwICh1c2VyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5nZXQoJy9tZScpXG4gICAgLnF1ZXJ5KHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5pZCA9PT0gdC5jb250ZXh0LnVzZXIxLmlkKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvdXNlcnMvbWUgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmdldCgnL21lJylcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ0dFVCAvdXNlcnMvOmlkIDIwMCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5nZXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH1gKVxuICB0LnRydWUoc3RhdHVzID09PSAyMDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LmlkID09PSB0LmNvbnRleHQudXNlcjEuaWQpXG59KVxuXG50ZXN0LnNlcmlhbCgnR0VUIC91c2Vycy86aWQgNDA0JywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmdldCgnLzEyMzQ1Njc4OTA5ODc2NTQzMjEyMzQ1NicpXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwNClcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC91c2VycyAyMDEgKG1hc3RlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IG1hc3RlcktleSwgZW1haWw6ICdkQGQuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwMSlcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkuZW1haWwgPT09ICdkQGQuY29tJylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC91c2VycyAyMDEgKG1hc3RlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IG1hc3RlcktleSwgZW1haWw6ICdkQGQuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnLCByb2xlOiAndXNlcicgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAxKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5lbWFpbCA9PT0gJ2RAZC5jb20nKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL3VzZXJzIDIwMSAobWFzdGVyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5LCBlbWFpbDogJ2RAZC5jb20nLCBwYXNzd29yZDogJzEyMzQ1NicsIHJvbGU6ICdhZG1pbicgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAxKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5lbWFpbCA9PT0gJ2RAZC5jb20nKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL3VzZXJzIDQwOSAobWFzdGVyKSAtIGR1cGxpY2F0ZWQgZW1haWwnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IG1hc3RlcktleSwgZW1haWw6ICdhQGEuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwOSlcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdlbWFpbCcpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvdXNlcnMgNDAwIChtYXN0ZXIpIC0gaW52YWxpZCBlbWFpbCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5LCBlbWFpbDogJ2ludmFsaWQnLCBwYXNzd29yZDogJzEyMzQ1NicgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5wYXJhbSA9PT0gJ2VtYWlsJylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC91c2VycyA0MDAgKG1hc3RlcikgLSBtaXNzaW5nIGVtYWlsJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiBtYXN0ZXJLZXksIHBhc3N3b3JkOiAnMTIzNDU2JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LnBhcmFtID09PSAnZW1haWwnKVxufSlcblxudGVzdC5zZXJpYWwoJ1BPU1QgL3VzZXJzIDQwMCAobWFzdGVyKSAtIGludmFsaWQgcGFzc3dvcmQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucG9zdCgnLycpXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IG1hc3RlcktleSwgZW1haWw6ICdkQGQuY29tJywgcGFzc3dvcmQ6ICcxMjMnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdwYXNzd29yZCcpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvdXNlcnMgNDAwIChtYXN0ZXIpIC0gbWlzc2luZyBwYXNzd29yZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogbWFzdGVyS2V5LCBlbWFpbDogJ2RAZC5jb20nIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdwYXNzd29yZCcpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvdXNlcnMgNDAwIChtYXN0ZXIpIC0gaW52YWxpZCByb2xlJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiBtYXN0ZXJLZXksIGVtYWlsOiAnZEBkLmNvbScsIHBhc3N3b3JkOiAnMTIzNDU2Jywgcm9sZTogJ2ludmFsaWQnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdyb2xlJylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC91c2VycyA0MDEgKGFkbWluKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wb3N0KCcvJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogdC5jb250ZXh0LmFkbWluU2Vzc2lvbiwgZW1haWw6ICdkQGQuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdQT1NUIC91c2VycyA0MDEgKHVzZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEsIGVtYWlsOiAnZEBkLmNvbScsIHBhc3N3b3JkOiAnMTIzNDU2JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUE9TVCAvdXNlcnMgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnBvc3QoJy8nKVxuICAgIC5zZW5kKHsgZW1haWw6ICdkQGQuY29tJywgcGFzc3dvcmQ6ICcxMjM0NTYnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdQVVQgL3VzZXJzL21lIDIwMCAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KCcvbWUnKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEsIG5hbWU6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSAyMDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5Lm5hbWUgPT09ICd0ZXN0Jylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQVVQgL3VzZXJzL21lIDIwMCAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KCcvbWUnKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEsIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5lbWFpbCA9PT0gJ2FAYS5jb20nKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvbWUgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dCgnL21lJylcbiAgICAuc2VuZCh7IG5hbWU6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQgMjAwICh1c2VyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH1gKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEsIG5hbWU6ICd0ZXN0JyB9KVxuICB0LnRydWUoc3RhdHVzID09PSAyMDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5Lm5hbWUgPT09ICd0ZXN0Jylcbn0pXG5cbnRlc3Quc2VyaWFsKCdQVVQgL3VzZXJzLzppZCAyMDAgKHVzZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMsIGJvZHkgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dChgLyR7dC5jb250ZXh0LnVzZXIxLmlkfWApXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IHQuY29udGV4dC5zZXNzaW9uMSwgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICB0LnRydWUoc3RhdHVzID09PSAyMDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LmVtYWlsID09PSAnYUBhLmNvbScpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQgMjAwIChhZG1pbiknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KGAvJHt0LmNvbnRleHQudXNlcjEuaWR9YClcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogdC5jb250ZXh0LmFkbWluU2Vzc2lvbiwgbmFtZTogJ3Rlc3QnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkubmFtZSA9PT0gJ3Rlc3QnKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvOmlkIDQwMSAodXNlcikgLSBhbm90aGVyIHVzZXInLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KGAvJHt0LmNvbnRleHQudXNlcjEuaWR9YClcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogdC5jb250ZXh0LnNlc3Npb24yLCBuYW1lOiAndGVzdCcgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvOmlkIDQwMScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH1gKVxuICAgIC5zZW5kKHsgbmFtZTogJ3Rlc3QnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdQVVQgL3VzZXJzLzppZCA0MDQgKGFkbWluKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoJy8xMjM0NTY3ODkwOTg3NjU0MzIxMjM0NTYnKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuYWRtaW5TZXNzaW9uLCBuYW1lOiAndGVzdCcgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDA0KVxufSlcblxuY29uc3QgcGFzc3dvcmRNYXRjaCA9IGFzeW5jIChwYXNzd29yZCwgdXNlcklkKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHVzZXJJZClcbiAgcmV0dXJuICEhYXdhaXQgdXNlci5hdXRoZW50aWNhdGUocGFzc3dvcmQpXG59XG5cbnRlc3Quc2VyaWFsKCdQVVQgL3VzZXJzL21lL3Bhc3N3b3JkIDIwMCAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KCcvbWUvcGFzc3dvcmQnKVxuICAgIC5hdXRoKCdhQGEuY29tJywgJzEyMzQ1NicpXG4gICAgLnNlbmQoeyBwYXNzd29yZDogJzY1NDMyMScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5lbWFpbCA9PT0gJ2FAYS5jb20nKVxuICB0LnRydWUoYXdhaXQgcGFzc3dvcmRNYXRjaCgnNjU0MzIxJywgYm9keS5pZCkpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy9tZS9wYXNzd29yZCA0MDAgKHVzZXIpIC0gaW52YWxpZCBwYXNzd29yZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoJy9tZS9wYXNzd29yZCcpXG4gICAgLmF1dGgoJ2FAYS5jb20nLCAnMTIzNDU2JylcbiAgICAuc2VuZCh7IHBhc3N3b3JkOiAnMzIxJyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDApXG4gIHQudHJ1ZSh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpXG4gIHQudHJ1ZShib2R5LnBhcmFtID09PSAncGFzc3dvcmQnKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvbWUvcGFzc3dvcmQgNDAxICh1c2VyKSAtIGludmFsaWQgYXV0aGVudGljYXRpb24gbWV0aG9kJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dCgnL21lL3Bhc3N3b3JkJylcbiAgICAuc2VuZCh7IGFjY2Vzc190b2tlbjogdC5jb250ZXh0LnNlc3Npb24xLCBwYXNzd29yZDogJzY1NDMyMScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvbWUvcGFzc3dvcmQgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dCgnL21lL3Bhc3N3b3JkJylcbiAgICAuc2VuZCh7IHBhc3N3b3JkOiAnNjU0MzIxJyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQvcGFzc3dvcmQgMjAwICh1c2VyKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzLCBib2R5IH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH0vcGFzc3dvcmRgKVxuICAgIC5hdXRoKCdhQGEuY29tJywgJzEyMzQ1NicpXG4gICAgLnNlbmQoeyBwYXNzd29yZDogJzY1NDMyMScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gMjAwKVxuICB0LnRydWUodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKVxuICB0LnRydWUoYm9keS5lbWFpbCA9PT0gJ2FAYS5jb20nKVxuICB0LnRydWUoYXdhaXQgcGFzc3dvcmRNYXRjaCgnNjU0MzIxJywgYm9keS5pZCkpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQvcGFzc3dvcmQgNDAwICh1c2VyKSAtIGludmFsaWQgcGFzc3dvcmQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cywgYm9keSB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KGAvJHt0LmNvbnRleHQudXNlcjEuaWR9L3Bhc3N3b3JkYClcbiAgICAuYXV0aCgnYUBhLmNvbScsICcxMjM0NTYnKVxuICAgIC5zZW5kKHsgcGFzc3dvcmQ6ICczMjEnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMClcbiAgdC50cnVlKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JylcbiAgdC50cnVlKGJvZHkucGFyYW0gPT09ICdwYXNzd29yZCcpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQvcGFzc3dvcmQgNDAxICh1c2VyKSAtIGFub3RoZXIgdXNlcicsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH0vcGFzc3dvcmRgKVxuICAgIC5hdXRoKCdiQGIuY29tJywgJzEyMzQ1NicpXG4gICAgLnNlbmQoeyBwYXNzd29yZDogJzY1NDMyMScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvOmlkL3Bhc3N3b3JkIDQwMSAodXNlcikgLSBpbnZhbGlkIGF1dGhlbnRpY2F0aW9uIG1ldGhvZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5wdXQoYC8ke3QuY29udGV4dC51c2VyMS5pZH0vcGFzc3dvcmRgKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuc2Vzc2lvbjEsIHBhc3N3b3JkOiAnNjU0MzIxJyB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnUFVUIC91c2Vycy86aWQvcGFzc3dvcmQgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLnB1dChgLyR7dC5jb250ZXh0LnVzZXIxLmlkfS9wYXNzd29yZGApXG4gICAgLnNlbmQoeyBwYXNzd29yZDogJzY1NDMyMScgfSlcbiAgdC50cnVlKHN0YXR1cyA9PT0gNDAxKVxufSlcblxudGVzdC5zZXJpYWwoJ1BVVCAvdXNlcnMvOmlkL3Bhc3N3b3JkIDQwNCAodXNlciknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdChhcHAoKSlcbiAgICAucHV0KCcvMTIzNDU2Nzg5MDk4NzY1NDMyMTIzNDU2L3Bhc3N3b3JkJylcbiAgICAuYXV0aCgnYUBhLmNvbScsICcxMjM0NTYnKVxuICAgIC5zZW5kKHsgcGFzc3dvcmQ6ICc2NTQzMjEnIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwNClcbn0pXG5cbnRlc3Quc2VyaWFsKCdERUxFVEUgL3VzZXJzLzppZCAyMDQgKGFkbWluKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5kZWxldGUoYC8ke3QuY29udGV4dC51c2VyMS5pZH1gKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuYWRtaW5TZXNzaW9uIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDIwNClcbn0pXG5cbnRlc3Quc2VyaWFsKCdERUxFVEUgL3VzZXJzLzppZCA0MDEgKHVzZXIpJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmRlbGV0ZShgLyR7dC5jb250ZXh0LnVzZXIxLmlkfWApXG4gICAgLnNlbmQoeyBhY2Nlc3NfdG9rZW46IHQuY29udGV4dC5zZXNzaW9uMSB9KVxuICB0LnRydWUoc3RhdHVzID09PSA0MDEpXG59KVxuXG50ZXN0LnNlcmlhbCgnREVMRVRFIC91c2Vycy86aWQgNDAxJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IGF3YWl0IHJlcXVlc3QoYXBwKCkpXG4gICAgLmRlbGV0ZShgLyR7dC5jb250ZXh0LnVzZXIxLmlkfWApXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwMSlcbn0pXG5cbnRlc3Quc2VyaWFsKCdERUxFVEUgL3VzZXJzLzppZCA0MDQgKGFkbWluKScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc3RhdHVzIH0gPSBhd2FpdCByZXF1ZXN0KGFwcCgpKVxuICAgIC5kZWxldGUoJy8xMjM0NTY3ODkwOTg3NjU0MzIxMjM0NTYnKVxuICAgIC5zZW5kKHsgYWNjZXNzX3Rva2VuOiB0LmNvbnRleHQuYWRtaW5TZXNzaW9uIH0pXG4gIHQudHJ1ZShzdGF0dXMgPT09IDQwNClcbn0pXG4iXX0=