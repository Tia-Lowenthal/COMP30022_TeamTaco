/* This file has the backend server and database tests. 
It includes tests for each table in the database, testing the CRUD operations.
- Written by Tia Lowenthal for COMP30022 IT Project*/


const assert = require('assert');
let mongoose = require("mongoose");
let Item = require('../routes/items.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../server.js');
let should = chai.should();


chai.use(chaiHttp);


describe('Items', () => {

  describe("GET", () => {
    it("should get all items", (done) => {
      chai.request(app)
      .get('/items/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
    });
  });


  describe("POST", () => {
    it('should post a new item', (done) => {
      chai.request(app)
      .post('/items/add')
      .send({
        "itemId": "testingItemId",
        "userId": "testingUserID",
        "title": "testingTheTitle",
        "description": "This is an old item"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("Item added!")
        done();
      });
    });


    it('should not post a duplicate item', (done) => {
      chai.request(app)
      .post('/items/add')
      .send({
        "itemId": "testingItemId",
        "userId": "testingUserID",
        "title": "testingTheTitle",
        "description": "This is an old item"
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });



  describe("GET by Id", () => {
    it("should get item by id", (done) => {
      chai.request(app)
      .get('/items/testingItemId')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].itemId.should.be.eq("testingItemId");
        res.body[0].userId.should.be.eq("testingUserID");
        res.body[0].title.should.be.eq("testingTheTitle");
        res.body[0].description.should.be.eq("This is an old item");
        done();
      });
    });
  });

  describe("UPDATE", () => {
    it('should update an item', (done) => {
      chai.request(app)
      .post('/items/update/testingItemId')
      .send({
        "itemId": "testingItemId",
        "userId": "testingUserID",
        "title": "testingTheTitle",
        "description": "This is a very old item"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("Item updated!")
        done();
      });
    });
  });

  describe("DELETE", () => {
    it("should delete item by id", (done) => {
      chai.request(app)
      .delete('/items/testingItemId')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("Item deleted!")
        done();
      });
    });
  });

});


describe('Tags', () => {

  describe("GET", () => {
    it("should get all tags", (done) => {
      chai.request(app)
      .get('/tags/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
    });
  });


  describe("POST", () => {
    it('should post a new tag', (done) => {
      chai.request(app)
      .post('/tags/add')
      .send({
        "tagName": "testTag"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("Tag added!")
        done();
      });
    });


    it('should not post a duplicate tag', (done) => {
      chai.request(app)
      .post('/tags/add')
      .send({
        "tagName": "testTag"
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });


  describe("DELETE", () => {
    it("should delete tag", (done) => {
      chai.request(app)
      .delete('/tags/testTag')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("Tag deleted!")
        done();
      });
    });
  });

});



describe('Users', () => {
  
  describe("Register", () => {
    it('should post a new user', (done) => {
      chai.request(app)
      .post('/users/signup')
      .send({
        "userId": "testingUserId",
        "email": "testing@email.com",
        "firstname": "Coraline",
        "lastname": "Jones",
        "password": "123456"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("Signed up")
        done();
      });
    });



    it('should not post a duplictae user', (done) => {
      chai.request(app)
      .post('/users/signup')
      .send({
        "userId": "testingUserId",
        "email": "testing@email.com",
        "firstname": "Coraline",
        "lastname": "Jones",
        "password": "123456"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("Error: Account already exist.")
        done();
      });
    });
  });


  describe("Login", () => {
    it('should not log in a user with incorrect credentials', (done) => {
      chai.request(app)
      .post('/users/login')
      .send({
        "userId": "testingUserId",
        "email": "testing@email.com",
        "firstname": "Coraline",
        "lastname": "Jones",
        "password": "badPassword"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("Error: Invalid")
        done();
      });
    });


    it('should successfully log in', (done) => {
      chai.request(app)
      .post('/users/login')
      .send({
        "userId": "testingUserId",
        "email": "testing@email.com",
        "firstname": "Coraline",
        "lastname": "Jones",
        "password": "123456"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eq("Valid sign in")
        done();
      });
    });
  });



  // describe("Logout", () => {
  //   it('should log out the user', (done) => {
  //     chai.request(app)
  //     .get('/users/logout')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.message.should.be.eq("Good")
  //       done();
  //     });
  //   });
  // });


  describe("DELETE", () => {
    it("should delete user", (done) => {
      chai.request(app)
      .delete('/users/testingUserId')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eq("User deleted!")
        done();
      });
    });
  });

});