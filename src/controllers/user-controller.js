const service = require('../services/user-service')
const errors = require('../errors/errors')

async function signup(request, response, next) {
	const {
		name,
		email,
		password,
	} = request.body

	try {
		await service.signup(name, email, password)
		return next()
	} catch (err) {
		if(err instanceof errors.Http_Error) {
			console.log(err.message)
			response.status(err.status)
		}
		else
			return response.status(500).send('Internal Server Error')
		return response.redirect('/signup')
	}
}

function logout(request, response) {
	request.logOut()
	return response.redirect('/login')
}

module.exports = {
	signup,
	logout
}