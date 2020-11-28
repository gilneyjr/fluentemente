const path = require('path')
const service = require('../services/user-service')
const errors = require('../errors/errors')

async function signup(request, response) {
	const {
		name,
		email,
		password,
	} = request.body

	try {
		await service.signup(name, email, password)
		return response.redirect('/')
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

function login(request, response) {
	const { email, password } = request.body

	return response.send('Falta implementar o [POST] /login')
}

function logout(request, response) {
	return response.send('Falta implementar o [POST] /logout')
}

module.exports = {
	signup,
	login,
	logout
}