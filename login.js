"use strict";
$('#formbox').css("display","none");
$('#but_save').css("display", "none");
if (window.localStorage.getItem("key") > 0) {

	$('.main').css("display","none");
				$('#formbox').css("display","initial");
				$('#but_save').css("display", "initial");

};
var loginDB = function() {
	var username = document.getElementById("user").value;
	var password = document.getElementById("pw").value;

		// value is now equal to "value"
	var xhttp = new XMLHttpRequest();
	var url = "http://appen.sytes.net/scripts/login.php";

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send("usernamePost="+ username + "&passwordPost=" + password);

	xhttp.onreadystatechange = function()
	{
		if(xhttp.readyState == 4 && xhttp.status == 200)
		{
			var jcontent = JSON.parse(xhttp.response);
			console.log(jcontent);


			if(jcontent.message.includes("Success"))
			{
				window.localStorage.setItem("key", jcontent.id);
				document.getElementById("hejda").innerHTML = "Lokal användare registrerad";
				$('.main').css("display","none");
				$('#formbox').css("display","initial");
				$('#but_save').css("display", "initial");

			}
			else if(jcontent.includes("Fail"))
			{
				// Felaktigt lösenord
				document.getElementById("hejda").innerHTML = "Kunde ej koppla";
			}
			else if(jcontent.includes("NA"))
			{
				// Användare finns inte
				document.getElementById("hejda").innerHTML = "Användare kunde ej hittas";
			}
		}
	};
};



function registerDB(username, password)
{
	var xhttp = new XMLHttpRequest();
	var url = "http://appen.sytes.net/scripts/register.php";

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send("usernamePost="+ username + "&passwordPost=" + password);

	xhttp.onreadystatechange = function()
	{
		if(xhttp.readyState == 4 && xhttp.status == 200)
		{
			var jcontent = JSON.parse(xhttp.response);
			console.log(jcontent);

			if(jcontent.includes("Exist"))
			{
				document.getElementById("hejda").innerHTML = "Användare finns redan";

				// Registrering: Användare finns redan
			}
			else if(jcontent.includes("Registered"))
			{
				document.getElementById("hejda").innerHTML = "Tack för din registrering, välkommen!";

				// Registrering: Användare är skapad
			}
		}
	};
}

function checkValue() {
	var username = document.getElementById("user").value;
	var password = document.getElementById("pw").value;
	if(username.length > 0 && password.length > 0){
		loginDB();
	}
}

function regNow() {
	var username = document.getElementById("user").value;
	var password = document.getElementById("password").value;
	var con_password = document.getElementById("con_password").value;
	if (password == con_password) {
		registerDB(username, password);

	} else {
		document.getElementById("hejda").innerHTML = "Du måste skriva in rätt lösenord";

	}
}
