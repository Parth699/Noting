const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true)
        mongoose.set('useFindAndModify', false)
        mongoose.set('useCreateIndex', true)
        mongoose.set('useUnifiedTopology', true)
        mongoose.connect(DB_HOST)
        mongoose.connection.on('error', (e) => {
            console.log(e)
            process.exit()
        })
    },
    close: () => {
        mongoose.connection.close()
    }
}