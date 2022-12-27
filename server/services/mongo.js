require('dotenv').config()
const mongoose = require('mongoose')
const dbUrl = process.env.DB_URI

mongoose.connection.once('open', () => {
    console.log('✅✅✅ Database connected successfully! ✅✅✅')
});

mongoose.connection.on('error', (err) => console.error(err))

async function mongoConnect() {
    await mongoose.connect(dbUrl)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}