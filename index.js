// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());


server.post('/api/users', (req, res)=>{
    const data = req.body;

    if(!data.name || !data.bio){
        res.status(400).json({error: 'Please provide name and full bio for the user.'})
    }

    db.insert(data)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(400).json({error: 'this is an error'})
    })
})
server.get('/api/users', (req, res)=>{
    db.find().then(users=> {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: 'user info could not be retrieved'});
    })
})
server.get('/api/users/:id', (req, res)=>{
    const id = req.params.id;
        db.findById(id).then(user=> {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }else
            res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json({ message: "The user information could not be retrieved." })
    })
})
server.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    db.remove(id).then(user => {
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else
        res.status(200).json(user)
    })
    .catch(err => {
        res.json({message: 'The user could not be removed'})
    })
})
server.put('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    const changes = req.body;
    if(!changes.name || !changes.bio){
        res.status(400).json({message: "Please provide name and bio for the user."})
    }
    db.update(id, changes).then(user=> {
        if(!user){
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }else
        res.status(200).json(user)
    })
    .catch(err=> {
        res.status(400).json({message: "Please provide name and bio for the user."})    
    })
})

const port = 5000;
server.listen(port, ()=> console.log(`n** API on port ${port}**/n`));
