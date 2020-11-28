const path = require('path')
const repository = require(path.resolve(__dirname, '..', 'repositories', 'user-repository'))
const errors = require(path.resolve(__dirname, '..', 'errors', 'errors'))
const bcrypt = require('bcrypt')


var signup_validation = {}

signup_validation.valid_name = (name) => {
	if(typeof name === 'string') {
		name = name.trim()
		if(name)
			return name
	}
	throw new errors.Signup_Error('Nome inválido')
}

signup_validation.valid_email = (email) => {
	if(typeof email === 'string') {
		email = email.trim()
		if(email || email.match(/.+@.+/))
			return email
	}
	throw new errors.Signup_Error('Formato de e-mail inválido')
}

signup_validation.valid_password = (password) => {
	if(typeof password === 'string') {
		password = password.trim()

		if(password.lenght < 8)
			throw new errors.Signup_Error('A senha não pode ter menos do que 8 caracteres')
		if(password.lenght > 256)
			throw new errors.Signup_Error('A senha não pode ter mais do que 256 caracteres')
		return password
	}
	throw new errors.Signup_Error('Senha vazia ou nula')
}

async function signup(name, email, password) {
	try {
		name = signup_validation.valid_name(name)
		email = signup_validation.valid_email(email)
		password = signup_validation.valid_password(password)

		const hashedPassword = await bcrypt.hash(password, 10)
		await repository.signup(name, email, hashedPassword)
	}
	catch(err) {
		if(err instanceof errors.Http_Error)
			throw err
		console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
		throw new errors.Internal_Server_Error()
	}
}

module.exports = {
	signup
}