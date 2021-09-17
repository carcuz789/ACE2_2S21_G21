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
        const result = await pool.request()
            .output('usuario', 0)
            .output('horain', 0)
            .output('horafin', 0)
            .output('fechain', 0)
            .output('fechafin', 0)
            .output('ttrans', 0)
            .output('contador', 0)
            .output('peso', 0)
            .output('dia', 0)
            .execute('SP_INSERTARDATA');
        const status = {
            Count: +result.output.Count,
            Max: +result.output.Max,
            Min: +result.output.Min,
            Average: +result.output.Average,
            Sum: +result.output.Sum
        };

        res.json(status);
    } catch (error) {
        res.status(500).json(error);
    }  
   
}
//////////////////////////

