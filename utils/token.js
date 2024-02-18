const jwt = require("jsonwebtoken");

const token = {
  get: (payload, expirationTime = '1h') => {
    return jwt.sign({
      role: payload.role,
      username: payload.username,
      email: payload.email,
      userId: payload._id,
    }, process.env.JWT_SECRET, { expiresIn: expirationTime });
  },
  decodeBearerToken: (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};

module.exports = token;