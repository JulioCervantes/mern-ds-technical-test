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
  permissions: {
    canRead: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: true },
      creator: { type: Boolean, default: true },
    },
    canCreate: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: false },
    },
    canUpdate: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: false },
    },
    canDelete: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: false },
    },
  },
});

contentTypeSchema.plugin(timestamp);

const ContentType = mongoose.model('ContentType', contentTypeSchema);

module.exports = ContentType;