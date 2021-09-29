const EventEmitter = require('events')
const path = require('path')
const fs = require('fs')

const emitter = new EventEmitter()

emitter.on('log', (message) => {
    fs.appendFile(path.join(__dirname, 'log.txt'), message, (err) => {
        if (err) throw err
    })
    console.log(message)
})

function log(message) {
    emitter.emit('log', message)
}

module.exports = log