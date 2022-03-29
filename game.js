
var buttonColours = ["red","blue","green","yellow"];
var started=false;
var level=0;
var gamePattern=[];
var userClickedPattern=[];

$(document).keypress(function(){
  if(!started)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(){

   var userChosenColor=$(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
          playSound("wrong");
          $("body").addClass("game-over");
          $("h1").text("Game Over, Press Any Key to Restart");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
          startOver();

  }
}

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}



function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currenColor){

  $("#"+currenColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currenColor).removeClass("pressed");
   }, 100);
}

function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}
