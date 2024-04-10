const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Load environment variables
require('dotenv').config();

// MongoDB connection function
const connectToMongoDB = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        const useDBAuth = process.env.USE_DB_AUTH || true;
        if (useDBAuth) {
            connectionParams.user = process.env.MONGO_USERNAME;
            connectionParams.pass = process.env.MONGO_PASSWORD;
        }
        console.log(connectionParams)

        await mongoose.connect(process.env.MONGO_CONN_STR, connectionParams);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1); // Exit the application if MongoDB connection fails
    }
};

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve insertname.html from the project folder
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/insertname.html');
});

// Define a Mongoose schema for your data
const dataSchema = new mongoose.Schema({
    name: String,
});

// Create a Mongoose model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Define a route to handle the form submission
app.post('/submit', async (req, res) => {
    const userName = req.body.name;

    if (!userName) {
        return res.status(400).send('Please provide a name.');
    }

    try {
        const newData = new Data({ name: userName });
        await newData.save();
        console.log('Data saved successfully');
        res.send('Data saved successfully. Thank you, ' + userName + '!');
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

