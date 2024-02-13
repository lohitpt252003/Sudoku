let board = document.getElementById("board");
let options = document.querySelector("#options");
let grid, problem, solution;
let mistakes;

const questions = [
    "003020600900305001001806400008102900700000008006708200002609500800203009005010300", 
"200080300060070084030500209000105408000000000402706000301007040720040060004010003", 
"000000907000420180000705026100904000050000040000507009920108000034059000507000000", 
"030050040008010500460000012070502080000603000040109030250000098001020600080060020", 
"020810740700003100090002805009040087400208003160030200302700060005600008076051090", 
"100920000524010000000000070050008102000000000402700090060000000000030945000071006", 
"043080250600000000000001094900004070000608000010200003820500000000000005034090710", 
"480006902002008001900370060840010200003704100001060049020085007700900600609200018", 
"000900002050123400030000160908000000070000090000000205091000050007439020400007000", 
"001900003900700160030005007050000009004302600200000070600100030042007006500006800", 
"000125400008400000420800000030000095060902010510000060000003049000007200001298000", 
"062340750100005600570000040000094800400000006005830000030000091006400007059083260", 
"300000000005009000200504000020000700160000058704310600000890100000067080000005437", 
"630000000000500008005674000000020000003401020000000345000007004080300902947100080", 
"000020040008035000000070602031046970200000000000501203049000730000000010800004000", 
"361025900080960010400000057008000471000603000259000800740000005020018060005470329", 
"050807020600010090702540006070020301504000908103080070900076205060090003080103040", 
"080005000000003457000070809060400903007010500408007020901020000842300000000100080", 
"003502900000040000106000305900251008070408030800763001308000104000020000005104800", 
"000000000009805100051907420290401065000000000140508093026709580005103600000000000", 
"020030090000907000900208005004806500607000208003102900800605007000309000030020050", 
"005000006070009020000500107804150000000803000000092805907006000030400010200000600", 
"040000050001943600009000300600050002103000506800020007005000200002436700030000040", 
"004000000000030002390700080400009001209801307600200008010008053900040000000000800", 
"360020089000361000000000000803000602400603007607000108000000000000418000970030014"
]; 

let input;

// create 9 X 9 board
function setGame(){
    mistakes = 0;
    grid = [[], [], [], [], [], [], [], [], []];
    let ind = Math.floor(questions.length * Math.random());
    problem = questions[ind];
    let ans = [];
    for (let i = 0, counter = 0; i < 9; i++)    {
        let element = document.createElement("div");
        element.classList.add("tile");
        element.innerText = i + 1;
        element.classList.add("opt");
        options.append(element);
        ans.push([]);
        for (let j = 0; j < 9; j++)        {
            let element = document.createElement("div");
            element.classList.add("tile");
            element.classList.add("boxes")
            element.id = `${i}-${j}`;
            element.innerText = problem[counter];
            board.append(element);
            ans[i][j] = parseInt(problem[counter]);
            grid[i][j] = parseInt(problem[counter++]);
        }
    }
    ans = solveSudoku(ans);
    if (ans === "No solution exists."){
        setGame();
        return;
    }
    solution = "";
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            solution += ans[i][j].toString();
        }
    }
}

setGame();

// grid butons
let buttons = document.querySelectorAll(".boxes");
for (let button of buttons){
    button.addEventListener("click", () =>{
        if (button.innerText == '0'){
            input = button;
            highlightRowColBox(button.id);
        }
        else{
            highlightSameNumbers(button.innerText);
        }

        checkGame();
    })
}

// options
options = document.querySelectorAll(".opt");
for (let option of options){
    option.addEventListener("click", () =>{
        let n = (input.id[0] - '0') * 9 + (input.id[2] - '0');
        if (option.innerText != solution[n]){
            if (input.innerText == '0'){
                mistakes++;
                updateMistake(mistakes);
            }
            if(mistakes == 4){
                let q = prompt("You have made 4 mistakes\nSo please type 1 if u would like go with the same game or 2 if you want a new game");
                while (parseInt(q) != 1 && parseInt(q) != 2){
                    q = prompt("You have made 4 mistakes\nSo please type 1 if u would like go with the same game or 2 if you want a new game");
                }
                if (parseInt(q) == 1){
                    resetGame();
                }
                else{
                    newGame();
                }
                updateMistake(0);
                mistakes = 0;
            }
        }
        else{
            input.innerText = option.innerText;
            grid[(input.id[0] - '0')][(input.id[2] - '0')] = parseInt(option.innerText);
        }
    })
}


function highlightRowColBox(str) {
    let row = parseInt(str[0]), col = parseInt(str[2]);
    // removing the previous hightlights
    for (let i = 0; i < 9; i++)    {
        options[i].classList.remove("highlight");
        for (let j = 0; j < 9; j++)        {
            let str = "";
            str += i;
            str += '-';
            str += j;
            document.getElementById(str).classList.remove("highlight");    
        }
    }
    // highlighting the options
    for (let i = 1; i < 10; i++)    {
        if (f(row, col, i) === true)
            options[i - 1].classList.add("highlight");
    }
    // highlight the row, column and 3 X 3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++)    {
        let str = "";
        str += row;
        str += '-';
        str += i;
        document.getElementById(str).classList.add("highlight");
        str = "";
        str += i;
        str += '-';
        str += col;
        document.getElementById(str).classList.add("highlight");
        str = "";
        str += startRow + Math.floor(i / 3);
        str += '-';
        str += startCol + (i % 3);
        document.getElementById(str).classList.add("highlight");
    }
}

function f(row, col, num){
    for (let i = 0; i < 9; i++) 
        if (grid[row][i] === num)
            return false;

    // Check column
    for (let i = 0; i < 9; i++)
        if (grid[i][col] === num)
            return false;

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) 
        for (let j = 0; j < 3; j++)
            if (grid[startRow + i][startCol + j] === num)
                return false;
    return true;
}

function checkGame() {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (grid[i][j] == '0')
                return;
        }
    }

    alert("Congratulations!\nYou have successfully completed the game");

}

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetGame)

function resetGame() {
    deHighlightOptions();
    deHighlightgrid();
    resetGrid();
    updateMistake(0);
    mistakes = 0;
}

function updateMistake(mistakes) {
    document.getElementById("chances").innerText = `Mistakes: ${mistakes}/3`;
}

function deHighlightgrid() {
    for (let buton of buttons){
        buton.classList.remove("highlight");
    }
}

function deHighlightOptions() {
    for (let option of options){
        option.classList.remove("highlight");
    }    
}

function resetGrid() {
    for (let i = 0, counter = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            let id = `${i}-${j}`;
            let element = document.getElementById(id);
            element.innerText = problem[counter];
            grid[i][j] = parseInt(problem[counter++]);
        }
    }
}

function highlightSameNumbers(str){
    deHighlightgrid();
    deHighlightOptions();
    for (let button of buttons){
        if (button.innerText === str){
            button.classList.add("highlight");
        }
    }
}

let newGameBtn = document.getElementById("newGame");
newGameBtn.addEventListener("click", newGame);

function newGame() {
    deHighlightgrid();
    deHighlightOptions();
    updateMistake(0);
    mistakes = 0;
    grid = [[], [], [], [], [], [], [], [], []];
    let ind = Math.floor(questions.length * Math.random());
    problem = questions[ind];
    let ans = [];
    for (let i = 0, counter = 0; i < 9; i++)
    {
        ans.push([]);
        for (let j = 0; j < 9; j++)
        {
            
            let id = `${i}-${j}`;
            let element = document.getElementById(id);
            element.innerText = problem[counter];
            ans[i][j] = parseInt(problem[counter]);
            grid[i][j] = parseInt(problem[counter++]);
        }
    }
    ans = solveSudoku(ans);
    if (ans === "No solution exists."){
        newGame();
        return;
    }
    solution = "";
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            solution += ans[i][j].toString();
        }
    }
}


// solving the sudoku
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

