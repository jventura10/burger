//Connection File to Establish Connection to Database
var mysql=require("mysql");

var connection=mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "burgers_db",
    password: "passwordHere"
});

connection.connect(function(error){
    if(error){
        console.log("Error Connecting "+error.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
    
});

module.exports=connection;