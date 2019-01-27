// Initial array of interests
var dataTag = ["Lord of The Ring", "Puerto Rico", "Game Of Thrones", "Vaporwave" ];
var isNewWord = true;

// ----------------------------------------------
// JQUERY EVENTS
// ----------------------------------------------
$("#search-button").on("click", function() {
    // Grabbing and storing the value of the attribute called data-name.
    $("#gif-container").empty();
    var tagName = $("#search-gif").val();
    console.log(tagName);
    //Constructing a queryURL and padding it the tag names so it can use the attributes value to search the designated gif,
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tagName + "&api_key=OhvuOOPcKSlnsuzNPB3XrUqQ18cMIW1n";
    console.log(queryURL)
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data);
        // Storing the data from the AJAX request in a variable
        var results = response.data;

        // Looping through each result item
        for ( var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var $divTag = $("<div>");
            $divTag.addClass("gif-space")
        // Creating a p tag with the result item's rating
        var $pTag = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var $imageTag = $("<img>");
        // Setting a class for the imageTag
        $imageTag.addClass("gif");
    
        // Setting the source attribute of the image to a property pulled off from the result item
        $imageTag.attr("data-animate", results[i].images.fixed_width.url);
        $imageTag.attr("data-still", results[i].images.fixed_width_still.url);
        $imageTag.attr("data-state", "still");
        $imageTag.attr("src", results[i].images.fixed_width_still.url);

        // Appending the paragraph and image tag to the animalDiv
        $divTag.append($pTag);
        $divTag.append($imageTag);

        $("#gif-container").prepend($divTag);
        };
    });
})

$("#add-button").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // This line grabs the input from the textbox
    var dataTagInput = $("#add-tags").val().trim();

    // for (i = 0; i < dataTag.length; i++) {
    //     if (dataTagInput === dataTag[i].trim()) {
    //         isNewWord = false;
    //     }
    //     else {
        // Adding the movie from the textbox to our array
        dataTag.push(dataTagInput);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    //     }
    // }
        

});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})
// ----------------------------------------------
//FUNCTION DECLARATION
// ----------------------------------------------

function renderButtons() {
    // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#tag-container").empty();
        // Looping through the array of movies
        for (var i = 0; i < dataTag.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var tag = $("<button>");
            // Adding a class of movie to our button
            tag.addClass("gif-tags");
            // Adding a data-attribute
            tag.attr("data-name", dataTag[i]);
            // Providing the initial button text
            tag.text(dataTag[i]);
            // Adding the button to the HTML
            $("#tag-container").append(tag);
        }
};




$(document).on("click", ".gif-tags", function() {
    // Grabbing and storing the value of the attribute called data-name.
    $("#gif-container").empty();
    var tagName = $(this).attr("data-name");

    // Constructing a queryURL and padding it the tag names so it can use the attributes value to search the designated gif,
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tagName + "&api_key=OhvuOOPcKSlnsuzNPB3XrUqQ18cMIW1n";
    console.log(queryURL)
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data);
        // Storing the data from the AJAX request in a variable
        var results = response.data;

        // Looping through each result item
        for ( var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var $divTag = $("<div>");
            $divTag.addClass("gif-space")
        // Creating a p tag with the result item's rating
        var $pTag = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var $imageTag = $("<img>");
        // Setting a class for the imageTag
        $imageTag.addClass("gif");
    
        // Setting the source attribute of the image to a property pulled off from the result item
        $imageTag.attr("data-animate", results[i].images.fixed_width.url);
        $imageTag.attr("data-still", results[i].images.fixed_width_still.url);
        $imageTag.attr("data-state", "still");
        $imageTag.attr("src", results[i].images.fixed_width_still.url);

        // Appending the paragraph and image tag to the animalDiv
        $divTag.append($pTag);
        $divTag.append($imageTag);

        $("#gif-container").prepend($divTag);
        };
    });


});

// Calling the renderButtons function to display the initial buttons
renderButtons();