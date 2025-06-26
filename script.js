
const GameBoard = (function (){
    const gameBoard = [new Array(3), new Array(3), new Array(3)]

    const getGameBoard = () => gameBoard;

    const placeMarker = (row, col, activeMarker) =>{
        gameBoard[row][col] = activeMarker;
        controlUi.placeMarkerInUi(row, col, activeMarker);
    }
    return{ getGameBoard, placeMarker }
})();

function createPlayer(name , marker){
    let score = 0;
    return{name, marker, score}
}

const GameControl = (function(){

    const board = GameBoard.getGameBoard();

    const player1 = createPlayer("fawas", "X");
    const player2 = createPlayer("someone", "O");

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
            console.log(activePlayer.name+"Won");
            activePlayer.score++
            return
        }

        if(checkDraw()){
            gameOver = true;
            console.log("Draw");
            return
        }

        swapActivePlayer()
        

    }

    const playGame = (row, col) =>{
        playRound(row, col)
    }
    
    return {
        playGame
    }
})();

const controlUi = (function(){
    /*creating variables to access ui elements*/

    const gameBoard = document.getElementsByClassName("cell");


    const placeMarkerInUi = (row, col, activeMarker) =>{
        let cellId = "cell-"+row+col  /*creating the id of selected cell */
        let activeCell;              /* variable for accessing the active cell */


        for(let i = 0; i < gameBoard.length; i++){

            if(gameBoard[i].id === cellId){
                 activeCell = gameBoard[i]
            }     
        }


        activeCell.textContent = activeMarker;
        activeCell.removeAttribute("onclick");
    }
    
    const restartGameUi = () =>{
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

    return{placeMarkerInUi, restartGameUi}
})();