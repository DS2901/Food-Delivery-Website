const mongoose = require('mongoose');
require('dotenv').config();

const MongoURI = process.env.MONGO_URI;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: 'majority' },

        });
        console.log("Connected to MongoDB");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        // console.log(fetchedData)

    } catch (err) {
        console.error("Connection or query error:", err);
    }
};

module.exports = connectToMongoDB;
