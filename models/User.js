var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	username: {type:String, required: true, index:{unique: true}},
	password:{type: String, required:true},
	admin: Boolean

},{collection: 'user'});

userSchema.pre('save', function(next){
	//need to refer to user throughout
	var user = this;

	if(user.isModified('password'))
	{
		bcrypt.hash(user.password,5,function(err,hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	}
	else
	{
		next();
	}
});
/*
*	check an unencrypted password against the stored encrypted one
*	@param {string} unencrypted password to check against
*/
userSchema.methods.verifyPassword = function(inputPassword, callback){
	bcrypt.compare(inputPassword, this.password, function(err,match){
		if(err) callback(err);
		callback(null,match);
	});
};

/*
*
*	if user exists and a valid password is supplied return the user otherwise null
*	@param {string} the users username
*	@param {string} the users pasword unencrypted
*	@param {function} callback when finished
* 
*/
userSchema.statics.authenicate = function(username, password, callback){
	this.findOne({username: username}, function(err, user){
		if(err) callback(err);

		//if no user returned authenication has failed
		if(!user)
		{
			return callback(1, null);
		}

		user.verifyPassword(password, function(err, ismatch){
			if(err) callback(err);
			if(ismatch)
			{
				return callback(null, user);
			}
			else
			{
				return callback(2,null);
			}
		});
	});
};

mongoose.model('User', userSchema);