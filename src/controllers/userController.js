const path = require('path')
const service = require(path.resolve(__dirname, '..', 'services', 'userService'))

async function signUp(request, response) {
	const {
		name,
		email,
		password,
	} = request.body

	try {
		await service.signUp(name, email, password);
		response.sendStatus(200); // Ok
	}
	catch(err) {
		response.status(err.code).send(err.msg)
	}
}

module.exports = {
	signUp
}