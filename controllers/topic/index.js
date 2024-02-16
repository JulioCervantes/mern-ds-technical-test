const Topic = require('../../models/Topic');

const topicController = {
  getTopics: async (req, res) => {
    try {
      const topics = await Topic.find();
      res.send(topics);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getTopicById: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await Topic.findById(id);
      res.send(topic);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createTopic: async (req, res) => {
    try {
      const { name, contentTypes, coverImage, permissions } = req.body;
      const topic = new Topic({ name, contentTypes, coverImage, permissions });
      await topic.save();
      res.status(201).send({ created: true });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateTopic: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, contentTypes, coverImage, permissions } = req.body;
      const topic = await Topic.findByIdAndUpdate(id, { name, contentTypes, coverImage, permissions });
      res.status(200).send(topic);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteTopic: async (req, res) => {
    try {
      const { id } = req.params;
      await Topic.findByIdAndDelete(id);
      res.status(200).send({ deleted: true });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = topicController;
