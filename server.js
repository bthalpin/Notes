const express = require('express');
const app = express();
const routes = require('./routes/index');

const PORT = process.env.PORT || 3005;


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'));

// Middleware to log the path
app.use((req,res,next)=>{
    console.info(`Connection to path: ${req.path}`);
    next()
})

// Connects the api and html routes
app.use(routes)

// Default path required in server.js for heroku
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/index.html'))
})



app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})

