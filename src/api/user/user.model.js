'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseKeywords = require('mongoose-keywords');

var _mongooseKeywords2 = _interopRequireDefault(_mongooseKeywords);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compare = require('bluebird').promisify(_bcrypt2.default.compare);
var roles = ['user', 'admin'];

var UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  facebook: {
    id: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

UserSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    var hash = _crypto2.default.createHash('md5').update(email).digest('hex');
    this.picture = 'https://gravatar.com/avatar/' + hash + '?d=identicon';
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

UserSchema.pre('save', function (next) {
  var _this = this;

  if (!this.isModified('password')) return next();

  /* istanbul ignore next */
  var rounds = _config.env === 'test' ? 1 : 9;

  _bcrypt2.default.hash(this.password, rounds, function (err, hash) {
    /* istanbul ignore next */
    if (err) return next(err);
    _this.password = hash;
    next();
  });
});

UserSchema.methods = {
  view: function view(full) {
    var _this2 = this;

    var view = {};
    var fields = ['id', 'name', 'picture'];

    if (full) {
      fields = [].concat((0, _toConsumableArray3.default)(fields), ['email', 'createdAt']);
    }

    fields.forEach(function (field) {
      view[field] = _this2[field];
    });

    return view;
  },
  authenticate: function authenticate(password) {
    var _this3 = this;

    return compare(password, this.password).then(function (valid) {
      return valid ? _this3 : false;
    });
  }
};

UserSchema.statics = {
  roles: roles,

  createFromFacebook: function createFromFacebook(_ref) {
    var _this4 = this;

    var id = _ref.id;
    var name = _ref.name;
    var email = _ref.email;
    var picture = _ref.picture;

    return this.findOne({ $or: [{ 'facebook.id': id }, { email: email }] }).then(function (user) {
      if (user) {
        user.facebook.id = id;
        user.name = name;
        user.picture = picture.data.url;
        return user.save();
      } else {
        var password = _randToken2.default.generate(16);
        return _this4.create({
          name: name,
          email: email,
          password: password,
          facebook: { id: id },
          picture: picture && picture.data && picture.data.url
        });
      }
    });
  }
};

UserSchema.plugin(_mongooseKeywords2.default, { paths: ['email', 'name'] });

exports.default = _mongoose2.default.model('User', UserSchema);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvdXNlci91c2VyLm1vZGVsLmpzIl0sIm5hbWVzIjpbImNvbXBhcmUiLCJyZXF1aXJlIiwicHJvbWlzaWZ5Iiwicm9sZXMiLCJVc2VyU2NoZW1hIiwiZW1haWwiLCJ0eXBlIiwiU3RyaW5nIiwibWF0Y2giLCJyZXF1aXJlZCIsInVuaXF1ZSIsInRyaW0iLCJsb3dlcmNhc2UiLCJwYXNzd29yZCIsIm1pbmxlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZhY2Vib29rIiwiaWQiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJwaWN0dXJlIiwidGltZXN0YW1wcyIsInBhdGgiLCJzZXQiLCJpbmRleE9mIiwiaGFzaCIsImNyZWF0ZUhhc2giLCJ1cGRhdGUiLCJkaWdlc3QiLCJyZXBsYWNlIiwicHJlIiwibmV4dCIsImlzTW9kaWZpZWQiLCJyb3VuZHMiLCJlcnIiLCJtZXRob2RzIiwidmlldyIsImZ1bGwiLCJmaWVsZHMiLCJmb3JFYWNoIiwiZmllbGQiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwidmFsaWQiLCJzdGF0aWNzIiwiY3JlYXRlRnJvbUZhY2Vib29rIiwiZmluZE9uZSIsIiRvciIsInVzZXIiLCJkYXRhIiwidXJsIiwic2F2ZSIsImdlbmVyYXRlIiwiY3JlYXRlIiwicGx1Z2luIiwicGF0aHMiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFVBQVVDLFFBQVEsVUFBUixFQUFvQkMsU0FBcEIsQ0FBOEIsaUJBQU9GLE9BQXJDLENBQWhCO0FBQ0EsSUFBTUcsUUFBUSxDQUFDLE1BQUQsRUFBUyxPQUFULENBQWQ7O0FBRUEsSUFBTUMsYUFBYSxxQkFBVztBQUM1QkMsU0FBTztBQUNMQyxVQUFNQyxNQUREO0FBRUxDLFdBQU8sZ0JBRkY7QUFHTEMsY0FBVSxJQUhMO0FBSUxDLFlBQVEsSUFKSDtBQUtMQyxVQUFN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QUEsUUFBWGlCLE9BQVcsUUFBWEEsT0FBVzs7QUFDaEQsV0FBTyxLQUFLMEIsT0FBTCxDQUFhLEVBQUVDLEtBQUssQ0FBQyxFQUFFLGVBQWUvQixFQUFqQixFQUFELEVBQXdCLEVBQUViLFlBQUYsRUFBeEIsQ0FBUCxFQUFiLEVBQTBEdUMsSUFBMUQsQ0FBK0QsVUFBQ00sSUFBRCxFQUFVO0FBQzlFLFVBQUlBLElBQUosRUFBVTtBQUNSQSxhQUFLakMsUUFBTCxDQUFjQyxFQUFkLEdBQW1CQSxFQUFuQjtBQUNBZ0MsYUFBS25DLElBQUwsR0FBWUEsSUFBWjtBQUNBbUMsYUFBSzVCLE9BQUwsR0FBZUEsUUFBUTZCLElBQVIsQ0FBYUMsR0FBNUI7QUFDQSxlQUFPRixLQUFLRyxJQUFMLEVBQVA7QUFDRCxPQUxELE1BS087QUFDTCxZQUFNeEMsV0FBVyxvQkFBVXlDLFFBQVYsQ0FBbUIsRUFBbkIsQ0FBakI7QUFDQSxlQUFPLE9BQUtDLE1BQUwsQ0FBWTtBQUNqQnhDLG9CQURpQjtBQUVqQlYsc0JBRmlCO0FBR2pCUSw0QkFIaUI7QUFJakJJLG9CQUFVLEVBQUVDLE1BQUYsRUFKTztBQUtqQkksbUJBQVNBLFdBQVdBLFFBQVE2QixJQUFuQixJQUEyQjdCLFFBQVE2QixJQUFSLENBQWFDO0FBTGhDLFNBQVosQ0FBUDtBQU9EO0FBQ0YsS0FoQk0sQ0FBUDtBQWlCRDtBQXJCa0IsQ0FBckI7O0FBd0JBaEQsV0FBV29ELE1BQVgsNkJBQW9DLEVBQUVDLE9BQU8sQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFULEVBQXBDOztrQkFFZSxtQkFBU0MsS0FBVCxDQUFlLE1BQWYsRUFBdUJ0RCxVQUF2QixDIiwiZmlsZSI6InVzZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0J1xuaW1wb3J0IHJhbmR0b2tlbiBmcm9tICdyYW5kLXRva2VuJ1xuaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSB9IGZyb20gJ21vbmdvb3NlJ1xuaW1wb3J0IG1vbmdvb3NlS2V5d29yZHMgZnJvbSAnbW9uZ29vc2Uta2V5d29yZHMnXG5pbXBvcnQgeyBlbnYgfSBmcm9tICcuLi8uLi9jb25maWcnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCdibHVlYmlyZCcpLnByb21pc2lmeShiY3J5cHQuY29tcGFyZSlcbmNvbnN0IHJvbGVzID0gWyd1c2VyJywgJ2FkbWluJ11cblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBlbWFpbDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogL15cXFMrQFxcUytcXC5cXFMrJC8sXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdW5pcXVlOiB0cnVlLFxuICAgIHRyaW06IHRydWUsXG4gICAgbG93ZXJjYXNlOiB0cnVlXG4gIH0sXG4gIHBhc3N3b3JkOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG1pbmxlbmd0aDogNlxuICB9LFxuICBuYW1lOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGluZGV4OiB0cnVlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgZmFjZWJvb2s6IHtcbiAgICBpZDogU3RyaW5nXG4gIH0sXG4gIHJvbGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZW51bTogcm9sZXMsXG4gICAgZGVmYXVsdDogJ3VzZXInXG4gIH0sXG4gIHBpY3R1cmU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdHJpbTogdHJ1ZVxuICB9XG59LCB7XG4gIHRpbWVzdGFtcHM6IHRydWVcbn0pXG5cblVzZXJTY2hlbWEucGF0aCgnZW1haWwnKS5zZXQoZnVuY3Rpb24gKGVtYWlsKSB7XG4gIGlmICghdGhpcy5waWN0dXJlIHx8IHRoaXMucGljdHVyZS5pbmRleE9mKCdodHRwczovL2dyYXZhdGFyLmNvbScpID09PSAwKSB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUoZW1haWwpLmRpZ2VzdCgnaGV4JylcbiAgICB0aGlzLnBpY3R1cmUgPSBgaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaH0/ZD1pZGVudGljb25gXG4gIH1cblxuICBpZiAoIXRoaXMubmFtZSkge1xuICAgIHRoaXMubmFtZSA9IGVtYWlsLnJlcGxhY2UoL14oLispQC4rJC8sICckMScpXG4gIH1cblxuICByZXR1cm4gZW1haWxcbn0pXG5cblVzZXJTY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24gKG5leHQpIHtcbiAgaWYgKCF0aGlzLmlzTW9kaWZpZWQoJ3Bhc3N3b3JkJykpIHJldHVybiBuZXh0KClcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBjb25zdCByb3VuZHMgPSBlbnYgPT09ICd0ZXN0JyA/IDEgOiA5XG5cbiAgYmNyeXB0Lmhhc2godGhpcy5wYXNzd29yZCwgcm91bmRzLCAoZXJyLCBoYXNoKSA9PiB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoZXJyKSByZXR1cm4gbmV4dChlcnIpXG4gICAgdGhpcy5wYXNzd29yZCA9IGhhc2hcbiAgICBuZXh0KClcbiAgfSlcbn0pXG5cblVzZXJTY2hlbWEubWV0aG9kcyA9IHtcbiAgdmlldyAoZnVsbCkge1xuICAgIGxldCB2aWV3ID0ge31cbiAgICBsZXQgZmllbGRzID0gWydpZCcsICduYW1lJywgJ3BpY3R1cmUnXVxuXG4gICAgaWYgKGZ1bGwpIHtcbiAgICAgIGZpZWxkcyA9IFsuLi5maWVsZHMsICdlbWFpbCcsICdjcmVhdGVkQXQnXVxuICAgIH1cblxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4geyB2aWV3W2ZpZWxkXSA9IHRoaXNbZmllbGRdIH0pXG5cbiAgICByZXR1cm4gdmlld1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZSAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCkudGhlbigodmFsaWQpID0+IHZhbGlkID8gdGhpcyA6IGZhbHNlKVxuICB9XG59XG5cblVzZXJTY2hlbWEuc3RhdGljcyA9IHtcbiAgcm9sZXMsXG5cbiAgY3JlYXRlRnJvbUZhY2Vib29rICh7IGlkLCBuYW1lLCBlbWFpbCwgcGljdHVyZSB9KSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7ICRvcjogW3sgJ2ZhY2Vib29rLmlkJzogaWQgfSwgeyBlbWFpbCB9XSB9KS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB1c2VyLmZhY2Vib29rLmlkID0gaWRcbiAgICAgICAgdXNlci5uYW1lID0gbmFtZVxuICAgICAgICB1c2VyLnBpY3R1cmUgPSBwaWN0dXJlLmRhdGEudXJsXG4gICAgICAgIHJldHVybiB1c2VyLnNhdmUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSByYW5kdG9rZW4uZ2VuZXJhdGUoMTYpXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICBmYWNlYm9vazogeyBpZCB9LFxuICAgICAgICAgIHBpY3R1cmU6IHBpY3R1cmUgJiYgcGljdHVyZS5kYXRhICYmIHBpY3R1cmUuZGF0YS51cmxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cblVzZXJTY2hlbWEucGx1Z2luKG1vbmdvb3NlS2V5d29yZHMsIHsgcGF0aHM6IFsnZW1haWwnLCAnbmFtZSddIH0pXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSlcbiJdfQ==