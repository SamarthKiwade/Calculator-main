
const express= require("express");              /*I havent undersootd so i need to repeat it again */
const bodyParser = require("body-parser");          /*It calls from index.html body line*/
const app= express();  
const mysql = require('mysql');                         /*We have created app as a function to calll express*/


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'calculator'
  });

  app.use(bodyParser.urlencoded({extended: true}) )

app.get("/", function(req, res){                            /*It calls index.html to localhost*/
    res.sendFile(__dirname + "/index.html");            /*Res and req is response and request NOTE request should be placed first and response after */
})

app.post("/index.html", function(req, res) {

    var num1= Number(req.body.num1);            /*Here req.body.num1 is called from index.html and stored inot var num1*/
    var num2= Number(req.body.num2);
    var result= Number(num1+num2);
  
    connection.query(`INSERT INTO calculations (num1, num2, result) VALUES (${num1}, ${num2}, ${result})`, (error, results) => {
        if (error) throw error;
        res.send(`Result: ${result}`);
      });
     // res.send("The result is: " +result);
});



app.listen(3000, function(){                                /* It creates localhost server*/
    console.log("Server is satrted at localhost 3000");
});