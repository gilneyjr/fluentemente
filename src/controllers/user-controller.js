const path = require('path')
const service = require(path.resolve(__dirname, '..', 'services', 'user-service'))

async function signup(request, response) {
	const {
		name,
		email,
		password,
	} = request.body

	await service.signup(name, email, password)
	return response.redirect('/')

	// try {
	// 	await service.signUp(name, email, password);
	// 	return response.sendStatus(200); // Ok
	// }
	// catch(err) {
	// 	return response.status(err.code).send(err.msg)
	// }
}

function login(request, response) {
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