'use strict';

// const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise= global.Promise;

const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true}, 
  content: {type: String}, 
  author: {
    firstName: String,
    lastName: String
  }
});


blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
  };
};



// function StorageException(message) {
//    this.message = message;
//    this.name = "StorageException";
// }

// const blogPosts = {
//   create: function(title, content, author) {
//     const post = {
//       id: uuid.v4(),
//       title: title,
//       content: content,
//       author: author,
//     };
//     this.posts.push(post);
//     return post;
//   },
//   get: function(id=null) {
//     // if id passed in, retrieve single post,
//     // otherwise send all posts.
//     if (id !== null) {
//       return this.posts.find(post => post.id === id);
//     }
//     // return posts sorted (descending) by
//     // publish date
//     return this.posts.sort(function(a, b) {
//       return b.publishDate - a.publishDate;
//     });
//   },
//   delete: function(id) {
//     const postIndex = this.posts.findIndex(
//       post => post.id === id);
//     if (postIndex > -1) {
//       this.posts.splice(postIndex, 1);
//     }
//   },
//   update: function(updatedPost) {
//     const {id} = updatedPost;
//     const postIndex = this.posts.findIndex(
//       post => post.id === updatedPost.id);
//     if (postIndex === -1) {
//       throw new StorageException(
//         `Can't update item \`${id}\` because doesn't exist.`)
//     }
//     this.posts[postIndex] = Object.assign(
//       this.posts[postIndex], updatedPost);
//     return this.posts[postIndex];
//   }
// };

// function createBlogPostsModel() {
//   const storage = Object.create(blogPosts);
//   storage.posts = [];
//   return storage;
// }

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};