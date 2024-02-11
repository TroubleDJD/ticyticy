$(document).ready(function () {
    const PLAYER_X = 'X';
    const PLAYER_O = 'O';

    let currentPlayer = PLAYER_X;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'draw';
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;

        renderBoard();

        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            showResult(winner);
        } else {
            currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;
            $('#turn-indicator').text(`It's ${currentPlayer}'s turn`);
        }
    }

    function renderBoard() {
        $('#game-board').empty();

        for (let i = 0; i < 9; i++) {
            const cell = $('<div>').addClass('cell').text(gameBoard[i]);
            cell.on('click', () => handleCellClick(i));
            $('#game-board').append(cell);
        }
    }

    function showResult(result) {
        let resultMessage;

        if (result === 'draw') {
            resultMessage = 'It\'s a draw!';
        } else {
            const winnerName = (result === PLAYER_X) ? 'David' : 'Mike';
            resultMessage = `${winnerName} Wins!`;
            alert(resultMessage);
        }

        $('#result-message').text(resultMessage);
    }

    function restartGame() {
        currentPlayer = PLAYER_X;
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        $('#result-message').empty();
        $('#turn-indicator').text(`It's ${currentPlayer}'s turn`);

        renderBoard();
    }

    $('#restart-btn').on('click', restartGame);

    restartGame();
});
