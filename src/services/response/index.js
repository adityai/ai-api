"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = success;
exports.notFound = notFound;
function success(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
    return null;
  };
}

function notFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9yZXNwb25zZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJzdWNjZXNzIiwibm90Rm91bmQiLCJyZXMiLCJzdGF0dXNDb2RlIiwiZW50aXR5Iiwic3RhdHVzIiwianNvbiIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0JBLE8sR0FBQUEsTztRQVVBQyxRLEdBQUFBLFE7QUFWVCxTQUFTRCxPQUFULENBQWtCRSxHQUFsQixFQUF1QkMsVUFBdkIsRUFBbUM7QUFDeENBLGVBQWFBLGNBQWMsR0FBM0I7QUFDQSxTQUFPLFVBQVVDLE1BQVYsRUFBa0I7QUFDdkIsUUFBSUEsTUFBSixFQUFZO0FBQ1ZGLFVBQUlHLE1BQUosQ0FBV0YsVUFBWCxFQUF1QkcsSUFBdkIsQ0FBNEJGLE1BQTVCO0FBQ0Q7QUFDRCxXQUFPLElBQVA7QUFDRCxHQUxEO0FBTUQ7O0FBRU0sU0FBU0gsUUFBVCxDQUFtQkMsR0FBbkIsRUFBd0I7QUFDN0IsU0FBTyxVQUFVRSxNQUFWLEVBQWtCO0FBQ3ZCLFFBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1hGLFVBQUlHLE1BQUosQ0FBVyxHQUFYLEVBQWdCRSxHQUFoQjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0QsV0FBT0gsTUFBUDtBQUNELEdBTkQ7QUFPRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzdWNjZXNzIChyZXMsIHN0YXR1c0NvZGUpIHtcbiAgc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGUgfHwgMjAwXG4gIHJldHVybiBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgaWYgKGVudGl0eSkge1xuICAgICAgcmVzLnN0YXR1cyhzdGF0dXNDb2RlKS5qc29uKGVudGl0eSlcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90Rm91bmQgKHJlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgIGlmICghZW50aXR5KSB7XG4gICAgICByZXMuc3RhdHVzKDQwNCkuZW5kKClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiBlbnRpdHlcbiAgfVxufVxuIl19