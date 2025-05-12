var imgNumber = 1;
var player1Name = localStorage.getItem("player1Name");
var player2Name = localStorage.getItem("player2Name");
var player1Gender = localStorage.getItem("player1Gender");
var player2Gender = localStorage.getItem("player2Gender");
var conditionPlayer1;
var conditionPlayer2;

function greetUsers() {
    if (player1Name != null || player1Name != undefined) {
        if (player1Gender == "male") {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/male.png";
        }
        else if (player1Gender == "female") {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/female.png";
        }
        else {
            document.getElementById("player1ProfilePicture").src = "images/profilePictures/default.png";
        }
        if (player2Gender == "male") {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/male.png";
        }
        else if (player2Gender == "female") {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/female.png";
        }
        else {
            document.getElementById("player2ProfilePicture").src = "images/profilePictures/default.png";
        }
    
        document.getElementById("player1").innerHTML = player1Name;
        document.getElementById("player2").innerHTML = player2Name;
        document.getElementById("greetingsContainer").style.display = "block";
        document.getElementById("redirectToGame").disabled = false;
        document.getElementById("smile").style.display = "none";
        document.getElementById("gameLink").style.display = "block";
    }
}

function removeGreeting() {
    document.getElementById("greeting").style.display = "none";
    document.getElementById("blur").style.display = "none";
}

function nextChangeImage() {
    imgNumber++;
    document.getElementById("leftButton").disabled = false;
    if (imgNumber < 4) {
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
        if (imgNumber < 3) {
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
    if ((document.getElementById("player1Gender").value == "select" || document.getElementById("player2Gender").value == "select") || (player2Name = document.getElementById("player1Name").value == '' || document.getElementById("player2Name").value == '')) {
        if (document.getElementById("player1Gender").value == "select") {
            alert("Player 1's gender is not specified.");
            reload.preventDefault();  
        }

        if (document.getElementById("player2Gender").value == "select") {
            alert("Player 2's gender is not specified.");
            reload.preventDefault();  
        }
    
        if (document.getElementById("player1Name").value == '') {
            alert("Player 1's name is not inputted.");
            reload.preventDefault();  
        }
    
        if (document.getElementById("player2Name").value == '') {
            alert("Player 2's name is not inputted.");
            reload.preventDefault();  
        }
    }

    else {
        player1Name = document.getElementById("player1Name").value;
        player2Name = document.getElementById("player2Name").value;
        player1Gender = document.getElementById("player1Gender").value;
        player2Gender = document.getElementById("player2Gender").value;

        for (let counter = 0; counter < player1Name.length; counter++) {
            if (((((player1Name[counter].toLowerCase().charCodeAt(0) - 96) > 0) && (player1Name[counter].toLowerCase().charCodeAt(0) - 96) )) || (player1Name[counter].toLowerCase().charCodeAt(0) <= 57 && player1Name[counter].toLowerCase().charCodeAt(0) >= 48)) {
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
            localStorage.setItem("player1Name", player1Name);
            localStorage.setItem("player2Name", player2Name);
            localStorage.setItem("player1Gender", player1Gender);
            localStorage.setItem("player2Gender", player2Gender);
        }

        alert("Accepted.");

        document.getElementById("redirectToGame").disabled = false;
    }

    reload.preventDefault();    
}