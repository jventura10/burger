$(document).ready(function(){
    $(".update-burger").on("click",function(){
        let id=$(this).data("id");
        let newValue=$(this).data("devour");

        var updateValue ={
            devoured: newValue
        };

        $.ajax("/api/burgers/"+id,{
            type: "PUT",
            data: updateValue
        }).then(function(){
            //console.log("Change Devoured to "+newValue);
            //Reload Page
            location.reload();
        });
    });

    $(".delete-burger").on("click",function(){
        let id=$(this).data("id");

        $.ajax("/api/burgers/"+id,{
            type: "DELETE"
        }).then(function(){
            //console.log("Deleted Burger! ID: "+id);
            location.reload();
        });
    });

    $(".burger-form").on("submit",function(event){
        event.preventDefault();

        var newBurger={
            burger_name: $("#burgerInput").val().trim()
        };

        if(newBurger.burger_name!=null){
            $.ajax("/api/burgers",{
                type: "POST",
                data: newBurger
            }).then(function(){
                //console.log("Added New Burger!");
                //Reload Page
                location.reload();
            });
        }
        else{
            alert("Cannot Enter Empty Text");
        }
    });

});