require('dotenv').config()
const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://marux:hornet9512@nasa-mission-control.7szsobj.mongodb.net/nasa-db?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('✅✅✅ Database connected successfully! ✅✅✅')
});

mongoose.connection.on('error', (err) => console.error(err))

async function mongoConnect() {
    await mongoose.connect(DB_URI)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}