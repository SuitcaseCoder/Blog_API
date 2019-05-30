const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");


const expect = chai.expect;


chai.use(chaiHttp);

describe("blogPostRouter", function() {
    before(function() {
      return runServer();
    });
  
    after(function() {
      return closeServer();
    });
  
    it("should list blog Posts on GET", function() {
      
      return chai
        .request(app)
        .get("/BlogPost")
        .then(function(res) {
          expect(res).to.be.json;
          
        });
    });
  
    it("should add a blog post on POST", function() {
      const newBlogPost = { title: "title one", content: "content blah blah blah", author: "me, obvs"};
      return chai
        .request(app)
        .post("/blogPosts")
        .send(newBlogPost)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("id", "title", "content", "author");
          expect(res.body.id).to.not.equal(null);
          
        });
    });
  
    it("should update blog posts on PUT", function() {

        const updateData = {
        title: "blog Post One",
        content: "blah blah blah",
        author: "me, obvs"
      };
  
      return (
        chai
          .request(app)

          .get("/blogPosts")
          .then(function(res) {
            updateData.id = res.body[0].id;
          
            return chai
              .request(app)
              .put(`/blogPosts/${updateData.id}`)
              .send(updateData);
          })

          .then(function(res) {
            expect(res).to.have.status(204);
          })
      );
    });
  
    it("should delete blog posts on DELETE", function() {
      return (
        chai
          .request(app)

          .get("/blogPosts")
          .then(function(res) {
            return chai.request(app).delete(`/blogPosts/${res.body[0].id}`);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
          })
      );
    });
  });