const fs = require('fs')
const http = require('http')
const path = require('path')
const URL = require('url')

const data = require(path.join(__dirname, 'urls.json'))

http.createServer((req,res) => {
    const { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    if(!name || !url)
        return res.end(JSON.stringify(data))
    
    if (del){
        data.urls = data.urls.filter(item => (String(item.url) !== String(url) && `${item.url}/` !== String(url)))
        //data.urls = data.urls.filter(item => ( `${item.url}` !==  `${url}` && `${item.url}/` !== `${url}`) )
        return writeFile((message) => res.end(message)) 
    }
    
    data.urls.push({name, url})

    return writeFile((message) => res.end(message))
}).listen(3000, () => console.log('Api online'))


function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err

            cb(JSON.stringify({message: "ok"}))
        }
    )
}