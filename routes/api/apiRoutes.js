const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');
const {deleteNote,addNote} = require('../../helpers/fsUtil');
const uuid = require('../../helpers/id');


// Endpoint: /api

app.get('/notes',(req,res)=>{
    console.info(`${req.method} request received for feedback`);
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        err?console.log(err):res.json(JSON.parse(data))
    })
})

app.post('/notes',(req,res)=>{
    const { title,text } = req.body
    if (title&&text){
        console.log(uuid())
        const newNote = {
            title,
            text,
            id:uuid()
        }
        addNote('./db/db.json',newNote)
        const response = {
            status: 'success',
            body: `Added ${newNote}`,
          };
      
          res.json(response);
    }
})

app.delete(`/notes/:toDelete`,(req,res)=>{
    // notesArray = notesArray.filter(data=>data.id!==parseInt(req.params.toDelete))
    deleteNote('./db/db.json',parseInt(req.params.toDelete))
    const response = {
        status: 'success',
        body: 'Deleted Note',
      };
  
      res.json(response);
})

module.exports = app;