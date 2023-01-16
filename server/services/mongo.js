require('dotenv').config()
const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI

mongoose.connection.once('open', () => {
    console.log('✅CONNECTED!')
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