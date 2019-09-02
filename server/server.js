const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "devis"
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const cors = require('cors');




app.post('/goToDb', function (req, res) {
    // var values = [
    //   [req.body.goToDb.client, req.body.goToDb.priceAbo, req.body.goToDb.fas, req.body.goToDb.dateCrea, req.body.goToDb.service, req.body.goToDb.dure, req.body.goToDb.idPipe, req.body.goToDb.createur, req.body.goToDb.bdc],
    // ];

    // con.query("INSERT INTO CreationDevis (Client, PrixABO, PrixFAS, DateCreation,Service,Duree,IdPipeDrive,CreateurDevis,BDC) VALUES ?", [values], function (err, result) {
    //   if (err) throw err
    //     console.log(result.affectedRows + " devis a été inseré dans la DataBase ID n° : " + result.insertId);
    // });
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM CreationDevis", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        console.log("Requete SQL ok");
        
      });
    });

})

app.use(cors());
app.listen(4000)