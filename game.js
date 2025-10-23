// GLOBAL VARIABLES //

// Matrix of the Game (4x4) //
let board = [];

// Current score //
let score = 0;

// Best Score //
let bestScore = 0;

// Board size //
const GRID_SIZE = 4;

// GLOBAL VARIABLES FOR ANIMATIONS //
let isAnimating = false;

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
	if (isAnimating) return; // Prevent moves during animation
	
	if (event.key == 'ArrowUp')
	{
		event.preventDefault();
		move('up');
	}
	else if (event.key == 'ArrowDown')
	{
		event.preventDefault();
		move('down');
	}
	else if (event.key == 'ArrowLeft')
	{
		event.preventDefault();
		move('left');
	}
	else if (event.key == 'ArrowRight')
	{
		event.preventDefault();
		move('right');
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
	bestScoreDisplay.textContent = bestScore;
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

function createTileElement(value, row, col, animationType = '')	// Create a tile element visually
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

	if (animationType === 'new')	// Animation for new tiles
	{
		tile.classList.add('tile-new');
	}
	else if (animationType === 'merged')	// Animation for merged tiles
	{
		tile.classList.add('tile-merged');
	}
	
	// Add to container
	tileContainer.appendChild(tile);
	return (tile);
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

// Animated board rendering
function renderBoardAnimated(previousBoard, mergedCells)
{
	isAnimating = true;
	
	// Clear container
	tileContainer.innerHTML = '';
	
	// Track all tiles that need to be animated
	const tilesToAnimate = [];
	
	// Create tiles from previous positions
	for (let row = 0; row < GRID_SIZE; row++)
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			if (previousBoard[row][col] !== 0)
			{
				const tile = createTileElement(previousBoard[row][col], row, col);
				tilesToAnimate.push({
					element: tile,
					fromRow: row,
					fromCol: col,
					value: previousBoard[row][col]
				});
			}
		}
	}
	
	// Force browser to calculate initial positions
	tileContainer.offsetHeight;
	
	// Animate tiles to new positions
	setTimeout(() => {
		// Clear for final rendering
		tileContainer.innerHTML = '';
		
		// Render final board state
		for (let row = 0; row < GRID_SIZE; row++)
		{
			for (let col = 0; col < GRID_SIZE; col++)
			{
				const value = board[row][col];
				if (value !== 0)
				{
					// Check if this position had a merge
					const wasMerged = mergedCells.some(cell => 
						cell.row === row && cell.col === col
					);
					createTileElement(value, row, col, wasMerged ? 'merged' : '');
				}
			}
		}
		
		// Add new random tile after animation
		setTimeout(() => {
			const emptyCells = getEmptyCells();
			if (emptyCells.length > 0)
			{
				const randomIndex = Math.floor(Math.random() * emptyCells.length);
				const {row, col} = emptyCells[randomIndex];
				const value = Math.random() < 0.9 ? 2 : 4;
				board[row][col] = value;
				createTileElement(value, row, col, 'new');
			}
			
			// Check win/lose after everything
			setTimeout(() => {
				if (checkWin())
				{
					showGameMessage('You Win!');
				}
				else if (checkGameOver())
				{
					showGameMessage('Game Over!');
				}
				isAnimating = false;
			}, 200);
		}, 150);
	}, 10);
}

//----------------------------------------------------------------------------------//

// MOVEMENT LOGIC //

function move(direction)	// Main function to handle movement
{
	if (isAnimating) return;

	const previousBoard = JSON.parse(JSON.stringify(board));
	const mergedCells = [];
	let moved = false;
	
	if (direction === 'left')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			const result = slide(board[row]);
			board[row] = result.row;
			if (result.moved) moved = true;
			// Track merges
			result.mergedIndices.forEach(index => {
				mergedCells.push({row: row, col: index});
			});
		}
	}
	else if (direction === 'right')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			const reversedRow = board[row].slice().reverse();
			const result = slide(reversedRow);
			board[row] = result.row.reverse();
			if (result.moved) moved = true;
			// Track merges (account for reversal)
			result.mergedIndices.forEach(index => {
				mergedCells.push({row: row, col: GRID_SIZE - 1 - index});
			});
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
			const result = slide(column);
			for (let row = 0; row < GRID_SIZE; row++)
			{
				board[row][col] = result.row[row];
			}
			if (result.moved) moved = true;
			// Track merges
			result.mergedIndices.forEach(index => {
				mergedCells.push({row: index, col: col});
			});
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
			const reversedColumn = column.slice().reverse();
			const result = slide(reversedColumn);
			const finalColumn = result.row.reverse();
			for (let row = 0; row < GRID_SIZE; row++)
			{
				board[row][col] = finalColumn[row];
			}
			if (result.moved) moved = true;
			// Track merges (account for reversal)
			result.mergedIndices.forEach(index => {
				mergedCells.push({row: GRID_SIZE - 1 - index, col: col});
			});
		}
	}

	if (moved)	// If something moved, update the board
	{
		updateScore();
		renderBoardAnimated(previousBoard, mergedCells);
	}
}

function slide(row)	// Slide and merge a single row/column
{
	// Remove all zeros first
	let arr = row.filter(val => val !== 0);
	let moved = false;
	const mergedIndices = [];
	
	// Check if filtering changed anything
	if (arr.length !== row.filter(val => val !== 0).length)
	{
		moved = true;
	}

	// Merge adjacent equal tiles
	for (let i = 0; i < arr.length - 1; i++)
	{
		if (arr[i] === arr[i + 1])
		{
			arr[i] *= 2;		// Double the value
			score += arr[i];	// Add to score
			arr.splice(i + 1, 1);	// Remove the merged tile
			mergedIndices.push(i);	// Track where merge happened
			moved = true;
		}
	}

	// Pad with zeros to maintain size
	while (arr.length < GRID_SIZE)
	{
		arr.push(0);
	}

	// Check if the row actually changed
	for (let i = 0; i < GRID_SIZE; i++)
	{
		if (row[i] !== arr[i])
		{
			moved = true;
			break;
		}
	}

	return { row: arr, moved: moved, mergedIndices: mergedIndices };
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