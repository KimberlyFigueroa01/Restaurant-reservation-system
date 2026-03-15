const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  res.status(status).json({ message });
};

module.exports = errorHandler;
