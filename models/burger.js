var orm=require("../config/orm");

var burger={
    select: function(someCallBack){
        //Call selectAll From ORM
        orm.selectAll("burgers",function(res){
            someCallBack(res);
        });
    },
    insert:function(cols,vals,someCallBack){
        //Call insertOne From ORM
        orm.insertOne("burgers",cols,vals,function(res){
            someCallBack(res);
        });
    },
    update: function(objColVals,findBur,someCallBack){
        //Call updateOne From ORM
        orm.updateOne("burgers",objColVals,findBur,function(res){
            someCallBack(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("burgers", condition, function(res) {
          cb(res);
        });
    }
};

module.exports=burger;