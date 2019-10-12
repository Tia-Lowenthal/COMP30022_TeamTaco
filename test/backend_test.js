const assert = require('assert');
let mongoose = require("mongoose");
let Item = require('../routes/items.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../server.js');
let should = chai.should();


chai.use(chaiHttp);


describe('Items', () => {

  describe("GET /", () => {
    it("should get all items", (done) => {
      setTimeout(done,0);
      chai.request(app)
      .get('/items/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
      });
    });
  });


  describe('POST /', () => {
    it('should post a new item', (done) => {
      setTimeout(done,0);
      chai.request(app)
      .post('/items/add')
      .send({
        "itemId": "testingItemId5",
        "userId": "testingUserID",
        "title": "testingTheTitle5"
      })
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res);
      });
    });
  });

  describe("GET /", () => {
    it("should get item by id", (done) => {
      setTimeout(done,0);
      chai.request(app)
      .get('/items/testingItemId5')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
      });
    });
  });

  describe("DELETE /", () => {
    it("should delete item by id", (done) => {
      setTimeout(done,0);
      chai.request(app)
      .delete('/items/testingItemId5')
      .end((err, res) => {
        res.should.have.status(200);
      });
    });
  });

});

