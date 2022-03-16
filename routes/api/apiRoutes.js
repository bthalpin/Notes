const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');
const {deleteNote,addNote} = require('../../helpers/fsUtil');
const uuid = require('../../helpers/id');


// Endpoint: /api


// Reads the notes from the db.json file and sends the information to the client side
app.get('/notes',(req,res)=>{
    console.info(`${req.method} request received for feedback`);
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        err?console.log(err):res.json(JSON.parse(data))
    })
})


// Adds a random id to the note created and appends it to the list of notes in db.json
app.post('/notes',(req,res)=>{
    const { title,text } = req.body
    if (title&&text){
        const newNote = {
            title,
            text,
            id:uuid()
        }
        addNote('./db/db.json',newNote)
        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
    }
})


// Checks for a note with the corresponding id and deletes it from db.json
app.delete(`/notes/:toDelete`,(req,res)=>{
    deleteNote('./db/db.json',parseInt(req.params.toDelete))
    const response = {
        status: 'success',
        body: 'Deleted Note',
      };
      console.info('Note deleted');
      res.json(response);
})

module.exports = app;