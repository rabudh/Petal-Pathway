require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//rest of packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//database
const connectDB = require('./db/connect');

//routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const flowerRouter = require('./routes/flowerRoutes');
const orderRouter = require('./routes/orderRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//rest of packages
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//

app.get('/', (req, res) => {
    res.send('petal pathway')
});

app.get('/petalpathway', (req,res) => {
    console.log(req.signedCookies);
    res.send('petal pathway')
});

app.use('/petalpathway/auth', authRouter);
app.use('/petalpathway/users', userRouter);
app.use('/petalpathway/browse', flowerRouter);
app.use('/petalpathway/cart', orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.error(error);
    }
};

start();