const User = require("../models/Users");
const { successResponse, errorResponse } = require("../utils/response");

exports.get_user = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (user) {
      return res.json(
        successResponse("User fetched successfully!", {
          user,
        })
      );
    } else {
      return res.json(errorResponse("User not found!"));
    }
  } catch (err) {
    next(err);
  }
};
