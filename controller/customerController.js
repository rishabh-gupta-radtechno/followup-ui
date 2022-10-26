var CustomerModel = require("../model/customerModel");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_customer = async function (req, res) {
  try {
    const {
      FirstName,
      LastName,
      Phone,
      Email,
      AddressLine1,
      AddressLine2,
      City,
      State,
      Country,
      Pincode,
      CreatedBy,
      IsEnabled,
    } = req.body;

    // let customer = await CustomerModel.find({Email});
    // if(customer ){
    //   console.log('cus')
    //   return errorMessage(req, res, 400, "Customer alredy exist");

    // }
    let newCustomer = new CustomerModel({
      FirstName: FirstName,
      LastName: LastName,
      Phone: Phone,
      Email: Email,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      City: City,
      State: State,
      Country: Country,
      Pincode: Pincode,
      CreatedBy: CreatedBy,
      IsEnabled: IsEnabled,
    });
    newCustomer.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.getAllCustomers = async function (req, res) {
  try {
    var customer = await CustomerModel.find({});
    if (!customer || customer.length == 0) {
      return errorMessage(req, res, 404, "No customer found");
    } else if (customer) {
      return res.status(200).json({
        customer,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.updateCustomer = async function (req, res) {
  try {
    await CustomerModel.findOneAndUpdate(
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

exports.deleteCustomer = async function (req, res) {
  try {
    const _id = req.body._id;
    const customer = await CustomerModel.findOne({
      _id,
    });

    if (!customer || customer.length == 0) {
      return errorMessage(req, res, 404, "No customer found");
    } else {
      await CustomerModel.deleteOne({
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
