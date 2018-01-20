import * as boardSections from "./board-sections.js"

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
		boardSections.SCOREBOARD[this.number].innerHTML = this.name + ": $" + this.score;
	};

	this.makeTextRed = function() {
		boardSections.SCOREBOARD[this.number].style.color = "red";
	};

	this.makeTextWhite = function() {
		boardSections.SCOREBOARD[this.number].style.color = "white";
	};
};
