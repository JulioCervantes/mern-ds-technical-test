const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const topicRoutes = require('./routes/topic');
const contentRoutes = require('./routes/content');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/auth',auth);
app.use('/category',categoryRoutes);
app.use('/topic',topicRoutes);
app.use('/content',contentRoutes);


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