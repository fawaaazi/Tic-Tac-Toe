const GameBoard = (function (){
    const gameBoard = [ ["" , "" , ""], ["" , "" , ""], ["" , "" , ""] ]

    const getGameBoard = () => gameBoard;

    const placeMarker = (row, col, marker) =>{
        gameBoard[row][col] = marker;
    }
    return{ getGameBoard, placeMarker }
})();
