var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false

$(document).keydown(function() {
  if (!started) {
    nextSequence()
  }
  started = true
})

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  makeSound(this.id);
  animatedButton(this.id);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {
      userClickedPattern=[];
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  }
  else{
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart")
    started=false;
    level=0;
    userClickedPattern=[];
    gamePattern=[];
  }
}

function nextSequence() {
  level += 1
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  animatedButton(randomChosenColor);
}

function makeSound(button) {
  var sound = new Audio("sounds/" + button + ".mp3");
  sound.play();
}

function animatedButton(color) {
  $('#' + color).addClass("pressed");
  setTimeout(function() {
    $('#' + color).removeClass("pressed");
  }, 100);
}
