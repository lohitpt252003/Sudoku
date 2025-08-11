# Sudoku Game

This is a simple web-based Sudoku game with two difficulty levels: "I'm good at this" (Expert) and "I'm new to this" (Beginner).

## Features

- **Two Difficulty Levels:** Choose between a more challenging expert mode or a beginner-friendly mode.
- **Interactive Gameplay:** Click on cells to enter numbers.
- **Dark Mode Toggle:** Switch between light and dark themes for comfortable gameplay.
- **Game Controls (Beginner Mode):**
    - **Solve:** Reveals the solution to the current puzzle.
    - **Hint:** Provides a hint by filling in one correct number.
    - **Reset:** Clears all your entries and resets the puzzle to its initial state.
    - **New Game:** Generates a new Sudoku puzzle.
- **Game Controls (Expert Mode):**
    - **Solve:** Reveals the solution to the current puzzle.
    - **Hint:** Provides a hint by filling in one correct number.
    - **Undo:** Undoes the last move.
    - **Redo:** Redoes the last undone move.
    - **Reset:** Clears all your entries and resets the puzzle to its initial state.
    - **New Game:** Generates a new Sudoku puzzle.

## How to Play

Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9.

### Basic Rules:

- Each row must contain all digits from 1 to 9.
- Each column must contain all digits from 1 to 9.
- Each of the nine 3x3 subgrids must contain all digits from 1 to 9.
- No digit can be repeated in the same row, column, or 3x3 subgrid.

### Using This Sudoku Game:

1.  **Starting a New Game:** From the `index.html` page, choose your skill level ("I'm good at this" or "I'm new to this") to start a new Sudoku puzzle.
2.  **Selecting a Cell:** Click on an empty cell in the grid to select it.
3.  **Entering a Number:** Once a cell is selected, you can enter a number (1-9) using your keyboard.
4.  **Clearing a Cell:** To clear a number from a cell, select the cell and press the "Delete" or "Backspace" key.
5.  **Game Controls:** Use the buttons provided at the bottom of the game board for various actions like solving, getting hints, resetting, or starting a new game.
6.  **Dark Mode:** Click the toggle switch at the top of the page to switch between light and dark themes.

## Project Structure

- `index.html`: The main entry point, allowing users to choose difficulty.
- `good.html`: The expert mode Sudoku game interface.
- `new.html`: The beginner mode Sudoku game interface.
- `good.js`: JavaScript logic for the expert mode game.
- `new.js`: JavaScript logic for the beginner mode game.
- `style.css`: Contains the styling for all HTML pages.
- `how-to-use.html`: Explains how to play the Sudoku game.
- `how-to-use.txt`: A plain text version of the how-to-use guide.
- `README.md`: This file, providing an overview of the project.

## Technologies Used

This Sudoku game is primarily built using **HTML**, **CSS**, and **JavaScript**.

## How to Run Locally

1.  Clone this repository to your local machine.
2.  Navigate to the `Sudoku` directory.
3.  Open `index.html` in your web browser.

Enjoy playing Sudoku!