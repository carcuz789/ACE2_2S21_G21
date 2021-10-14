
//////////////////////////
//para ingreso a bd
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const SerialPort = require('SerialPort');
const ReadLine = require('@serialport/parser-readline');//@serialport/parser-readlineserialport/parser-readline
const mssql = require('mysql')
const port = new SerialPort('COM7', { baudRate: 38400 });
const parser = port.pipe(new ReadLine({ deliniter: '\n' }));
const router = express.Router();
//////////////////////////////
//para prosessing


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
        var pool = mssql.ConnectionPool({
            host: "usac21.database.windows.net",
            user: "rodrigo",
            password: "reco320.aa",
            database: "USAC21"
          });
         
        const request = pool.request();
         
        request.input('fecha', myArr[0]);
        request.input('TEMPERATURA', myArr[1]);
        request.input('LUZ', myArr[2]);
        request.input('DIRECCION', myArr[3]);
        request.input('VELOCIDAD', myArr[4]);
        request.input('HUMEDAD', myArr[5]);
        request.input('VELOCIDADTIPO', myArr[6]);
        request.input('VISIBILIDAD', myArr[7]);
        request.input('LLUVIA', myArr[8]);
        request.input('CALOR', myArr[9]);
        request.input('DIASEMANA', myArr[10]);
        const result =  request.execute('SP_INSERTARDATA');
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }  
   
}

