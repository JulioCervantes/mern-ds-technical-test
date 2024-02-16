const express = require('express');
const mongoose = require('mongoose');
//const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//app.use('/api',userRoutes);


mongoose.connect(process.env.MONGODB_URI/*
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}
*/)
  .then(() => console.log('Successful connection to the db'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})