const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const indexRouter = require('./src/index');
const newsController = require('./src/news/newsControler');
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://bogdanchik:v1RvyzHFrkPndQnf@cluster0.cpiwy.mongodb.net/site?retryWrites=true&w=majority';

mongoose.connect(
    MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
)
    .then(() => console.log(`Now connected to MongoDB! url = ${MONGODB_URL}`))
    .catch((err) => console.error('Something went wrong', err));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News API",
      version: "1.0.0",
      description: "News Belorus API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/news/*.js", "./src/helpers/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use('/', indexRouter);
app.use('/api', newsController);

app.listen(PORT, () => { console.log(`Servers start PORT = ${PORT}`); });
