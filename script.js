let optionBox = document.getElementById("options");
let board = document.getElementById("board");
let grid, problem, solution, mistakes, input;

const questions = [
    "  3 2 6  9  3 5  1  18 64    81 29  7       8  67 82    26 95  8  2 3  9  5 1 3  ", 
"2   8 3   6  7  84 3 5  2 9   1 54 8         4 27 6   3 1  7 4 72  4  6   4 1   3", 
"      9 7   42 18    7 5 261  9 4    5     4    5 7  992 1 8    34 59   5 7      ", 
" 3  5  4   8 1 5  46     12 7 5 2 8    6 3    4 1 9 3 25     98  1 2 6   8  6  2 ", 
" 2 81 74 7    31   9   28 5  9 4  874  2 8  316  3 2  3 27   6   56    8 76 51 9 ", 
"1  92    524 1           7  5   81 2         4 27   9  6           3 945    71  6", 
" 43 8 25 6             1 949    4 7    6 8    1 2    382 5             5 34 9 71 ", 
"48   69 2  2  8  19  37  6 84  1 2    37 41    1 6  49 2  85  77  9  6  6 92   18", 
"   9    2 5 1234   3    16 9 8       7     9       2 5 91    5   7439 2 4    7   ", 
"  19    39  7  16  3   5  7 5      9  43 26  2      7 6  1   3  42  7  65    68  ", 
"   1254    84     42 8      3     95 6 9 2 1 51     6      3 49     72    1298   ", 
" 6234 75 1    56  57     4     948  4       6  583     3     91  64    7 59 8326 ", 
"3          5  9   2  5 4    2    7  16     587 431 6     89 1      67 8      5437", 
"63          5    8  5674       2      34 1 2       345     7  4 8 3  9 29471   8 ", 
"    2  4   8 35       7 6 2 31 4697 2           5 12 3 49   73        1 8    4   ", 
"361 259   8 96  1 4      57  8   471   6 3   259   8  74      5 2  18 6   547 329", 
" 5 8 7 2 6   1  9 7 254   6 7  2 3 15 4   9 81 3 8  7 9   762 5 6  9   3 8 1 3 4 ", 
" 8   5        3457    7 8 9 6 4  9 3  7 1 5  4 8  7 2 9 1 2    8423        1   8 ", 
"  35 29      4    1 6   3 59  251  8 7 4 8 3 8  763  13 8   1 4    2      51 48  ", 
"           98 51   519 742 29 4 1 65         14 5 8 93 267 958   51 36           ", 
" 2  3  9    9 7   9  2 8  5  48 65  6 7   2 8  31 29  8  6 5  7   3 9    3  2  5 ", 
"  5     6 7   9 2    5  1 78 415       8 3       928 59 7  6    3 4   1 2     6  ", 
" 4     5   19436    9   3  6   5   21 3   5 68   2   7  5   2    24367   3     4 ", 
"  4          3   239 7   8 4    9  12 98 13 76  2    8 1   8 539   4          8  ", 
"36  2  89   361            8 3   6 24  6 3  76 7   1 8            418   97  3  14"
]; 

function createOptions() {
    for (let i = 0; i < 9; i++){
        let element = document.createElement("div");
        element.classList.add("option");
        element.innerText = i + 1;
        optionBox.append(element);
    }
}

function createGrrid() {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let element = document.createElement("div");
            element.id = `${i}-${j}`;
            element.classList.add("tile");
            board.append(element);
        }
    }
}

createOptions();
createGrrid();

function load() {
    mistakes = 0;
    let ind = Math.floor(questions.length * Math.random());
    problem = questions[ind];
    grid = [];
    solution = [];
}

load();

let buttons = document.getElementsByClassName("tile");
function fillGrid() {
    for (let i = 0; i < 9; i++){
        grid.push([]);
        solution.push([]);
        for (let j = 0; j < 9; j++){
            buttons[9 * i + j].innerText = problem[9 * i + j];
            grid[i][j] = problem[9 * i + j] == ' ' ? 0 : parseInt(problem[9 * i + j]);
            solution[i][j] = grid[i][j];
        }
    }
    solveSudoku(solution);
    let s = "";
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            s += solution[i][j];
        }
    }

    solution = s;
}

fillGrid();

function highlightSameNumbers(button) {
    for (let a of buttons){
        if (a.innerText == button.innerText){
            a.classList.add("highlight");
        }
    }
}

function deHighlightGrid() {
    for (let a of buttons){
            a.classList.remove("highlight");
    }
}

function deHighlightOptions() {
    for (let a of options){
        a.classList.remove("highlight");
    }
}

let options = document.getElementsByClassName("option");
function highlightRequiredOptions(button) {
    deHighlightOptions();
    let row = parseInt(button.id[0]);
    let col = parseInt(button.id[2]);
    for (let i = 0; i < 9; i++) {
        if (isValid(grid, row, col, i + 1)) {
            options[i].classList.add("highlight");
        }
    }
}

function highlightRowColBox(buton) {
    let row = parseInt(buton.id[0]);
    let col = parseInt(buton.id[2]);
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++){
        document.getElementById(`${i}-${col}`).classList.add("highlight");
        document.getElementById(`${row}-${i}`).classList.add("highlight");
        document.getElementById(`${startRow + Math.floor(i / 3)}-${startCol + (i % 3)}`).classList.add("highlight");
    }
}

for (let button of buttons){
    button.addEventListener("click", () =>{
        deHighlightCurCell();
        deHighlightGrid();
        deHighlightOptions();
        let curNum = parseInt(button.innerText);
        if (isNaN(curNum)){
            highlightCurCell(button);
        }
        if (isNaN(curNum)){
            highlightRequiredOptions(button);
            highlightRowColBox(button);
            input = button;
        }
        else{
            highlightSameNumbers(button);
        }
    });
}

for (let option of options){
    option.addEventListener("click", () =>{
        if (input == null){
            return;
        }
        if (!isNaN(parseInt(input.innerText))){
            return;
        }
        let row = parseInt(input.id[0]);
        let col = parseInt(input.id[2]);

        if (option.innerText != solution[9 * row + col]){
            mistakes++;
            updateMistakes();
            if (mistakes == 4){
                let userInput = 0;
                while(userInput != 1 && userInput != 2){
                    userInput = parseInt(prompt(`Since you have made 4 errors\nPress "1" for continuing the same game and "2" for a new game`));
                }
                if (userInput == 1){
                    resetGame();
                }
                else{
                    newGame();
                }
            }
        }
        else{
            input.innerText = option.innerText;
            grid[row][col] = parseInt(option.innerText);
        }

        whetherCompleted();
    })
}

function whetherCompleted() {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (grid[i][j] == 0){
                return;
            }
        }
    }

    alert("Congratulations!\n You have completed the game");
    alert("Please click on New Game to play a new game");
}

function updateMistakes() {
    document.getElementById("chances").innerText = `Mistakes: ${mistakes}/3`;
}


// // solving the sudoku
function solveSudoku(board) {
    if (solve(board)) {
        return board;
    } else {
        return "No solution exists.";
    }
}

function solve(board) {
    let emptySpot = findEmptySpot(board);
    if (!emptySpot) {
        return true;
    }

    let [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (solve(board)) {
                return true;
            }

            board[row][col] = 0; // Undo the current cell for backtracking
        }
    }

    return false;
}

function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetGame);

let newGameBtn = document.getElementById("newGame");
newGameBtn.addEventListener("click", newGame);

function resetGame() {
    deHighlightGrid();
    deHighlightOptions();
    grid = [];
    solution = [];
    fillGrid();
    mistakes = 0;
    updateMistakes();
    deHighlightCurCell();
}

function newGame() {
    deHighlightGrid();
    deHighlightOptions();
    load();
    fillGrid();
    updateMistakes();
    deHighlightCurCell();
}

function highlightCurCell(button){
    button.classList.add("highlightCurCell");
}

function deHighlightCurCell() {
    for (let button of buttons){
        button.classList.remove("highlightCurCell");
    }
}
