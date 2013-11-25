'use strict';

require('../models/User');



module.exports.setup = function(app, mongoose){
	var User = mongoose.model('User');
	app.post('/users/login', function(req,res){
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

	app.post('/users', function(req,res){
		console.log(req.body);
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password:req.body.password
		});
		
		user.save(function(err){
			if(err){
				res.send('user exsits');
				return console.log(err);
			}else{
				res.send('ok');
			}
		});
		
	});
};