const express = require('express');
const router = express.Router();

const {blogPosts} = require('./models');

blogPosts.create(
  'title-one', 'content-one', 'author-one'
);
blogPosts.create(
  'title-two', 'content-two', 'author-two'
);

router.get('/', (req, res)=>{
  res.json(blogPosts.get());
});
