const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", authController.UserRegisterController);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return a token
 * @access Public
 */
router.post("/login", authController.UserLoginController);

module.exports = router;









