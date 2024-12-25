const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
let board = ['', '', '', '', '', '', '', '', ''];  
let currentPlayer = 'X';  
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver || cell.textContent !== '') return;  
        makeMove(cell, currentPlayer);
        if (checkWinner(currentPlayer)) {
            gameOver = true;
            statusText.textContent = `Player ${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== '')) {
            gameOver = true;
            statusText.textContent = 'It\'s a tie!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }

       
        if (!gameOver && currentPlayer === 'O') {
            setTimeout(computerMove, 500);  
        }
    });
});


function makeMove(cell, player) {
    const index = cell.getAttribute('data-index');
    board[index] = player;
    cell.textContent = player;
}


function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}


function computerMove() {
    let availableMoves = board
        .map((cell, index) => cell === '' ? index : null)
        .filter(index => index !== null);

    if (availableMoves.length === 0) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(cells[randomMove], 'O');
    if (checkWinner('O')) {
        gameOver = true;
        statusText.textContent = 'Computer wins!';
    } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        statusText.textContent = 'It\'s a tie!';
    } else {
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}


resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
});
