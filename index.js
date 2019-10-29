// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());


server.post('/api/users', (req, res)=>{
    const data = req.body;
    db.insert(data)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.send({message: 'error adding user'})
    })
})
server.get('/api/users', (req, res)=>{
    db.find().then(users=> {
        res.send(users)
    })
    .catch(err => {
        res.send({message: 'error getting users'});
    })
})
server.get('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    db.findById(id).then(user=> {
        res.send(user)
    })
    .catch(err=>{
        res.send({message: 'error getting user'})
    })
})
server.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    db.remove(id).then(user => {
        res.json(user)
    })
    .catch(err => {
        res.send({message: 'error deleting user'})
    })
})
server.put('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes).then(user=> {
        res.json(user)
    })
    .catch(err=> {
        res.send({message: 'error updating user'})
    })
})

const port = 5000;
server.listen(port, ()=> console.log(`n** API on port ${port}**/n`));
