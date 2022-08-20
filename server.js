// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const bodyParser = require('body-parser');
// const usersRoutes = require('./routes/users');
// const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// app.use(bodyParser.urlencoded({ extended    : false }));

// app.use(bodyParser.json());

// app.use('/users', usersRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello Programmersss!')
// })

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`)
// })


const http = require('http');

const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);