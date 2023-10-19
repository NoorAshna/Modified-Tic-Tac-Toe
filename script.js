const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');

let currentPlayer = 'X';
let xSymbolsLeft = 3;
let oSymbolsLeft = 3;

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return Array.from(cells).every(cell => !cell.classList.contains('empty'));
}

function handleClick(event) {
    const cell = event.target;
    if (cell.classList.contains('empty')) {
        if ((currentPlayer === 'X' && xSymbolsLeft > 0) || (currentPlayer === 'O' && oSymbolsLeft > 0)) {
            cell.classList.remove('empty');
            cell.classList.add(currentPlayer);
            if (currentPlayer === 'X') {
                xSymbolsLeft--;
            } else {
                oSymbolsLeft--;
            }

            if (checkWin()) {
                message.innerText = `Player ${currentPlayer} wins!`;
            } else if (checkDraw()) {
                message.innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }
}

function handleDragStart(event) {
    const cell = event.target;
    if (cell.classList.contains(currentPlayer)) {
        const cellData = cell.data.cell;
        
            event.dataTransfer.setData('text/plain', cell.dataset.cell);
          console.log("bhai")
        
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const targetCell = event.target;
    const sourceCellIndex = event.dataTransfer.getData('text/plain');
    
    const sourceCell = cells[sourceCellIndex];
if(xSymbolsLeft == 0 && oSymbolsLeft == 0){
    if (targetCell.classList.contains('empty')) {
        targetCell.classList.remove('empty');
        targetCell.classList.add(currentPlayer);
        sourceCell.classList.remove(currentPlayer);
        sourceCell.classList.add('empty');

        if (checkWin()) {
            message.innerText = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            message.innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('dragstart', handleDragStart);
    cell.addEventListener('dragover', handleDragOver);
    cell.addEventListener('drop', handleDrop);
});

message.innerText = `Player ${currentPlayer}'s turn`;