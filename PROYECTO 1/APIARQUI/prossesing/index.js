
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
const corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


const Mongoclient = require('mongodb').MongoClient;
const { response } = require("express");
const url = "mongodb://sa:reco320.aa@cluster0-shard-00-00.drgpa.mongodb.net:27017,cluster0-shard-00-01.drgpa.mongodb.net:27017,cluster0-shard-00-02.drgpa.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-soxk4t-shard-0&authSource=admin&retryWrites=true&w=majority";
//mongodb://sa:<password>@cluster0-shard-00-00.drgpa.mongodb.net:27017,cluster0-shard-00-01.drgpa.mongodb.net:27017,cluster0-shard-00-02.drgpa.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-soxk4t-shard-0&authSource=admin&retryWrites=true&w=majority
var cursor;

async function getdata() {
    Mongoclient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('mydb');

        //dbo.collection('measures').findOne({}, { sort: { _id: -1 } }, (err, data) => { data.json.},);




    });
}

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

/**
 * Inicio del servidor
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));