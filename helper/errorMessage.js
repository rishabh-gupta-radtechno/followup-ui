const errorResponse = (
  req,
  res,
  code,
  errorMessage = "Something went wrong",
  error = {},
  errorfields = {}
) => {
  res.status(code).json({
    code,
    errorMessage,
    error,
    errorfields,
    success: false,
  });
};

module.exports = errorResponse;
