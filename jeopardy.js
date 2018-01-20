var currentBlock = null;

import Player from "./player.js";
import Game from "./game.js"
import * as boardSections from "./board-sections.js"
import * as sounds from "./sounds.js"
// create global variable that is populated by blocks with the dollar value of
// a block - then, this value can be accessed and added or subtracted with a
// single keypress

// to do - make a splash screen
// amend clue object - image? true or false, and treated accordingly with the creation of an image tag. perhaps consider also putting text clues into created <p> tags

//-------CREATION OF EVENT LISTENERS-------------------------------------------

// add click event listeners to game board blocks
for (let i = 0; i < boardSections.BLOCKS.length; i++) {
	boardSections.BLOCKS[i].addEventListener("click", function() {showClue(boardSections.BLOCKS[i]);}, false);
}

boardSections.DAILYDOUBLECARD.addEventListener("click", showDailyDoubleClue, false);
boardSections.FINALJEOPARDYCARD.addEventListener("click", showFinalJeopardyCategory, false);
boardSections.FINALJEOPARDYBOARD.addEventListener("click", showFinalJeopardyClue, false);

//-----------------------------------------------------------------------------
//------BOARD SETUP------------------------------------------------------------

var jarrod = new Player("Jarrod", 0);
jarrod.displayScore();

var harry = new Player("Harry", 1);
harry.displayScore();

var aravinda = new Player("Aravinda", 2);
aravinda.displayScore();

enterCategoryNames();

//-----------------------------------------------------------------------------

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
	for (let i = 0; i < boardSections.CATEGORYBLOCKARRAY.length; i++) {
		var upperCaseCategory = Game.categories[i].toUpperCase();
		boardSections.CATEGORYBLOCKARRAY[i].innerHTML = upperCaseCategory
	}
}

function enterFinalJeopardy() {
	boardSections.CLUEBOARD.style.display = "none";
	boardSections.DAILYDOUBLECARD.style.display = "none";
	boardSections.FINALJEOPARDYCARD.style.display = "flex";
	currentBlock = Game.final_jeopardy;
}

function showFinalJeopardyCategory() {
	boardSections.FINALJEOPARDYCARD.style.display = "none";
	var upperCaseCategory = currentBlock.category.toUpperCase();
	boardSections.FINALJEOPARDYBOARD.innerHTML = upperCaseCategory;
	boardSections.FINALJEOPARDYBOARD.style.display = "flex";
}

function showFinalJeopardyClue() {
	var upperCaseClue = Game.final_jeopardy.clue.toUpperCase();
	boardSections.CLUECARD.innerHTML = upperCaseClue;
	boardSections.CLUEBOARD.style.display = "flex";
	boardSections.FINALJEOPARDYBOARD.style.display = "none";
}

function checkAllQuestionsComplete() {
	for (let i = 0; i < boardSections.BLOCKS.length; i++) {
		if (boardSections.BLOCKS[i].innerHTML != 0) {
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
	boardSections.CLUECARD.innerHTML = upperCaseClue;

	// hide .board-container div
	boardSections.GAMEBOARD.style.display = "none";

	if (Game[block.id].dailydouble == true) {
		boardSections.DAILYDOUBLECARD.style.display = "flex";
		sounds.DAILYDOUBLE.play();
	} else {
		// show .clue-container div
		boardSections.CLUEBOARD.style.display = "flex";
	}
	block.innerHTML = "";
	// remove text from respective .block div on the board
}

function showDailyDoubleClue() {
	boardSections.DAILYDOUBLECARD.style.display = "none";
	boardSections.CLUEBOARD.style.display = "flex";
}

function showSolution(block) {

	// Make clue text all caps - string.toUpperCase()
	var upperCaseSolution = Game[block.id].solution.toUpperCase();

	// Insert clue text into .clue div
	boardSections.CLUECARD.innerHTML = upperCaseSolution;
}

function returnToBoard() {

	// show .board-container div
	boardSections.GAMEBOARD.style.display = "block";

	// hide .clue-container div
	boardSections.CLUEBOARD.style.display = "none";

	boardSections.DAILYDOUBLECARD.style.display = "none";
}
