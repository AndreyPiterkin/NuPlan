const dotenv = require('dotenv');
const express = require('express');
const User = require('./model/model.user.js')
const app = express();
const apiRoutes = require("./routes/userRoutes.js")

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));
app.use(express.json())
app.use("/", apiRoutes);


