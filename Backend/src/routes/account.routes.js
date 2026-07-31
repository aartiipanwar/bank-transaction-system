const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router()


/**
 * @route POST /api/accounts/
 * @desc Create a new account
 * @access Protected
 */
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController);

module.exports = router;




