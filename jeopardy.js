const GAMEBOARD = document.querySelector(".board-container");
const CLUECARD	= document.querySelector(".clue");
const CLUEBOARD	= document.querySelector(".clue-container");
const SCOREBOARD = document.querySelectorAll(".player-score");
const DAILYDOUBLECARD = document.querySelector(".daily-double-container");
const DAILYDOUBLESOUND = document.querySelector("#daily-double-sound");
const FINALJEOPARDYCARD = document.querySelector(".final-jeopardy-container");
const FINALJEOPARDYBOARD = document.querySelector(".category-container");
const CATEGORYBLOCKARRAY = document.querySelectorAll(".category");

var currentBlock = null;

// create global variable that is populated by blocks with the dollar value of
// a block - then, this value can be accessed and added or subtracted with a
// single keypress

// to do - make text red if $ score negative (is this what happens?)
// to do - make a splash screen
// amend clue object - image? true or false, and treated accordingly with the creation of an image tag. perhaps consider also putting text clues into created <p> tags

/*var Game = {
	cat1:	"Australian Prime Ministers",
	cat2:	"Name The Song",
	cat3:	"Lakes & Rivers",
	cat4:	"Double Double",
	cat5:	"Internationalities",
	cat6:	"Long Movie Titles",

	clue1_1:	{value: 200, dailydouble: false, solution: "Australian Federation", clue: "The position of Prime Minister was created following this event, occurring on the first day of the 20th Century"},
	clue1_2:	{value: 400, dailydouble: false, solution: "Robert 'Bob' Hawke", clue: "This Prime Minister held a world record for beer drinking, and maintains that it contributed to his political success"},
	clue1_3:	{value: 600, dailydouble: false, solution: "Alfred Deakin", clue: "Australia’s second Prime Minister and one of two who have had a university named after them"},
	clue1_4:	{value: 800, dailydouble: false, solution: "Robert Menzies", clue: "He is Australia’s longest serving Prime Minister, serving a total of 18 years across 4 decades"},
	clue1_5:	{value: 1000, dailydouble: false, solution: "Cheviot Beach", clue: "Harold Holt disappeared from this beach, 50 years ago last month"},

	clue2_1:	{value: 200, dailydouble: false, solution: "Lock Doh", clue: "'And when I'm chilling out, she wanna ask me questions, Jeopardy. Man, I got the pussy on ...'"},
	clue2_2:	{value: 400, dailydouble: false, solution: "Billie Jean", clue: "'She's just a girl who claims that I am the one'"},
	clue2_3:	{value: 600, dailydouble: false, solution: "Black Dog", clue: "'Hey, hey, mama, said the way you move, gonna make you sweat, gonna make you groove'"},
	clue2_4:	{value: 800, dailydouble: false, solution: "Hey Ya!", clue: "'Shake it like a Polaroid picture'"},
	clue2_5:	{value: 1000, dailydouble: true, solution: "Yellow Submarine", clue: "'In the town where I was born lived a man who sailed to sea'"},

	clue3_1:	{value: 200, dailydouble: false, solution: "The Ganges", clue: "In Hinduism, a shortcut to paradise is to die in this 1,560-mile river The Ganges"},
	clue3_2:	{value: 400, dailydouble: false, solution: "Lake Baikal", clue: "It's estimated that more than 20% of the world's unfrozen fresh water is in this Siberian lake"},
	clue3_3:	{value: 600, dailydouble: false, solution: "The River Jordan", clue: "In Israel the area where this river exits the Sea of Galilee is considered holy"},
	clue3_4:	{value: 800, dailydouble: false, solution: "The Missouri River", clue: "Just 33km longer than the Mississippi River, this similarly named waterway is the longest in North America"},
	clue3_5:	{value: 1000, dailydouble: false, solution: "The Orinico", clue: "Perhaps Enya could tell you that part of this 1,600-mile-long river flows along the Venezuela-Colombia border"},

	clue4_1:	{value: 200, dailydouble: false, solution: "coffee", clue: "A hot favourite morning caffinated beverage"},
	clue4_2:	{value: 400, dailydouble: false, solution: "guerrilla", clue: "A member of a small independent group taking part in irregular fighting, typically against larger regular forces"},
	clue4_3:	{value: 600, dailydouble: false, solution: "hippogriff", clue: "This avian-equine mythical creature, one of which features in the third installment of the Harry Potter series"},
	clue4_4:	{value: 800, dailydouble: false, solution: "buccaneer", clue: "Another word for pirate, also sounds like a dollar per hearing organ"},
	clue4_5:	{value: 1000, dailydouble: false, solution: "corroboree", clue: "This interaction of Aboriginal Australians with the Dreamtime through music, dance and costume"},

	clue5_1:	{value: 200, dailydouble: false, solution: "White Russian", clue: "In 'The Big Lebowski', The Dude called this cocktail a 'Caucasian'"},
	clue5_2:	{value: 400, dailydouble: false, solution: "French Press", clue: "Your barista knows it's also called a cafetiere or a plunge-filter"},
	clue5_3:	{value: 600, dailydouble: false, solution: "The Maltese Falcon", clue: "The title of a 1941 film noir based on the 1930 book of the same name, about a priceless, jewel encrusted, golden token"},
	clue5_4:	{value: 800, dailydouble: false, solution: "Turkish Delight", clue: "A family of confections based on a gel of starch and sugar, know as ‘lokum’ in its national tongue and commonly chocolate covered in commercial versions"},
	clue5_5:	{value: 1000, dailydouble: false, solution: "German Shepherd", clue: "Until recently in Great Britain this dog breed was known as the Alsatian"},

	clue6_1:	{value: 200, dailydouble: false, solution: "The Desert", clue: "1994: 'The Adventures of Priscilla, Queen of' here"},
	clue6_2:	{value: 400, dailydouble: false, solution: "Two Smoking Barrels", clue: "1998: ‘Lock, Stock &’ this pair"},
	clue6_3:	{value: 600, dailydouble: false, solution: "Love The Bomb", clue: "1964: ‘Dr Strangelove or: How I learned to stop worrying and’ this"},
	clue6_4:	{value: 800, dailydouble: false, solution: "Nation of Kazakhstan", clue: "2006: ‘Borat: Cultural Learnings of America for Make Benefit Glorious’ this"},
	clue6_5:	{value: 1000, dailydouble: false, solution: "Your Juice In The Hood", clue: "1996: ‘Don’t be a menace to south central while drinking’ this"},

	final_jeopardy:	{category: "International Sports", solution: "Le Tour de France", clue: "First held in 1913, this event's inaugural winner was Maurice Garin with a time of 94 hours, 33 minutes, 14 seconds"},
};*/

var Game = {
	categories:	["Make It A Double-Letter Word", "Bard 'M'en", "Nail Polish Colours", "The Oscar for Best Animated Feature", "Construction", "Recreational Drugs"],

	clue1_1:	{value: 200, dailydouble: false, solution: "coma & comma", clue: "A state of prolonged unconsciousness wakes up with another letter to become a punctuation mark"},
	clue1_2:	{value: 400, dailydouble: false, solution: "cop & coop", clue: "Slang for a policeman; with an added letter, it becomes a fowl enclosure"},
	clue1_3:	{value: 600, dailydouble: false, solution: "ref & reef", clue: "An abbreviated football official becomes a sand ridge at the water's surface"},
	clue1_4:	{value: 800, dailydouble: false, solution: "super & supper", clue: "A word meaning top-rate or excellent takes on another letter to become a meal of the day"},
	clue1_5:	{value: 1000, dailydouble: false, solution: "rifle & riffle", clue: "A long-barreled gun loads an extra letter to be a word meaning to turn pages hastily"},

	clue2_1:	{value: 200, dailydouble: false, solution: "Macduff", clue: "He killed Macbeth"},
	clue2_2:	{value: 400, dailydouble: false, solution: "Mercutio", clue: "He declared 'A plague o' both' the houses of Montague & Capulet"},
	clue2_3:	{value: 600, dailydouble: false, solution: "The Merchant of Venice", clue: "We know Antonio's job (& where he works) from the title of this comedy"},
	clue2_4:	{value: 800, dailydouble: false, solution: "Malvolio", clue: "The name of this steward in 'Twelfth Night' is an approximation of the Italian for 'ill will'"},
	clue2_5:	{value: 1000, dailydouble: false, solution: "Menelaus", clue: "You'll find this king of Sparta & hubby of Helen in 'Troilus & Cressida'"},

	clue3_1:	{value: 200, dailydouble: false, solution: "Worth It", clue: "Completes the name of a polish by L'Oreal, 'Because You're...'"},
	clue3_2:	{value: 400, dailydouble: false, solution: "Betty & Veronica", clue: "Limited-edition shades from MAC Cosmetics were inspired by these 2 girls from the Archie comics"},
	clue3_3:	{value: 600, dailydouble: false, solution: "The Hague", clue: "OPI likes a pun: an orangey red is called 'A Roll in' this Dutch seat of government"},
	clue3_4:	{value: 800, dailydouble: false, solution: "Mimosa", clue: "Chanel named a yellow polish for this champagne & orange juice cocktail"},
	clue3_5:	{value: 1000, dailydouble: false, solution: "Masquerade", clue: "Hard Candy's Crystal Confetti Collection includes a red & black one named for this type of costume ball"},

	clue4_1:	{value: 200, dailydouble: false, solution: "Finding Nemo", clue: "2003: A fish story"},
	clue4_2:	{value: 400, dailydouble: false, solution: "Brave", clue: "2012: A straight-shooting Scottish lass saves her family"},
	clue4_3:	{value: 600, dailydouble: false, solution: "Ratatouille", clue: "2007, set in Paris: murine cuisine"},
	clue4_4:	{value: 800, dailydouble: false, solution: "Rango", clue: "2011: Lizard livin' large"},
	clue4_5:	{value: 1000, dailydouble: false, solution: "Happy Feet", clue: "2006: Super cool tap dancing"},

	clue5_1:	{value: 200, dailydouble: false, solution: "Stairs", clue: "Risers are the vertical elements of these that you'll build to go from one level to another"},
	clue5_2:	{value: 400, dailydouble: false, solution: "Insulation", clue: "The higher the 'R' value, the higher the efficiency of this product that's used to keep the heat in"},
	clue5_3:	{value: 600, dailydouble: false, solution: "Nail Gun", clue: "For big jobs this can replace a hammer; the coil type has a loading capacity of 300 at a time"},
	clue5_4:	{value: 800, dailydouble: false, solution: "2x4", clue: "Despite its (American) name, after milling & drying, this standard piece of lumber is closer to 1 1/2 inches x 3 1/2 inches"},
	clue5_5:	{value: 1000, dailydouble: false, solution: "Cement", clue: "If you want to make a construction pro crazy, instead of concrete, use this word that means a powder that's found in concrete"},

	clue6_1:	{value: 200, dailydouble: false, solution: "Indica", clue: "This major type of the cannabis plant is know for its short, bushy stature and deep body sensation effects when smoked"},
	clue6_2:	{value: 400, dailydouble: false, solution: "18th", clue: "Still commonly used today, the recreational inhalation of nitrous oxide began at parties in as early as this century"},
	clue6_3:	{value: 600, dailydouble: false, solution: "Peyote", clue: "This Mexican native plant, prized for its psychoactive ingredients, is illegal in the United States, except for members of the Native American Church"},
	clue6_4:	{value: 800, dailydouble: true, solution: "LSD", clue: "The 1950's CIA program MKUltra involved admisitering doses of this drug to a range of human subjects, often without their knowledge"},
	clue6_5:	{value: 1000, dailydouble: false, solution: "Alexander Shulgin", clue: "Passed away in 2014, this man was heralded as the 'Godfather of Ecstasy'"},

	final_jeopardy:	{category: "International Sports", solution: "Le Tour de France", clue: "First held in 1913, this event's inaugural winner was Maurice Garin with a time of 94 hours, 33 minutes, 14 seconds"},
};

function Player(playerName, playerNumber) {
	this.name = playerName;
	this.number = playerNumber;
	this.score = 0;
	this.scoreString = playerName + ": $" + this.score;

	this.addOne = function() {
		this.score += 1;
		if (this.score >= 0) {
			this.makeTextWhite();
		}
		this.displayScore();
	};

	this.incrementScore = function() {
		this.score += 200;
		if (this.score >= 0) {
			this.makeTextWhite();
		}
		this.displayScore();
	};

	this.decrementScore = function() {
		this.score -= 200;
		if (this.score < 0) {
			this.makeTextRed();
		}

		this.displayScore();
	};

	this.displayScore = function() {
		SCOREBOARD[this.number].innerHTML = this.name + ": $" + this.score;
	};

	this.makeTextRed = function() {
		SCOREBOARD[this.number].style.color = "red";
	};

	this.makeTextWhite = function() {
		SCOREBOARD[this.number].style.color = "white";
	};
}

var jarrod = new Player("Jarrod", 0);
jarrod.displayScore();

var harry = new Player("Harry", 1);
harry.displayScore();

var aravinda = new Player("Aravinda", 2);
aravinda.displayScore();

var blocks = document.querySelectorAll(".block");

// add click event listeners to game board blocks
for (let i = 0; i < blocks.length; i++) {
	blocks[i].addEventListener("click", function() {showClue(blocks[i]);}, false);
}

enterCategoryNames();

DAILYDOUBLECARD.addEventListener("click", showDailyDoubleClue, false);
FINALJEOPARDYCARD.addEventListener("click", showFinalJeopardyCategory, false);
FINALJEOPARDYBOARD.addEventListener("click", showFinalJeopardyClue, false);

window.onkeypress = function (keyPressEvent) {

	if (keyPressEvent.key == "q") {
		jarrod.incrementScore();

	} else if (keyPressEvent.key == "a") {
		jarrod.decrementScore();

	} else if (keyPressEvent.key == "w") {
		harry.incrementScore();

	} else if (keyPressEvent.key == "s") {
		harry.decrementScore();

	} else if (keyPressEvent.key == "e") {
		aravinda.incrementScore();

	} else if (keyPressEvent.key == "d") {
		aravinda.decrementScore();

	} else if (keyPressEvent.key == "p") {
		showSolution(currentBlock);

	} else if (keyPressEvent.key == "z") {
		jarrod.addOne();

	} else if (keyPressEvent.key == "x") {
		harry.addOne();

	} else if (keyPressEvent.key == "c") {
		aravinda.addOne();

	} else {

		if (checkAllQuestionsComplete()) {
			enterFinalJeopardy();
		} else {
			returnToBoard();
		}
	}
};

function enterCategoryNames() {
	for (let i = 0; i < CATEGORYBLOCKARRAY.length; i++) {
		var upperCaseCategory = Game.categories[i].toUpperCase();
		CATEGORYBLOCKARRAY[i].innerHTML = upperCaseCategory
	}
}

function enterFinalJeopardy() {
	CLUEBOARD.style.display = "none";
	DAILYDOUBLECARD.style.display = "none";
	FINALJEOPARDYCARD.style.display = "flex";
	currentBlock = Game.final_jeopardy;
}

function showFinalJeopardyCategory() {
	FINALJEOPARDYCARD.style.display = "none";
	var upperCaseCategory = currentBlock.category.toUpperCase();
	FINALJEOPARDYBOARD.innerHTML = upperCaseCategory;
	FINALJEOPARDYBOARD.style.display = "flex";
}

function showFinalJeopardyClue() {
	var upperCaseClue = Game.final_jeopardy.clue.toUpperCase();
	CLUECARD.innerHTML = upperCaseClue;
	CLUEBOARD.style.display = "flex";
	FINALJEOPARDYBOARD.style.display = "none";
}

function checkAllQuestionsComplete() {
	for (let i = 0; i < blocks.length; i++) {
		if (blocks[i].innerHTML != 0) {
			return false;
		}
	}
	return true;
}

function showClue(block) {

	currentBlock = block;

	// Make clue text all caps - string.toUpperCase()
	var upperCaseClue = Game[block.id].clue.toUpperCase();

	// Insert clue text into .clue div
	CLUECARD.innerHTML = upperCaseClue;

	// hide .board-container div
	GAMEBOARD.style.display = "none";

	if (Game[block.id].dailydouble == true) {
		DAILYDOUBLECARD.style.display = "flex";
		DAILYDOUBLESOUND.play();
	} else {
		// show .clue-container div
		CLUEBOARD.style.display = "flex";
	}
	block.innerHTML = "";
	// remove text from respective .block div on the board
}

function showDailyDoubleClue() {
	DAILYDOUBLECARD.style.display = "none";
	CLUEBOARD.style.display = "flex";
}

function showSolution(block) {

	// Make clue text all caps - string.toUpperCase()
	var upperCaseSolution = Game[block.id].solution.toUpperCase();

	// Insert clue text into .clue div
	CLUECARD.innerHTML = upperCaseSolution;
}

function returnToBoard() {

	// show .board-container div
	GAMEBOARD.style.display = "block";

	// hide .clue-container div
	CLUEBOARD.style.display = "none";

	DAILYDOUBLECARD.style.display = "none";
}
