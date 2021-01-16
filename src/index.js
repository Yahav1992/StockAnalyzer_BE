const express = require('express');
const connectDB = require('./db/mongoose')

const stockRouter = require('./routers/stock')
const stockRecordRouter = require('./routers/stock-record')
const userRouter = require('./routers/user')
const authRouter = require('./routers/auth')

const port = process.env.PORT || 3000;
const app = express();

connectDB(); // connect to mongodb

app.use(express.json()) // parsing path and body params
app.use(stockRouter)
app.use(stockRecordRouter)
app.use(userRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log(`Server is on on port ${port}`)
});
