'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMe = undefined;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMe = exports.getMe = function getMe(_ref) {
  var accessToken = _ref.accessToken;
  var _ref$fields = _ref.fields;
  var fields = _ref$fields === undefined ? 'name' : _ref$fields;
  return (0, _requestPromise2.default)({
    uri: 'https://graph.facebook.com/me',
    json: true,
    qs: {
      access_token: accessToken,
      fields: fields
    }
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9mYWNlYm9vay9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRNZSIsImFjY2Vzc1Rva2VuIiwiZmllbGRzIiwidXJpIiwianNvbiIsInFzIiwiYWNjZXNzX3Rva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLHdCQUFRLFNBQVJBLEtBQVE7QUFBQSxNQUFHQyxXQUFILFFBQUdBLFdBQUg7QUFBQSx5QkFBZ0JDLE1BQWhCO0FBQUEsTUFBZ0JBLE1BQWhCLCtCQUF5QixNQUF6QjtBQUFBLFNBQ25CLDhCQUFRO0FBQ05DLFNBQUssK0JBREM7QUFFTkMsVUFBTSxJQUZBO0FBR05DLFFBQUk7QUFDRkMsb0JBQWNMLFdBRFo7QUFFRkM7QUFGRTtBQUhFLEdBQVIsQ0FEbUI7QUFBQSxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJ1xuXG5leHBvcnQgY29uc3QgZ2V0TWUgPSAoeyBhY2Nlc3NUb2tlbiwgZmllbGRzID0gJ25hbWUnIH0pID0+XG4gIHJlcXVlc3Qoe1xuICAgIHVyaTogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL21lJyxcbiAgICBqc29uOiB0cnVlLFxuICAgIHFzOiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgZmllbGRzXG4gICAgfVxuICB9KVxuIl19