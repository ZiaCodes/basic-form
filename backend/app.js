const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorhandler');
require('dotenv').config();
require('./db')

const app = express();
app.use(express.json())
app.use(morgan('dev'));
const PORT = 8080 | process.env.PORT


const userRouter = require('./routes/user')
app.use('/api/user', userRouter);


//async error handling
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`🚀 Server is running at https://localhost:${PORT}`);
})