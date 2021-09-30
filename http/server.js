const fs = require('fs')
const http = require('http')
const path = require('path')

http.createServer((req,res) => {
    const filePath = req.url === '/' ? 'index.html' : req.url
    const filePage = path.join(__dirname, 'public', filePath)
    const extname = path.extname(filePath)

    const allowedFleTypes = ['.html','.css','.js']
    const allowed = allowedFleTypes.find(item => item == extname)

    if (!allowed) return

    fs.readFile(
        filePage, (err, content) => {
            if(err) throw err

            res.end(content)
        }
    )
}).listen(5000, () => console.log('Server online'))