'use strict';

//Playerfactory
function newPlayer (type, active) {
    return {
        type,
        active,
    }
}

//Game_logic
const playGame = (function(e) {

    let gameProgress = []; 
    const player1 = newPlayer("X", true);
    const player2 = newPlayer("O", false);
    let activePlayer = player1;
    const symbol1 = player1.type;
    const symbol2 = player2.type;
    
    const cells = Array.from(document.getElementsByClassName("cell"));
    
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
   

    const changePlayer = function(player1, player2) {
        return (activePlayer = activePlayer.type === "X"?  player2 : player1);
    };
    //filter den GAmeprogress nach Spielern  --> make this arr.filter!!!
    function filterPlayerMoves(arr, symbol) {
        let new_arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === symbol) {
                new_arr.push(arr[i][1]);
            }
        }
        return new_arr;
    }

    function evalWinner() {
        let player1Moves = filterPlayerMoves(gameProgress, symbol1);
        let player2Moves = filterPlayerMoves(gameProgress, symbol2);
        let min_turns = (Math.sqrt(document.getElementsByClassName("cell").length)*2) -1;
        let winner;
        //console.log(player1Moves);
        //console.log(player2Moves);
        let isWinning = (playerMoves, conditions) => conditions.every(v => playerMoves.includes(v));
        for (let i = 0; i < winningConditions.length; i++){
            console.log(winningConditions[i]);
        //     if (gameProgress.length >= min_turns) {
               let player1wins = isWinning(player1Moves, winningConditions[i]);
               let player2wins = isWinning(player2Moves, winningConditions[i]);
        console.log(player1wins);
        console.log(player2wins);
        
        }
        
                
    }        
        //              winner = player1;
        //         }
        //     }
        // }
        // return winner;

    

    
    return {
        //if field is empty, player can place her symbol, store choice in array, change turn
       makeMove : function(e) {
           if (e.target.textContent === ""){
                e.target.textContent = activePlayer.type;
                gameProgress.push([activePlayer.type, e.target.id]);
                evalWinner();
                changePlayer(player1, player2);    
           }
       }    
    };
})();

//////////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////////

//Eventhandlers
//document.addEventListener("DOMContentLoaded", startGame);
const container = document.getElementById("gameboard");
container.addEventListener("click",playGame.makeMove);


