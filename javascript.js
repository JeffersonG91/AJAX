$(document).ready(function() {

	var superHeros = [
		"Iron Man", "Link", "Hulk", "Spider-Man", "Black Widow", "Wolverine", 
		"Batman", "Supergirl", "Beast", "Cyclops", "Professor X", 
		"Captain America", "Aquaman", "Flash", "Wonder Woman",
		"Cyborg", "Black Panther", "She-Hulk"
	];

	function populateButtons(arrayToUse, classToAdd, areaToAddTo){
		$(areaToAddTo).empty();

		for (var i = 0; i < arrayToUse.length; i++){
			var a = $("<button>");
			a.addClass(classToAdd);
			a.attr("data-hero", arrayToUse[i]);
			a.text(arrayToUse[i]);
			$(areaToAddTo).append(a);
		}
	}

	$(document).on("click", ".SH-button", function(){
		$("#superHeros").empty();
		$(".SH-button").removeClass("active");
		$(this).addClass("active");

		var hero = $(this).attr("data-hero");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cX2imUH2Qmcjo9A2gtWVrjs0ID2SRd2V&q=" + hero + "&limit=10&offset=0&rating=PG&lang=en";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.then(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var heroDiv = $("<div class=\"hero-item\">");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var animated = results[i].images.fixed_height.url;
				var still = results[i].images.fixed_height_still.url;

				var heroImage = $("<img>");
				heroImage.attr("src", still);
				heroImage.attr("data-still", still);
				heroImage.attr("data-animate", animated);
				heroImage.attr("data-state", "still");
				heroImage.addClass("SH-image");

				heroDiv.append(p);
				heroDiv.append(heroImage);

				$("#superHeros").append(heroDiv);
			}
		});
	});

	$(document).on("click", ".SH-image", function() {

		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	$("#add-sh").on("click", function(event) {
		event.preventDefault();
		var newSuperHero = $("input").eq(0).val();

		if (newSuperHero.length > 2) {
			superHeros.push(newSuperHero);
		}

		populateButtons(superHeros, "SH-button", "#superhero-buttons");
	});

	populateButtons(superHeros, "SH-button", "#superhero-buttons");

});