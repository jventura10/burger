$(document).ready(function(){
    $(".update-burger").on("click",function(event){
        var id=$(this).data("id");
        var newValue=$(this).data("devour");

        var updateValue ={
            devoured: newValue
        };

        $.ajax("/api/burgers/"+id,{
            type: "PUT",
            data: updateValue
        }).then(function(){
            console.log("Change Devoured to "+newValue);
            //Reload Page
            location.reload();
        });
    });

    $(".burger-form").on("submit",function(event){
        event.preventDefault();

        var newBurger={
            burger_name: $("#burgerInput").val().trim()
        };

        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("Added New Burger!");
            //Reload Page
            location.reload();
        });
    });

});