const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const topicRoutes = require('./routes/topic');
const contentRoutes = require('./routes/content');
const notFound = require('./middlewares/not-found');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DEFAULT_ORIGIN = process.env.DEFAULT_ORIGIN || 'http://localhost:5173'; 

app.use(cors({origin: DEFAULT_ORIGIN}));

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

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})