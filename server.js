const express = require("express");
const { errorHandler } = require("./middleware/errorhandler");
const connectDB = require("./config/dbconnection");
const dotenv = require("dotenv").config();


connectDB();
const app = express();

const port = process.env.PORT || 5000;


// body parser for the data from the client
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// whenever we have to use a middleware then we use app.use
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})