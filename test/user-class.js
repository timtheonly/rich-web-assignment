var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('../models/User');
var User = mongoose.model('User');

before(function(done){
	mongoose.connect('mongodb://localhost',done);
});

afterEach(function(done){
	User.remove({username:"daniel"},function(err){
		if(err) throw err;
		done();
	});
});

describe("#class User", function(){


	it("should allow a model to be saved", function(done){
		var user = new User({
			name:"daniel",
			username:"daniel",
			password:"hello",
			admin: true
		});
		user.save(function(err){
			if(err) throw err;
			done();
		});
	});

	it("should authenicate a user with correct password", function(done){
		var user = new User({
			name:"daniel",
			username:"daniel",
			password:"hello",
			admin: true
		});
		user.save(function(err){
			if(err) throw err;
			User.authenicate('daniel', 'hello', function(err, authUser){
				if(err) throw err;
				expect(authUser).to.not.be.null;
				done();
			});
		});
	});

	it("should not authenicate a user with incorrect password", function(done){
		var user = new User({
			name:"daniel",
			username:"daniel",
			password:"hello",
			admin: true
		});
		user.save(function(err){
			if(err) throw err;
			User.authenicate('daniel', 'helo', function(err, authUser){
				if(err) throw err;
				expect(authUser).to.be.null;
				done();
			});
		});
	});
});