const errorHandler = require('../../utils/error-handler');
const User = require('../../models/User');
const token = require('../../utils/token');
const { JWT_SALT_LENGTH } = require('./constants');
const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(JWT_SALT_LENGTH);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const userController = {
  register: async (req, res) => {
    try {
      console.log('Registrando usuario...');
      const { email, password, username, role } = req.body;
      const encryptedPassword = await encryptPassword(password);
      const user = new User({ email, password: encryptedPassword, username, role});
      await user.save();
      const jwtToken = token.get(user);
      res.status(201).send({created: true, token: jwtToken});
    } catch (error) {
      return errorHandler(error,req,res);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send({message:'Nombre de usuario o contraseña incorrectos', code: 'DS-002'});
      const validPassword = await bcrypt.compare(password, user.password);
      const jwtToken = token.get(user);
      res.status(200).send({token: jwtToken});
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = userController;