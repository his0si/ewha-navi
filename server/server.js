require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const routes = require("./routes/ReviewRoute");
const path = require("path");

app.use(express.json());

app.use("/api", routes);
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "../client/build")));
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB Connected...'))
.catch((e) => console.log('MongoDB error:', e))
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
