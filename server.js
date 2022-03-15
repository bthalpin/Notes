const express = require('express');
const path = require('path')
const app = express();
const PORT = 3001;
const fs = require('fs');


const data = fs.readFileSync('./db/db.json','utf8')
const ID = fs.readFileSync('./db/id.json','utf8')


let notesArray=JSON.parse(data)
let noteCount=JSON.parse(ID)

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=>{
    res.json('Connected')
    console.log('Get request received')
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})

app.get('/api/notes',(req,res)=>{
    res.json(notesArray)
})

app.post('/api/notes',(req,res)=>{
    req.body.id=noteCount.id
    noteCount.id++
    notesArray.push(req.body)
    fs.writeFileSync('./db/id.json',JSON.stringify(noteCount),err=>{
        err?console.log(err):console.log('Updated database')
    })
    fs.writeFileSync('./db/db.json',JSON.stringify(notesArray),err=>{
        err?console.log(err):console.log('Updated database')
    })
})

app.delete(`/api/notes/:toDelete`,(req,res)=>{
    notesArray = notesArray.filter(data=>data.id!==parseInt(req.params.toDelete))
    fs.writeFileSync('./db/db.json',JSON.stringify(notesArray),err=>{
        err?console.log(err):console.log('Updated database')
    })
})

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})