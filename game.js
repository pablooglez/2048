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
const messageText = gameMessage.querySelector('p');

//----------------------------------------------------------------------------------//

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

//----------------------------------------------------------------------------------//

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

//----------------------------------------------------------------------------------//

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
		bestScore = parseInt(saved, 10); // If it exists, convert it to a number
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

//----------------------------------------------------------------------------------//

// GAME MESSAGES //

function showGameMessage(message)	// Displays the game over message
{
	messageText.textContent = message;	// Set the message text
	gameMessage.style.display = 'flex';	// Display the message container
}

function hideGameMessage()
{
	gameMessage.style.display = 'none';	// Hide the message container
}

//----------------------------------------------------------------------------------//

// START THE GAME WHEN THE PAGE LOADS.

document.addEventListener('DOMContentLoaded', init_game);

//----------------------------------------------------------------------------------//

// TILE GENERATION //

function addRandomTile()	// Add a random tile (2 or 4) to an empty cell
{
	const emptyCells = getEmptyCells();

	if (emptyCells.length === 0)
		return (false);

	const randomIndex = Math.floor(Math.random() * emptyCells.length);	// Select a random empty cell
	const {row ,col} = emptyCells[randomIndex];

	let value;
	if (Math.random() < 0.9) {
		value = 2;
	}
	else
	{
		value = 4;
	}
	board[row][col] = value;

	return (true);
}

function getEmptyCells()	// Get all empty cells (with value 0)
{
	const emptyCells = [];

	for (let row = 0; row < GRID_SIZE; row++)
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			if (board[row][col] === 0)
			{
				emptyCells.push({row, col});
			}
		}
	}
	return (emptyCells);
}

//----------------------------------------------------------------------------------//

// BOARD RENDERING //

function renderBoard() // Render all tiles on the board
{
	tileContainer.innerHTML = '';	// Clear the tile container

	for (let row = 0; row < GRID_SIZE; row++)	// Iterate through the board and create tiles
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			const value = board[row][col];
			
			if (value !== 0)	// Only render if there's a tile
			{
				createTileElement(value, row, col);
			}
		}
	}
}

function createTileElement(value, row, col)	// Create a tile element visually
{
	// Create the tile div
	const tile = document.createElement('div');
	tile.classList.add('tile');
	tile.classList.add(`tile-${value}`);
	tile.textContent = value;
	
	// Calculate position (each cell is 90px: 80px + 10px margin)
	const position = getTilePosition(row, col);
	tile.style.left = position.x + 'px';
	tile.style.top = position.y + 'px';
	
	// Add to container
	tileContainer.appendChild(tile);
}

function getTilePosition(row, col)	// Calculate pixel position of a tile
{
	// Each cell: 80px + 10px margin (5px each side)
	const cellSize = 80;
	const margin = 5;
	
	const x = col * (cellSize + margin * 2) + margin;
	const y = row * (cellSize + margin * 2) + margin;

	return { x: x, y: y };
}

//----------------------------------------------------------------------------------//

// MOVEMENT LOGIC //

function move(direction)	// Main function to handle movement
{
	let moved = false;
	let newBoard = JSON.parse(JSON.stringify(board));	// Deep copy of the board
	
	if (direction === 'left')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			let newRow = slide(board[row]);
			newBoard[row] = newRow.row;
			if (newRow.moved) moved = true;
		}
	}
	else if (direction === 'right')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			let reversedRow = board[row].slice().reverse();
			let newRow = slide(reversedRow);
			newBoard[row] = newRow.row.reverse();
			if (newRow.moved) moved = true;
		}
	}
	else if (direction === 'up')
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			let column = [];
			for (let row = 0; row < GRID_SIZE; row++)
			{
				column.push(board[row][col]);
			}
			let newColumn = slide(column);
			for (let row = 0; row < GRID_SIZE; row++)
			{
				newBoard[row][col] = newColumn.row[row];
			}
			if (newColumn.moved) moved = true;
		}
	}
	else if (direction === 'down')
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			let column = [];
			for (let row = 0; row < GRID_SIZE; row++)
			{
				column.push(board[row][col]);
			}
			let reversedColumn = column.reverse();
			let newColumn = slide(reversedColumn);
			for (let row = 0; row < GRID_SIZE; row++)
			{
				newBoard[row][col] = newColumn.row.reverse()[row];
			}
			if (newColumn.moved) moved = true;
		}
	}

	if (moved)	// If something moved, update the board
	{
		board = newBoard;
		addRandomTile();
		renderBoard();
		updateScore();

		if (checkWin())	// Check win/lose conditions
		{
			showGameMessage('You Win!');
		}
		else if (checkGameOver())
		{
			showGameMessage('Game Over!');
		}
	}
}

function slide(row)	// Slide and merge a single row/column
{
	let arr = row.filter(val => val !== 0);	// Remove zeros
	let moved = false;

	for (let i = 0; i < arr.length - 1; i++)	// Merge equal adjacent tiles
	{
		if (arr[i] === arr[i + 1])
		{
			arr[i] *= 2;		// Double the value
			score += arr[i];	// Add to score
			arr[i + 1] = 0;		// Mark as merged
			moved = true;
		}
	}

	arr = arr.filter(val => val !== 0);	// Remove zeros again after merging

	if (arr.length !== row.filter(val => val !== 0).length)	// Check if the row changed
	{
		moved = true;
	}

	while (arr.length < GRID_SIZE)	// Fill with zeros to maintain size 4
	{
		arr.push(0);
	}

	for (let i = 0; i < GRID_SIZE; i++)	// Check if the row actually changed
	{
		if (row[i] !== arr[i])
		{
			moved = true;
			break;
		}
	}

	return { row: arr, moved: moved };
}

//----------------------------------------------------------------------------------//

// WIN/LOSE CONDITIONS //

function checkWin()	// Check if player reached 2048
{
	for (let row = 0; row < GRID_SIZE; row++)
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			if (board[row][col] === 2048)
			{
				return (true);
			}
		}
	}
	return (false);
}

function checkGameOver()	// Check if no more moves are possible
{
	if (getEmptyCells().length > 0)	// Check if there are empty cells
	{
		return false;
	}

	for (let row = 0; row < GRID_SIZE; row++)	// Check if there are adjacent equal tiles (horizontal)
	{
		for (let col = 0; col < GRID_SIZE - 1; col++)
		{
			if (board[row][col] === board[row][col + 1])
			{
				return (false);
			}
		}
	}

	for (let col = 0; col < GRID_SIZE; col++)	// Check if there are adjacent equal tiles (vertical)
	{
		for (let row = 0; row < GRID_SIZE - 1; row++)
		{
			if (board[row][col] === board[row + 1][col])
			{
				return (false);
			}
		}
	}
	
	return (true);	// No moves available
}