const express = require('express')
const routes = require('./routes')

const app = express()

// Possibilita ao express entender o corpo da requisição em formato json
app.use(express.json())
// Usa o arquivo de rotas
app.use(routes)

// // Para acessar recursos estáticos como imagens (da pasta ./../uploads/)
// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))


// // ====================== Testing =======================
// users = [
//     "Diego",
//     "Cleiton",
//     "Robson",
//     "Daniel"
// ]

// // Query Params: Usuais para busca e filtragem de elementos
// app.get('/users', (request, response) => {
//     const search = request.query.search
//     const filteredUsers = search ? users.filter(user => user.includes(search)) : users
//     return response.json(filteredUsers);
// })

// // Request Param: Vêm na própria rota e identificam um recurso (opcionais)
// app.get('/users/:id', (request, response) => {
//     return response.json(users[request.params.id])
// })

// // Request Body
// app.post('/users', (request, response) => {
//     const data = request.body
//     const user = {
//         "name" : data.name,
//         "email": data.email
//     }

//     return response.json(user)
// })

// // ======================================================


app.listen(8080)

