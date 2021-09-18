
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3001;

const {Connection, Request} = require("tedious");


const executeSQL = (sql, callback) => {
    let connection = new Connection({
      "authentication": {
        "options": {
          "userName": "rodrigo",
          "password": "reco320.aa"
        },
        "type": "default"
      },
      "server": "usacrod.database.windows.net",
      "options": {
        "validateBulkLoadParameters": false,
        "rowCollectionOnRequestCompletion": true,
        "database": "usac",
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


/**
 * Middlewares
 * CORS
 * MORGAN
 * EXPRESS.JSON
 * EXPRESS.URLENCONDED
 */


/**
 * Routes
 */
// app.get("/", (req, res) =>

//     res.send(getdata())

// );


app.get('/DATOSCRUD', async function (req, res) {
   
      
    executeSQL("EXEC SP_DATOSCRUDOS", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
        
      });

});
app.get('/TIEMPOTOTHORASUSO', async function (req, res) {
   
      
    executeSQL("EXEC SP_TIEMPOTOTALHORASUSO", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
      
      });

});
app.get('/DARUSUARIO', async function (req, res) {
   
      ///VER COMO ME DA LOS DATOS
    executeSQL("EXEC SP_TIEMPOTOTALHORASUSO", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
       
      });

});
app.get('/GRAFICAPESO', async function (req, res) {
   
      
    executeSQL("EXEC SP_GRAFICAPESO", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
       
      });

});
app.get('/DIASMAYORUSO', async function (req, res) {
   
      
    executeSQL("EXEC SP_DIASMAYORUSO2", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
        
      });

});
app.get('/LEVANTAPROM', async function (req, res) {
   
      
    executeSQL("EXEC SP_NVECESLEVANTAPROM", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
        
      });

});
app.get('/USOPROMPORDIA', async function (req, res) {
   
      
    executeSQL("EXEC SP_USOPROMDIA", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
        
      });

});
app.get('/TIEMPOREAL', async function (req, res) {
   
      
    executeSQL("EXEC SP_TIEMPOREAL", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
       
      });

});
app.get('/DIASMENORUSO', async function (req, res) {
   
      
    executeSQL("EXEC SP_DIASMENORUSO", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
       
      });

});
app.get('/HISTORIALTIEMPO', async function (req, res) {
   
      
    executeSQL("EXEC SP_HISTORIALTIEMPO", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
       
      });

});



/**
 * Inicio del servidor
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));