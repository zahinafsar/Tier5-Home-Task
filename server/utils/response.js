exports.successResponse = (message, data) => {
  return {
    data,
    message,
  };
};

exports.errorResponse = (errorMessage) => {
  let error = errorMessage;
  if (Array.isArray(errorMessage)) {
    error = {};
    errorMessage.forEach((e) => {
      error[e.field] = e.message;
    });
  }
  return {
    error,
  };
};
