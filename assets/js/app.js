// On Page Load //
$(document).ready(function () {

    // Displaying Gifs //
    function displaySearch() {
        var search = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Getting data from the Giphy API //
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            $("#gifsAppearHere").empty();
            var data = response.data;
//Adding Classes and Displaying the GIFS on the HTML// 
            for (var i = 0; i < data.length; i++) {
                var newDiv = $("<div>");
                var rated = $("<p>").text("Rated: " + data[i].rating);
                newDiv.append(rated);
                var gifImg = $("<img>");
             
                gifImg.addClass("gifs");
                gifImg.attr("src", data[i].images.fixed_height_small_still.url);
                gifImg.attr("data-still", data[i].images.fixed_height_small_still.url);
                gifImg.attr("data-animate", data[i].images.fixed_height_small.url);
                gifImg.attr("data-state", "still");
                gifImg.addClass("image");
                newDiv.append(gifImg);

                $("#gifsAppearHere").prepend(newDiv);

            }
        });
    };
// Buttons that display on page load //
    var initialGifs = ["baseball", "soccer", "basketball", "snowboarding", "dive", "ufc", "rock climbing", "parkour", "martial arts", "nfl", "surf"];

    // Displaying the above array //
    function gifButtons() {
        $("#gifButtonsDisplay").empty();
        for (let i = 0; i < initialGifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gifButtons btn btn-primary");
            gifButton.attr("data-name", initialGifs[i]);
            gifButton.text(initialGifs[i]);
            $("#gifButtonsDisplay").append(gifButton);
            
        }
    };

    // My add button isn't working, I'll figure it out later //

    function newBtn() {
        $("#addGif").on("click", function () {
            var search = $("#search-input").val().trim();
            if (search === "") {
                alert("Type something in the box");
                return false; 
            }
            initialGifs.push(search);

            displaySearch();
            return false; 
        });
    }

    // Getting rid of user added buttons //

    function removeBtn() {
        $("#removeBtn").on("click", function () {
            initialGifs.pop(search);
            gifButtons();
            return false;
        });
    }

    // Allowing the user to switch between animated GIFS and still GIFS // 
    $(document).on("click", ".gifButtons", displaySearch);
    $(document).on("click", ".gifs", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
// Function Calls //
    removeBtn();
    newBtn();
    gifButtons();
    displaySearch();
});  