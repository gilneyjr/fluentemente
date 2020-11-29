const repository = require('../repositories/user-repository')
const errors = require('../errors/errors')
const bcrypt = require('bcrypt')

var signup_validation = {}

valid_name = (name) => {
	if(typeof name === 'string') {
		name = name.trim()
		if(name)
			return name
	}
	throw new errors.Signup_Error('Nome inválido')
}

valid_email = (email) => {
	if(typeof email === 'string') {
		email = email.trim()
		if(email || email.match(/.+@.+/))
			return email
	}
	throw new errors.Signup_Error('Formato de e-mail inválido')
}

function valid_password_constraints(password) {
	if(password.lenght < 8)
		throw new errors.Signup_Error('A senha não pode ter menos do que 8 caracteres')
	if(password.lenght > 256)
		throw new errors.Signup_Error('A senha não pode ter mais do que 256 caracteres')
}

function valid_password(password, constraints) {
	if(typeof password === 'string') {
		password = password.trim()
		if(constraints)
			valid_password_constraints(password)
		return password
	}
	throw new errors.Signup_Error('Senha vazia ou nula')
}

async function signup(name, email, password) {
	try {
		name = valid_name(name)
		email = valid_email(email)
		password = valid_password(password, true)

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

async function login(email, password)  {
	try {
		// TODO: valid email and password
		email = valid_email(email)
		password = valid_password(password, false)

		const user = await repository.findByEmail(email)
		if(await bcrypt.compare(password, user.password))
			return user
		throw new errors.PasswordDoesNotMatch('Senha Incorreta')
	} catch (err) {
		if(err instanceof errors.Http_Error)
			throw err
		throw new errors.Internal_Server_Error()
	}
}

async function findById(id) {
	// Check if id is a valid integer
	if(!id || !/^(0|[1-9]+)$/.test(id))
		throw InvalidIdError('Formato de id inválido')
	return await repository.findById(id)
}

module.exports = {
	signup,
	login,
	findById
}