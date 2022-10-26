var ProductModel = require("../model/productModel");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_product = async function (req, res) {
  try {
    const {
      ProductName,
      ProductDescription,
      Attachments,
      IsEnabled,
      CreatedBy,
    } = req.body;
    let newProduct = new ProductModel({
      ProductName: ProductName,
      ProductDescription: ProductDescription,
      Attachments: Attachments,
      IsEnabled: IsEnabled,
      CreatedBy: CreatedBy,
    });

    newProduct.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.getAllProducts = async function (req, res) {
  try {
    var product = await ProductModel.find({});
    if (!product || product.length == 0) {
      return errorMessage(req, res, 404, "No product found");
    } else if (product) {
      return res.status(200).json({
        product,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.updateProduct = async function (req, res) {
  try {
    await ProductModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: constants.successMessages.update,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    const _id = req.body._id;
    const product = await ProductModel.findOne({
      _id,
    });

    if (!product || product.length == 0) {
      return errorMessage(req, res, 404, "No product found");
    } else {
      await ProductModel.deleteOne({
        _id,
      });

      return res.status(204).json({
        message: constants.successMessages.delete,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};
