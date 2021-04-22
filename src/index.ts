export {}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const helmet = require('helmet')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
mongoose
    .connect('mongodb://127.0.0.1:27017/watermyplants', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(chalk.bgGreen.bold('Database Live'))
    })
    .catch((err) => console.log(chalk.bgRed.bold('Error', err)))

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log(chalk.bgGreen.bold('Development Server Live on 5500!'))
})
