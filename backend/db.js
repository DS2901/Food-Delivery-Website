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

        // Optional: Check if collections are correctly loaded
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection("food_Category").find({}).toArray();
        
        global.food_items = fetchedData;
        global.food_category = foodCategoryData;

    } catch (err) {
        console.error("Connection or query error:", err);
    }
};

module.exports = connectToMongoDB;
