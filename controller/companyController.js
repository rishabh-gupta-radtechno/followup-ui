var CompanyModel = require("../model/companyModel");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_company = async function (req, res) {
  try {
    const {
      Name,
      Logo,
      Email,
      Phone1,
      Phone2,
      Fax,
      SkypeId,
      Whatsapp,
      TelegramId,
      TwitterHandle,
      AddressLine1,
      AddressLine2,
      Country,
      State,
      City,
      Pincode,
      ContactPerson1,
      ContactPerson2,
    } = req.body;
    let newCompany = new CompanyModel({
      Name: Name,
      Logo: Logo,
      Email: Email,
      Phone1: Phone1,
      Phone2: Phone2,
      Fax: Fax,
      SkypeId: SkypeId,
      Whatsapp: Whatsapp,
      TelegramId: TelegramId,
      TwitterHandle: TwitterHandle,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      Country: Country,
      State: State,
      City: City,
      Pincode: Pincode,
      ContactPerson1: ContactPerson1,
      ContactPerson2: ContactPerson2,
    });

    newCompany.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.getCompany = async function (req, res) {
  try {
    var _id = req.body._id;
    var company = await CompanyModel.find({ _id: _id });
    if (!company || company.length == 0) {
      return errorMessage(req, res, 404, "No company found");
    } else if (company) {
      return res.status(200).json({
        statusCode: 200,
        company,
      });
    }
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};

exports.getAllCompany = async function (req, res) {
  try {
    var company = await CompanyModel.find({});
    if (company) {
      res.status(200).json({
        statusCode: 200,
        company: company,
      });
    } else {
      return errorMessage(req, res, 404, "No company found");
    }
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};

exports.paginate = async function (req, res) {
  console.log("req.query", req.body);
  const search = req.body.search || "";
  let sort = 1;

  req.body.sort ? (sort = req.body.sort.split(",")) : (sort = [sort]);
  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  try {
    let { page, size } = req.body;
    // if (!page) page = 1;
    // if (!size) size = 10;
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const po = await CompanyModel.find({
      $or: [
        { Name: { $regex: search, $options: "i" } },
        { Email: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    const total_documents = await CompanyModel.countDocuments();

    const previous_pages = page - 1;
    const next_pages = Math.ceil((total_documents - skip) / size - 1);
    console.log("next", next_pages);
    // console.log("data", po);
    console.log("td", total_documents);
    console.log("skip", skip);

    return res.send({
      page: page,
      size: size,
      data: po,
      previous: previous_pages,
      next: next_pages,
    });
  } catch (error) {
    console.log("error", error);
    res.send({ statusCode: 500, error });
  }
};

exports.updateCompany = async function (req, res) {
  try {
    await CompanyModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    console.log(req.body)
    return res.status(201).json({
      statusCode: 200,
      message: constants.successMessages.update,
    });
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};

exports.deleteCompany = async function (req, res) {
  try {
    const _id = req.body._id;
    const company = await CompanyModel.findOne({
      _id,
    });

    if (!company || company.length == 0) {
      return errorMessage(req, res, 404, "No company found");
    } else {
      await CompanyModel.deleteOne({
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

