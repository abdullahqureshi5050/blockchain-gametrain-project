const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../util/http-error");
const Admin = require("../models/admin");

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Admin.findOne({ email: email });
  } catch (err) {
    return res
      .status(422)
      .json({ errors: `user not found on provided email address` });
  }

  if (!existingUser) {
    return res
      .status(403)
      .json({ errors: "Invalid credentials, could not log you in." });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(403)
      .json({ errors: "Invalid credentials, could not log you in." });
  }

  if (!isValidPassword) {
    return res
      .status(403)
      .json({ errors: "Invalid credentials, could not log you in." });
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });
};

exports.login = login;
