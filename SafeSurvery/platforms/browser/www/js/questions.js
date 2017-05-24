var userLocation = "";
var currentdate = new Date(); 
var datetime = + currentdate.getFullYear() + "-"  
			 + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
 			 + ("0" + currentdate.getDate()).slice(-2)  + " "  
             + ("0" + currentdate.getHours()).slice(-2) + ":"  
             + ("0" + currentdate.getMinutes()).slice(-2) + ":"
             + ("0" + currentdate.getSeconds()).slice(-2)

navigator.geolocation.getCurrentPosition(foundLocation, noLocation);

  function foundLocation(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    userLocation = lat +',' + lon;

  }
  
  function noLocation() {
    console.log("no geo hereee");
  }

var survey = [];
var count = 0;
var q = [];
var questions = {};
var counterTwo = 0;
var chosenAnswer ="";
var dates = "";
var quest = document.getElementsByName('quest');
var userId = window.localStorage.getItem("key");


var getajax = function () {

$.ajax({url: "http://appen.sytes.net/scripts/getsurvey.php", success: function(result){
        survey = JSON.parse(result);
    }});
	
	setTimeout(quests,2500);
}

var quests = function () {
	removeChildren('formbox');
	if(survey.question.length > count) {
	counterTwo = 0;
	$('#formbox').append("<div class='questionz'><h2>" + survey.question[count] + "</h2></div>");
	$('#formbox').append("<div id='q'></div>");

	for(j = 0; j < survey.answers[count].length; j++) {
		
		// console.log("counterTwo:" + counterTwo);
		$('#q').append('<div class="alternative"><input class="answers" type="radio" name="quest" value="'+ counterTwo +'">' + "<label for='answers'>" + survey.answers[count][j] + "</label>" + "</div>");
		counterTwo = counterTwo + 1;
	 	}	
	 } else if (survey.question.length = count) {
	 	console.log("send json");
	 	var myJsonString = JSON.stringify(q);
		var xhttp = new XMLHttpRequest();
		var url = "http://appen.sytes.net/scripts/sendsurvey.php";

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhttp.send("esmsurvey=" + myJsonString);

	 	alert("thanks! --> next stuff");
	 	$('#but_save').css("display", "none");
	 }
};

var complete = false;
var answerss = function() {
	number = count + 1;
	for(var i = 0; i < quest.length; i++){
			if (quest[i].checked) {
 		 	  chosenAnswer = quest[i].value;
			  q.push({'question':count + 1, 'answer': number + chosenAnswer, 'timeinput': datetime, 'userid': userId, 'geoLocation' : userLocation});
			  complete = true;
 			} 
		}
		if(complete) $(window).ready(quests);

};

$(window).ready(getajax);

$('#but_save').click(answerss);
$('#but_save').click(function(){count = count + 1; })

var myJsonString = JSON.stringify(q);