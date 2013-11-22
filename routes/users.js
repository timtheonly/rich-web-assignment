'use strict';

require('../models/User');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.setup = function(app){
	app.post('/users', function(req,res){
		console.log(req.body);
		User.authenicate(req.body.username, req.body.password, function(err, data){
				if(typeof err  !== 'number')
				{
					throw err;
				}else if(err === 1)
				{
					res.send('user doesn\'t exist');
				}else if(err === 2)
				{
					res.send('incorrect password');
				}else
				{
					req.session.userID = data._id;
					res.send('login succesfull');
				}
				
			});
	});
};