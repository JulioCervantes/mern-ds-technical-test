const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const readline = require('readline');
const token = require('../utils/token');
const { JWT_SALT_LENGTH } = require('../controllers/user/constants');
require('dotenv').config({ path: '../.env'});

console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const parameters = ['-u', '-p', '-email']
const scriptParams = process.argv.slice(2);
const params = {};

for (let i = 0; i < scriptParams.length; i++) {
  if (scriptParams[i] === '-u' && scriptParams[i + 1]) {
    params.username = scriptParams[i + 1];
  } else if (scriptParams[i] === '-p' && scriptParams[i + 1]) {
    params.password = scriptParams[i + 1];
  } else if (scriptParams[i] === '-email' && scriptParams[i + 1]) {
    params.email = scriptParams[i + 1];
  }
}

if (!params.username || !params.password || !params.email) {
  console.error('Ejecución fallida. Es necesario proporcionar un nombre de usuario (-u), una contraseña (-p) y un correo electrónico (-email).');
  process.exit(1);
}

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(JWT_SALT_LENGTH);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const createSuperAdminUser = async () => {
  try {
    const encryptedPassword = await encryptPassword(params.password);
    const user = new User({ 
      email: params.email, 
      password: encryptedPassword, 
      username: params.username, 
      role: 'admin' 
    });
    await user.save();
    const jwtToken = token.get(user,'1y');
    console.log('Usuario administrador creado con éxito');
    console.log('Token:', jwtToken);
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
    return null;
  } finally {
    mongoose.disconnect();
  }
};

const showQuestion = () => {
  rl.question('Ya existe un usuario administrador en la base de datos. ¿Deseas crear otro usuario administrador? (Presiona N/n para rechazar): ', (answer) => {
    if (answer.toLowerCase() === 'n') {
      rl.close();
      console.log('No se creará otro usuario administrador');
      mongoose.disconnect();
    } else {
      rl.close();
      createSuperAdminUser();
    }
  });
};

console.log('Connecting to MongoDB');
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  const existingAdmin = User.findOne({ role: 'admin' });
  existingAdmin.then((admin) => {
    if (admin) {
      showQuestion();
      return;
    }
    createSuperAdminUser();
  });
}).catch(
  err => console.error('Failed to connect to MongoDB', err)
);