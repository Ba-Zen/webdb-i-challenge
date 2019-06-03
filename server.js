const express = require('express');

const server = express();

const db = require('./data/accounts-model.js');

server.use(express.json());

// your code here

server.get('/', (req, res) =>{
    res.send('<h2>Hello Thurrr</h2>')
});


server.post('/api/accounts', (req,res) => {
    const newAccount = req.body;
    
    db.add(newAccount)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => {
        res.send(500).json({err: 'err adding accounts'})
    })
})

server.get('/api/accounts', (req, res) => {

    db.find()
    .then(allAccounts => {
        res.status(200).json(allAccounts)
    })
    .catch(err => {
        res.send(500).json({err: 'err getting accounts'})
    })
})

server.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(accId => {
        res.status(200).json(accId)
    })
    .catch(err => {
        res.send(500).json({err: 'err getting account by ID'})
    })
})

server.put('/api/accounts/:id', (req, res) =>{
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes) 
    .then(updatedAcc => {
        if(updatedAcc) {
            res.status(200).json(updatedAcc)
        } else if (!updatedUser.name || updatedUser.bio){
            res.status(400).json({ errorMessage: 'please provide name or bio'})
        } else {
            res.status(404).json({ errorMessage: 'this user ID does not exist'})
        } 
    })
    .catch(err => {
        res.send(500).json({err: 'err updating account'})
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(acc => {
        res.status(204).json(acc)
    })
    .catch(err => {
        res.send(500).json({err: 'err removing account'})
    })
})






module.exports = server;