var survey = [];
var count = 0;
var q = [];
var questions = {};
var counterTwo = 0;
var chosenAnswer ="";
var quest = document.getElementsByName('quest');

var getajax = function () {
$.ajax({url: "http://appen.sytes.net/scripts/getsurvey.php", success: function(result){
        survey = JSON.parse(result);
    }});
	setTimeout(quests,500);
}

var quests = function () {
	removeChildren('formbox');
	console.log(survey.question.length);
	console.log(count);
	if(survey.question.length > count) {
	counterTwo = 0;
	$('#formbox').append("<div id='q'><p>" + survey.question[count] + "</p></div>");

	for(j = 0; j < survey.answers[count].length; j++) {
		
		// console.log("counterTwo:" + counterTwo);
		$('#q').append('<input class="answers" type="radio" name="quest" value="'+ counterTwo +'">' + survey.answers[count][j]);
		counterTwo = counterTwo + 1;
	 	}	
	 } else if (survey.question.length = count) {
	 	console.log("send json");
	 	var myJsonString = JSON.stringify(q);
	 	console.log(myJsonString);
	 	$('#but_save').css("display", "none");
	 }
};

var complete = false;
var answerss = function() {
	number = count + 1;
	
	for(var i = 0; i < quest.length; i++){
			if (quest[i].checked) {
 		 	  chosenAnswer = quest[i].value;
			  q.push({'question':count + 1, 'answer': number + chosenAnswer});
			  complete = true;
 			} 

		}
		if(complete) $(window).ready(quests);

};

$(window).ready(getajax);
$('#but_save').click(answerss);
$('#but_save').click(function(){count = count + 1; })

var myJsonString = JSON.stringify(q);



// johns dumma stuff
var xhttp = new XMLHttpRequest();
	var url = "http://appen.sytes.net/scripts/getsurvey.php";

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var jcontent = JSON.parse(xhttp.response);
			console.log(jcontent);
			var writejson = JSON.stringify(jcontent);
			window.localStorage.setItem("store_answer", writejson);
			// document.getElementById("addthat").innerHTML = "Array is set!!";
		}
	}

if (window.localStorage.getItem("store_answer") > 0) {

	// document.getElementById("savethat").innerHTML = "Array exist!!";
};



var click_save = function() {
	var retrieve = window.localStorage.getItem('store_answer');
	console.log(retrieve);
	var display_json = JSON.parse(retrieve);
	// document.getElementById("savethat").innerHTML = "Array is here yo!";

};
//savethat
//addthat


	var click_Clear = function() {
        window.localStorage.clear();
	};

// 	document.getElementById("but_save").addEventListener("click", click_save);
// 	document.getElementById("but_clear").addEventListener("click", click_Clear);
// console.log("wööh");
