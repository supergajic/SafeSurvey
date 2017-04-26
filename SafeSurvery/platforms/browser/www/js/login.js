"use strict";
var loginDB = function() {
	var username = document.getElementById("user").value;
	var password = document.getElementById("pw").value;

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


			if(jcontent.includes("Success"))
			{
				document.getElementById("hejda").innerHTML = "din braiga jävel";
			}
			else if(jcontent.includes("Fail"))
			{
				// Felaktigt lösenord
				document.getElementById("hejda").innerHTML = "....lol";
			}
			else if(jcontent.includes("NA"))
			{
				// Användare finns inte
				document.getElementById("hejda").innerHTML = "din icke braiga jävel, noob";
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
				// Registrering: Användare finns redan
			}
			else if(jcontent.includes("Registered"))
			{
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
