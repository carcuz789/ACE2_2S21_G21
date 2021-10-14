
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

    app.use(cors());
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
app.get('/PRONOSTICO1', async function (req, res) {
   
      
    executeSQL("EXEC SP_PRONOSTICO1", (err, data) => {
        if (err)
          console.error(err);
          res.send(data);
      
      });

});

/**
 * Inicio del servidor
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));