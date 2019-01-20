var connection=require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    selectAll: function(dbTable,someCallback){
        //Simple Select Query for all Entries in burgers Table in burgers_db
        //DB Query
        var selectQuery="SELECT * FROM "+dbTable+";";

        connection.query(selectQuery,function(err,result){
            if(err){
                throw (err);
            }

            //Call the Callback Function From burger.js Which Sends Result to Original Callback in burgers_controller.js
            // orm => burger => burgers_controller
            someCallback(result);
        });
    },
    insertOne: function(dbTable,cols,vals,someCallback){
        //Insert a New Entry Into burgers Table in burgers_db
        //Build DB Query
        var insertQuery="INSERT INTO "+dbTable;
        insertQuery+=" (";
        insertQuery+=cols.toString();
        insertQuery+=") ";
        insertQuery+="VALUES (";
        insertQuery+=printQuestionMarks(vals.length);   //Insert Question Marks as Placeholder for Every Value
        insertQuery+=") ";

        console.log(insertQuery);

        //Use Query and Fill in Question Marks With Values
        connection.query(insertQuery,vals,function(err,result){
            if(err){
                throw err;
            }

            
            someCallback(result);
        });
    },
    updateOne: function(dbTable,objColVals,findBur,someCallback){
        //Update an Entry from the burgers Table in burgers_db
        //Build DB Query
        var updateQuery="UPDATE "+dbTable;
        updateQuery+=" SET ";   
        updateQuery+=objToSql(objColVals);  //Call objToSql to Convert Key/Value Pari to SQL Syntax
        updateQuery+=" WHERE ";
        updateQuery+=findBur;

        console.log(updateQuery);

        connection.query(updateQuery,function(err,result){
            if(err){
                throw err;
            }

            someCallback(result);
        });
    }
};

module.exports=orm;