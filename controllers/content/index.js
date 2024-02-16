const Content = require('../../models/Content');
const Topic = require('../../models/Topic');
const { token } = require('../../utils/token');

const contentController = {
  getContents: async (req, res) => {
    try {
      const contents = await Content.find();
      res.send(contents);
    } catch (error) {
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
  uploadContent: async (req, res, fileBuffer) => {
    try {
      const { title, topicId } = req.body;
      let data = req.body.data || fileBuffer.toString('base64');
      const jwtDecoded = token.decodeBearerToken(req);
      const { userId } = jwtDecoded;
      const content = new Content({ title, topicId, authorId: userId, data });
      await content.save();
      res.status(201).send({ created: true });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateContent: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, topicId, data } = req.body;
      const content = await Topic.findByIdAndUpdate(id, { title, topicId, data });
      res.status(200).send(content);
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