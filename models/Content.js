const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const deleteStrategy = require('mongoose-delete');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
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
  permissions: {
    canRead: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: true },
      creator: { type: Boolean, default: true },
    },
    canCreate: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: true },
    },
    canUpdate: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: true },
    },
    canDelete: {
      admin: { type: Boolean, default: true, inmutable: true },
      reader: { type: Boolean, default: false },
      creator: { type: Boolean, default: false },
    },
  },
});

contentSchema.plugin(timestamp);
contentSchema.plugin(deleteStrategy, { overrideMethods: 'all' });

const Content = mongoose.model('Content', contentSchema);