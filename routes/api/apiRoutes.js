const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');
const {readAndAppend,readFromFile, writeToFile,readAndDelete} = require('../../helpers/fsUtil');
const uuid = require('../../helpers/uuid');
// Endpoint: /api

// const data = fs.readFileSync('../../db/db.json','utf8')
// const ID = fs.readFileSync('../../db/id.json','utf8')


// let notesArray=JSON.parse(data)
// let noteCount=JSON.parse(ID)

app.get('/notes',(req,res)=>{
    console.info(`${req.method} request received for feedback`);
    readFromFile('./db/db.json').then(data=>res.json(JSON.parse(data)))
})

app.post('/notes',(req,res)=>{
    const { title,text } = req.body
    if (title&&text){
        const newNote = {
            title,
            text,
            id:uuid()
        }
        readAndAppend('./db/db.json',newNote)
        // notesArray.push(newNote)
        // fs.writeFileSync('./db/id.json',JSON.stringify(noteCount),err=>{
        //     err?console.log(err):console.log('Updated database')
        // })
        // fs.writeFileSync('./db/db.json',JSON.stringify(notesArray,null,2),err=>{
        //     err?console.log(err):console.log('Updated database')
        // })
        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
    }
})

app.delete(`/notes/:toDelete`,(req,res)=>{
    
    // notesArray = notesArray.filter(data=>data.id!==parseInt(req.params.toDelete))
    readAndDelete('./db/db.json',req.params.toDelete)
    const response = {
        status: 'success',
        body: 'Deleted',
      };
  
      res.json(response);
})

module.exports = app;