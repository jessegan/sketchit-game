const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const port = process.env.PORT || 8080
const DIST_DIR = path.join(__dirname,'../../dist')

const Lobby = require('./lobby')

app.use(express.static(DIST_DIR))

app.post('/lobbies',(req,res) => {
  
  const lobby = new Lobby()
  lobbies[lobby.code] = lobby

  console.log("New Lobby Created at Code:",lobby.code)

  res.json(lobby)
})

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname,'../../dist/index.html'), (err) => {
    if (err){
      res.status(500).send(err)
    }
  })
})

server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

// Setup socket.io
const io = socketio(server)

io.on('connection', client => {
  console.log("User connected!", client.id)

  // client.on("join_lobby", (code,username,color) ={

  // })

  client.on('disconnect', () => {
    console.log("User disconnected!")
  })
})

// Initialize empty lobbies object
var lobbies = {}