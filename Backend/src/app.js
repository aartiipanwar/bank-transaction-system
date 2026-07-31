const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const accountRouter = require("./routes/account.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

//userRoutes
app.use('/api/auth', authRoutes);
app.use("/api/accounts", accountRouter)

module.exports = app;