 "use strict";
var questionare = [];
var calc = 0;
var emp = [];
var questions = {};
var calc2 = 0;
var choose = "";
var userSend = document.getElementsByName('userchoice');
var rov = "";

var getQuest = function() {
	$.ajax({
		url: "http://appen.sytes.net/scripts/getusersurvey.php",
		success: function(option) {
			questionare = JSON.parse(option);
      console.log(questionare);
		}});
		setTimeout(userinfo,500);
}
var userinfo = function() {
  removeChildren('here');
  console.log(questionare.question.length);
	console.log(calc);
	if (questionare.question.length > calc) {
		 calc2 = 0;

		$('#here').append("<div id='userquest'><p>" + questionare.question[calc] + "</p></div>");
		for (var j = 0; j < questionare.alt[calc].length; j++) {

			$('#here').append('<input class="useranswers" type="radio" name="userchoice" value="' + calc2 + '">' + questionare.alt[calc][j]);
			calc2 = calc2 + 1;
		}
	} else if (questionare.question.length = 0) {
		console.log("send json");
		var createString = JSON.stringify(emp);
		console.log(createString);
		//$('#but_save').css("display", "none");
	}
};
var done = false;
var sendData = function() {
	for (var i = 0; i < userSend.length; i++) {
		if (userSend[i].checked) {
			choose = userSend[i].value;
			console.log(choose);
			emp.push({
				'answer': (calc + 1) + choose,
			});
			done = true;
		}
	}
	if (emp.length == 3) {
		localStorage.setItem("onetime", 3);
		rov = window.localStorage.getItem("onetime");
		$('#formbox').css("display","initial");
		$('#but_save').css("display", "initial");

	};
	if(done) $(window).ready(userinfo);
	
};
$(window).ready(getQuest);
$('#try').click(sendData);
$('#try').click(userinfo);

$('#try').click(function() {
	calc = calc + 1;
})
var doThis = JSON.stringify(emp);



