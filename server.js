/* This file houses the backend server. 
It utilises express and connects to a MongoDB database.
- Written by Karina Reyes and Tia Lowenthal for COMP30022 IT Project*/


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

// create express server
const app = express();

// create cors middleware
app.use(cors());
app.use(express.json()); //allows us to parse json

// database uri we get from the ATLAS dashboard
const uri = process.env.ATLAS_URI;

//starts the connection to the database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// make the uploads folder accessible everywhere
app.use('./uploads', express.static('uploads'));


// requires and uses the user, items and tags routers
const userRouter = require('./routes/users');
const itemRouter = require('./routes/items');
const tagRouter = require('./routes/tags');
const imagesRouter = require('./routes/images');
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/tags', tagRouter);
app.use('/images', imagesRouter);



//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const port = process.env.PORT || 5000;



// starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;