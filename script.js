'use strict';

//Playerfactory
function newPlayer (type, active,isHuman, name) {
    return {
        type,
        active,
        isHuman,
        name
    }
};

//Display Module
const displayController = (function(){
    const nameChange = Array.from(document.getElementsByClassName("name-input"))
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

    function saveNames() {
        
            if(nameChange[0].value) {
                   document.getElementById("player1").textContent = nameChange[0].value;
                   playGame.player1.name = nameChange[0].value;
                }

            if(nameChange[1].value) {
                    document.getElementById("player2").textContent = nameChange[1].value;
                    playGame.player2.name = nameChange[0].value;
            }        
    }


    const saveSettings = (e) => {
        e.preventDefault();
            saveNames();
            hideSettings();
            playGame.reset();
                           
    }

    const clearForm= (e) => {
        e.preventDefault();
        document.getElementById("settings-form").reset();
        playGame.reset();
    }

    const playAgainstHuman = (e) => {
        e.preventDefault();
        e.target.textContent= "You play against a friend";
       document.getElementById("playAi").textContent ="Play against Computer?";     
    }

    const playAgainstComputer = (e) =>  {
        e.preventDefault();
        e.target.textContent ="You play against Computer";
        document.getElementById("playHuman").textContent = "Play against Human?";
        document.getElementById("name2").value = "Computer";
        playGame.player2.name = nameChange[0].value;
        playGame.player2.isHuman = false;
    }


    const showResult = (winner) => {
    
        document.querySelector("main").classList.add("hidden");
        // const body = document.querySelector("body");
        // const resultCard = document.createElement("div");
        // resultCard.classList.add("result-card");

        const resultCard = document.getElementById("result-card");
        const result = document.getElementById("result");
        resultCard.classList.remove("hidden");

        if (winner === playGame.player1){
            result.textContent = `${playGame.player1.name} has won!`;
        }
        else if(winner == playGame.player2){
            result.textContent = `${playGame.player2.name} has won!`;
        }
        else {
            result.textContent = "It's a tie";
        }
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
    const player1 = newPlayer("X", true, true, "player1");
    const player2 = newPlayer("O", false, true, "player2");
    let activePlayer = player1;
    const symbol1 = player1.type;
    const symbol2 = player2.type;
    const cells = Array.from(document.getElementsByClassName("cell"));
    // let cellsLeft = cells.filter(isEmpty);
    // if (!cellsLeft){
    //     console.log("yeah")
    //         }
    
    
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

    const makeComputerMove = () => {
        const cellsToChoose = playGame.cells.filter(isEmpty);
        const computerChoice = cellsToChoose[Math.floor(Math.random() * cellsToChoose.length)];
        displayController.setColor(computerChoice, activePlayer, player1, player2, "player1", "player2", "styling1", "styling2");
        computerChoice.textContent = "O";
        gameProgress.push([activePlayer.type, computerChoice.id]);
        evalWinner();  
        changePlayer(player1, player2);
        
    };

    const nextMove = () => {
        
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
     
    
    const changePlayer = (player1, player2) => {
        
        activePlayer = activePlayer.type === "X"?  player2 : player1;
        activePlayer.active = true;
        nextMove();
    };

    function isEmpty(cell) {
        if(cell.textContent === ""){
            return true;
        }
        return false;
    };


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


    
    //make filterfunction)
    const evalWinner = () => {
        
        let player1Moves = filterPlayerMoves(gameProgress, symbol1);
        let player2Moves = filterPlayerMoves(gameProgress, symbol2);
        let min_turns = (Math.sqrt(document.getElementsByClassName("cell").length)*2) -1;
        let cellsLeft = cells.filter(isEmpty);
            if (gameProgress.length >= min_turns) {
                if (gameProgress.length == cells.length){
                    if(cellsLeft.length === 0){
                        displayController.showResult("noWinner");
                    }
                }   
                else{
                    for (let i = 0; i < winningConditions.length; i++){
                        if (winningConditions[i].every(v => player1Moves.includes(v))) {
                            displayController.showResult(player1);
                        }
    
                        else if(winningConditions[i].every(v => player2Moves.includes(v))){
                             displayController.showResult(player2);
                        }
                    }
                }
            }  
             
                  
    }

    const reset = () => {
        // document.addEventListener("click", function(e){
        //     if(e.target.id ==="save-btn" || e.target.id ==="reset-btn"){
                cells.forEach(function(cell){
                    cell.textContent = "";
                })
                gameProgress = [];
                document.getElementById("player2").classList.remove("styling2");
                activePlayer = player1;
                startGame();
             }
        //}
        // )

    
    return {
        //cells,
        player1,
        player2,
        activePlayer,
        gameProgress,
        isEmpty,
        evalWinner,
        nextMove,
        reset,
       
    };
})();
 
function startGame(){
    
    document.getElementById("settings-btn").addEventListener("click", displayController.showSettings);
    document.getElementById("settings-form").addEventListener("submit", displayController.saveSettings);
    document.getElementById("playHuman").addEventListener("click", displayController.playAgainstHuman);
    document.getElementById("playAi").addEventListener("click", displayController.playAgainstComputer);
    document.getElementById("cancel-btn").addEventListener("click", displayController.clearForm)
    playGame.nextMove();
   
    //playGame.reset();
}

startGame();

//////////////////////////////////////////////////////////////////////

//Eventhandlers

