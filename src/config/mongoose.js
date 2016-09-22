'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _keys2.default)(_.mongo.options).forEach(function (key) {
  _mongoose2.default.set(key, _.mongo.options[key]);
});

_mongoose2.default.Promise = _bluebird2.default;
/* istanbul ignore next */
_mongoose2.default.Types.ObjectId.prototype.view = function () {
  return this.toString();
};

/* istanbul ignore next */
_mongoose2.default.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

exports.default = _mongoose2.default;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvbW9uZ29vc2UuanMiXSwibmFtZXMiOlsib3B0aW9ucyIsImZvckVhY2giLCJrZXkiLCJzZXQiLCJQcm9taXNlIiwiVHlwZXMiLCJPYmplY3RJZCIsInByb3RvdHlwZSIsInZpZXciLCJ0b1N0cmluZyIsImNvbm5lY3Rpb24iLCJvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInByb2Nlc3MiLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsb0JBQVksUUFBTUEsT0FBbEIsRUFBMkJDLE9BQTNCLENBQW1DLFVBQUNDLEdBQUQsRUFBUztBQUMxQyxxQkFBU0MsR0FBVCxDQUFhRCxHQUFiLEVBQWtCLFFBQU1GLE9BQU4sQ0FBY0UsR0FBZCxDQUFsQjtBQUNELENBRkQ7O0FBSUEsbUJBQVNFLE9BQVQ7QUFDQTtBQUNBLG1CQUFTQyxLQUFULENBQWVDLFFBQWYsQ0FBd0JDLFNBQXhCLENBQWtDQyxJQUFsQyxHQUF5QyxZQUFZO0FBQ25ELFNBQU8sS0FBS0MsUUFBTCxFQUFQO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBLG1CQUFTQyxVQUFULENBQW9CQyxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxHQUFELEVBQVM7QUFDdkNDLFVBQVFDLEtBQVIsQ0FBYywrQkFBK0JGLEdBQTdDO0FBQ0FHLFVBQVFDLElBQVIsQ0FBYSxDQUFDLENBQWQ7QUFDRCxDQUhEIiwiZmlsZSI6Im1vbmdvb3NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnXG5pbXBvcnQgeyBtb25nbyB9IGZyb20gJy4nXG5cbk9iamVjdC5rZXlzKG1vbmdvLm9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICBtb25nb29zZS5zZXQoa2V5LCBtb25nby5vcHRpb25zW2tleV0pXG59KVxuXG5tb25nb29zZS5Qcm9taXNlID0gUHJvbWlzZVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbm1vbmdvb3NlLlR5cGVzLk9iamVjdElkLnByb3RvdHlwZS52aWV3ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpXG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5tb25nb29zZS5jb25uZWN0aW9uLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgY29uc29sZS5lcnJvcignTW9uZ29EQiBjb25uZWN0aW9uIGVycm9yOiAnICsgZXJyKVxuICBwcm9jZXNzLmV4aXQoLTEpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZVxuIl19