// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// Generic function for capturing the movie name from the data-attribute

// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {
    var movieName = $(this).attr("data-name");
    // alert(movieName);
    // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
    $("<div>").text(movieName);

    var queryURL = "https://omdbapi.com/?t=" + movieName + "&apikey=trilogy";

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

       // Creating a div to hold the movie
       var movieDiv = $("<div class='movie'>");

       // Storing the rating data
       var rating = response.Rated;

       // Creating an element to have the rating displayed
       var pOne = $("<p>").text("Rating: " + rating);

       // Displaying the rating
       movieDiv.append(pOne);

       // Storing the release year
       var released = response.Released;

       // Creating an element to hold the release year
       var pTwo = $("<p>").text("Released: " + released);

       // Displaying the release year
       movieDiv.append(pTwo);

       // Storing the plot
       var plot = response.Plot;

       // Creating an element to hold the plot
       var pThree = $("<p>").text("Plot: " + plot);

       // Appending the plot
       movieDiv.append(pThree);

       // Retrieving the URL for the image
       var imgURL = response.Poster;

       // Creating an element to hold the image
       var image = $("<img>").attr("src", imgURL);

       // Appending the image
       movieDiv.append(image);

       // Putting the entire movie above the previous movies
       $("#movies-view").prepend(movieDiv);
        // $('#movies-view').text(JSON.stringify(response));

    });
}



// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    if (movies.indexOf(movie) == -1 && movie != "") {
        movies.push(movie);
    }

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Generic function for displaying the movieInfo
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();