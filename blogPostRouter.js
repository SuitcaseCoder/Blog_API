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

app.post('/blogPosts' , jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    if (!(field in req.body)) {
      const message = `Missing \'${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = blogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});
