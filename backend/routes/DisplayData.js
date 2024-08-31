const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        if (global.food_items && global.food_category) {
            console.log(global.food_items);
            res.status(200).json({ 
                food_items: global.food_items, 
                food_category: global.food_category 
            });
        } else {
            res.status(404).json({ error: "No food items or categories available" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
