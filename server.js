const express = require('express');
const path = require('path')
const app = express();
const PORT = 3001;
const data = require('./db/db.json');

const fs = require('fs');
let newData;

    const usuableData = fs.readFileSync('./db/db.json','utf8')
    newData=JSON.parse(usuableData)
    let ID = fs.readFileSync('./db/id.json','utf8')
    id=JSON.parse(ID)

// console.log(usuableData,newData)
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
    res.json(newData)
})

app.post('/api/notes',(req,res)=>{
    // console.log(usuableData)
    req.body.id=id.id
    id.id++
    newData.push(req.body)
    fs.writeFileSync('./db/id.json',JSON.stringify(id),err=>{
        err?console.log(err):console.log('Updated database')
    })
    fs.writeFileSync('./db/db.json',JSON.stringify(newData),err=>{
        err?console.log(err):console.log('Updated database')
    })
})

app.delete(`/api/notes/:toDelete`,(req,res)=>{
    newData = newData.filter(data=>data.id!==parseInt(req.params.toDelete))
    // console.log('delete',reducedData,req.params.toDelete,reducedData[1].id===parseInt(req.params.toDelete))
    fs.writeFileSync('./db/db.json',JSON.stringify(newData),err=>{
        err?console.log(err):console.log('Updated database')
    })
})
app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})