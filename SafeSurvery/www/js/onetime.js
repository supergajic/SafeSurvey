"use strict";

var questionare = [];
var calc = 0;
var emp = [];
var questions = {};
var calc2 = 0;
var choose = "";
//var userSend = document.getElementsByName('userchoice');
var rov = "";

var getQuest = function() {
	$.ajax({
		url: "http://appen.sytes.net/scripts/getusersurvey.php",
		success: function(option) {
			questionare = JSON.parse(option);
      console.log(questionare);
		}});
		calc = 0;
		//calc2 = 0;
		$('#but_save').css("display", "none");
		setTimeout(userinfo,1000);
}
var userinfo = function() {
    removeChildren('here');
    console.log(questionare.question.length);
	console.log(calc);
	console.log(calc2);
	calc2 = 0;
	
	if (questionare.question.length > calc) 
	{
		$('#here').append("<div id='userquest'><p>" + questionare.question[calc] + "</p></div>");

		for (var j = 0; j < questionare.alt[calc].length; j++) 
		{
			
			if (calc == 1 || calc == 8){
				console.log("hej");

				
				$('#here').append('<div class="alt"><input id="beb" type="text" name="txt" value=""></div>');

			} else {
				
				$('#here').append('<div class="alt"><input class="useranswers" type="radio" name="userchoice" value="' + calc2 + '"><label for=useranswers">' + questionare.alt[calc][j]) + '</label></div>';

			}

			calc2++;
		}
	}
	/*
	else if (questionare.question.length = 0) 
	{
		console.log("send json");
		var createString = JSON.stringify(emp);
		console.log(createString);

	}*/
};

var done = false;

var sendData = function() {
	

	
	var userSend = document.getElementsByName('userchoice');
	if (calc == 1 || calc == 8) {
		var txt = document.getElementById('beb').value;
		emp.push({
				'answer': txt,
				'userid': userId,
				'question': calc + 1,
				'timeinput': datetime
			});
		calc++; 
		done = true;
		userinfo();
	} else {
		for (var i = 0; i < userSend.length; i++) {
		if (userSend[i].checked) {
			choose = userSend[i].value;
			console.log(choose);
			emp.push({
				'answer': (calc + 1) + choose,
				'userid': userId,
				'question': calc + 1,
				'timeinput': datetime
			});
			calc++; 
			done = true;
			userinfo();
		} 
	  }
	}
	if (emp.length == questionare.question.length) {
		localStorage.setItem("onetime", 3);
		$('#here').empty();
		$('#try').css("display","none");
		$('#formbox').css("display","initial");
		$('#but_save').css("display", "initial");

		var myJsonString = JSON.stringify(emp);
		var xhttp = new XMLHttpRequest();
		var url = "http://appen.sytes.net/scripts/sendusersurvey.php";

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhttp.send("usersurvey=" + myJsonString);

	}

	//if(done) $(window).ready(userinfo);
	
	
};
//$(document).ready(function() {

 //   $("#try").click(function () {
 //       sendData();    
  //  });
//});

//$(window).ready(getQuest);
$('#try').click(sendData);
//$(document).on('click', '#try', function() { sendData() });
//$('#try').click(userinfo);

//$('#try').click(function() {
//	calc = calc + 1;
//})
//$('#try').css("display", "none");
var doThis = JSON.stringify(emp);
