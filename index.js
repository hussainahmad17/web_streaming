const fs = require("fs")
const express = require("express")
const status = require("express-status-monitor")
const zlib = require("zlib")
const app = express()


app.use(status())

//stream reading files
app.get("/",(req,res)=>{
    const stream = fs.createReadStream("./data.txt","utf-8")
    stream.on("data",(chunks)=>{
        res.write(chunks)
    })
    stream.on("end",()=>res.end())
})


// zip the file using the streams
fs.createReadStream("data.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("new.zip")))
 


app.listen(3000,()=>console.log("started at 3000"))
