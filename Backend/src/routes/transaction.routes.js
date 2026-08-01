const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

const transactionRoutes = Router();

/**
 * @route POST /api/transactions/
 * @desc create a new transaction
 * @access Private (System user only)
 */
transactionRoutes.post("/", authMiddleware.authSystemMiddleware, transactionController.createTransaction);


/**
 * @route POST /api/transactions/system/initial-funds
 * @desc Add initial funds to a system user's account
 * @access Private (System user only)
 */
transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction);


module.exports = transactionRoutes;