//activate foundation plugin
$(document).foundation();

var url = "/plushies"; //JSON location
var displayNames = $("#display-names");
var personalitySelect = $("#personality-select");

//hide div that will display list of names 
displayNames.hide();

$("#submit").on("click", function(){

	//get selected personality traits from inputs 
	var personalityTwee = $("#twee-select").val();
	var personalityPleasant = $("#pleasant-select").val();
	var personalityShy = $("#shy-select").val();

	//send booleans to server, get JSON list of names
	$.getJSON(url, 
		{twee: personalityTwee, pleasant: personalityPleasant, shy: personalityShy},
		function(data) {

			var htmlList = "";
			
			$.each(data, function() {
				htmlList += "<p class='name'>" + this + "</p>";				
			});

			//put names and try again button in #names-list div
			$("#names-list").html(htmlList);
	});

	//hide personality selection sliders
	personalitySelect.fadeOut(1000, function(){
		displayNames.fadeIn(1000, "swing");
	});

});

//try again button to start over
$("#try-again").on("click", function(){
	displayNames.fadeOut(1000, "swing", function(){
		personalitySelect.fadeIn(1000, "swing");
	});
});


