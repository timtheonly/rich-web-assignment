'use strict'

module.exports.setup = function(app, mongoose){
	app.get('/chat', function(req, res){
		if(req.session.userID)
		{
			res.render('chat', {title:'chat'});
		}else{
			res.redirect('/');
		}
	});
};