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

     
    const evalWinner = function(){
        const filterMoves = function(arr, symbol){
            let new_arr = [];
            
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i][0]);
                if (arr[i][0] === symbol){
                    console.log(arr[i][1])
                    new_arr.push[arr[i][1]];
                }
                //console.log(new_arr)
                return new_arr;
    
            }
        }    
        
        const player1Moves = filterMoves(gameProgress, symbol1);
        const player2Moves = filterMoves(gameProgress, symbol2);
        
        //get minimum number of start checking for winner(depending on the size of the gameboard)
        let min_turns = (Math.sqrt(document.getElementsByClassName("cell").length)*2) -1;
        if (gameProgress.length >= min_turns) {
       
            for (let i = 0; i < winningConditions.length; i++){
                let winner1 = winningConditions[i].every(v => player1Moves.includes(v));    
                    console.log(winner1);
                    if(winner1 === true){
                    //announce winner
                    //stop game
                        console.log("Player 1 wins")
                }                                           //check if every cell in winningcondition-elem is marked by same player
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
                console.log(gameProgress)
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


