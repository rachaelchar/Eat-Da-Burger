// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    // New burger submission
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#input").val().trim(),
        devoured: false
      };
  
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          location.reload();
        }
      );
    });
    
    // Update/devour burger
    $(".devour-it").on("click", function(event) {


        var id = $(this).data("burgerid");
        var newState = $(this).data("devoured");
        console.log("this", $(this).data("burgerid"));


        const newDevouredState = {
          devoured: true
        };


    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newDevouredState
        }).then(
          function() {
            console.log("changed burger to", newDevouredState);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
  
  });
  