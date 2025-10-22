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

	addRandomTile(false);	// Add 2 starting tokens without animation
	addRandomTile(false);

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

function addRandomTile(animate = true)	// Add a random tile (2 or 4) to an empty cell
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

	// Create the tile with appearance animation
	createTileElement(value, row, col, animate ? 'new' : '');

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
				createTileElement(value, row, col, '');
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

// Render board with animations
function renderBoardAnimated(movements, mergedCells) {
	isAnimating = true;
	
	// Clear all tiles
	tileContainer.innerHTML = '';
	
	// Create tiles for animation
	movements.forEach(move => {
		if (move.fromValue !== 0) {
			const tile = document.createElement('div');
			tile.classList.add('tile', `tile-${move.fromValue}`);
			tile.textContent = move.fromValue;
			
			// Start position
			const fromPos = getTilePosition(move.fromRow, move.fromCol);
			tile.style.left = fromPos.x + 'px';
			tile.style.top = fromPos.y + 'px';
			
			tileContainer.appendChild(tile);
			
			// Force browser to calculate position before animating
			tile.offsetHeight;
			
			// Animate to end position
			const toPos = getTilePosition(move.toRow, move.toCol);
			tile.style.left = toPos.x + 'px';
			tile.style.top = toPos.y + 'px';
		}
	});
	
	// After movement animation, show merged tiles
	setTimeout(() => {
		tileContainer.innerHTML = '';
		
		// Render final board state
		for (let row = 0; row < GRID_SIZE; row++) {
			for (let col = 0; col < GRID_SIZE; col++) {
				const value = board[row][col];
				if (value !== 0) {
					// Check if this position had a merge
					const wasMerged = mergedCells.some(cell => 
						cell.row === row && cell.col === col
					);
					createTileElement(value, row, col, wasMerged ? 'merged' : '');
				}
			}
		}
		
		isAnimating = false;
	}, 150);
}

//----------------------------------------------------------------------------------//

// MOVEMENT LOGIC //

function move(direction)	// Main function to handle movement
{
	if (isAnimating) return;

	const previousBoard = JSON.parse(JSON.stringify(board));
	let moved = false;
	let movements = [];
	let mergedCells = [];
	
	if (direction === 'left')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			const result = slideRow(row, 'left');
			if (result.moved) {
				moved = true;
				movements = movements.concat(result.movements);
				mergedCells = mergedCells.concat(result.mergedCells);
			}
		}
	}
	else if (direction === 'right')
	{
		for (let row = 0; row < GRID_SIZE; row++)
		{
			const result = slideRow(row, 'right');
			if (result.moved) {
				moved = true;
				movements = movements.concat(result.movements);
				mergedCells = mergedCells.concat(result.mergedCells);
			}
		}
	}
	else if (direction === 'up')
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			const result = slideColumn(col, 'up');
			if (result.moved) {
				moved = true;
				movements = movements.concat(result.movements);
				mergedCells = mergedCells.concat(result.mergedCells);
			}
		}
	}
	else if (direction === 'down')
	{
		for (let col = 0; col < GRID_SIZE; col++)
		{
			const result = slideColumn(col, 'down');
			if (result.moved) {
				moved = true;
				movements = movements.concat(result.movements);
				mergedCells = mergedCells.concat(result.mergedCells);
			}
		}
	}

	if (moved)	// If something moved, update the board
	{
		updateScore();
		
		// Animate the movement
		renderBoardAnimated(movements, mergedCells);
		
		// Add new tile after animation
		setTimeout(() =>
		{
			addRandomTile(true);

			// Check win/lose conditions
			setTimeout(() => {
				if (checkWin())
				{
					showGameMessage('You Win!');
				}
				else if (checkGameOver())
				{
					showGameMessage('Game Over!');
				}
			}, 200);
		}, 200);
	}
}

// Slide a row left or right
function slideRow(row, direction) {
	const movements = [];
	const mergedCells = [];
	const oldRow = [...board[row]];
	let newRow = [];
	let moved = false;
	
	if (direction === 'left') {
		// Compact to the left
		let writePos = 0;
		for (let readPos = 0; readPos < GRID_SIZE; readPos++) {
			if (oldRow[readPos] !== 0) {
				// Check if can merge with previous
				if (writePos > 0 && newRow[writePos - 1] === oldRow[readPos] && 
					!mergedCells.some(c => c.row === row && c.col === writePos - 1)) {
					// Merge
					newRow[writePos - 1] *= 2;
					score += newRow[writePos - 1];
					mergedCells.push({row, col: writePos - 1});
					movements.push({
						fromRow: row, fromCol: readPos,
						toRow: row, toCol: writePos - 1,
						fromValue: oldRow[readPos]
					});
					moved = true;
				} else {
					// Move to writePos
					newRow[writePos] = oldRow[readPos];
					if (readPos !== writePos) {
						movements.push({
							fromRow: row, fromCol: readPos,
							toRow: row, toCol: writePos,
							fromValue: oldRow[readPos]
						});
						moved = true;
					}
					writePos++;
				}
			}
		}
		// Fill rest with zeros
		while (newRow.length < GRID_SIZE) {
			newRow.push(0);
		}
	} else { // right
		// Compact to the right
		let writePos = GRID_SIZE - 1;
		for (let readPos = GRID_SIZE - 1; readPos >= 0; readPos--) {
			if (oldRow[readPos] !== 0) {
				// Check if can merge with previous
				if (writePos < GRID_SIZE - 1 && newRow[writePos + 1] === oldRow[readPos] && 
					!mergedCells.some(c => c.row === row && c.col === writePos + 1)) {
					// Merge
					newRow[writePos + 1] *= 2;
					score += newRow[writePos + 1];
					mergedCells.push({row, col: writePos + 1});
					movements.push({
						fromRow: row, fromCol: readPos,
						toRow: row, toCol: writePos + 1,
						fromValue: oldRow[readPos]
					});
					moved = true;
				} else {
					// Move to writePos
					newRow[writePos] = oldRow[readPos];
					if (readPos !== writePos) {
						movements.push({
							fromRow: row, fromCol: readPos,
							toRow: row, toCol: writePos,
							fromValue: oldRow[readPos]
						});
						moved = true;
					}
					writePos--;
				}
			}
		}
		// Fill rest with zeros
		while (newRow.length < GRID_SIZE) {
			newRow.unshift(0);
		}
	}
	
	board[row] = newRow;
	return {moved, movements, mergedCells};
}

// Slide a column up or down
function slideColumn(col, direction) {
	const movements = [];
	const mergedCells = [];
	const oldCol = [];
	for (let row = 0; row < GRID_SIZE; row++) {
		oldCol.push(board[row][col]);
	}
	let newCol = [];
	let moved = false;
	
	if (direction === 'up') {
		// Compact upward
		let writePos = 0;
		for (let readPos = 0; readPos < GRID_SIZE; readPos++) {
			if (oldCol[readPos] !== 0) {
				// Check if can merge with previous
				if (writePos > 0 && newCol[writePos - 1] === oldCol[readPos] && 
					!mergedCells.some(c => c.row === writePos - 1 && c.col === col)) {
					// Merge
					newCol[writePos - 1] *= 2;
					score += newCol[writePos - 1];
					mergedCells.push({row: writePos - 1, col});
					movements.push({
						fromRow: readPos, fromCol: col,
						toRow: writePos - 1, toCol: col,
						fromValue: oldCol[readPos]
					});
					moved = true;
				} else {
					// Move to writePos
					newCol[writePos] = oldCol[readPos];
					if (readPos !== writePos) {
						movements.push({
							fromRow: readPos, fromCol: col,
							toRow: writePos, toCol: col,
							fromValue: oldCol[readPos]
						});
						moved = true;
					}
					writePos++;
				}
			}
		}
		// Fill rest with zeros
		while (newCol.length < GRID_SIZE) {
			newCol.push(0);
		}
	} else { // down
		// Compact downward
		let writePos = GRID_SIZE - 1;
		for (let readPos = GRID_SIZE - 1; readPos >= 0; readPos--) {
			if (oldCol[readPos] !== 0) {
				// Check if can merge with previous
				if (writePos < GRID_SIZE - 1 && newCol[writePos + 1] === oldCol[readPos] && 
					!mergedCells.some(c => c.row === writePos + 1 && c.col === col)) {
					// Merge
					newCol[writePos + 1] *= 2;
					score += newCol[writePos + 1];
					mergedCells.push({row: writePos + 1, col});
					movements.push({
						fromRow: readPos, fromCol: col,
						toRow: writePos + 1, toCol: col,
						fromValue: oldCol[readPos]
					});
					moved = true;
				} else {
					// Move to writePos
					newCol[writePos] = oldCol[readPos];
					if (readPos !== writePos) {
						movements.push({
							fromRow: readPos, fromCol: col,
							toRow: writePos, toCol: col,
							fromValue: oldCol[readPos]
						});
						moved = true;
					}
					writePos--;
				}
			}
		}
		// Fill rest with zeros
		while (newCol.length < GRID_SIZE) {
			newCol.unshift(0);
		}
	}
	
	// Update board column
	for (let row = 0; row < GRID_SIZE; row++) {
		board[row][col] = newCol[row];
	}
	
	return {moved, movements, mergedCells};
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