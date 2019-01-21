class Query {
  create = (model, body) => {
    try {
      return model.create(body);
    } catch (e) {
      throw new Error (e);
    }
  }

  update = (model, body) => {
    try {
      return model.findByIdAndUpdate(
        body.id,
        body,
        { new: true }
      ).exec();
    } catch (e) {
      throw new Error (e);
    }
  }

  delete = async (model, id) => {
    try {
      return await model.findByIdAndDelete(id).exec();
    } catch (e) {
      throw new Error (e);
    }
  }

  findAll = async (model) => {
    try {
      return await model.find({}).exec();
    } catch (e) {
      throw new Error (e);
    }
  }

  findById = async (model, id) => {
    try {
      return model.findById(id).exec();
    } catch (e) {
      throw new Error (e);
    }
  }
}

export default Query;
