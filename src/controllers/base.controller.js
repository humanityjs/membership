import {merge} from 'lodash';

class baseController {
  constructor (model) {
    if (!model) {
      throw new Error('Please supply a model');
    }
    this.model = model;
  }

  create = async (req, res) => {
    const { body } = req;
    try {
      const result = await this.model.create(body);
      return res.json(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to create at this moment' });
    }
  }

  read = async (req, res) => {
    const { docFromId } = req;
    return res.json(docFromId);
  }

  update = async (req, res) => {
    const { docFromId } = req;
    const { body } = req;
    merge(docFromId, body);
    try {
      const result = await this.model.findByIdAndUpdate(
        docFromId.id,
        docFromId,
        { new: true }
      ).exec();

      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to update document' });
    }
  }

  delete = async (req, res) => {
    const { docFromId } = req
    try {
      const result = await this.model.findByIdAndDelete(docFromId.id).exec();
      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to delete' });
    }
  }

  findAll = async (req, res) => {
    try {
      const result = await this.model.find({}).exec();
      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Your request cannot be processed at this time' });
    }
  }

  findById = async (req, res, next, id) => {
    try {
      const result = await this.model.findById(id).exec();
      req.docFromId = result;
      next()
    } catch (e) {
      return res.status(500).send({ message: 'Cannot retrieve item with that ID' });
    }
  }
};

export default baseController;
