const Validator = require("fastest-validator");
const { errorResponse } = require("../../utils/response");

exports.signin_validation = () => {
  return async (req, res, next) => {
    const v = new Validator();

    const check = v.compile({
      usernameOrEmail: { type: "string" },
      password: { type: "string", min: 8, max: 255 },
    });

    const validate = check(req.body);
    if (validate) {
      next();
    } else {
      return res.status(400).json(errorResponse(validate));
    }
  };
};

exports.signup_validation = () => {
  return async (req, res, next) => {
    const v = new Validator();

    const check = v.compile({
      username: { type: "string", trim: true, lowercase: true, empty: false },
      email: { type: "email", min: 3, max: 255 },
      password: { type: "string", min: 8, max: 255 },
    });

    const validate = check(req.body);
    if (!Array.isArray(validate)) {
      next();
    } else {
      return res.status(400).json(errorResponse(validate));
    }
  };
};
