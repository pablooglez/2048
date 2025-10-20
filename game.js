// GLOBAL VARIABLES //

// Matrix of the Game (4x4) //
let board = [];

// Current score //
let score = 0;

// Best Score //
let bestScore = 0;

// Board size //
const GRID_SIZE = 4;

// References to DOM elements //
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const restartButton = document.querySelector('.restart-button');
const retryButton = document.querySelector('.retry-button');
const tileContainer = document.querySelector('.tile-container');
const gameMessage = document.querySelector('.game-message');
const messageText = document.querySelector('p');

// GAME INTRODUCTION //

function init_game()	//  Initialize the game when loading the page
{
	loadBestScore();	// Load best score from localStorage
	setupEventListeners();	// Configure event listeners
	newGame();	// Start Game
}

function newGame()
{
	score = 0;	// Reset score
	updateScore();

	board = createEmptyBoard();	// Create empty board

	tileContainer.innerHTML = '';	// Clean visual tiles

	hideGameMessage();	// Hide game over message

	addRandomTile();	// Add 2 starting tokens
	addRandomTile();

	renderBoard();	// Render board
}


function createEmptyBoard()
{
	const newBoard = [];

	for (let i = 0; i < GRID_SIZE; i++)
		{
			newBoard[i] = [];
			for (let j = 0; j < GRID_SIZE; j++)
				{
					newBoard[i][j] = 0; // 0 means empty cell
				}
	}
	return (newBoard);
}