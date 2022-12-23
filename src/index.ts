import express from "express";
import bodyParser from "body-parser";
import monthRoutes from './routes/month-routes';
var cors = require('cors');
require("dotenv").config();

const PORT = 3001;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(monthRoutes)
app.listen(PORT, () => console.log(`listening to Port -> ${PORT}`));

