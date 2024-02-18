const Content = require('../../models/Content');
const Topic = require('../../models/Topic');
const token = require('../../utils/token');

const contentController = {
  getContents: async (req, res) => {
    try {
      const { topicName } = req.query;
      const { title } = req.query;
      let contents;
      if(title && topicName) {
        res.status(400).send({ message: 'You can only get topic by title or topic name' });
      }
      if (title) {
        const contents = await Content.find({title : new RegExp(title, 'i')});
        res.status(200).send(contents);
      } else if (topicName) {
        const findTopic = await Topic.findOne({ name: topicName });
        if (!findTopic) {
          res.status(404).send({ message: 'Topic not found' });
          return;
        }
        contents = await Content.find({ topicId: findTopic._id }).sort({createdAt: -1});
        const imagesCount = await Content.collection.countDocuments({ contentType: 'image', topicId: findTopic._id });
        const videosCount = await Content.collection.countDocuments({ contentType: 'video', topicId: findTopic._id });
        const textCount = await Content.collection.countDocuments({ contentType: 'text', topicId: findTopic._id });
        const count = { images: imagesCount, videos: videosCount, text: textCount };
        res.status(200).send({ contents, count });
      } else {
        const contents = await Content.find();
        res.status(200).send({ contents });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },
  getContentById: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await Content.findById(id);
      res.send(content);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getContentByTitle: async (req, res) => {
    try {
      const { title } = req.params;
      const content = await Content.findOne({ title });
      res.send(content);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  uploadContent: async (req, res) => {
    try {
      console.log({ req });
      const { title, topicId, summary, dataType: contentType } = req.body;
      let data = req.file ? req.file.buffer.toString('base64') : req.body.data;
      const jwtDecoded = token.decodeBearerToken(req);
      const { userId } = jwtDecoded;
      const content = new Content({ title, topicId, summary, contentType, authorId: userId, data });
      await content.save();
      res.status(201).send({ created: true });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  updateContent: async (req, res, fileBuffer = upload.single('data')) => {
    try {
      const { id } = req.params;
      const { title, topicId } = req.body;
      let dataChanged = req.body.data || fileBuffer;
      let newContent;
      if (dataChanged) {
        newContent = await Topic.findByIdAndUpdate(id, { title, topicId, summary, data: dataChanged })
      } else {
        newContent = await Topic.findByIdAndUpdate(id, { title, topicId, summary });
      }
      res.status(200).send(newContent);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteContent: async (req, res) => {
    try {
      const { id } = req.params;
      await Content.findByIdAndDelete(id);
      res.status(200).send({ deleted: true });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = contentController;