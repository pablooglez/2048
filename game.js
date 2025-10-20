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

// EVENT LISTENERS //

restartButton.addEventListener('click', newGame);	// Restart button
retryButton.addEventListener('click', newGame);		// Retry button

document.addEventListener('keydown', handleKeyPress);	// Arrow keys

function handleKeyPress(event)	// event --> keyboard event
{
	if (event.key == 'ArrowUp')
	{
		event.preventDefault();
		console.log('Key pressed: Up');
	}
	else if (event.key == 'ArrowDown')
	{
		event.preventDefault();
		console.log('Key pressed: Down');
	}
	else if (event.key == 'ArrowLeft')
	{
		event.preventDefault();
		console.log('Key pressed: Left');
	}
	else if (event.key == 'ArrowRight')
	{
		event.preventDefault();
		console.log('Key pressed: Right');
	}
}

// SCORE MANAGEMENT //

function updateScore()	// Update Score
{
	scoreDisplay.textContent = score;

	if (score > bestScore)	// Update better score if necessary
	{
		bestScore = score;
		bestScoreDisplay.textContent = bestScore;
		saveBestScore();
	}
}

function loadBestScore()	// Load the best score from localStorage
{
	const saved = localStorage.getItem('2048-best-score');

	if (saved !== null)
	{
		bestScore = parseInt(saved, 10); // If it exists, convert it to a number and assign it to bestScore
	}
	else
	{
		bestScore = 0; // If it does not exist, initialize bestScore to 0.
	}
	bestScoreDisplay.textContent = bestScore
}

function saveBestScore()	// Save the best score
{
		localStorage.setItem('2048-best-score', bestScore);
}