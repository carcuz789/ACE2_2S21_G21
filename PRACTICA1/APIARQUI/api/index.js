//para ingreso a bd
const SerialPort = require('SerialPort');
const ReadLine = require('@serialport/parser-readline');//@serialport/parser-readline

const port = new SerialPort('COM3',{baudRate:9600});
const parser = port.pipe(new ReadLine({deliniter : '\n'}));
//////////////////////////////
//para prosessing
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


//////////////////////////



//mongodb+srv://sa:<password>@cluster0.drgpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const Mongoclient = require('mongodb').MongoClient;
const url = "mongodb://sa:reco320.aa@cluster0-shard-00-00.drgpa.mongodb.net:27017,cluster0-shard-00-01.drgpa.mongodb.net:27017,cluster0-shard-00-02.drgpa.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-soxk4t-shard-0&authSource=admin&retryWrites=true&w=majority";

port.on("open",() => { 
    console.log('serial port abierto');
});

parser.on("data",data => {
    console.log(data);
    console.log("que putas");

    insertdata(data);
    

});

function insertdata(data){
    Mongoclient.connect(url,(err,db)=>{
       if(err) throw err;
       const dbo = db.db('mydb');
       const obj = JSON.parse(data);
       dbo.collection('measures').insertOne(obj,(err,res) => {
            if(err) throw err;
            db.close;

       });  
    });
}
/// para prosessing
/**
 * Middlewares
 * CORS
 * MORGAN
 * EXPRESS.JSON
 * EXPRESS.URLENCONDED
 */
 const corsOptions = { origin: true, optionsSuccessStatus: 200 };
 app.use(cors(corsOptions));
 app.use(express.json({ extended: true }));
 app.use(express.urlencoded({ extended: true }));
 app.use(morgan("dev"));
 
 /**
  * Routes
  */
 
 
 /**
  * Inicio del servidor
  */
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));