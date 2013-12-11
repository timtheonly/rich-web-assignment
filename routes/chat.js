'use strict'

module.exports.setup = function(app, mongoose, io){
	app.get('/chat', function(req, res){
		if(req.session.user)
		{
			res.render('chat', {title:'chat'});

		}else{
			res.redirect('/');
		}
	});
};