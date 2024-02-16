const errorHandler = (err, req, res, next) => {
  return res.status(err.status).json({ error: err.message });
};

module.exports = errorHandler;