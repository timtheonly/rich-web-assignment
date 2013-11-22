var chai = require('chai');
var  expect = chai.expect;
var http = require('superagent');

describe("check /users", function(){
	it("should exist", function(done){
		http.get('http://localhost:3000/users',function(err,res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			done();
		});
	});
	
	it("should login a user");
	it("should allow an admin to create a user");
	it("should allow an admin to temp block a user");
	it("sholud allow an admin to block a user");
});