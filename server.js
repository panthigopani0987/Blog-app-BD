const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const bodyParser = require('body-parser');

const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

//middleware
app.use(express.json());

app.use(cors());

//routes
app.use('/api/posts',postRoutes);

//mongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});