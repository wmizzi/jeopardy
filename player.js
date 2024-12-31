/*

Player class.

A class used to display player names on the scoreboard and keep track of their
score. Currently, only manual score changing is supported, in increments of $1
or $200.


Modifications required:

Having whole class contained under 'export' statement is awkward. Look at
better ways of defining and exporting classes. Investigate proper practices.


Future improvements:

Create smarter scoring by 'getting' the value of a clue as the
clue is selected, then simply selecting the player and whether to increment or
decrement that value. Must allow for modification of 0 to 3 players' scores per
clue.

Further, incorporate 'wagers' - perhaps an alert window where host can enter
the player's wager.

*/

import * as boardSections from "./board-sections.js";

export default function Player(playerName, playerNumber) {
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

	// Increments the Player's 'score' property by the amount passed through
	this.incrementScore = function(value) {
		this.score += value;
		if (this.score >= 0) {
			this.makeTextWhite();
		}
		this.displayScore();
	};

	// Decrements the Player's 'score' property by the amount passed through
	this.decrementScore = function(value) {
		this.score -= value;
		if (this.score < 0) {
			this.makeTextRed();
		}

		this.displayScore();
	};

	this.displayScore = function() {
		boardSections.SCOREBOARD[this.number].innerHTML = this.name + ": $" + this.score;
	};

	this.makeTextRed = function() {
		boardSections.SCOREBOARD[this.number].style.color = "red";
	};

	this.makeTextWhite = function() {
		boardSections.SCOREBOARD[this.number].style.color = "white";
	};
}
