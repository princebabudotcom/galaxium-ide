/* 
@description: Async Handler Middleware
@route: N/A
@access: Public
*/

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

/* 
asyncHandler is a higher-order function that takes an asynchronous function (fn) as an argument and returns a new function. This new function wraps the original asynchronous function in a Promise and catches any errors that may occur during its execution. If an error occurs, it passes the error to the next middleware in the Express.js chain using the next() function. This allows for centralized error handling in Express.js applications, as any errors thrown in the asynchronous function will be caught and handled by the error-handling middleware defined in the application.
*/
