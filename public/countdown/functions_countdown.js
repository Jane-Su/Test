var rightAnswerId = -1;
var correctAnswers = 0;
var points = 0;

// Generate number between 1-10
function generateNumber(){

	var a = Math.floor((Math.random() * 10)+ 1);
	return a;
	
}


//Generate wrong answers based on the right answer
function generateWrongAnswers(rightAnswer){
	
	var allAnswers = [];
	
	while(allAnswers.length < 4){
	
	var addValue = generateNumber();
	
	var valueToBeAdded = 0;
	
	var signal = generateNumber();
	
		if( signal > 5)
		
			valueToBeAdded = rightAnswer + addValue;	
			
		else valueToBeAdded = rightAnswer - addValue;
				
		if(allAnswers.indexOf(valueToBeAdded) > -1 || valueToBeAdded <= 0)	
			continue;
		else allAnswers.push(valueToBeAdded);
	
	}
	return allAnswers;

}

// Generate question
function writeQuestion(){

	var a = generateNumber() ;
	var b = generateNumber() ;
	var x = a + " x " + b ;
 	document.getElementById("question").innerHTML = x;
 	return a*b;
	
}

function cleanScreen(){

	document.getElementById("screen").innerHTML = "";	

	document.getElementById("correctAnswers").innerHTML = correctAnswers;	

}

function cleanColor(){
	for (var x=0;x<4;x++){
		var rightButton = document.getElementById(x);
		rightButton.setAttribute("style","background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );");
	}
}

function changeActiveStatusButtons (status){
	for (var x=0;x<4;x++){
		document.getElementById(x).disabled = status; 
	}
}

//Generate questions and answers
function answersQuestion(){
	cleanColor();
	changeActiveStatusButtons (false);

	var rightAnswer = writeQuestion();

	var answers = [];

	answers = generateWrongAnswers(rightAnswer);
	
	var rightPosition = Math.floor((Math.random() * 16)/4);
	
	answers[rightPosition] = rightAnswer;
	
	rightAnswerId = rightPosition;
	
	for(var i=0;i<4;i++){
		document.getElementById(i).innerHTML = answers[i];
	}

}



function changeColor(rightAnswerId){
	var rightButton = document.getElementById(rightAnswerId);
	rightButton.setAttribute("style","background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #b8e356 ), color-stop(1, #b8e356 ) );");
}

function onOptionClick(id){

	if(id == rightAnswerId){
		correctAnswers++;
		answersQuestion();
	} else {		
		changeColor(rightAnswerId);
		changeActiveStatusButtons (true);
		setTimeout('answersQuestion()', 3000);
	}	
	//setInterval('answersQuestion()', 10000);	
	//answersQuestion();
	document.getElementById("correctAnswers").innerHTML = correctAnswers;	
}


//var userSeconds = prompt("How many seconds?");
var secondsClock = 59;
function secondPassed() {
    var minutes = Math.round((secondsClock - 30)/60);
    var remainingSeconds = secondsClock % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;  
    }
    //document.getElementById('clock').innerHTML = minutes + ":" + remainingSeconds;
    if (secondsClock == 0) {
        clearInterval(countdownTimer);        
        //document.getElementById('clock').innerHTML = "0:00";
        cleanScreen();
    } else {
        secondsClock--;
    }
}
var countdownTimer = setInterval('secondPassed()', 1000);

