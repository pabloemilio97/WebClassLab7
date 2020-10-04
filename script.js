$(document).ready(function() {

    var temas = ["Porter Robinson", "Madeon", "Skrillex", "Avicii", "Daft Punk", "Calvin Harris", "Techno", "Dubstep", "EDM", "Dance Music", "French House", "Breakbeat"];

    for (var i = 0; i < temas.length; i++) {
        $("#music-buttons").append(`<input type="submit" id="musicButton" value="${temas[i]}">`);
    }

    $("#music-buttons").on("click", "#musicButton", function() { 
        //Erase previous results
        var musicitems = $("[name=image]");
        var l = musicitems.length;
        for (var i = 0; i < l; i++) {
            musicitems[i].remove();
        }

        var request =  {
            url: `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=bDKVeDcmaZisLK0wTl4uGlHQ5qs5uGg2&limit=10`,
            success: function(response) {
                for (var i = 0; i < response.data.length; i++) {

                    var image = $(`<img alt="un gif de un ${this.value}" name="image">`);
                    image.attr("src", response.data[i].images.fixed_height_still.url);
                    image.attr("data-still", response.data[i].images.fixed_height_still.url); 
                    image.attr("data-gif", response.data[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("music-item");

                    $("#musicitems").append(image);
                }
            },
            error: function() {
                console.log("Error occurred fetching information");
            },
        }
        
        $.ajax(request);
    })

    $("body").on("click", ".music-item", function(e) {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-gif"));
            $(this).attr("data-state", "moving");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $("#add-music").on("click", function(e) {
        e.preventDefault();
        var name = $("#music-input").val();
        $("#music-buttons").append(`<input type="submit" id="musicButton" value="${name}">`);
    })
});