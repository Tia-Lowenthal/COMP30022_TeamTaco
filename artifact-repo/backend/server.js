const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// create express server
const app = express();
const port = process.env.PORT || 5000;

// create cors middleware
app.use(cors());
app.use(express.json()); //allows us to parse json

// database uri we get from the ATLAS dashboard
const uri = process.env.ATLAS_URI;

//starts the connection to the database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
})

// requires and uses the user router
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});