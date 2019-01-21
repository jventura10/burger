//Connection File to Establish Connection to Database
var mysql=require("mysql");
var connection;

if(process.env.JAWSDB_URL){
    connection=mysql.createConnection(process.env.JAWSDB_URL);
}
else{
    connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 3306,
        database: "burgers_db",
        password: "passwordHere"
    });
}


connection.connect(function(error){
    if(error){
        console.log("Error Connecting "+error.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
    
});

module.exports=connection;