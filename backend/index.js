const express = require("express");
const connectToMongoDB = require("./db");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectToMongoDB();

app.use(express.json());

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api/cart", require("./routes/CartRoutes")); 
app.use('/api', require('./routes/refreshTokenRoutes'));

app.get("/", (req, res) => {
  res.send("Hello, my name is Devesh");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
