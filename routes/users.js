'use strict';

require('../models/User');
var users =[];

module.exports.setup = function(app, mongoose, io){
	var User = mongoose.model('User');
	var sockets = io.sockets;
	app.post('/users/login', function(req,res){
		User.authenicate(req.body.username, req.body.password, function(err, data){
				if(err)
				{
					if(err === 1)
					{
						res.send('username doesn\'t exist');
					}else if(err === 2){
						res.send('incorrect password');
					}else{
						return err;
					}
					
				}else
				{
					var tempUser = {name:data.name,
						email:data.email,
						username:data.username
					};
					users.push(tempUser);
					req.session.user = tempUser;
					res.send('ok');
					io.sockets.emit('joined', users);
					}
				
			});
	});


	app.get('/users/logout',function(req,res){
		if(req.session.user)
		{
			users.splice(users.indexOf(req.session.user),1);
			req.session.user = null;
		}
		res.redirect('/');
	});

	app.post('/users', function(req,res){
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