const express = require('express');
const morgan = require('morgan');

const blogPostRouter = require('./blogPostRouter');

const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(morgan("common"));
app.use(express.json());



app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, ()=> {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
