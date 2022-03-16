const express = require('express');
const path = require('path')
const app = express();

// Endpoint: /
app.get('/',(req,res)=>{
    // res.json('Connected')
    res.sendFile(path.join(__dirname,'../../public/index.html'))
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/notes.html'))
})

module.exports = app;