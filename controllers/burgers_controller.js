var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

//router.get
router.get("/", function (req, res) {
    burger.select(function (data) {
        var newObj = {
            burgers: data
        };

        console.log(newObj);
        res.render("index", newObj);
    });
});

//router.post
router.post("/api/burgers", function (req, res) {
    burger.insert(["burger_name", "devoured"], [req.body.burger_name, 0], function (result) {
        res.json({ id: result.insertId });
    });
});

//router.put
router.put("/api/burgers/:id", function (req, res) {
    let findBur = "id =" + req.params.id;

    //console.log("Condition for Update Query: "+findBur);

    burger.update({ devoured: req.body.devoured }, findBur, function (result) {
        if (result.changedRows === 0) {
            // If no Rows Were Affected, Then ID Must Not Exist => Send 404
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    let findBur = "id =" + req.params.id;

    burger.delete(findBur, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

});

module.exports = router;