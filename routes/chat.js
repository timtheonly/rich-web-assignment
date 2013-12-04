'use strict'

module.exports.setup = function(app, mongoose, io){
	app.get('/chat', function(req, res){
		if(req.session.user)
		{
			res.render('chat', {title:'chat'});
			io.sockets.emit('joined', users);

		}else{
			res.redirect('/');
		}
	});
};