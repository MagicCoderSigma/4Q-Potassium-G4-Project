var imgNumber = 1;
var player1Name;
var player2Name;
var player1Gender;
var player2Gender;
var conditionPlayer1;
var conditionPlayer2;

function greetUsers() {
    let cookies = document.cookie.split(";");
    let cookieData = [cookies[0].trim().split("="), cookies[1].trim().split("="), cookies[2].trim().split("="), cookies[3].trim().split("=")];

    player1Name = cookieData[0][1];
    player2Name = cookieData[1][1];
    player1Gender = cookieData[2][1];
    player2Gender = cookieData[3][1];

    if (document.cookie != null || document.cookie != undefined) {
        if (player1Gender == "male") {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/male.png";
        }
        else if (player1Gender == "female") {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/female.png";
        }
        else {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/default.png";
        }
        if (player1Gender == "male") {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/female.png";
        }
        else if (player1Gender == "female") {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/female.png";
        }
        else {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/default.png";
        }
    
        document.getElementById("player1").innerHTML = player1Name;
        document.getElementById("player2").innerHTML = player2Name;
        document.getElementById("greetingsContainer").style.display = "block";
    }

    
}

function removeGreeting() {
    document.getElementById("greeting").style.display = "none";
    document.getElementById("blur").style.display = "none";
}

function nextChangeImage() {
    imgNumber++;
    document.getElementById("leftButton").disabled = false;
    if (imgNumber < 5) {
        translator = -119 * (imgNumber - 1);
        document.getElementById("container").style.transform = "translateX(" + translator + "dvh)";
        document.getElementById("imgOverview" + (imgNumber - 1)).style.opacity = 0.4;
        document.getElementById("imgOverview" + (imgNumber - 1)).style.scale = 0.75;
        document.getElementById("imgOverview" + imgNumber).style.opacity = 1;
        document.getElementById("imgOverview" + imgNumber).style.scale = 1;
        document.getElementById("about" + (imgNumber - 1)).style.opacity = 0;
        document.getElementById("about" + (imgNumber - 1)).style.scale = 0.75;
        document.getElementById("imgOverview" + imgNumber).style.marginLeft = "10px";
        document.getElementById("imgOverview" + imgNumber).style.marginRight = "10px";
        document.getElementById("about" + imgNumber).style.opacity = 1;
        document.getElementById("about" + imgNumber).style.scale = 1;
        if (imgNumber < 4) {
            document.getElementById("imgOverview" + (imgNumber + 1)).style.display = "flex";
        }
        document.getElementById("about" + imgNumber).style.opacity = 0.9;
    }  
    else {
        imgNumber--;
        document.getElementById("rightButton").disabled = true;
    }
}

function prevChangeImage() {
    imgNumber--;
    document.getElementById("rightButton").disabled = false;
    if (imgNumber > 0) {
        translator = -119 * (imgNumber - 1);
        document.getElementById("container").style.transform = "translateX(" + translator + "dvh)";
        document.getElementById("imgOverview" + (imgNumber + 1)).style.opacity = 0.4;
        document.getElementById("imgOverview" + (imgNumber + 1)).style.scale = 0.75;
        document.getElementById("about" + imgNumber).style.opacity = 0.9;
        document.getElementById("about" + imgNumber).style.scale = 1;
        document.getElementById("imgOverview" + imgNumber).style.opacity = 1;
        document.getElementById("imgOverview" + imgNumber).style.scale = 1;
        document.getElementById("about" + (imgNumber + 1)).style.opacity = 0;
        document.getElementById("about" + (imgNumber + 1)).style.scale = 0.75;
        document.getElementById("imgOverview" + imgNumber).style.marginLeft = "10px";
        document.getElementById("imgOverview" + imgNumber).style.marginRight = "10px";
        if (imgNumber > 1) {
            document.getElementById("imgOverview" + (imgNumber + 1)).style.display = "flex";
        }
    }
    else {
        imgNumber++;
        document.getElementById("leftButton").disabled = true;
    }

    document.getElementById("about" + imgNumber).style.opacity = 0.9;
}

function onFormSubmit(reload) {
    player1Name = document.getElementById("player1Name").value;
    player2Name = document.getElementById("player2Name").value;
    player1Gender = document.getElementById("player1Gender").value;
    player2Gender = document.getElementById("player2Gender").value;

    for (let counter = 0; counter < player1Name.length; counter++) {
        if (((((player1Name[counter].charCodeAt(0) - 96) > 0) && (player1Name[counter].charCodeAt(0) - 96) )) || (player1Name[counter].charCodeAt(0) <= 57 && player1Name[counter].charCodeAt(0) >= 48)) {
            conditionPlayer1 = true;
        }
        else {
            conditionPlayer1 = false;
            alert("Invalid name for Player 1.");
            break;
        }
    }
    
    for (let counter = 0; counter < player2Name.length; counter++) {
        if (((((player2Name[counter].toLowerCase().charCodeAt(0) - 96) > 0) && (player2Name[counter].toLowerCase().charCodeAt(0) - 96) <= 26)) || (player2Name[counter].charCodeAt(0) <= 57 && player2Name[counter].charCodeAt(0) >= 48)) {
            conditionPlayer2 = true;
        }
        else {
            conditionPlayer2 = false;
            alert("Invalid name for Player 2.");
            break;
        }
    }

    if (conditionPlayer1 && conditionPlayer2) {
        var date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();

        document.cookie = "player1Name=" + player1Name + ";" + expires + ";path=/";
        document.cookie = "player2Name=" + player2Name + ";" + expires + ";path=/";
        document.cookie = "player1Gender=" + player1Gender + ";" + expires + ";path=/";
        document.cookie = "player2Gender=" + player2Gender + ";" + expires + ";path=/";
    }

    reload.preventDefault();
}