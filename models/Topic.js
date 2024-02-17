const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contentTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContentType' }],
  coverImage: {
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

topicSchema.plugin(timestamp);

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;