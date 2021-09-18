//para ingreso a bd
const SerialPort = require('SerialPort');
const ReadLine = require('@serialport/parser-readline');//@serialport/parser-readline
const mssql = require('mysql')
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ deliniter: '\n' }));
const router = express.Router();
//////////////////////////////
//para prosessing
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
/////////
port.on("open", () => {
    console.log('serial port abierto');
});

parser.on("data", data => {
    console.log(data);
    console.log("--------------------");

    insertdata(data);


});


function insertdata(data) {
    
    const myArr = data.split("$");  
   

    
    try {
        var pool = mssql.createConnection({
            host: "usacrod.database.windows.net",
            user: "rodrigo",
            password: "reco320.aa",
            database: "usac"
          });
         
        const request = pool.request();
         
        request.input('usuario', 'usuario');
        request.input('horain', '20:21');
        request.input('horafin', '20:21');
        request.input('fechain', '20210313');
        request.input('fechafin', '20210313');
        request.input('ttrans', 5);
        request.input('contador', 5);
        request.input('peso', 1.1);
        request.input('dia', 'LUNES');
        const result =  request.execute('SP_INSERTARDATA');
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }  
   
}
//////////////////////////

