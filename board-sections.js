/*

board-sections module.

Selects DOM elements that are used often and exports them as constants
to make code easier to read.

*/

const SCOREBOARD = document.querySelectorAll(".player-score");
const GAMEBOARD = document.querySelector(".board-container");
const BLOCKS = document.querySelectorAll(".block");
const CLUECARD	= document.querySelector(".clue-card");
const DAILYDOUBLEIMGCARD = document.querySelector("#daily-double-img-card");
const FINALJEOPARDYIMGCARD = document.querySelector("#final-jeopardy-img-card");
const FINALJEOPARDYCATCARD = document.querySelector("#final-jeopardy-category-card");
const CATEGORYBLOCKARRAY = document.querySelectorAll(".category");

export {SCOREBOARD, GAMEBOARD, BLOCKS, CLUECARD, DAILYDOUBLEIMGCARD, FINALJEOPARDYIMGCARD, FINALJEOPARDYCATCARD, CATEGORYBLOCKARRAY};
