/*
* @author Raghav
*
* @desc Session Handler is responsible for authentication of token from redis and also creating new tokens
*
*/

const redis  = require('redis').createClient();
const config = "55884e61e8cfdf0cba904102";
const jwt    = require('jsonwebtoken');
const _ 		 = require('underscore');

exports.isAuthenticated = function(req,res,next) {

	var token = req.headers['x-auth-token'];

	if(!token) {
		res.status(401);
		res.json({ "error": "Unauthenticated Request" });
	}
	else {

		jwt.verify(token, config, function(err, data) {
			if(err) {
				res.status(401);
				res.json({ "error": "Invalid token"});
			}
			else {
		    	// Check for expiration of the token
		    	if(data.expires > Date.now()) {
		    		redis.get(token, function(err,reply) {
		    			if(reply) {
		    				var data = JSON.parse(reply)
		    				req.user = data.user;
		    				req.token = token;
		    				next();
		    			}
		    			else {
		    				res.status(401);
		    				res.json({ "error": "Invalid token" });
		    			}
		    		})
		    	}
		    	else {
		    		res.status(401);
		    		res.json({ "error": "Token Expired"});
		    	}
		    }
		});
	}
}

exports.signIn = function(req,res) {
	var token_expires = Date.now() + 2630000000; // Token validity is one month
	var token = jwt.sign({ expires: token_expires }, config);

	// Once the token has been generated, put it in redis storage
	if(req.user) {
		var data = {
			user: req.user
		};
		redis.set(token, JSON.stringify(data))
		// Return the token to the client
		res.send({
			"token": token,
			"user": data.user,
		})
	}
	else{
		return res.send({ status: "failure", message: "No user found" });
	}
}

exports.updateData = function(req) {
	// Update the new data with the redis data
	var data = {
		user : req.user
	}

	var token = req.token;
	if(token) {
		redis.set(token, JSON.stringify(data));
	}

};
