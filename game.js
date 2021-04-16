var gamePattern = new  Array();
var userClickedPattern=new Array();
var buttonColours=["red", "blue", "green", "yellow" ];
function playSound(name){
    var myAudio = new Audio("sounds/"+name+".mp3");
    myAudio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    $("#"+currentColour).delay(100).removeClass("pressed");

}
var started = false;
var level =0;
$(document).keypress(function(){
    if(!started){
       $("h1").text("level "+level);
       nextSequence();
       started=true;
    }
});
function nextSequence(){
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random() * 4);

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  
});
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
       if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
  }
     }
     else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;



}
