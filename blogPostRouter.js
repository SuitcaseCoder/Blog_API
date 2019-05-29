const express = require('express');
const router = express.Router();

const {blogPosts} = require('./models');

blogPosts.create(
  'title-one', 'content-one', 'author-one'
);
blogPosts.create(
  'title-two', 'content-two', 'author-two'
);

// GET request
router.get('/', (req, res)=>{
  res.json(blogPosts.get());
});


// POST request
router.post('/', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \'${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = blogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(item);
});


// DELETE
router.delete('/:id', (req, res)=>{
  blogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.id}\``);
  status(204).end();
});

// PUT
router.put('/:id', (req, res)=>{
  const requiredFields = ['id', 'title','content', 'author'];
  for (let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id(${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post item \`${req.params.id}\``);
  blogPosts.update({
    title: req.params.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
});

module.exports = router;
