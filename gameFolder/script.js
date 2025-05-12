var bioQuestions = ["What process do plants use to convert sunlight into chemical energy?", "What is the fluid inside chloroplasts?", "It is the evolutionary history of a group of organisms and how they descended from common ancestors.", "It maintains an internal balance between water and dissolved materials regardless of environmental conditions.", "Sensory receptors convert a stimulus into a change in membrane potential through what process?"];
var chemQuestions = ["What is the chemical symbol of carbon?", "What do you call the center of an atom?", "What kind of bond does ammonia have?", "What is the symbol used to denote the ideal gas constant?", "The freezing point depression constant of water is __ °C/m."];
var physQuestions = ["What is the SI unit of force?", "A car moves at 20 m/s for 5 seconds. How far does it travel?", "What does the slope of a postition-time graph represent?", "What type of collision does not conserve kinetic energy?", "A generator generates 1,492 watts of power. How many horsepower does this correspond to?"];
var mathQuestions = ["Solve for x: 4x - 5 = 11.", "If the discriminant of a quadratic equation is 0, what type of quadratic is it", "A line passes through the points (2, 3) and (6, 11). Find the slope and equation of the line in slope-intercept form.", "Solve the system: 3x + 2y = 12, 5x - y = 4.", "The graphs of y = x² - 4x + 3 and y = 2x - 1 intersect at two points. Find the coordinates of the intersection points."];
var csQuestions = ["This is the term for a named location in memory used to store data.", "This linear data structure follows the Last In, First Out (LIFO) principle.", "This algorithm repeatedly selects the smallest remaining element and places it in order.", "This type of scheduling algorithm selects the process with the shortest expected processing time.", "This class of problems can be verified in polynomial time but not necessarily solved in polynomial time."];
var esQuestions = ["What type of boundary is responsible for most major earthquakes?", "What was the name of the supercontinent during the Paleozoic period?", "Which is the deepest part of the world's oceans, located in the western Pacific Ocean?", "Which layer of Earth's atmosphere contains the ozone layer?", "What scale measures the earthquake's magnitude?"];
var bioAnswers = ["What is Photosynthesis?", "What is the Stroma?", "What is Phylogeny?", "What is Osmoregulation?", "What is Transduction?"];
var chemAnswers = ["What is C?", "What is the Nucleus?", "What is Covalent?", "What is R?", "1.86"];
var physAnswers = ["What is a Newton?", "100m", "What is velocity?", "What is an inelastic collision?", "2hp"];
var mathAnswers = ["x = 4", "What is a perfect square quadratic?", "y = 2x - 1", "x = 20/13, y = 48/13", "(3 + √5, 5 + 2√5), (3 - √5, 5 - 2√5)"];
var csAnswers = ["What is a variable?", "What is a stack?", "What is selection sort?", "What is Shortest Job Next?", "What is NP?"];
var esAnswers = ["What is a Transform boundary?", "What is the Pangea?", "What is the Mariana Trench?", "What is the Stratosphere?", "What is the Richter scale?"];
var categories = ["bio", "chem", "phys", "math", "cs", "es"];
var player1Name = localStorage.getItem("player1Name");
var player2Name = localStorage.getItem("player2Name");
var player1Gender = localStorage.getItem("player1Gender");
var player2Gender = localStorage.getItem("player2Gender");
var player1Score = 0;
var player2Score = 0;
var playerAnswer;
var currentPlayer = 0;
var category;
var arrayNumber;
var correctChecker;
var highScore = localStorage.getItem("highScore");
var highScorerName = localStorage.getItem("highScorerName");
var highScorerGender = localStorage.getItem("highScorerGender");
var time;
var losesPoints;
var COUNTDOWN;
var questionUnanswered = 30;

document.getElementById("player1Name").innerHTML = player1Name;
document.getElementById("player2Name").innerHTML = player2Name;

if (player1Gender == "male") {
    document.getElementById("player1ProfilePicture").src = "../images/profilePictures/male.png";
}
else if (player1Gender == "female") {
    document.getElementById("player1ProfilePicture").src = "../images/profilePictures/female.png";
}
else {
    document.getElementById("player1ProfilePicture").src = "../images/profilePictures/default.png";
}
if (player2Gender == "male") {
    document.getElementById("player2ProfilePicture").src = "../images/profilePictures/male.png";
}
else if (player2Gender == "female") {
    document.getElementById("player2ProfilePicture").src = "../images/profilePictures/female.png";
}
else {
    document.getElementById("player2ProfilePicture").src = "../images/profilePictures/default.png";
}

const LOOPMUSIC = setInterval(() => {
    document.getElementById("backgroundMusic").src = "../audios/backgroundMusic.mp3";
}, 32000);

function hoverAtNav() {
    if (highScore != undefined || highScore != null) {
        document.getElementById("navigation").style.width = "120dvh";
        document.getElementById("highScoreContainer").style.display = "flex";
        document.getElementById("highScore").innerHTML = highScore;
        document.getElementById("highScorerName").innerHTML = highScorerName;
        if (highScorerGender == "male") {
            document.getElementById("profilePictureOfHighScorer").src = "../images/profilePictures/male.png";
        }
        else if (highScorerGender == "female") {
            document.getElementById("profilePictureOfHighScorer").src = "../images/profilePictures/female.png";
        }
        else {
            document.getElementById("profilePictureOfHighScorer").src = "../images/profilePictures/default.png";
        }
    }
    else {
        document.getElementById("navigation").style.width = "80dvh";
    }
}

function unhoverAtNav() {
    document.getElementById("navigation").style.width = "20dvh";
}

function setQuestion() {
    document.getElementById("category").src = "../images/title/categories/" + category + ".png";

    if (category == "bio") {
        document.getElementById("question").innerHTML = bioQuestions[arrayNumber];
    }
    else if (category == "chem") {
        document.getElementById("question").innerHTML = chemQuestions[arrayNumber];
    }
    else if (category == "phys") {
        document.getElementById("question").innerHTML = physQuestions[arrayNumber];
    }
    else if (category == "math") {
        document.getElementById("question").innerHTML = mathQuestions[arrayNumber];
    }
    else if (category == "cs") {
        document.getElementById("question").innerHTML = csQuestions[arrayNumber];
    }
    else if (category == "es") {
        document.getElementById("question").innerHTML = esQuestions[arrayNumber];
    }
}

function handleKey(event) {
    document.getElementById("goImage").style.display = "none";
    document.getElementById("goEffect").style.display = "none";

    if (time <= 0) {
        document.getElementById("container").style.width = "100%";
        document.getElementById("container").style.transform = "translateY(0dvh)";
        document.getElementById("countdownBackground").style.display = "none";
        document.removeEventListener('keydown', handleKey);
        document.getElementById("container").style.fontSize = "15dvh";
        minusChecker = false;

        if (event.key == "w") {
            currentPlayer = 1;
            document.getElementById("container").innerHTML = "<br>" + player1Name + "<br>Answers!";
        }
        else if (event.key == "ArrowUp") {
            currentPlayer = 2;
            document.getElementById("container").innerHTML = "<br>" + player2Name + "<br>Answers!";
        }

        setTimeout(() => {
            document.getElementById("container").style.display = "none";
            document.getElementById("container").style.fontSize = "30dvh";
            document.getElementById("category").style.display = "block";
            document.getElementById("question").style.display = "block";
            document.getElementById("answerContainer").style.display = "block";
            setQuestion();
        }, 1000);
    }

    else {
        document.getElementById("countdownBackground").style.display = "none";
        document.getElementById("countdownImage").style.display = "none";
        document.getElementById("container").style.fontSize = "15dvh";
        document.getElementById("container1").style.backgroundColor = "#d2b749";
        document.getElementById("losesPoints").style.display = "block";
        document.removeEventListener('keydown', handleKey);
        document.getElementById("container").style.lineHeight = "14dvh";
        clearInterval(COUNTDOWN);

        lostPoints = (arrayNumber + 1) * 100;

        if (event.key == "w") {
            currentPlayer = 1;
            document.getElementById("container").style.transform = "translateY(-7.5dvh) translateX(25dvw)";
            document.getElementById("container").innerHTML = "<br>" + player1Name + "<br>Loses " + lostPoints + " points!";
            document.getElementById("losesSound").play();
            player1Score -= lostPoints;
        }

        else if (event.key == "ArrowUp") {
            currentPlayer = 2;
            document.getElementById("container").style.transform = "translateY(-7.5dvh) translateX(25dvw)";
            document.getElementById("container").innerHTML = "<br>" + player2Name + "<br>Loses " + lostPoints + " points!";
            document.getElementById("losesSound").play();
            player2Score -= lostPoints;
        }

        else {
            document.getElementById("container").style.transform = "translateY(-5dvh) translateX(25dvw)";
            document.getElementById("container").style.lineHeight = "15dvh";
            document.getElementById("container").innerHTML = player1Name + " and " + player2Name + " <br>Lose " + (lostPoints/2) + " points!";
            document.getElementById("losesSound").play();
            player1Score -= lostPoints/2;
            player2Score -= lostPoints/2;
        }

        setTimeout(() => {
            document.getElementById("container1").style.backgroundColor = "#ffde59";
            document.getElementById("container1").style.display = "none";
            document.getElementById("container").style.display = "none";
            document.getElementById("container").style.transform = "translateY(15dvh) translateX(25dvw)";
            document.getElementById("losesPoints").style.display = "none";
            document.getElementById("blur").style.display = "none";
            document.getElementById("container").style.fontSize = "30dvh";
            document.getElementById("player1Score").innerHTML = player1Score;
            document.getElementById("player2Score").innerHTML = player2Score;
            document.getElementById("container").style.lineHeight = "normal";
        }, 750);

        return 0;
    }
}

function clickQuestion(idOfQuestion) {
    category = idOfQuestion.split("-")[0];
    arrayNumber = parseInt(idOfQuestion.split("-")[1]);
    time = Math.floor(Math.random() * 9) + 2;

    document.getElementById(idOfQuestion).onclick = null;
    document.getElementById(idOfQuestion).innerHTML = "Done!";

    document.getElementById("container").style.width = "30dvw";
    document.getElementById("container1").style.display = "block";
    document.getElementById("blur").style.display = "block";
    document.getElementById("countdownBackground").style.display = "block";
    document.getElementById("countdownImage").style.display = "block";
    document.addEventListener('keydown', handleKey);
    document.getElementById("container").style.display = "block";

    document.getElementById("container").innerHTML = time;

    COUNTDOWN = setInterval(() => {
        if (time == 0) {
            document.getElementById("countdownImage").style.display = "none";
            document.getElementById("goImage").style.display = "block";
            document.getElementById("goEffect").style.display = "block";
            document.getElementById("container").innerHTML = "GO!";
            clearInterval(COUNTDOWN);
        }

        else {
            time--;

            document.getElementById("container").innerHTML = time;
            console.log(time);
        }
    }, 1000)
}

function checker() {
    if (category == "bio") {
        if (playerAnswer.toLowerCase().trim() === bioAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }
    else if (category == "chem") {
        if (playerAnswer.toLowerCase().trim() === chemAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }
    else if (category == "phys") {
        if (playerAnswer.toLowerCase().trim() === physAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }
    else if (category == "math") {
        if (playerAnswer.toLowerCase().trim() === mathAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }
    else if (category == "cs") {
        if (playerAnswer.toLowerCase().trim() === csAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }
    else if (category == "es") {
        if (playerAnswer.toLowerCase().trim() === esAnswers[arrayNumber].toLowerCase().trim()) {
            correctChecker = true;
        }
        else {
            correctChecker = false;
        }
    }

    document.getElementById("container").style.display = "block";
    document.getElementById("container").style.fontSize = "15dvh";

    if (correctChecker == true && currentPlayer == 1) {
        if (questionUnanswered == 1) {
            player1Score += ((arrayNumber + 1) * 100)*2;
        }
        else {
            player1Score += ((arrayNumber + 1) * 100);
        }

        document.getElementById("container").innerHTML = player1Name + "<br>gets<br>" + ((arrayNumber + 1) * 100) + " points!";
        document.getElementById("gainsSound").play();
        document.getElementById("gainsPoints").style.display = "block";
    }

    else if (correctChecker == false && currentPlayer == 1) {
        if (questionUnanswered == 1) {
            player1Score -= ((arrayNumber + 1) * 100)*2;
        }
        else {
            player1Score -= ((arrayNumber + 1) * 100);
        }
        
        document.getElementById("container1").style.backgroundColor = "#d2b749";
        document.getElementById("container").innerHTML = player1Name + "<br>loses<br>" + ((arrayNumber + 1) * 100) + " points!";
        document.getElementById("losesSound").play();
        document.getElementById("losesPoints").style.display = "block";
    }

    if (correctChecker == true && currentPlayer == 2) {
        if (questionUnanswered == 1) {
            player2Score += ((arrayNumber + 1) * 100)*2;
        }
        else {
            player2Score += ((arrayNumber + 1) * 100);
        }

        document.getElementById("container").innerHTML = player2Name + "<br>gets<br>" + ((arrayNumber + 1) * 100) + " points!";
        document.getElementById("gainsSound").play();
        document.getElementById("gainsPoints").style.display = "block";
    }

    else if (correctChecker == false && currentPlayer == 2) {
        if (questionUnanswered == 1) {
            player2Score -= ((arrayNumber + 1) * 100)*2;
        }
        else {
            player2Score -= ((arrayNumber + 1) * 100);
        }
        
        document.getElementById("container1").style.backgroundColor = "#d2b749";
        document.getElementById("container").innerHTML = player2Name + "<br>loses<br>" + ((arrayNumber + 1) * 100) + " points!";
        document.getElementById("losesSound").play();
        document.getElementById("losesPoints").style.display = "block";
    }

    document.getElementById("player1Score").innerHTML = player1Score;
    document.getElementById("player2Score").innerHTML = player2Score;

    currentPlayer = 0;
    endChecker();
}

function endChecker() {
    let doneChecker = false;

    for (let counter = 0; counter < 6; counter++) {
        for (let insideCounter = 0; insideCounter < 5; insideCounter++) {
            if (document.getElementById(categories[counter] + "-" + insideCounter).innerHTML == "Done!") {
                doneChecker = true;
                questionUnanswered--;
            }
            else {
                doneChecker = false;
                break;
            }
        }
    }

    if (doneChecker) {
        gameEnds();
    }
}

function playerSubmitAnswer(reload) {
    reload.preventDefault();

    playerAnswer = document.getElementById("answer").value;

    document.getElementById("category").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("answerContainer").style.display = "none";

    checker();

    setTimeout(() => {
        document.getElementById("container1").style.display = "none";
        document.getElementById("answer").value = '';
        document.getElementById("container").style.display = "none";
        document.getElementById("container").innerHTML = '';
        document.getElementById("blur").style.display = "none";
        document.getElementById("container").style.display = "none";
        document.getElementById("container").style.transform = "translateY(15dvh)";
        document.getElementById("container").style.fontSize = "30dvh";
        document.getElementById("question").style.fontSize = "10dvh";
        document.getElementById("answerContainer").style.transform = "translate(47.5dvh, 25dvh)";
        document.getElementById("container").style.transform = "translateY(15dvh) translateX(25dvw)";
        document.getElementById("container1").style.backgroundColor = "#ffde59";
        document.getElementById("gainsPoints").style.display = "none";
        document.getElementById("losesPoints").style.display = "none";
    }, 3000);
}

function gameEnds(playerSurrendered) {
    document.getElementById("blur").style.display = "block";
    document.getElementById("endGame").style.display = "block";
    document.getElementById("audio").play();

    if (playerSurrendered == 2) {
        document.getElementById("winnerProfilePicture").src = document.getElementById("player1ProfilePicture").src;
        document.getElementById("winnerName").innerHTML = player1Name;
        document.getElementById("loserComfort").innerHTML = "*don't worry, " + player2Name + ". You'll get your chance next time.";
    }
    else if (playerSurrendered == 1) {
        document.getElementById("winnerProfilePicture").src = document.getElementById("player2ProfilePicture").src;
        document.getElementById("winnerName").innerHTML = player2Name;
        document.getElementById("loserComfort").innerHTML = "*don't worry, " + player1Name + ". You'll get your chance next time.";
    }
    else {
        document.getElementById("winnerInfo").innerHTML = "Tie!";
    }

    let newHighScore = Math.max(player1Score, player2Score);

    if (highScore === null || highScore > currentHighScore) {
        highScorerName = player1Score > player2Score ? player1Name : player2Name;
        highScorerGender = player1Score > player2Score ? player1Gender : player2Gender;

        localStorage.setItem("highScore", newHighScore);
        localStorage.setItem("highScorerName", highScorerName);
        localStorage.setItem("highScorerGender", highScorerGender);
    }
}