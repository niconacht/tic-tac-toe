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
   
    const filterMoves = function(playertype) {
         const moves = gameProgress.filter(arr => arr[0] === playertype);
         //müssen hier nicht die cell ids als array returned werden? 
         return moves;
    };
    const player1Moves = filterMoves(player1.type);
    const player2Moves = filterMoves(player2.type);
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

     

    const evalWinner = function(){
        //get minimum number of start checking for winner(depending on the size of the gameboard)
        let min_turns = (Math.sqrt(document.getElementsByClassName("cell").length)*2) -1;
        if (gameProgress.length >= min_turns) {
            console.log(player1Moves);
            for (let i = 0; i < winningConditions.length; i++){
                let winner1 = winningConditions[i].every(v => player1Moves.includes(v));    
                    console.log(winner1);
                    if(winner1 === true){
                    //announce winner
                    //stop game
                        console.log("Player 1 wins")
                }
                    if(winningConditions[i].every(val => player2Moves.includes(val))){
                    //announce winner
                    //stop game
                        console.log("Player2 wins")
                }
                    else {
                        const emptyCells = cells.filter(cell => cell.textContent === "")
                   
                        if(emptyCells){
                            continue;
                    }
                        else {
                            console.log("Tie")
                        //announce tie;
                        //stop game
                    }
    
                }
            }  
        }
    }
    return {
        //if field is empty, player can place her symbol, store choice in array, change turn
       makeMove : function(e) {
           if (e.target.textContent === ""){
                e.target.textContent = activePlayer.type;
                gameProgress.push([activePlayer.type, e.target.id]);
                changePlayer(player1, player2);
                evalWinner();
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


