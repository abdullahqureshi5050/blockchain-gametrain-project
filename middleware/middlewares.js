const { check } = require("express-validator");

const { body, validationResult } = require("express-validator");

const signupMiddleware = () => {
  return [
    check("firstname").not().isEmpty().withMessage("First name is required"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Passward should be atleast of 6 digits"),
    check("lastname").not().isEmpty().withMessage("lastname is required"),
    check("walletAddress")
      .not()
      .isEmpty()
      .withMessage("Wallet Address is required"),
  ];
};

const loginMiddleware = () => {
  return [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
    check("password").notEmpty().withMessage("Passward is required"),
  ];
};

const updatePassword = () => {
  return [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
    check("newPassword")
      .notEmpty()
      .withMessage("new Passward field is required"),
    check("oldPassword").notEmpty().withMessage("oldPassword is required"),
  ];
};

const updateUser = () => {
  return [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
  ];
};

const addTask = () => {
  return [
    check("email").normalizeEmail().isEmail(),
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("status").not().isEmpty(),
    //check("deadline").trim().isDate().withMessage("Please input a valid date"),
  ];
};

// Finds the validation errors in this request and wraps them in an object with handy functions
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else next();
};

const requestApproval = () => {
  return [
    check("id").notEmpty().withMessage("Please provide a vaild id"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
    check("status")
      .isIn(["DONE_PENDING_APPROVEL", "DO", "DOING"])
      .withMessage("Please provide a vaild role"),
  ];
};

const approveTask = () => {
  return [
    check("taskId").notEmpty().withMessage("Please provide a vaild task id"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid Email is required"),
    check("status")
      .isIn(["APPROVED", "REJECTED", "DONE_PENDING_APPROVEL", "DO", "DOING"])
      .withMessage(
        `Please provide a vaild role. valid roles: "APPROVED", "REJECTED", "DONE_PENDING_APPROVEL", "DO", "DOING" `
      ),
  ];
};

const updateTask = () => {
  return [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("title").notEmpty(),
    check("status")
      .notEmpty()
      .isIn(["DONE_PENDING_APPROVEL", "DO", "DOING"])
      .withMessage("Please provide a vaild role"),
    check("description").notEmpty(),
  ];
};

const populateTasks = () => {
  return [
    check("assignee")
      .notEmpty()
      .withMessage("Please provide a vaild assignee id"),
  ];
};
module.exports = {
  loginMiddleware,
  signupMiddleware,
  addTask,
  updateUser,
  updatePassword,
  requestApproval,
  updateTask,
  approveTask,
  populateTasks,
  validate,
};
