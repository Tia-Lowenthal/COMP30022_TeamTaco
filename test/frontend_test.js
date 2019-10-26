var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const invalidUserCredentials = {
    "email": 'invalidemail@gmail.com', 
    "password": 'invalidpassword'
  }
  const validUserCredentials = {
    "email": 'juliazhang421@gmail.com', 
    "password": 'juliazhang'
  }


describe( "signin page invalid", function() {
    it("test login with invalid account", () => {
        chai.request('https://radiant-dusk-39702.herokuapp.com')
            .post('/')
            .send(invalidUserCredentials)
            .end(function (err, res) {
                expect((res).to.not.redirect);
                expect((req).to.be.json);
             });
    })

})

describe( "signin page valid", function() {
    it("test login with valid account", () => {
        chai.request('https://radiant-dusk-39702.herokuapp.com')
            .post('/')
            .send(validUserCredentials)
            .end(function (err, res) {
                expect((res.statusCode).to.equal(200));
                expect((res).to.redirectTo('https://radiant-dusk-39702.herokuapp.com/home'));
             });
    })

})

describe("item_page", function(){
    it("item page is correctly displaying", () => {
        chai.request('https://radiant-dusk-39702.herokuapp.com')
            .get('/item/20285263')
            .end(function(err, res) {
                expect((res.statusCode).to.equal(200));
                expect(res.data.should.be.an('array'));
            });
    })
})

describe("upload_page", function(){
    it("should display with no error", () => {
        chai.request('https://radiant-dusk-39702.herokuapp.com')
            .get('/upload')
            .end(function(err, res) {
                expect((res.statusCode).to.equal(200));
            });
    })
})
