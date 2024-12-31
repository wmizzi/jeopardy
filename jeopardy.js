/*

Main Jeopardy! JavaScript file.

Sets up and executes a Jeopardy! game from start to finish. Handles the dynamic
display of the board, clues, scores, images, etc.


Requires:

player, game, board-sections, sounds


Modifications required:

Functions need to be named more logically, and their behaviour reviewed and
simplified if necessary. Also, ideally, they should reside in modules, and not
in this script

Better comments on the behaviour of each operation required.


Future improvements:

Revisit the way clue blocks on the main board are associated with the respective
game data to display the clue text, and incorporate 'value' data retrieval for
easier scorekeeping.

Incorporate a splash screen to use for breaks in play.

Try to emulate the category reveal sequence at the start of each round,
including animation effects of splash screen (fades and slides).

Broaden the behaviour of clues - they can be images, sounds or videos. This will
require reworking of the clue object.

*/

var currentBlock = null;

import Player from "./player.js";
import Game from "./game.js";
import * as boardSections from "./board-sections.js";
import * as sounds from "./sounds.js";

//-------CREATION OF EVENT LISTENERS-------------------------------------------

// add click event listeners to game board blocks
for (let i = 0; i < boardSections.BLOCKS.length; i++) {
	boardSections.BLOCKS[i].addEventListener("click", function() {showClue(boardSections.BLOCKS[i]);}, false);
}

boardSections.DAILYDOUBLEIMGCARD.addEventListener("click", showDailyDoubleClue, false);
boardSections.FINALJEOPARDYIMGCARD.addEventListener("click", showFinalJeopardyCategory, false);
boardSections.FINALJEOPARDYCATCARD.addEventListener("click", showFinalJeopardyClue, false);

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
		jarrod.incrementScore(Game[currentBlock.id].value);

	} else if (keyPressEvent.key == "a") {
		jarrod.decrementScore(Game[currentBlock.id].value);

	} else if (keyPressEvent.key == "w") {
		harry.incrementScore(Game[currentBlock.id].value);

	} else if (keyPressEvent.key == "s") {
		harry.decrementScore(Game[currentBlock.id].value);

	} else if (keyPressEvent.key == "e") {
		aravinda.incrementScore(Game[currentBlock.id].value);

	} else if (keyPressEvent.key == "d") {
		aravinda.decrementScore(Game[currentBlock.id].value);

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
		boardSections.CATEGORYBLOCKARRAY[i].innerHTML = upperCaseCategory;
	}
}

function enterFinalJeopardy() {
	boardSections.CLUECARD.style.display = "none";
	boardSections.DAILYDOUBLEIMGCARD.style.display = "none";
	boardSections.FINALJEOPARDYIMGCARD.style.display = "flex";
	currentBlock = Game.final_jeopardy;
}

function showFinalJeopardyCategory() {
	boardSections.FINALJEOPARDYIMGCARD.style.display = "none";
	var upperCaseCategory = currentBlock.category.toUpperCase();
	boardSections.FINALJEOPARDYCATCARD.innerHTML = upperCaseCategory;
	boardSections.FINALJEOPARDYCATCARD.style.display = "flex";
	sounds.REVEALDING.play();
}

function showFinalJeopardyClue() {
	var upperCaseClue = Game.final_jeopardy.clue.toUpperCase();
	boardSections.CLUECARD.innerHTML = upperCaseClue;
	boardSections.CLUECARD.style.display = "flex";
	boardSections.FINALJEOPARDYCATCARD.style.display = "none";
	sounds.REVEALDING.play();
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
	var upperCaseClue = Game[block.id].clue.toUpperCase();

	boardSections.CLUECARD.innerHTML = upperCaseClue;
	boardSections.GAMEBOARD.style.display = "none";

	if (Game[block.id].dailydouble == true) {
		boardSections.DAILYDOUBLEIMGCARD.style.display = "flex";
		sounds.DAILYDOUBLE.play();
	} else {
		boardSections.CLUECARD.style.display = "flex";
	}

	block.innerHTML = "";
	// remove text from respective .block div on the board
}

function showDailyDoubleClue() {
	boardSections.DAILYDOUBLEIMGCARD.style.display = "none";
	boardSections.CLUECARD.style.display = "flex";
}

function showSolution(block) {
	var upperCaseSolution = Game[block.id].solution.toUpperCase();
	boardSections.CLUECARD.innerHTML = upperCaseSolution;
}

function returnToBoard() {
	boardSections.GAMEBOARD.style.display = "block";
	boardSections.CLUECARD.style.display = "none";
	boardSections.DAILYDOUBLEIMGCARD.style.display = "none";
}
