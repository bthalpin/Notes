const express = require('express');
const path = require('path')
const app = express();

// Endpoint: /notes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/notes.html'))
})

module.exports = app;