const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const deleteStrategy = require('mongoose-delete');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
};

contentSchema.plugin(timestamp);
contentSchema.plugin(deleteStrategy, { overrideMethods: 'all' });

const Content = mongoose.model('Content', contentSchema);