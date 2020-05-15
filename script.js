'use strict';

//Playerfactory
function newPlayer (type, active) {
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

    function showResult() {

    }
    //helper function?
    function hideGameboard(){

    }

    function showSettings(){

    }

    return {

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


    //filter den GAmeprogress nach Spielern  --> make this arr.filter!!!
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
        isEmpty,
        makeMove,
        evalWinner,
    };
})();

//AI-LOGIC 
    //Computer makes random move --> room for optimization (optimal choice, minimax...)


const againstComputer = (function () {

    function playAi(e) {
        if (e.target.id = "playAi"){
           // if active player = computer player
            //-->  not makeMove but computerMove --> ...siehe playGame, ersetze function bei startGame
        }


    }
    return {
        playAi,
    }

})();

function startGame()
    const container = document.getElementById("gameboard");
    container.addEventListener("click",playGame.makeMove); 
    
    const settings = document.getElementById("settings-form");
    settings.addEventListener("click", playAi)

startGame();
//////////////////////////////////////////////////////////////////////

//Eventhandlers
//document.addEventListener("DOMContentLoaded", startGame);



