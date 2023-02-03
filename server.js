require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const path = require("path")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

// deployment
__dirname=path.resolve()
if(process.env.Node_Env==='production'){
app.use(express.static(path.join(__dirname,'/iNotes/build')))
app.get('*',(res,req)=>{
    res.sendFile(path.resolve(__dirname,'/iNotes/build','index.html'))
})
}else{

} 

const port = process.env.PORT || 5000;
app.listen(port, console.log(` iNotes backened Listening on port ${port}...`));