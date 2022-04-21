const dotenv = require('dotenv');
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes.js');
const cookieParser = require('cookie-parser')


dotenv.config();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));
app.use(express.json());
app.use(cookieParser());
app.use("/", apiRoutes);

