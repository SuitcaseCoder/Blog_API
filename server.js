const express = require('express');
const queryString = require('query-string');

const app = express();

const blogPostRouter = require('./blog-posts');

app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/views/index.html');
});
