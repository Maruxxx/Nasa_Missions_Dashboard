// Http server configuration using express.js as a middleware.
require('dotenv').config()
const app = require('./app');
const http = require('http');
const server = http.createServer();
const port = process.env.PORT


server.listen(port, () => console.log(`Listening to port ${port}`))