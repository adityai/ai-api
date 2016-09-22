'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = exports.master = exports.facebook = exports.basic = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodymen = require('bodymen');

var _passportHttp = require('passport-http');

var _passportHttpBearer = require('passport-http-bearer');

var _passportJwt = require('passport-jwt');

var _config = require('../../config');

var _facebook = require('../facebook');

var _user = require('../../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basic = exports.basic = function basic() {
  return function (req, res, next) {
    return _passport2.default.authenticate('basic', { session: false }, function (err, user, info) {
      if (err && err.param) {
        return res.status(400).json(err);
      } else if (err || !user) {
        return res.status(401).end();
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) return res.status(401).end();
        next();
      });
    })(req, res, next);
  };
};

var facebook = exports.facebook = function facebook() {
  return _passport2.default.authenticate('facebook', { session: false });
};

var master = exports.master = function master() {
  return _passport2.default.authenticate('master', { session: false });
};

var session = exports.session = function session() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var required = _ref.required;
  var _ref$roles = _ref.roles;
  var roles = _ref$roles === undefined ? _user2.default.roles : _ref$roles;
  return function (req, res, next) {
    return _passport2.default.authenticate('session', { session: false }, function (err, user, info) {
      // console.log(err, user, info)
      if (err || required && !user || required && !~roles.indexOf(user.role)) {
        return res.status(401).end();
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) return res.status(401).end();
        next();
      });
    })(req, res, next);
  };
};

_passport2.default.use('basic', new _passportHttp.BasicStrategy(function (email, password, done) {
  var userSchema = new _bodymen.Schema({ email: _user.schema.tree.email, password: _user.schema.tree.password });

  userSchema.validate({ email: email, password: password }, function (err) {
    if (err) done(err);
  });

  _user2.default.findOne({ email: email }).then(function (user) {
    if (!user) {
      done(true);
      return null;
    }
    return user.authenticate(password, user.password).then(function (user) {
      done(null, user);
      return null;
    }).catch(done);
  });
}));

_passport2.default.use('facebook', new _passportHttpBearer.Strategy(function (sessionToken, done) {
  (0, _facebook.getMe)({ sessionToken: sessionToken, fields: 'id, name, email, picture' }).then(function (user) {
    return _user2.default.createFromFacebook(user);
  }).then(function (user) {
    done(null, user);
    return null;
  }).catch(done);
}));

_passport2.default.use('master', new _passportHttpBearer.Strategy(function (token, done) {
  if (token === _config.masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
}));

_passport2.default.use('session', new _passportJwt.Strategy({
  secretOrKey: _config.jwtSecret,
  jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromUrlQueryParameter('access_token'), _passportJwt.ExtractJwt.fromBodyField('access_token'), _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer')])
}, function (_ref2, done) {
  var id = _ref2.id;

  _user2.default.findById(id).then(function (user) {
    done(null, user);
    return null;
  }).catch(done);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wYXNzcG9ydC9pbmRleC5qcyJdLCJuYW1lcyI6WyJiYXNpYyIsInJlcSIsInJlcyIsIm5leHQiLCJhdXRoZW50aWNhdGUiLCJzZXNzaW9uIiwiZXJyIiwidXNlciIsImluZm8iLCJwYXJhbSIsInN0YXR1cyIsImpzb24iLCJlbmQiLCJsb2dJbiIsImZhY2Vib29rIiwibWFzdGVyIiwicmVxdWlyZWQiLCJyb2xlcyIsImluZGV4T2YiLCJyb2xlIiwidXNlIiwiZW1haWwiLCJwYXNzd29yZCIsImRvbmUiLCJ1c2VyU2NoZW1hIiwidHJlZSIsInZhbGlkYXRlIiwiZmluZE9uZSIsInRoZW4iLCJjYXRjaCIsInNlc3Npb25Ub2tlbiIsImZpZWxkcyIsImNyZWF0ZUZyb21GYWNlYm9vayIsInRva2VuIiwic2VjcmV0T3JLZXkiLCJqd3RGcm9tUmVxdWVzdCIsImZyb21FeHRyYWN0b3JzIiwiZnJvbVVybFF1ZXJ5UGFyYW1ldGVyIiwiZnJvbUJvZHlGaWVsZCIsImZyb21BdXRoSGVhZGVyV2l0aFNjaGVtZSIsImlkIiwiZmluZEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFTyxJQUFNQSx3QkFBUSxTQUFSQSxLQUFRO0FBQUEsU0FBTSxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWDtBQUFBLFdBQ3pCLG1CQUFTQyxZQUFULENBQXNCLE9BQXRCLEVBQStCLEVBQUVDLFNBQVMsS0FBWCxFQUEvQixFQUFtRCxVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBWUMsSUFBWixFQUFxQjtBQUN0RSxVQUFJRixPQUFPQSxJQUFJRyxLQUFmLEVBQXNCO0FBQ3BCLGVBQU9QLElBQUlRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQkwsR0FBckIsQ0FBUDtBQUNELE9BRkQsTUFFTyxJQUFJQSxPQUFPLENBQUNDLElBQVosRUFBa0I7QUFDdkIsZUFBT0wsSUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JFLEdBQWhCLEVBQVA7QUFDRDtBQUNEWCxVQUFJWSxLQUFKLENBQVVOLElBQVYsRUFBZ0IsRUFBRUYsU0FBUyxLQUFYLEVBQWhCLEVBQW9DLFVBQUNDLEdBQUQsRUFBUztBQUMzQyxZQUFJQSxHQUFKLEVBQVMsT0FBT0osSUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JFLEdBQWhCLEVBQVA7QUFDVFQ7QUFDRCxPQUhEO0FBSUQsS0FWRCxFQVVHRixHQVZILEVBVVFDLEdBVlIsRUFVYUMsSUFWYixDQUR5QjtBQUFBLEdBQU47QUFBQSxDQUFkOztBQWFBLElBQU1XLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUN0QixtQkFBU1YsWUFBVCxDQUFzQixVQUF0QixFQUFrQyxFQUFFQyxTQUFTLEtBQVgsRUFBbEMsQ0FEc0I7QUFBQSxDQUFqQjs7QUFHQSxJQUFNVSwwQkFBUyxTQUFUQSxNQUFTO0FBQUEsU0FDcEIsbUJBQVNYLFlBQVQsQ0FBc0IsUUFBdEIsRUFBZ0MsRUFBRUMsU0FBUyxLQUFYLEVBQWhDLENBRG9CO0FBQUEsQ0FBZjs7QUFHQSxJQUFNQSw0QkFBVSxTQUFWQSxPQUFVO0FBQUEsbUVBQW9DLEVBQXBDOztBQUFBLE1BQUdXLFFBQUgsUUFBR0EsUUFBSDtBQUFBLHdCQUFhQyxLQUFiO0FBQUEsTUFBYUEsS0FBYiw4QkFBcUIsZUFBS0EsS0FBMUI7QUFBQSxTQUEyQyxVQUFDaEIsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVg7QUFBQSxXQUNoRSxtQkFBU0MsWUFBVCxDQUFzQixTQUF0QixFQUFpQyxFQUFFQyxTQUFTLEtBQVgsRUFBakMsRUFBcUQsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQVlDLElBQVosRUFBcUI7QUFDeEU7QUFDQSxVQUFJRixPQUFRVSxZQUFZLENBQUNULElBQXJCLElBQStCUyxZQUFZLENBQUMsQ0FBQ0MsTUFBTUMsT0FBTixDQUFjWCxLQUFLWSxJQUFuQixDQUFqRCxFQUE0RTtBQUMxRSxlQUFPakIsSUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JFLEdBQWhCLEVBQVA7QUFDRDtBQUNEWCxVQUFJWSxLQUFKLENBQVVOLElBQVYsRUFBZ0IsRUFBRUYsU0FBUyxLQUFYLEVBQWhCLEVBQW9DLFVBQUNDLEdBQUQsRUFBUztBQUMzQyxZQUFJQSxHQUFKLEVBQVMsT0FBT0osSUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JFLEdBQWhCLEVBQVA7QUFDVFQ7QUFDRCxPQUhEO0FBSUQsS0FURCxFQVNHRixHQVRILEVBU1FDLEdBVFIsRUFTYUMsSUFUYixDQURnRTtBQUFBLEdBQTNDO0FBQUEsQ0FBaEI7O0FBWVAsbUJBQVNpQixHQUFULENBQWEsT0FBYixFQUFzQixnQ0FBa0IsVUFBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxJQUFsQixFQUEyQjtBQUNqRSxNQUFNQyxhQUFhLG9CQUFXLEVBQUVILE9BQU8sYUFBT0ksSUFBUCxDQUFZSixLQUFyQixFQUE0QkMsVUFBVSxhQUFPRyxJQUFQLENBQVlILFFBQWxELEVBQVgsQ0FBbkI7O0FBRUFFLGFBQVdFLFFBQVgsQ0FBb0IsRUFBRUwsWUFBRixFQUFTQyxrQkFBVCxFQUFwQixFQUF5QyxVQUFDaEIsR0FBRCxFQUFTO0FBQ2hELFFBQUlBLEdBQUosRUFBU2lCLEtBQUtqQixHQUFMO0FBQ1YsR0FGRDs7QUFJQSxpQkFBS3FCLE9BQUwsQ0FBYSxFQUFFTixZQUFGLEVBQWIsRUFBd0JPLElBQXhCLENBQTZCLFVBQUNyQixJQUFELEVBQVU7QUFDckMsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVGdCLFdBQUssSUFBTDtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0QsV0FBT2hCLEtBQUtILFlBQUwsQ0FBa0JrQixRQUFsQixFQUE0QmYsS0FBS2UsUUFBakMsRUFBMkNNLElBQTNDLENBQWdELFVBQUNyQixJQUFELEVBQVU7QUFDL0RnQixXQUFLLElBQUwsRUFBV2hCLElBQVg7QUFDQSxhQUFPLElBQVA7QUFDRCxLQUhNLEVBR0pzQixLQUhJLENBR0VOLElBSEYsQ0FBUDtBQUlELEdBVEQ7QUFVRCxDQWpCcUIsQ0FBdEI7O0FBbUJBLG1CQUFTSCxHQUFULENBQWEsVUFBYixFQUF5QixpQ0FBbUIsVUFBQ1UsWUFBRCxFQUFlUCxJQUFmLEVBQXdCO0FBQ2xFLHVCQUFNLEVBQUVPLDBCQUFGLEVBQWdCQyxRQUFRLDBCQUF4QixFQUFOLEVBQTRESCxJQUE1RCxDQUFpRSxVQUFDckIsSUFBRCxFQUFVO0FBQ3pFLFdBQU8sZUFBS3lCLGtCQUFMLENBQXdCekIsSUFBeEIsQ0FBUDtBQUNELEdBRkQsRUFFR3FCLElBRkgsQ0FFUSxVQUFDckIsSUFBRCxFQUFVO0FBQ2hCZ0IsU0FBSyxJQUFMLEVBQVdoQixJQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FMRCxFQUtHc0IsS0FMSCxDQUtTTixJQUxUO0FBTUQsQ0FQd0IsQ0FBekI7O0FBU0EsbUJBQVNILEdBQVQsQ0FBYSxRQUFiLEVBQXVCLGlDQUFtQixVQUFDYSxLQUFELEVBQVFWLElBQVIsRUFBaUI7QUFDekQsTUFBSVUsMkJBQUosRUFBeUI7QUFDdkJWLFNBQUssSUFBTCxFQUFXLEVBQVg7QUFDRCxHQUZELE1BRU87QUFDTEEsU0FBSyxJQUFMLEVBQVcsS0FBWDtBQUNEO0FBQ0YsQ0FOc0IsQ0FBdkI7O0FBUUEsbUJBQVNILEdBQVQsQ0FBYSxTQUFiLEVBQXdCLDBCQUFnQjtBQUN0Q2MsZ0NBRHNDO0FBRXRDQyxrQkFBZ0Isd0JBQVdDLGNBQVgsQ0FBMEIsQ0FDeEMsd0JBQVdDLHFCQUFYLENBQWlDLGNBQWpDLENBRHdDLEVBRXhDLHdCQUFXQyxhQUFYLENBQXlCLGNBQXpCLENBRndDLEVBR3hDLHdCQUFXQyx3QkFBWCxDQUFvQyxRQUFwQyxDQUh3QyxDQUExQjtBQUZzQixDQUFoQixFQU9yQixpQkFBU2hCLElBQVQsRUFBa0I7QUFBQSxNQUFmaUIsRUFBZSxTQUFmQSxFQUFlOztBQUNuQixpQkFBS0MsUUFBTCxDQUFjRCxFQUFkLEVBQWtCWixJQUFsQixDQUF1QixVQUFDckIsSUFBRCxFQUFVO0FBQy9CZ0IsU0FBSyxJQUFMLEVBQVdoQixJQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRCxFQUdHc0IsS0FISCxDQUdTTixJQUhUO0FBSUQsQ0FadUIsQ0FBeEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnXG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tICdib2R5bWVuJ1xuaW1wb3J0IHsgQmFzaWNTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWh0dHAnXG5pbXBvcnQgeyBTdHJhdGVneSBhcyBCZWFyZXJTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWh0dHAtYmVhcmVyJ1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgSnd0U3RyYXRlZ3ksIEV4dHJhY3RKd3QgfSBmcm9tICdwYXNzcG9ydC1qd3QnXG5pbXBvcnQgeyBqd3RTZWNyZXQsIG1hc3RlcktleSB9IGZyb20gJy4uLy4uL2NvbmZpZydcbmltcG9ydCB7IGdldE1lIH0gZnJvbSAnLi4vZmFjZWJvb2snXG5pbXBvcnQgVXNlciwgeyBzY2hlbWEgfSBmcm9tICcuLi8uLi9hcGkvdXNlci91c2VyLm1vZGVsJ1xuXG5leHBvcnQgY29uc3QgYmFzaWMgPSAoKSA9PiAocmVxLCByZXMsIG5leHQpID0+XG4gIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnYmFzaWMnLCB7IHNlc3Npb246IGZhbHNlIH0sIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyICYmIGVyci5wYXJhbSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKGVycilcbiAgICB9IGVsc2UgaWYgKGVyciB8fCAhdXNlcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5lbmQoKVxuICAgIH1cbiAgICByZXEubG9nSW4odXNlciwgeyBzZXNzaW9uOiBmYWxzZSB9LCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmVuZCgpXG4gICAgICBuZXh0KClcbiAgICB9KVxuICB9KShyZXEsIHJlcywgbmV4dClcblxuZXhwb3J0IGNvbnN0IGZhY2Vib29rID0gKCkgPT5cbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdmYWNlYm9vaycsIHsgc2Vzc2lvbjogZmFsc2UgfSlcblxuZXhwb3J0IGNvbnN0IG1hc3RlciA9ICgpID0+XG4gIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbWFzdGVyJywgeyBzZXNzaW9uOiBmYWxzZSB9KVxuXG5leHBvcnQgY29uc3Qgc2Vzc2lvbiA9ICh7IHJlcXVpcmVkLCByb2xlcyA9IFVzZXIucm9sZXMgfSA9IHt9KSA9PiAocmVxLCByZXMsIG5leHQpID0+XG4gIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnc2Vzc2lvbicsIHsgc2Vzc2lvbjogZmFsc2UgfSwgKGVyciwgdXNlciwgaW5mbykgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGVyciwgdXNlciwgaW5mbylcbiAgICBpZiAoZXJyIHx8IChyZXF1aXJlZCAmJiAhdXNlcikgfHwgKHJlcXVpcmVkICYmICF+cm9sZXMuaW5kZXhPZih1c2VyLnJvbGUpKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5lbmQoKVxuICAgIH1cbiAgICByZXEubG9nSW4odXNlciwgeyBzZXNzaW9uOiBmYWxzZSB9LCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmVuZCgpXG4gICAgICBuZXh0KClcbiAgICB9KVxuICB9KShyZXEsIHJlcywgbmV4dClcblxucGFzc3BvcnQudXNlKCdiYXNpYycsIG5ldyBCYXNpY1N0cmF0ZWd5KChlbWFpbCwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoeyBlbWFpbDogc2NoZW1hLnRyZWUuZW1haWwsIHBhc3N3b3JkOiBzY2hlbWEudHJlZS5wYXNzd29yZCB9KVxuXG4gIHVzZXJTY2hlbWEudmFsaWRhdGUoeyBlbWFpbCwgcGFzc3dvcmQgfSwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIGRvbmUoZXJyKVxuICB9KVxuXG4gIFVzZXIuZmluZE9uZSh7IGVtYWlsIH0pLnRoZW4oKHVzZXIpID0+IHtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIGRvbmUodHJ1ZSlcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiB1c2VyLmF1dGhlbnRpY2F0ZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCkudGhlbigodXNlcikgPT4ge1xuICAgICAgZG9uZShudWxsLCB1c2VyKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9KS5jYXRjaChkb25lKVxuICB9KVxufSkpXG5cbnBhc3Nwb3J0LnVzZSgnZmFjZWJvb2snLCBuZXcgQmVhcmVyU3RyYXRlZ3koKHNlc3Npb25Ub2tlbiwgZG9uZSkgPT4ge1xuICBnZXRNZSh7IHNlc3Npb25Ub2tlbiwgZmllbGRzOiAnaWQsIG5hbWUsIGVtYWlsLCBwaWN0dXJlJyB9KS50aGVuKCh1c2VyKSA9PiB7XG4gICAgcmV0dXJuIFVzZXIuY3JlYXRlRnJvbUZhY2Vib29rKHVzZXIpXG4gIH0pLnRoZW4oKHVzZXIpID0+IHtcbiAgICBkb25lKG51bGwsIHVzZXIpXG4gICAgcmV0dXJuIG51bGxcbiAgfSkuY2F0Y2goZG9uZSlcbn0pKVxuXG5wYXNzcG9ydC51c2UoJ21hc3RlcicsIG5ldyBCZWFyZXJTdHJhdGVneSgodG9rZW4sIGRvbmUpID0+IHtcbiAgaWYgKHRva2VuID09PSBtYXN0ZXJLZXkpIHtcbiAgICBkb25lKG51bGwsIHt9KVxuICB9IGVsc2Uge1xuICAgIGRvbmUobnVsbCwgZmFsc2UpXG4gIH1cbn0pKVxuXG5wYXNzcG9ydC51c2UoJ3Nlc3Npb24nLCBuZXcgSnd0U3RyYXRlZ3koe1xuICBzZWNyZXRPcktleTogand0U2VjcmV0LFxuICBqd3RGcm9tUmVxdWVzdDogRXh0cmFjdEp3dC5mcm9tRXh0cmFjdG9ycyhbXG4gICAgRXh0cmFjdEp3dC5mcm9tVXJsUXVlcnlQYXJhbWV0ZXIoJ2FjY2Vzc190b2tlbicpLFxuICAgIEV4dHJhY3RKd3QuZnJvbUJvZHlGaWVsZCgnYWNjZXNzX3Rva2VuJyksXG4gICAgRXh0cmFjdEp3dC5mcm9tQXV0aEhlYWRlcldpdGhTY2hlbWUoJ0JlYXJlcicpXG4gIF0pXG59LCAoeyBpZCB9LCBkb25lKSA9PiB7XG4gIFVzZXIuZmluZEJ5SWQoaWQpLnRoZW4oKHVzZXIpID0+IHtcbiAgICBkb25lKG51bGwsIHVzZXIpXG4gICAgcmV0dXJuIG51bGxcbiAgfSkuY2F0Y2goZG9uZSlcbn0pKVxuIl19