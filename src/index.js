
//commonjs
// const express = require('express')
// const path = require('path')
// const http = require('http')
// const socketio =  require('socket.io')
// const Filter  = require('bad-words')

// const app = express()
// const server =  http.createServer(app)
// const io  =  socketio(server)


//es module
import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { Filter } from 'bad-words';
import { fileURLToPath } from 'url';
import { generateMessages, generateMessageslocation } from './utils/messages.js';
import { addUser, getUserInRoom, getUser, removeUser } from './utils/users.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);



const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

io.on('connection', (socket) => {
    console.log('New socket server connection!')


    socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessages('Admin','Welcome'))
        socket.broadcast.to(user.room).emit('message', generateMessages('Admin',`${username} has joined this room`))
        io.to(user.room).emit('roomData' , {
            room : user.room,
            users : getUserInRoom(user.room)
        })

        callback()

    })

    socket.on('SendMessage', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        const user = getUser(socket.id)
        if (!user) {
            return callback('User not found')
        }

        io.to(user.room).emit('message', generateMessages(user.username, message))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessages('Admin',`${user.username} has has left this room`))
            io.to(user.room).emit('roomData',{
                room : user.room,
                users : getUserInRoom(user.room)
            })
        }

    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        if (!user) {
            return callback('User not found')
        }
        io.to(user.room).emit('LocationMessage', generateMessageslocation( user.username , `https://google.com/maps?q=${coords.longitude},${coords.latitude}`))
        callback('location sent')
    })
})

server.listen(port, () => {
    console.log(`Server is Up on PORT: ${port}!`)
}) 