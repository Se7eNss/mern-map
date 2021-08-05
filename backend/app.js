const express = require('express')
const app = express();

const errorMiddleware = require('./middlewares/errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pin = require('./routes/pin');
const user = require('./routes/user')

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1',pin);
app.use('/api/v1',user);

app.use(errorMiddleware);

module.exports= app