//para ingreso a bd
const SerialPort = require('SerialPort');
const ReadLine = require('@serialport/parser-readline');//@serialport/parser-readline
const mssql = require('mssql')
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
    var mysql = require('mysql');

    var pool = mssql.ConnectionPool({
      host: "usacrod.database.windows.net",
      user: "rodrigo",
      password: "reco320.aa",
      database: "usac"
    });
    try {
        await pool.connect();
        const request = pool.request();
         
        request.input('usuario', 'usuario');
        request.input('horain', myArr[0]);
        request.input('horafin', myArr[1]);
        request.input('fechain', myArr[2]);
        request.input('fechafin', myArr[3]);
        request.input('ttrans', myArr[4]);
        request.input('contador', myArr[5]);
        request.input('peso', myArr[6]);
        request.input('dia', myArr[7]);
        const result = await request.execute('SP_INSERTARDATA');
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }  
   
}
//////////////////////////

