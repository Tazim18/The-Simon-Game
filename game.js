let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


//Taking a variable called pressed for the keypress function!!

let pressed = false;

let level = 0;





//TO check which Button is Pressed!!

$(".btn").click(function userClick() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound (userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});


//To add Animation to pressed Class!!
function animatePress (currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}


//Detecting Keypresses!!

$(document).keypress(function() {
    if (!pressed) {
        $("#level-title").text("level " + level);

        nextSequence();
        pressed = true;

    }

    
});


//Function to check user's answer

function checkAnswer (currentLevel) {

    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }

    } else {
// Game Over and its audio!!
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
       
        playSound("wrong");

// Startover if the user gets the pattern wrong!

        startOver();
    }



}


// Restart New Game by resetting the values!!

function startOver () {
    level = 0;
    gamePattern= [];
    pressed = false;
}






function nextSequence () {

    userClickedPattern = [];
let randomNumber = Math.floor(Math.random() * 4);
let randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
playSound (randomChosenColor);

$("#level-title").text("level " + level);
level ++;

}

//To Add Sounds to Button Clicks!!

function playSound (name) {
    let audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();   

}


