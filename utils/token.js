export const token = {
  get: (payload) => {
    return jwt.sign({
      role: payload.permissions,
      username: payload.username,
      email: payload.email,
      userId: payload._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },
  decodeBearerToken: (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};