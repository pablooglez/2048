# 🎮 2048 Game

A browser-based implementation of the classic 2048 puzzle game built with vanilla JavaScript, HTML, and CSS.

![2048 Game](https://img.shields.io/badge/Status-Complete-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)

## 📖 About

2048 is a sliding block puzzle game where the objective is to combine numbered tiles to create a tile with the number **2048**. This implementation was created as a learning project to practice DOM manipulation, game logic, and responsive design.

---

![Game Start](https://github.com/user-attachments/assets/7fff35f7-8f81-451d-a343-d6225f990d70)
*Screenshot of the 2048 game in action*

## 🎯 How to Play

1. Use the **arrow keys** on your keyboard to move tiles
2. When two tiles with the same number touch, they **merge into one**
3. The merged tile's value is the **sum** of the two tiles
4. Keep merging tiles to reach **2048** and win!
5. The game ends when the board is full and no more moves are possible

---

## ✨ Features

- 🎮 Classic 2048 gameplay mechanics
- 📱 Responsive design
- 💾 Best score persistence
- 🎨 Beautiful forest-themed UI
- ⌨️ Keyboard controls
- 🔄 Restart functionality

---

## 🚀 Installation

### Quick Start
1. Clone this repository or download the ZIP file
2. Open `index.html` in any modern web browser
3. Start playing!

**No server or build process required!**

---

## 📜 Game Rules

### Objective
Combine tiles with the same number until you create a tile with the value **2048**.

### Mechanics
- Each move slides all tiles in the chosen direction
- Tiles of the same value merge when they collide
- After each move, a new tile (2 or 4) appears in a random empty spot
- New tiles have a 90% chance of being a **2** and 10% chance of being a **4**

### Winning
- You win when you create a tile with the value **2048**

### Losing
- The game ends when the board is full and no adjacent tiles can be merged

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Structure and layout |
| **CSS3** | Styling and responsive design |
| **JavaScript (ES6)** | Game logic and DOM manipulation |
| **localStorage** | Persistent best score storage |

---

## 📂 Project Structure
```
2048-game/
│
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── game.js             # Game logic and functionality
└── README.md           # Project documentation
```
---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `⬆️ Arrow Up` | Move tiles up |
| `⬇️ Arrow Down` | Move tiles down |
| `⬅️ Arrow Left` | Move tiles left |
| `➡️ Arrow Right` | Move tiles right |
| `Restart Button` | Restart the game |

---

## 🧠 Algorithm Explanation

### Movement Logic

The core of the game is the `slide()` function, which:

1. **Filters zeros**: Removes empty spaces from the row/column
2. **Merges tiles**: Combines adjacent tiles with the same value
3. **Filters again**: Removes zeros created by merging
4. **Fills with zeros**: Pads the row/column back to length 4

### Directional Movement

- **Left/Right**: Directly processes rows
- **Up/Down**: Extracts columns, processes them as rows, then puts them back

---

**Enjoy the game! Can you reach 2048? 🎯**
