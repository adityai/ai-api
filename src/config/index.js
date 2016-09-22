'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
/* eslint-disable no-unused-vars */
var requireProcessEnv = function requireProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && !process.env.CI) {
  var dotenv = require('dotenv-safe');
  dotenv.load({
    path: _path2.default.join(__dirname, '../../.env'),
    sample: _path2.default.join(__dirname, '../../.env.example')
  });
}

var config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: _path2.default.join(__dirname, '../../'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/ai-api-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/ai-api-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/ai-api'
    }
  }
};

exports.default = _lodash2.default.merge(config.all, config[config.all.env]);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZVByb2Nlc3NFbnYiLCJuYW1lIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiTk9ERV9FTlYiLCJDSSIsImRvdGVudiIsInJlcXVpcmUiLCJsb2FkIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzYW1wbGUiLCJjb25maWciLCJhbGwiLCJyb290IiwicG9ydCIsIlBPUlQiLCJpcCIsIklQIiwibWFzdGVyS2V5Iiwiand0U2VjcmV0IiwibW9uZ28iLCJvcHRpb25zIiwiZGIiLCJzYWZlIiwidGVzdCIsInVyaSIsImRlYnVnIiwiZGV2ZWxvcG1lbnQiLCJwcm9kdWN0aW9uIiwidW5kZWZpbmVkIiwiTU9OR09EQl9VUkkiLCJtZXJnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFKQTtBQUtBLElBQU1BLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBVTtBQUNsQyxNQUFJLENBQUNDLFFBQVFDLEdBQVIsQ0FBWUYsSUFBWixDQUFMLEVBQXdCO0FBQ3RCLFVBQU0sSUFBSUcsS0FBSixDQUFVLHNCQUFzQkgsSUFBdEIsR0FBNkIsdUJBQXZDLENBQU47QUFDRDtBQUNELFNBQU9DLFFBQVFDLEdBQVIsQ0FBWUYsSUFBWixDQUFQO0FBQ0QsQ0FMRDs7QUFPQTtBQUNBLElBQUlDLFFBQVFDLEdBQVIsQ0FBWUUsUUFBWixLQUF5QixZQUF6QixJQUF5QyxDQUFDSCxRQUFRQyxHQUFSLENBQVlHLEVBQTFELEVBQThEO0FBQzVELE1BQU1DLFNBQVNDLFFBQVEsYUFBUixDQUFmO0FBQ0FELFNBQU9FLElBQVAsQ0FBWTtBQUNWQyxVQUFNLGVBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixZQUFyQixDQURJO0FBRVZDLFlBQVEsZUFBS0YsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLG9CQUFyQjtBQUZFLEdBQVo7QUFJRDs7QUFFRCxJQUFNRSxTQUFTO0FBQ2JDLE9BQUs7QUFDSFosU0FBS0QsUUFBUUMsR0FBUixDQUFZRSxRQUFaLElBQXdCLGFBRDFCO0FBRUhXLFVBQU0sZUFBS0wsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFFBQXJCLENBRkg7QUFHSEssVUFBTWYsUUFBUUMsR0FBUixDQUFZZSxJQUFaLElBQW9CLElBSHZCO0FBSUhDLFFBQUlqQixRQUFRQyxHQUFSLENBQVlpQixFQUFaLElBQWtCLFNBSm5CO0FBS0hDLGVBQVdyQixrQkFBa0IsWUFBbEIsQ0FMUjtBQU1Ic0IsZUFBV3RCLGtCQUFrQixZQUFsQixDQU5SO0FBT0h1QixXQUFPO0FBQ0xDLGVBQVM7QUFDUEMsWUFBSTtBQUNGQyxnQkFBTTtBQURKO0FBREc7QUFESjtBQVBKLEdBRFE7QUFnQmJDLFFBQU07QUFDSkosV0FBTztBQUNMSyxXQUFLLGlDQURBO0FBRUxKLGVBQVM7QUFDUEssZUFBTztBQURBO0FBRko7QUFESCxHQWhCTztBQXdCYkMsZUFBYTtBQUNYUCxXQUFPO0FBQ0xLLFdBQUssZ0NBREE7QUFFTEosZUFBUztBQUNQSyxlQUFPO0FBREE7QUFGSjtBQURJLEdBeEJBO0FBZ0NiRSxjQUFZO0FBQ1ZaLFFBQUlqQixRQUFRQyxHQUFSLENBQVlpQixFQUFaLElBQWtCWSxTQURaO0FBRVZmLFVBQU1mLFFBQVFDLEdBQVIsQ0FBWWUsSUFBWixJQUFvQixJQUZoQjtBQUdWSyxXQUFPO0FBQ0xLLFdBQUsxQixRQUFRQyxHQUFSLENBQVk4QixXQUFaLElBQTJCO0FBRDNCO0FBSEc7QUFoQ0MsQ0FBZjs7a0JBeUNlLGlCQUFFQyxLQUFGLENBQVFwQixPQUFPQyxHQUFmLEVBQW9CRCxPQUFPQSxPQUFPQyxHQUFQLENBQVdaLEdBQWxCLENBQXBCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IHJlcXVpcmVQcm9jZXNzRW52ID0gKG5hbWUpID0+IHtcbiAgaWYgKCFwcm9jZXNzLmVudltuYW1lXSkge1xuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc2V0IHRoZSAnICsgbmFtZSArICcgZW52aXJvbm1lbnQgdmFyaWFibGUnKVxuICB9XG4gIHJldHVybiBwcm9jZXNzLmVudltuYW1lXVxufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIXByb2Nlc3MuZW52LkNJKSB7XG4gIGNvbnN0IGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudi1zYWZlJylcbiAgZG90ZW52LmxvYWQoe1xuICAgIHBhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uZW52JyksXG4gICAgc2FtcGxlOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLmVudi5leGFtcGxlJylcbiAgfSlcbn1cblxuY29uc3QgY29uZmlnID0ge1xuICBhbGw6IHtcbiAgICBlbnY6IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCcsXG4gICAgcm9vdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLycpLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgOTAwMCxcbiAgICBpcDogcHJvY2Vzcy5lbnYuSVAgfHwgJzAuMC4wLjAnLFxuICAgIG1hc3RlcktleTogcmVxdWlyZVByb2Nlc3NFbnYoJ01BU1RFUl9LRVknKSxcbiAgICBqd3RTZWNyZXQ6IHJlcXVpcmVQcm9jZXNzRW52KCdKV1RfU0VDUkVUJyksXG4gICAgbW9uZ286IHtcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZGI6IHtcbiAgICAgICAgICBzYWZlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBtb25nbzoge1xuICAgICAgdXJpOiAnbW9uZ29kYjovL2xvY2FsaG9zdC9haS1hcGktdGVzdCcsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGRlYnVnOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZGV2ZWxvcG1lbnQ6IHtcbiAgICBtb25nbzoge1xuICAgICAgdXJpOiAnbW9uZ29kYjovL2xvY2FsaG9zdC9haS1hcGktZGV2JyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZGVidWc6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHByb2R1Y3Rpb246IHtcbiAgICBpcDogcHJvY2Vzcy5lbnYuSVAgfHwgdW5kZWZpbmVkLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MCxcbiAgICBtb25nbzoge1xuICAgICAgdXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdC9haS1hcGknXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IF8ubWVyZ2UoY29uZmlnLmFsbCwgY29uZmlnW2NvbmZpZy5hbGwuZW52XSlcbiJdfQ==