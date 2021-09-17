
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3001;
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

app.get('/', async function (req, res) {
    Mongoclient.connect(url, function (err, client) {
        
        if (err) throw err;
        let database = client.db('mydb');
        //dbo.collection('measures').findOne({}, { sort: { _id: -1 } }, (err, data) => { data.json.},);
        database.collection('measures').findOne({},{ sort: { _id: -1 } }).then(function (result) {
            if (result) {
                res.json(result);

            }
        })
    });
});

app.get('/DATOSCRUDOS', async function (req, res) {
    var con = mysql.createConnection({
        host: "usacrod.database.windows.net",
        user: "rodrigo",
        password: "reco320.aa",
        database: "usac"
      });
      
      con.query("EXEC SP_DATOSCRUDOS ",  {
        success: function(results1) {            
            console.log(results1);

            var endOutput2 = results1;

            res.send(statusCodes.OK, endOutput2 ); 
      },
      error: function(err) {
            console.log("error is: " + err);
            res.send(statusCodes.OK, { message : err });
      }
    });
});


app.post('/register', function(req, res) {

    //get data from the request
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    function fetchID(callback) {
        connection.query('SELECT id_user FROM USERS WHERE username = ?', data.username, function(err, rows) {
            if (err) {
                callback(err, null);
            } else 
                callback(null, rows[0].id_user);
        });
    }
    var user_id;
    fetchID(function(err, content) {
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        } else {
            user_id = content;
            console.log(user_id); //undefined
        }
    });

    console.log(user_id); //undefined
    var payload = {
        iss: req.hostname,
        sub: user_id
    }
    console.log(payload.sub); //correct id
})

/**
 * Inicio del servidor
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));