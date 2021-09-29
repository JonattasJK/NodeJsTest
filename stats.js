const os = require('os')
const path = require('path')
const log = require(path.join(__dirname, 'logger'))

setInterval(() => {
    const { freemem, totalmem } = os
    
    const freeMem = parseInt(freemem() / 1024 / 1024)
    const totalMem = parseInt(totalmem() / 1024 / 1024)
    const percents = parseInt((freeMem/totalMem) * 100)
    
    const stats = {
        free: `${freeMem} MB`,
        total: `${totalMem} MB`,
        percent: `${percents}%` 
    }
    
    console.clear()
    console.log("= Pc Stats ============")
    console.table(stats)

    log(`${JSON.stringify(stats)}\n`)

}, 5000)
