const { DUPLICATE_KEY_ERROR, SERVER_ERROR_CODES } = require("./constants");

const processMongoDBError = (error) => {
  const errorParsed = JSON.parse(JSON.stringify(error));
  const { code } = errorParsed;
  if (code === DUPLICATE_KEY_ERROR){
    return { status: 409, message: "El registro ya existe", code: SERVER_ERROR_CODES.DUPLICATE_RECORD };
  }
}

const isMongoDBError = (error)=>{
  const stringError = error.toString();
  return stringError.includes('MongoServerError');
};

const errorHandler = (err, req, res) => {
  console.log(err);
  if (isMongoDBError(err)){
    console.log('Error de MongoDB');
    const { status, message, code } = processMongoDBError(err);
    return res.status(status).json({ error: message, code });
  }
  return res.status(500).json({ error: err });
};

module.exports = errorHandler;