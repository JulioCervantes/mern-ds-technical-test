const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const contentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  sourceType: {
    type: String,
    required: true,
    enum: ['image', 'video', 'text'],
    default: 'text',
  },
});

contentTypeSchema.plugin(timestamp);

const ContentType = mongoose.model('ContentType', contentTypeSchema);

module.exports = ContentType;