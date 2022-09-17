console.clear()

var express = require('express')
var https = require('https')
var http = require('http')
var fs = require('fs')


var app = express()

app.use(express.static(__dirname + "/src"))

var privateKey = fs.readFileSync('./privatekey.pem')
var certificate = fs.readFileSync('./certificate.pem')
var credentials = {key: privateKey, cert: certificate}

var httpsServer = https.createServer(credentials, app)
var httpServer = http.createServer((req, res) => {
    res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`})
    res.end()
}, app)

httpsServer.listen(443, () => console.info(`Listening on port 443...`))
httpServer.listen(80, () => console.info(`Listening on port 80...`))

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/src/site.html')
})

app.get('/github', async (req, res) => {
    res.redirect('https://github.com/HekaHub/Desure-bot')
})

app.get('/invite', async (req, res) => {
    res.redirect('https://discord.com/oauth2/authorize?client_id=842425623754702868&scope=bot%20applications.commands&permissions=8')
})

app.get('/support', async (req, res) => {
    res.redirect('https://discord.gg/XZhRJfGF57')
})

app.get('/documentation', async (req, res) => {
    res.redirect('https://desure.gitbook.io/desure/')
})

app.use(async (req, res) => {
    res.sendFile(__dirname + '/src/404.html')
})