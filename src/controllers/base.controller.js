import {merge} from 'lodash';
import Query from './query.controller';

class baseController extends Query {
  constructor (model) {
    super(model);
    if (!model) {
      throw new Error('Please supply a model');
    }
    this.model = model;
  }

  createMethod = async (req, res) => {
    const { body } = req;
    try {
      const result = await this.create(this.model, body)
      return res.json(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to create at this moment' });
    }
  }

  readMethod = async (req, res) => {
    const { docFromId } = req;
    return res.json(docFromId);
  }

  updateMethod = async (req, res) => {
    const { docFromId } = req;
    const { body } = req;
    merge(docFromId, body);
    try {
      const result = await this.update(this.model, docFromId).exec();
      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to update document' });
    }
  }

  deleteMethod = async (req, res) => {
    const { docFromId } = req
    try {
      const result = await this.delete(this.model, docFromId.id).exec();
      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Unable to delete' });
    }
  }

  findAllMethod = async (req, res) => {
    try {
      const result = await this.findAll(this.model);
      return res.send(result);
    } catch (e) {
      return res.status(500).send({ message: 'Your request cannot be processed at this time' });
    }
  }

  findByIdMethod = async (req, res, next, id) => {
    try {
      const result = await this.findById(this.model, id);
      req.docFromId = result;
      next()
    } catch (e) {
      return res.status(500).send({ message: 'Cannot retrieve item with that ID' });
    }
  }
};

export default baseController;
