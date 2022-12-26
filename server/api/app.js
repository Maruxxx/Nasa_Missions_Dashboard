const express = require('express');
const app = express();
const path = require('path');

// Cors to allow fetching endpoints
const cors = require('cors');
app.use(cors())

// Tracking requests
const morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

// Routes
const v1 = require('./routes/v1')
app.use('/v1',v1)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;