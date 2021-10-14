//para ingreso a bd
const SerialPort = require('SerialPort');
const ReadLine = require('@serialport/parser-readline');//@serialport/parser-readline

const port = new SerialPort('COM7',{baudRate:38400});
const parser = port.pipe(new ReadLine({deliniter : '\n'}));
//////////////////////////////
//para prosessing
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const {Connection, Request} = require("tedious");
//////////////////////////

const executeSQL = (sql, callback) => {
    let connection = new Connection({
      "authentication": {
        "options": {
          "userName": "rodrigo",
          "password": "reco320.aa"
        },
        "type": "default"
      },
      "server": "usac21.database.windows.net",
      "options": {
        "validateBulkLoadParameters": false,
        "rowCollectionOnRequestCompletion": true,
        "database": "USAC21",
        "encrypt": true
      }
    });

    connection.connect((err) => {
        if (err)
          return callback(err, null);
    
        const request = new Request(sql, (err, rowCount, rows) => {
          connection.close();
    
          if (err)
            return callback(err, null);
    
          callback(null, {rowCount, rows});
        });
    
        connection.execSql(request);
      });
    };


//mongodb+srv://sa:<password>@cluster0.drgpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


port.on("open",() => { 
    console.log('serial port abierto');
});


parser.on("data",data => {
    console.log(data);
    console.log("Callate el hocico si funciona");

    insertdata(data);
    

});

function insertdata(data){
    const myArr = data.split("$");
    const FPS = "INSERT INTO DATA2 (fecha, TEMPERATURA,LUZ,DIRECCION,VELOCIDAD,HUMEDAD,VELOCIDADTIPO,VISIBILIDAD,LLUVIA,CALOR,DIASEMANA) VALUES ( '"+myArr[0]+"','"+myArr[1]+"','"+myArr[2]+"','"+myArr[3]+"','"+myArr[4]+"','"+myArr[5]+"','"+myArr[6]+"','"+myArr[7]+"','"+myArr[8]+"','"+myArr[9]+"','" +myArr[10]+"' )"; 
    executeSQL("INSERT INTO DATA2 (fecha, TEMPERATURA,LUZ,DIRECCION,VELOCIDAD,HUMEDAD,VELOCIDADTIPO,VISIBILIDAD,LLUVIA,CALOR,DIASEMANA) VALUES ( '"+myArr[0]+"','"+myArr[1]+"','"+myArr[2]+"','"+myArr[3]+"','"+myArr[4]+"','"+myArr[5]+"','"+myArr[6]+"','"+myArr[7]+"','"+myArr[8]+"','"+myArr[9]+"','" +myArr[10]+"' )", (err, data) => {
    if (err)
      console.error(err);
  

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