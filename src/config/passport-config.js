const { Strategy } = require('passport-local')
const service = require('../services/user-service')
const errors = require('../errors/errors')

module.exports = function(passport) {
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser(async (id, done) => {
		try {
			return done(null, await service.findById(id))
		} catch (error) {
			if(err instanceof errors.Internal_Server_Error)
				return done(err)
			else if(err instanceof errors.Http_Error)
				return done(null, false, err.message)
			return done(err)
		}
	})

	passport.use(new Strategy(
		{ 
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				const user = await service.login(email, password)
				return done(null, user)	
			} catch (err) {
				if(err instanceof errors.Internal_Server_Error)
					return done(err)
				else if(err instanceof errors.Http_Error)
					return done(null, false, err.message)
				return done(err)
			}
		}
	))
}