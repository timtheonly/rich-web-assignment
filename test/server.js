//tests fon server
var chai = require('chai');
var  expect = chai.expect;
var http = require('superagent');

describe("check the server is up and accepting requests",function(){
	it("should be running", function(done){
		http.get('http://localhost:3000/',function(err, res){
				expect(res).to.exist;
				expect(res.status).to.equal(200);
		});
		done();
	});
});
