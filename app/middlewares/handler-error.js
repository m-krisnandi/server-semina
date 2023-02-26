const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default error
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong',
  };

  // error validation dari mongoose
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  // error duplicate key
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate field value entered for ${Object.keyValue} field, please use another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `Item not found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandlerMiddleware;
