let boxes = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('#resetBtn');
let winlose = document.querySelector('.winlose');
let newBtn = document.querySelector('#newBtn');
let oScore = document.querySelector('.OScore');
let xScore = document.querySelector('.XScore');
let turns = document.querySelector('.turn');
let canvas = document.querySelector('#confetti');


// Declared variables for O's and X's turn
let turn0 = true;
// Declared variable for showing score after wins
let oScore1 = 0; 
let xScore1 = 0;

// Winning pattrens or possiblities
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4 ,6],
    [3, 4, 5],
    [6, 7, 8],
];

// After click buttons O and X display with their style
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "O";
            box.style.color = "red";
            box.classList.add("glowturns-animation");
            turn0 = false;
            turns.innerText = "X's Turn"; 
            turns.style.color = "Purple";

        }
        else{
            box.innerText = "X";
            box.style.color = "Purple";
            box.classList.add("glowturns-animation");
            turn0 = true;
            turns.innerText = "O's Turn";
            turns.style.color = "red";

        }
        box.disabled = true;
        checkWinnerOrDraw();
        
    });
    
});

// Checks the draw condition
const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; 
        }
    }
    return true; 
};


// Shows Winner and celebrate by Confetti() as well as update score
const showWinner = (winner) => {
    winlose.innerText = `Congratulations Winner is ${winner} Player !!`;
    winlose.classList.add("glow-animation");
    turns.innerText = "";
    
    for(let box of boxes){
        box.disabled = true;
    } 
    
    updateScores(winner); 
    jsConfetti.addConfetti({}).then(() => jsConfetti.addConfetti())
    .then(() => jsConfetti.addConfetti());
       
}

// After winning update and show the score of O's and X's
const updateScores = (winner) => {
    if (winner === 'O') {
        oScore1++;
        oScore.innerText = `O's Score: ${oScore1}`;
    } else {
        xScore1++;
        xScore.innerText = `X's Score: ${xScore1}`;
    }
};

// After clicking reset button disabled all buttons and remove the entry of O's and X's
const reset = () =>{
    turn0 = true;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    winlose.innerText = "";
    turns.innerText = "";
    
}

// After click new button new game starts with 0 score
const newGame = () => {
    turn0 = true;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    winlose.innerText = "";
    oScore.innerText = "";
    xScore.innerText = "";
    turns.innerText = "";
    oScore1 = 0;
    xScore1 = 0;
}

// Checks the winning condition
const ckeckWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2  != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);               
            }            
        }
    }
};

// Checks the win or draw game
const checkWinnerOrDraw = () => {
    if (checkDraw()) {
        winlose.innerText = "It's a draw! Try Again!!";
        winlose.classList.add("glow-animation");
        turns.innerText = "";
        for (let box of boxes) {
            box.disabled = true; 
        }
    } 
    else {
        ckeckWinner(); 
    }
};

// Animation of celebrate
const jsConfetti = new JSConfetti();

// EventListener of new game and reset game buttons
resetBtn.addEventListener('click', reset);
newBtn.addEventListener('click', newGame);