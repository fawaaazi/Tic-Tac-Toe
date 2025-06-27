
const GameBoard = (function (){
    const gameBoard = [new Array(3), new Array(3), new Array(3)]

    const getGameBoard = () => gameBoard;

    const placeMarker = (row, col, activeMarker) =>{
        gameBoard[row][col] = activeMarker;
        controlUi.placeMarkerInUi(row, col, activeMarker);
    }

    const restartGameBoard = () =>{
        for(let i = 0; i < gameBoard.length; i++){
            for(let j = 0; j < gameBoard[i].length; j++){
                gameBoard[i][j] = undefined;
            }
        }
    }

    return{ getGameBoard, placeMarker, restartGameBoard}
})();





function createPlayer(name , marker){
    let score = 0;
    return{name, marker, score}
}




const GameControl = (function(){

    const board = GameBoard.getGameBoard();
    const player1 = createPlayer("player-I", "X");
    const player2 = createPlayer("player-II", "O");

    let gameOver = false;
    let activePlayer = player1; /*default player1*/
    

    const checkWin = () => {
        let activeMarker = activePlayer.marker
        const isWin = (
            /*horizontal wins*/
            (activeMarker === board[0][0] &&  activeMarker === board[0][1] &&  activeMarker === board[0][2]) ||
            (activeMarker === board[1][0] &&  activeMarker === board[1][1] &&  activeMarker === board[1][2]) ||
            (activeMarker === board[2][0] &&  activeMarker === board[2][1] &&  activeMarker === board[2][2]) ||

            /*vertical wins*/
            (activeMarker === board[0][0] &&  activeMarker === board[1][0] &&  activeMarker === board[2][0]) ||
            (activeMarker === board[0][1] &&  activeMarker === board[1][1] &&  activeMarker === board[2][1]) ||
            (activeMarker === board[0][2] &&  activeMarker === board[1][2] &&  activeMarker === board[2][2]) ||

            /*diagonal wins*/
            (activeMarker === board[0][0] &&  activeMarker === board[1][1] &&  activeMarker === board[2][2]) ||
            (activeMarker === board[0][2] &&  activeMarker === board[1][1] &&  activeMarker === board[2][0]) 
        );
        return isWin;

    }


    const checkDraw = () =>{
        /*const flatGameBoard = board.flat() /*make the 2d game board to 1d 

        return flatGameBoard.every(element => element !== undefined || element !== null);*/

        for(let i=0; i < board.length; i++){
            for(let j=0; j < board[i].length; j++){
                if(board[i][j] === undefined || board[i][j] === null){
                    return false;
                }
            }  
        }
        return true;
    }


    const swapActivePlayer =() =>{
            activePlayer == player1 ? activePlayer = player2 : activePlayer = player1
    }


    const playRound = (row, col) =>{
        console.log(activePlayer.name+":"+activePlayer.marker)
        
        if(gameOver){
            console.log("Game over!")
            return
        }

        GameBoard.placeMarker(row , col, activePlayer.marker)
        console.log(GameBoard.getGameBoard())
        
        if(checkWin()){
            gameOver = true;
            activePlayer.score++
            controlUi.getScoreDisplayUi(activePlayer.name).textContent = activePlayer.score
            controlUi.getWinnerPopup().showModal()
            controlUi.setPopupStatus(activePlayer.name, "WIN")
            console.log(activePlayer.name+"Won");
            return
        }

        if(checkDraw()){
            gameOver = true;
            controlUi.getWinnerPopup().showModal()
            console.log("Draw");
            controlUi.setPopupStatus(activePlayer.name, "DRAW")
            return
        }

        swapActivePlayer()
    }



    const restartGame = () =>{
        gameOver = false;
        controlUi.getWinnerPopup().close()
        controlUi.restartGameCellUi()
        GameBoard.restartGameBoard()
        activePlayer = player1 /* changing the active player into default*/
    }


    const resetScore = () =>{
        player1.score = 0;
        player2.score = 0;
        controlUi.getScoreDisplayUi(player1.name).textContent = 0;
        controlUi.getScoreDisplayUi(player2.name).textContent = 0;
    }


    const playGame = (row, col) =>{
        playRound(row, col)
    }
    


    return {
        playGame,
        restartGame,
        resetScore
    }
})();







const controlUi = (function(){
    /*creating variables to access ui elements*/
    const gameBoard = document.getElementsByClassName("cell");
    const winnerPopup = document.getElementById("winner-popup");


    const placeMarkerInUi = (row, col, activeMarker) =>{
        let cellId = "cell-"+row+col  /*creating the id of selected cell */
        let activeCell;              /* variable for accessing the active cell */


        for(let i = 0; i < gameBoard.length; i++){

            if(gameBoard[i].id === cellId){
                 activeCell = gameBoard[i]
            }     
        }

        activeCell.textContent = activeMarker;
        if(activeMarker === 'X'){
            activeCell.style.color = "var(--x-color)"
        }
        if(activeMarker === 'O'){
            activeCell.style.color = "var(--o-color)"
        }
        activeCell.removeAttribute("onclick");
    }
    


    const restartGameCellUi = () =>{
        let i = 0;
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                gameBoard[i].textContent = ""
                gameBoard[i].setAttribute("onclick",`GameControl.playGame(${row},${col})`)
                i++
                console.log(row)
                console.log(col)
            } 
        }
    }


    const getScoreDisplayUi = (name) =>{
        const scoreDisplay = document.getElementById(name+"-score")
        return scoreDisplay;
    }


    const getWinnerPopup = () =>{
        return winnerPopup
    }


    const setPopupStatus = (name, status) =>{
        const popupTitle = document.getElementById("popup-title");
        const playerStatus = document.getElementById("player-status");
        const gameStatus = document.getElementById("round-status");
        if(status === "WIN"){
            popupTitle.textContent = "GAME WON!!!";
            playerStatus.textContent = name
            gameStatus.textContent = "Won the round"
        }

        if( status === "DRAW"){
            popupTitle.textContent = "GAME DRAW!!"
            playerStatus.textContent = ""
            gameStatus.textContent ="Round Draw"
        }
    }

    
    return{ 
            placeMarkerInUi,
            restartGameCellUi,
            getWinnerPopup,
            getScoreDisplayUi,
            setPopupStatus
        }
})();

