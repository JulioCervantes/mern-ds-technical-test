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
  canRead: {
    admin: { type: Boolean, default: true, inmutable: true },
    reader: { type: Boolean, default: true },
    creator: { type: Boolean, default: false },
  },
  canCreate: {
    admin: { type: Boolean, default: true, inmutable: true },
    reader: { type: Boolean, default: false },
    creator: { type: Boolean, default: false },
  },
  canUpdate: {
    admin: { type: Boolean, default: true, inmutable: true },
    reader: { type: Boolean, default: false },
    creator: { type: Boolean, default: true },
  },	
});

topicSchema.plugin(timestamp);

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;