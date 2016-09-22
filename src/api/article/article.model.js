'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var articleSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true
});

articleSchema.methods = {
  view: function view(full) {
    var view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? (0, _extends3.default)({}, view) : view;
  }
};

exports.default = _mongoose2.default.model('Article', articleSchema);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvYXJ0aWNsZS9hcnRpY2xlLm1vZGVsLmpzIl0sIm5hbWVzIjpbImFydGljbGVTY2hlbWEiLCJ1c2VyIiwidHlwZSIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJ0aXRsZSIsIlN0cmluZyIsImNvbnRlbnQiLCJ0aW1lc3RhbXBzIiwibWV0aG9kcyIsInZpZXciLCJmdWxsIiwiaWQiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IscUJBQVc7QUFDL0JDLFFBQU07QUFDSkMsVUFBTSxpQkFBT0MsUUFEVDtBQUVKQyxTQUFLLE1BRkQ7QUFHSkMsY0FBVTtBQUhOLEdBRHlCO0FBTS9CQyxTQUFPO0FBQ0xKLFVBQU1LO0FBREQsR0FOd0I7QUFTL0JDLFdBQVM7QUFDUE4sVUFBTUs7QUFEQztBQVRzQixDQUFYLEVBWW5CO0FBQ0RFLGNBQVk7QUFEWCxDQVptQixDQUF0Qjs7QUFnQkFULGNBQWNVLE9BQWQsR0FBd0I7QUFDdEJDLE1BRHNCLGdCQUNoQkMsSUFEZ0IsRUFDVjtBQUNWLFFBQU1ELE9BQU87QUFDWDtBQUNBRSxVQUFJLEtBQUtBLEVBRkU7QUFHWFosWUFBTSxLQUFLQSxJQUFMLENBQVVVLElBQVYsQ0FBZUMsSUFBZixDQUhLO0FBSVhOLGFBQU8sS0FBS0EsS0FKRDtBQUtYRSxlQUFTLEtBQUtBLE9BTEg7QUFNWE0saUJBQVcsS0FBS0EsU0FOTDtBQU9YQyxpQkFBVyxLQUFLQTtBQVBMLEtBQWI7O0FBVUEsV0FBT0gsa0NBQ0ZELElBREUsSUFHSEEsSUFISjtBQUlEO0FBaEJxQixDQUF4Qjs7a0JBbUJlLG1CQUFTSyxLQUFULENBQWUsU0FBZixFQUEwQmhCLGFBQTFCLEMiLCJmaWxlIjoiYXJ0aWNsZS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSdcblxuY29uc3QgYXJ0aWNsZVNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICB1c2VyOiB7XG4gICAgdHlwZTogU2NoZW1hLk9iamVjdElkLFxuICAgIHJlZjogJ1VzZXInLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgdHlwZTogU3RyaW5nXG4gIH0sXG4gIGNvbnRlbnQ6IHtcbiAgICB0eXBlOiBTdHJpbmdcbiAgfVxufSwge1xuICB0aW1lc3RhbXBzOiB0cnVlXG59KVxuXG5hcnRpY2xlU2NoZW1hLm1ldGhvZHMgPSB7XG4gIHZpZXcgKGZ1bGwpIHtcbiAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgLy8gc2ltcGxlIHZpZXdcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgdXNlcjogdGhpcy51c2VyLnZpZXcoZnVsbCksXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudCxcbiAgICAgIGNyZWF0ZWRBdDogdGhpcy5jcmVhdGVkQXQsXG4gICAgICB1cGRhdGVkQXQ6IHRoaXMudXBkYXRlZEF0XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGwgPyB7XG4gICAgICAuLi52aWV3XG4gICAgICAvLyBhZGQgcHJvcGVydGllcyBmb3IgYSBmdWxsIHZpZXdcbiAgICB9IDogdmlld1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKCdBcnRpY2xlJywgYXJ0aWNsZVNjaGVtYSlcbiJdfQ==