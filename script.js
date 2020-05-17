'use strict';

//Playerfactory
function newPlayer (type, active,) {
    return {
        type,
        active,
    }
}


//Settings Module
const manageSettings = (function() {
   
    //chooseName
    
    //choose Friend or AI

    //
   
   
   
   
    return {

    }

})();

//Display Module
const displayController = (function(){

    function setColor(target, activeplayer, player1, player2, id1, id2, class1, class2 ) {


        if (activeplayer === player1) {
            document.getElementById(id2).classList.remove(class2);
            document.getElementById(id1).classList.add(class1);
            target.classList.add(class1);
        }

        if(activeplayer === player2) {
            document.getElementById(id1).classList.remove(class1);
            document.getElementById(id2).classList.add(class2);
            target.classList.add(class2);
           
        }
        console.log(target);
    }

    function showResult() {

    }


    function showSettings(){
        document.querySelector("main").classList.add("hidden");
        document.getElementById("settings-card").classList.remove("hidden");

    }


    return {
        setColor,
        showSettings
        

    }
})();




//Game_logic Module
const playGame = (function(e) {

    let gameProgress = []; 
    const player1 = newPlayer("X", true);
    const player2 = newPlayer("O", false);
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

    //if field is empty, player can place her symbol, store choice in array, change turn
    const makeMove = function(e) {
        
        if (e.target.textContent === ""){
            displayController.setColor(e.target, activePlayer, player1, player2, "player1", "player2", "styling1", "styling2");
             e.target.textContent = activePlayer.type;
             gameProgress.push([activePlayer.type, e.target.id]);
             evalWinner();
             changePlayer(player1, player2);
               
        }
    }    

    const changePlayer = function(player1, player2) {
        return (activePlayer = activePlayer.type === "X"?  player2 : player1);
    };

    const isEmpty = (cell) => {
        if(!cell.textcontent){
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
            const player1wins =  winningConditions[i].every(v => player1Moves.includes(v));
            const player2wins =  winningConditions[i].every(v => player2Moves.includes(v));
            
            if (player1wins) {
                console.log("Player1 wins");
            }

            else if(player2wins){
                console.log("Player2 wins");
            }

            else {
                const emptyCells = cells.filter(isEmpty);
                if (!emptyCells) {
                    console.log("It's a tie")
                }
               // else {
                //   continue;
                }
            }
        }           
    };       
  
    return {
        activePlayer,
        gameProgress,
        isEmpty,
        makeMove,
        evalWinner,
    };
})();



//Set AI
    //Computer makes random move --> room for optimization (optimal choice, minimax...)

const againstComputer = (function() {

    const namefield  = document.getElementById("player2");

    function changeToComputer(e) {
        if (e.target.id = "playAi"){      
            namefield.dataName="Ai";
            namefield.textContent = "Ai";
        }
    }

    function makeComputerMove(){
      
       //displayController.setColor(e.target);
       if (activePlayer.type === "0") {
            const cellsToChoose = cells.filter(playGame.isEmpty);
            const computerChoice = cellsToChoose[Math.floor(Math.random() * cellsToChoose.length)];
            computerChoice.textContent = "O";
            playGame.gameProgress.push([activePlayer.type, computerChoice.id]);
            evalWinner();  
            changePlayer(player1, player2);
       }
       else {
           playGame.makeMove();

       }
       
    }
    return {
        namefield,
        changeToComputer,
        makeComputerMove
    }

})();

function startGame(){
    const container = document.getElementById("gameboard");
    if (againstComputer.namefield.dataName == "Ai")
        container.addEventListener("click", againstComputer.makeComputerMove); 

    else {
        container.addEventListener("click", playGame.makeMove);
    }
}
startGame();
//////////////////////////////////////////////////////////////////////

//Eventhandlers
const setBtn = document.getElementById("settings-btn");
setBtn.addEventListener("click", displayController.showSettings);



