const path = require('path')
const repository = require(path.resolve(__dirname, '..', 'repositories', 'user-repository'))
const bcrypt = require('bcrypt')

function checkName(name) {
	if(!name || !name.trim())
		throw { status: 400, message: 'Nome inválido!'}
	return name.trim()
}

function checkEmail(email) {
	if(!email || !email.trim())
		throw { status: 400, message: 'E-mail inválido!'}
	return email.trim()
}

function checkPassword(password) {
	if(!password || !password.trim())
		throw { status: 400, message: 'Senha inválida!'}
	return password.trim()
}

async function signup(name, email, password) {
	name = checkName(name)
	email = checkEmail(email)
	password = checkPassword(password)

	var hashedPassword = ''
	try {
		hashedPassword = await bcrypt.hash(password, 10)
	} catch (err) {
		// TODO: Tratar erro
	}

	try {
		await repository.signup(name, email, hashedPassword)
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
	signup
}