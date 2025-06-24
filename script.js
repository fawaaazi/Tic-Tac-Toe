const GameBoard = (function (){
    const gameBoard = [ ["" , "" , ""], ["" , "" , ""], ["" , "" , ""] ]

    const getGameBoard = () => gameBoard;

    const placeMarker = (row, col, marker) =>{
        gameBoard[row][col] = marker;
    }
    return{ getGameBoard, placeMarker }
})();

function createPlayer(name , marker){
    return{name, marker}
}

const GameControl = (function(){
    const board = GameBoard.getGameBoard();

    const player1 = createPlayer("fawas", "X");
    const player2 = createPlayer("someone", "O");

    let gameOver = false;

    const checkWin = () => {
        const isWin = (
            /*horizontal wins*/
            board[0][0] === board[0][1] &&  board[0][0] === board[0][2] &&  board[0][1] === board[0][2] ||
            board[1][0] === board[1][1] &&  board[1][0] === board[1][2] &&  board[1][1] === board[1][2] ||
            board[2][0] === board[2][1] &&  board[2][0] === board[2][2] &&  board[2][1] === board[2][2] ||

            /*vertical wins*/
            board[0][0] === board[1][0] &&  board[0][0] === board[2][0] &&  board[1][0] === board[2][0] ||
            board[0][1] === board[1][1] &&  board[0][1] === board[2][1] &&  board[1][1] === board[2][1] ||
            board[0][2] === board[1][2] &&  board[0][2] === board[2][2] &&  board[1][2] === board[2][2] ||

            /*diagonal wins*/
            board[0][0] === board[1][1] &&  board[0][0] === board[2][2] &&  board[1][1] === board[2][2] ||
            board[0][2] === board[1][1] &&  board[0][2] === board[2][0] &&  board[1][1] === board[2][0]
        );
        return isWin;

    }

})();