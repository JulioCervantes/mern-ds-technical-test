const ContentType = require('../../models/ContentType');

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await ContentType.find();
      res.send(categories);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await ContentType.findById(id);
      res.send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, description, sourceType } = req.body;
      const category = new ContentType({ name, description, sourceType });
      await category.save();
      res.status(201).send({ created: true });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, sourceType } = req.body;
      const category = await ContentType.findByIdAndUpdate(id, { name, description, sourceType });
      res.status(200).send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await ContentType.findByIdAndDelete(id);
      res.status(200).send({ deleted: true });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = categoryController;