const express = require('express');
const path = require('path')
const app = express();
const PORT = 3005;
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
    // res.sendFile(path.join(__dirname,'public/index.html'))
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})

app.get('/api/notes',(req,res)=>{
    res.json(notesArray)
})

app.post('/api/notes',(req,res)=>{
    const { title,text } = req.body
    if (title&&text){
        const newNote = {
            title,
            text,
            id:noteCount.id
        }
        noteCount.id++
        notesArray.push(newNote)
        fs.writeFileSync('./db/id.json',JSON.stringify(noteCount),err=>{
            err?console.log(err):console.log('Updated database')
        })
        fs.writeFileSync('./db/db.json',JSON.stringify(notesArray,null,2),err=>{
            err?console.log(err):console.log('Updated database')
        })
        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
    }
})

app.delete(`/api/notes/:toDelete`,(req,res)=>{
    notesArray = notesArray.filter(data=>data.id!==parseInt(req.params.toDelete))
    fs.writeFileSync('./db/db.json',JSON.stringify(notesArray),err=>{
        err?console.log(err):console.log('Updated database')
    })
    const response = {
        status: 'success',
        body: 'Deleted',
      };
  
      res.json(response);
})

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})

// const readAndAppend = (content, file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedData = JSON.parse(data);
//         parsedData.push(content);
//         writeToFile(file, parsedData);
//       }
//     });
//   };