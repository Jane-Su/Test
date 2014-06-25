var rightAnswerId = -1;
var correctAnswers = 0;
var points = 0;
var level = -1;
var correctLevelAnswers = [0, 0, 0];
var TotalQuestions = 0;
var streakMultiplier = 0;
var errors = 0;
var topStreak = 0;

function generateNumber(){

	var a = Math.floor((Math.random() * 10)+ 1);
	return a;
	
}

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

function writeQuestion(){

	var a = 0;
	var b = 0;


	TotalQuestions++;


	if((TotalQuestions%10) == 0){		
		document.getElementById("level").innerHTML = "Level: "+(level+3);
		level++;
		correctLevelAnswers[level] = correctAnswers - (correctLevelAnswers[0]+correctLevelAnswers[1]);
		errors = 0;
	}else if(TotalQuestions == 1){
		document.getElementById("correctAnswers").innerHTML = "Corrects: "+correctAnswers;
		document.getElementById("streak").innerHTML = "Streak: X"+streakMultiplier;
		document.getElementById("error").innerHTML = "Wrong: "+errors;
		document.getElementById("level").innerHTML = "Level: "+(level+2);
	}else if(TotalQuestions > 29){
		endgame();
	}
		switch (level){
			case -1:
				while(a != 1 && a!= 2 && a!= 3 && a!= 10){
					a = generateNumber();
				}
				
				b = generateNumber();
				var x = a + " x " + b ;
				document.getElementById("question").innerHTML = x;
 				return a*b;
 			case 0:
				while((a!= 4) &&  (a!= 5) &&  (a!= 6)){
					a = generateNumber();
				}
				b = generateNumber();
				var x = a + " x " + b ;
 				document.getElementById("question").innerHTML = x;
 				return a*b;
 			case 1:
 				while((a!= 7) &&  (a!= 8) &&  (a!= 9)){
					a = generateNumber();
				}
				b = generateNumber();
				var x = a + " x " + b ;
 				document.getElementById("question").innerHTML = x;
 				return a*b;		
		}
	
}


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

function onOptionClick(id){

	if(id != rightAnswerId){
		streakMultiplier = 1;
		errors++;	
		document.getElementById("error").innerHTML = "Wrong: "+errors;
		changeColor(rightAnswerId);
		changeActiveStatusButtons (true);
		setTimeout('answersQuestion()', 2000);
		if(errors>2){
			setTimeout('endgame()', 2000);
		}	
	}
	else {
		streakMultiplier++;
		correctAnswers++;
		answersQuestion();
		document.getElementById("correctAnswers").innerHTML = "Corrects: "+correctAnswers;
		document.getElementById("streak").innerHTML = "Streak: X"+streakMultiplier;
		document.getElementById("error").innerHTML = "Wrong: "+errors;

		if(streakMultiplier>topStreak){	
			topStreak=streakMultiplier;
		}
	}  

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

function changeColor(rightAnswerId){
	var rightButton = document.getElementById(rightAnswerId);
	rightButton.setAttribute("style","background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #b8e356 ), color-stop(1, #b8e356 ) );");
}

function endgame(){

	var tudo = document.getElementById("main");
	tudo.setAttribute("style", "display:none;");

	var result = document.getElementById("resultBox");
	result.setAttribute("style", "display:block;");
	document.getElementById("resultBox").innerHTML = "Game Result: <br>Errors: " + errors + "<br>Total Questions:" + TotalQuestions + "<br>Corrects: " + correctAnswers + "<br>Top streak: " + topStreak;

	var butext = document.getElementById("return");
	butext.setAttribute("style", "margin-top:-9%");

	var butext2 = document.getElementById("return2");
	butext2.setAttribute("style", "margin-top:-9%");
	
		


}

