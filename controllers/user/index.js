const User = require('../../models/User');
const token = require('../../utils/token');
const { JWT_SALT_LENGTH } = require('./constants');

const userController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password,JWT_SALT_LENGTH);
      const user = new User({ email, password: encryptedPassword });
      await user.save();
      const jwtToken = token.get(user);
      res.status(201).send({created: true, token: jwtToken});
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const jwtToken = token.get(user);
      res.send(200,{token: jwtToken});
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = userController;