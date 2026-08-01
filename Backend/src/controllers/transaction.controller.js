const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");

/**
Create a new transaction
THE 10-STEP TRANSFER FLOW:
1. Validate request
2. Validate idempotency key
3. Check account status
4. Derive sender balance from ledger
5. Create transaction (PENDING)
6. Create DEBIT ledger entry
7. Create CREDIT ledger entry
8. Mark transaction COMPLETED
9. Commit MongoDB session
10. Send email notification
*/

async function createTransaction(req, res){
   
    //Validate Data: Jo data aa raha wo sahi deta he ya nhi
    const{fromAccount, toAccount, amount, idempotencykey}=req.body

    if(!fromAccount || !toAccount || !amount || !idempotencykey){
        return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencykey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if(!fromUserAccount || !toUserAccount){
        return res.status(404).json({
            message: "Invalid fromAccount or toAccount"

        })
    }

    //Validate idempotency key
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencykey: idempotencyKey
    })
    
    if(isTransactionAlreadyExists){
        if(isTransactionAlreadyExists.status === "COMPLETED"){
            return res.status(200).json({
                message: "Transaction already completed",
                transaction: isTransactionAlreadyExists
            })
        }

        if(isTransactionAlreadyExists.status === "PENDING"){
            return res.status(200).json({
                message: "Transaction is already in progress"
            })
        }

        if(isTransactionAlreadyExists.status === "FAILED"){
            return res.status(500).json({
               message: "Transaction has failed"
            })
        }

        if(isTransactionAlreadyExists.status === "REVERSED"){
            return res.status(500).json({
               message: "Transaction was reversed, please retry"
            })
        }
    }


    //Check account status
    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to perform transaction"
        })
    }

    //Derive sender balance from ledger
    const balanceData = await fromUserAccount.getBalance()

    if(balance < amount){
        return res.status(400).json({
            message: `Insufficient balance in fromAccount.
            Current balance: ${balance}, required balance: ${amount}`
        })
    }

    //Create transaction (PENDING)
    
}
    
