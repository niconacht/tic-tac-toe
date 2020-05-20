'use strict';

//Playerfactory
function newPlayer (type, active,isHuman) {
    return {
        type,
        active,
        isHuman
    }
};

//Display Module
const displayController = (function(){
   
   function setColor(target, activeplayer, player1, player2, id1, id2, class1, class2) {

        if (activeplayer === player1) {
            document.getElementById(id1).classList.remove(class1);
            document.getElementById(id2).classList.add(class2);
            
            target.classList.add(class1);
        }

        if(activeplayer === player2) {
            document.getElementById(id2).classList.remove(class2);
            document.getElementById(id1).classList.add(class1);
            
            target.classList.add(class2);      
        }
    }

    
    function showSettings(){
        document.querySelector("main").classList.add("hidden");
        document.getElementById("settings-card").classList.remove("hidden");

    }

    function hideSettings(){
        document.querySelector("main").classList.remove("hidden");
        document.getElementById("settings-card").classList.add("hidden");
    }

    const saveSettings = function (e) {
        e.preventDefault();
        
            const nameChange = Array.from(document.getElementsByClassName("name-input"));
            if(nameChange[0].value) {
                   document.getElementById("player1").textContent = nameChange[0].value;
                }

            if(nameChange[1].value) {
                    document.getElementById("player2").textContent = nameChange[1].value;
            }        
            hideSettings();
                           
    }

    const clearForm= function(e){
        e.preventDefault();
        document.getElementById("settings-form").reset();
    }

    function playAgainstHuman(e) {
        e.preventDefault();
        e.target.textContent= "You play against a friend";
       document.getElementById("playAi").textContent ="Play against Computer?";     
    }

    function playAgainstComputer(e) {
        e.preventDefault();
        e.target.textContent ="You play against Computer";
        document.getElementById("playHuman").textContent = "Play against Human?";
        document.getElementById("name2").value = "Computer";
        playGame.player2.isHuman = false;

    }


    function showResult(winner) {
        const name1 =  document.getElementById("player1").textContent;
        const name2 = document.getElementById("player2").textContent;
        document.querySelector("main").classList.add("hidden");
        const resultCard = document.getElementById("result-card")
        resultCard.classList.remove("hidden");
        const result = document.createElement("p");
        result.classList.add("result");
        if (winner === playGame.player1){
            result.textContent = `${name1} has won!`;
        }
        else if(winner == playGame.player2){
            result.textContent = `${name2} has won!`;

        }
        else {
            result.textContent = "It's a tie"
        }
        resultCard.appendChild(result);
    }

    return {
        setColor,
        showSettings,
        saveSettings, 
        clearForm,
        playAgainstHuman,
        playAgainstComputer,
        showResult      

    }
})();


//Game_logic Module
const playGame = (function(e) {

    let gameProgress = []; 
    const player1 = newPlayer("X", true, true);
    const player2 = newPlayer("O", false, true);
    let activePlayer = player1;
    const symbol1 = player1.type;
    const symbol2 = player2.type;
    const cells = Array.from(document.getElementsByClassName("cell"));
    
    const winningConditions = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"]
    ];

   // if field is empty, player can place her symbol, store choice in array, change turn
   const makeHumanMove = function() {
        const gameBoard = document.getElementById("gameboard");
        gameBoard.addEventListener("click", function(e) {
            if (e.target.textContent === ""){
                displayController.setColor(e.target, activePlayer, player1, player2, "player1", "player2", "styling1", "styling2");
                e.target.textContent = activePlayer.type;
                gameProgress.push([activePlayer.type, e.target.id]);
                evalWinner();
                changePlayer(player1, player2);
                
            }
        })
    }

    function makeComputerMove() {
      
        const cellsToChoose = playGame.cells.filter(playGame.isEmpty);
        const computerChoice = cellsToChoose[Math.floor(Math.random() * cellsToChoose.length)];
        displayController.setColor(computerChoice, activePlayer, player1, player2, "player1", "player2", "styling1", "styling2");
        computerChoice.textContent = "O";
        gameProgress.push([activePlayer.type, computerChoice.id]);
        evalWinner();  
        changePlayer(player1, player2);
        
    };

    function nextMove() {
    
        if(activePlayer === player1){
            makeHumanMove();
        }
        else if(activePlayer === player2){
            if (activePlayer.isHuman === true){
                makeHumanMove();
            }
            else if(activePlayer.isHuman === false){
                setTimeout(makeComputerMove, 1500);
            }
        }
    }
     
    
    const changePlayer = function(player1, player2) {
       
        activePlayer = activePlayer.type === "X"?  player2 : player1;
        activePlayer.active = true;
        nextMove();
    };

    const isEmpty = (cell) => {
        if(cell.textContent ===""){
            return true;
        }
        return false;
    }


    //filter den Gameprogress nach Spielern  --> make this arr.filter!!!
    function filterPlayerMoves(arr, symbol) {
        let new_arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === symbol) {
                new_arr.push(arr[i][1]);
            }
        }
        return new_arr;
    };


    function evalWinner() {
        
        let player1Moves = filterPlayerMoves(gameProgress, symbol1);
        let player2Moves = filterPlayerMoves(gameProgress, symbol2);
        let min_turns = (Math.sqrt(document.getElementsByClassName("cell").length)*2) -1;
        
        if (gameProgress.length >= min_turns) {
            for (let i = 0; i < winningConditions.length; i++){
                if (winningConditions[i].every(v => player1Moves.includes(v))) {
                    displayController.showResult(player1);
                }

                else if( winningConditions[i].every(v => player2Moves.includes(v))){
                    displayController.showResult(player2);
                }
                else {
                    if (!cells.filter(isEmpty)) {
                        displayController.showResult("No Winner");
                    }
                }
            }
        }           
    }

    function reset(){
        document.addEventListener("click", function(e){
            if(e.target.id ==="save-btn" || e.target.id ==="reset-btn"){
                cells.forEach(function(cell){
                    cell.textContent = "";
                })
                gameProgress = [];
                document.getElementById("player2").classList.remove("styling2");
                activePlayer = player1;
                startGame();
            }
        })
    }
    
    
    return {
        cells,
        player1,
        player2,
        activePlayer,
        gameProgress,
        isEmpty,
        evalWinner,
        nextMove,
        reset
    };
})();
 
function startGame(){
    
    document.getElementById("settings-btn").addEventListener("click", displayController.showSettings);
    document.getElementById("save-btn").addEventListener("click", displayController.saveSettings);
    document.getElementById("playHuman").addEventListener("click", displayController.playAgainstHuman);
    document.getElementById("playAi").addEventListener("click", displayController.playAgainstComputer);
    document.getElementById("cancel-btn").addEventListener("click", displayController.clearForm)
    playGame.nextMove();
    playGame.reset();
}

startGame();

//////////////////////////////////////////////////////////////////////

//Eventhandlers

