# 🎮 2048 Game

A browser-based implementation of the classic 2048 puzzle game built with vanilla JavaScript, HTML, and CSS.

![2048 Game](https://img.shields.io/badge/Status-Complete-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)

## 📋 Table of Contents

- [About](#about)
- [How to Play](#how-to-play)
- [Features](#features)
- [Installation](#installation)
- [Game Rules](#game-rules)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Controls](#controls)
- [Screenshots](#screenshots)

---

## 📖 About

2048 is a sliding block puzzle game where the objective is to combine numbered tiles to create a tile with the number **2048**. This implementation was created as a learning project to practice DOM manipulation, game logic, and responsive design.

---

## 🎯 How to Play

1. Use the **arrow keys** on your keyboard to move tiles
2. When two tiles with the same number touch, they **merge into one**
3. The merged tile's value is the **sum** of the two tiles
4. Keep merging tiles to reach **2048** and win!
5. The game ends when the board is full and no more moves are possible

---

## ✨ Features

- ✅ Smooth tile movement in all four directions
- ✅ Tile merging with score calculation
- ✅ Best score tracking (saved in browser localStorage)
- ✅ Win detection (reaching 2048)
- ✅ Game over detection (no moves available)
- ✅ Responsive design
- ✅ Clean and intuitive user interface
- ✅ New Game functionality

---

## 🚀 Installation

### Option 1: Clone the Repository
```bash
# Clone this repository
git clone <your-repository-url>

# Navigate to the project directory
cd 2048-game

# Open index.html in your browser
open index.html
```

### Option 2: Download ZIP

1. Download the project as a ZIP file
2. Extract the files
3. Open `index.html` in your web browser

### Option 3: Live Preview

Simply open the `index.html` file in any modern web browser:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

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

### Why Vanilla JavaScript?

This project intentionally uses **no frameworks or libraries** to demonstrate:
- Core JavaScript fundamentals
- DOM manipulation techniques
- Algorithm implementation
- Event handling
- State management

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

### File Descriptions

**index.html**
- Contains the game container structure
- Grid layout (4x4)
- Score display elements
- Game over modal

**styles.css**
- Grid and tile styling
- Color scheme for different tile values
- Responsive design rules
- Animations and transitions

**game.js**
- Game initialization
- Movement logic (up, down, left, right)
- Tile merging algorithm
- Score management
- Win/lose condition checking
- localStorage integration

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `⬆️ Arrow Up` | Move tiles up |
| `⬇️ Arrow Down` | Move tiles down |
| `⬅️ Arrow Left` | Move tiles left |
| `➡️ Arrow Right` | Move tiles right |
| `New Game Button` | Restart the game |

---

## 🖼️ Screenshots

### Game Start
The game begins with two random tiles (2 or 4) placed on the board.

### During Gameplay
Players combine tiles by moving them in any direction. When two tiles with the same number touch, they merge.

### Victory Screen
Appears when the player successfully creates a 2048 tile.

### Game Over
Displayed when no more moves are possible.

---

## 🎨 Color Scheme

Each tile value has a unique color:

- **2**: `#eee4da` (Light beige)
- **4**: `#ede0c8` (Tan)
- **8**: `#f2b179` (Orange)
- **16**: `#f59563` (Dark orange)
- **32**: `#f67c5f` (Red-orange)
- **64**: `#f65e3b` (Red)
- **128**: `#edcf72` (Yellow)
- **256**: `#edcc61` (Gold)
- **512**: `#edc850` (Bright gold)
- **1024**: `#edc53f` (Deep gold)
- **2048**: `#edc22e` (Winner gold)

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

## 🐛 Known Issues

- None currently! 🎉

---

## 🔮 Future Enhancements

Possible improvements for future versions:

- [ ] Smooth tile animations
- [ ] Touch controls for mobile devices
- [ ] Undo move functionality
- [ ] Different grid sizes (3x3, 5x5)
- [ ] Difficulty levels
- [ ] Sound effects
- [ ] Leaderboard system
- [ ] Save/load game state
- [ ] Dark mode toggle

---

## 📝 Development Notes

### Key Learning Points

1. **Matrix manipulation**: Working with 2D arrays for game state
2. **Event handling**: Keyboard input detection and prevention of default behavior
3. **DOM manipulation**: Dynamic creation and positioning of elements
4. **Algorithm design**: Implementing the slide-and-merge logic
5. **State management**: Tracking game state without a framework
6. **localStorage**: Persisting data between sessions

---

## 👨‍💻 Author

Created as a learning project to practice vanilla JavaScript game development.

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- Original 2048 game by Gabriele Cirulli
- Inspired by the classic puzzle game concept
- Built following web development best practices

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Game Rules](#game-rules) section
2. Verify your browser supports ES6 JavaScript
3. Ensure JavaScript is enabled in your browser
4. Try clearing your browser cache

---

**Enjoy the game! Can you reach 2048? 🎯**
