const dao = require('../dao/userDao')

async function signUp(name, email, password) {
	// Verify if name is correct

	try {
		await dao.insert(name, email, password)
	}
	catch(err) {
		// Unknown error
		var code = 500
		var msg = 'Erro desconhecido'

		// email already exists
		if(err.errno === 19) {
			code = 422 // Unprocessable Entity: Syntax is ok, but semantic fails
			msg = 'Email já existe'
		}
			
		throw { code, msg }
	}
}

module.exports = {
	signUp
}