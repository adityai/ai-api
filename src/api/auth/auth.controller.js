'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _jwt = require('../../services/jwt');

var _response = require('../../services/response/');

var login = exports.login = function login(_ref, res, next) {
  var user = _ref.user;
  return (0, _jwt.sign)(user.id).then(function (token) {
    return { token: token, user: user.view(true) };
  }).then((0, _response.success)(res, 201)).catch(next);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsibG9naW4iLCJyZXMiLCJuZXh0IiwidXNlciIsImlkIiwidGhlbiIsInRva2VuIiwidmlldyIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRU8sSUFBTUEsd0JBQVEsU0FBUkEsS0FBUSxPQUFXQyxHQUFYLEVBQWdCQyxJQUFoQjtBQUFBLE1BQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLFNBQ25CLGVBQUtBLEtBQUtDLEVBQVYsRUFDR0MsSUFESCxDQUNRLFVBQUNDLEtBQUQ7QUFBQSxXQUFZLEVBQUVBLFlBQUYsRUFBU0gsTUFBTUEsS0FBS0ksSUFBTCxDQUFVLElBQVYsQ0FBZixFQUFaO0FBQUEsR0FEUixFQUVHRixJQUZILENBRVEsdUJBQVFKLEdBQVIsRUFBYSxHQUFiLENBRlIsRUFHR08sS0FISCxDQUdTTixJQUhULENBRG1CO0FBQUEsQ0FBZCIsImZpbGUiOiJhdXRoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaWduIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvand0J1xuaW1wb3J0IHsgc3VjY2VzcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Jlc3BvbnNlLydcblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKHsgdXNlciB9LCByZXMsIG5leHQpID0+XG4gIHNpZ24odXNlci5pZClcbiAgICAudGhlbigodG9rZW4pID0+ICh7IHRva2VuLCB1c2VyOiB1c2VyLnZpZXcodHJ1ZSkgfSkpXG4gICAgLnRoZW4oc3VjY2VzcyhyZXMsIDIwMSkpXG4gICAgLmNhdGNoKG5leHQpXG4iXX0=