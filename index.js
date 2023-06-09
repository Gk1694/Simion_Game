var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var starter = false;
var buttonColor = ["red", "blue","green", "yellow"];
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);;
}
function startOver(){
    level = 0;
    gamePattern = [];
    starter = false;
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("sucess");
        if( gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },200);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(document).keypress(function(){
    if(!starter){
        nextSequence();
        $("h1").text("Level "+level);
        starter = true;
    }
});
$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})