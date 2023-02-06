const db = require("../../data/db-config");
const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  // const name = req.body.name
  // const budget = req.body.budget

  if (name === undefined || budget === undefined) {
    next({ status: 400, message: "name and budget are required" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const presentAccount = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (presentAccount) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);

    if (!account) {
      next({ status: 404, message: "that name is taken" });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    next(error);
  }
};
