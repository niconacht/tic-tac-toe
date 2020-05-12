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
    const changePlayer = function(player1, player2) {
        return (activePlayer = activePlayer.type === "X"?  player2 : player1);
    }
     
    return {
       changeCell : function(e) {
           e.target.textContent = activePlayer.type;
            gameProgress.push([activePlayer, e.target.id]);
            changePlayer(player1, player2);
       }

    }

})();
//array that keeps track of what has been clicked









//Eventhandlers
//document.addEventListener("DOMContentLoaded", startGame);

const container = document.getElementById("gameboard");
container.addEventListener("click",playGame.changeCell);


