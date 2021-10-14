
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
          let contador = 0;
          let respuesta = [];
          let stringTemp = '';
          //let objeto = JSON.parse( data.rows );
          Object.entries(data.rows).map(([key,value]) => {
            Object.entries(value).map(([key1,value1]) => {
              if (contador === 0){
              }else if (contador ===1){
                stringTemp = value1.value.toString();
                stringTemp = String(stringTemp).substring(4,15);
                respuesta.push(stringTemp.replace('-','/'));
              }else if (
                contador === 4  ||
                contador === 7  ||
                contador === 8  ||
                contador === 9  ||
                contador === 10 ||
                contador === 11
              ){
                stringTemp = value1.value;
                if (contador === 11){
                  //respuesta.push(stringTemp.toLowerCase().substring(0,stringTemp.length-1));
                  respuesta.push(stringTemp.toLowerCase());
                }else {
                  respuesta.push(stringTemp.toLowerCase());
                }           
              }else{
                //Solo agregar el dato
                respuesta.push(value1.value)
              }
              contador++;
            });
          });
          res.send(respuesta);
      });
});
app.get('/PRONOSTICO1', async function (req, res) {
   
      
    executeSQL("EXEC SP_PRONOSTICO1", (err, data) => {
        if (err)
          console.error(err);
          let contador = 0;
          let contadorPosicion = 0;
          let respuesta = [];
          let nodo = [];
          let stringTemp = '';
          Object.entries(data.rows).map(([key,value]) => {
            contador = 0;
            nodo = [];
            Object.entries(value).map(([key1,value1]) => {
              if (contador ===0){
                stringTemp = value1.value.toString();
                stringTemp = String(stringTemp).substring(4,15);
                respuesta.push(stringTemp.replace('-','/'));
              }else if (
                contador === 3  ||
                contador === 6  ||
                contador === 7  ||
                contador === 8  ||
                contador === 9 ||
                contador === 10
              ){
                stringTemp = value1.value;
                if (contador === 10){
                  //nodo.push(stringTemp.toLowerCase().substring(0,stringTemp.length-1));
                  respuesta.push(stringTemp.toLowerCase());
                }else {
                  respuesta.push(stringTemp.toLowerCase());
                }           
              }else{
                //Solo agregar el dato
                respuesta.push(value1.value)
              }
              contador++;
            });
            //nodo.push(contadorPosicion);
            //contadorPosicion++;
            //respuesta.push(nodo);
          });
          res.send(respuesta);
      });

});

/**
 * Inicio del servidor
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));