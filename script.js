const player = function (name,symbol){
    return {name,symbol}
};
const playerX = player('Player X', 'X');
const playerO = player('Player O', 'O');
const gameBoard = (function(){
    const board = ['','','','','','','','',''];
    return {board}
})();

const game = (function (){
    const {board} = gameBoard;
    let symbol = 'O';
    let winner = '';

    const markSpot = function (e){
        const targetArrayIndex = board[`${e.target.id}`];
        if (symbol === playerX.symbol){
            symbol = playerO.symbol;
            winner = playerO.name;
            info.textContent = "Player X's turn to play";
            if(targetArrayIndex ===''){board.splice(`${e.target.id}`,1,symbol)};
        }
        else if (symbol === playerO.symbol){
            symbol = playerX.symbol;
            winner = playerX.name;
            info.textContent = "Player O's turn to play";
            if(targetArrayIndex ===''){board.splice(`${e.target.id}`,1,symbol)};
        }
        const {render} = renderRestartTip;
        render();
        checkWinConditions();
    }

    function checkWinConditions(){
        if(board[0] === board[1] && board[1] === board[2] && board [1] !== ''){disableButtons(); announceWinner();return}
        if(board[3] === board[4] && board[4] === board[5] && board [4] !== ''){disableButtons(); announceWinner();return}
        if(board[6] === board[7] && board[7] === board[8] && board [7] !== ''){disableButtons(); announceWinner();return}
        if(board[0] === board[3] && board[3] === board[6] && board [3] !== ''){disableButtons(); announceWinner();return}
        if(board[1] === board[4] && board[4] === board[7] && board [4] !== ''){disableButtons(); announceWinner();return}
        if(board[2] === board[5] && board[5] === board[8] && board [5] !== ''){disableButtons(); announceWinner();return}
        if(board[0] === board[4] && board[4] === board[8] && board [4] !== ''){disableButtons(); announceWinner();return}
        if(board[2] === board[4] && board[4] === board[6] && board [4] !== ''){disableButtons(); announceWinner();return}
        if(board[0] !=='' && board[1] !=='' && board[2] !== '' && board[3] !=='' && board[4] !=='' && board [5] !== '' && board[6] !=='' && board[7] !=='' && board[8] !=='')announceDraw();return;
    }
    function announceWinner(){
        info.textContent = `${winner} Wins!`;
        for(let i = 0; i < board.length; i++){
            const targetBox = document.getElementById(`${i}`);
            targetBox.classList.remove('hover');
        }
        return;
    }
    function announceDraw(){
        info.textContent = "It's a Draw!";
        return;
    }

    const spots = Array.from(document.getElementsByClassName('box'));

    function disableButtons(){
        spots.forEach((spot) => spot.removeEventListener('click', markSpot));
    }
    function addClick(){
        spots.forEach((spot)=>spot.addEventListener('click', markSpot));
        symbol = 'O';
    }
    addClick();
    return{addClick,markSpot}
})();

const renderRestartTip = (function(){
    const {board} = gameBoard;
    const {addClick} = game;
    const {markSpot} = game;

    function render(){
        for(let i = 0; i < board.length; i++){
            const targetBox = document.getElementById(`${i}`);
            targetBox.textContent = board [i];
            if(targetBox.textContent !== ''){
                targetBox.classList.remove('hover');
                targetBox.removeEventListener('click', markSpot);
            }
        }
        generateTip();
    }

    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click',function(){
        for(let i = 0; i < board.length; i++){
            board[i] = '';
            const targetBox = document.getElementById(`${i}`);
            targetBox.classList.add('hover');
        }
        info.textContent = "Player X's turn to play";
        generateTip();
        addClick();
        render();
    });

    function generateTip(){
        let randomTip = Math.floor(Math.random()*5+1);
        if (randomTip === 1)tip.textContent = "Tip : Player X has better chance to win !";
        else if (randomTip === 2)tip.textContent = "Tip : Get the middle spot first !";
        else if (randomTip === 3)tip.textContent = "Tip : When in doubt, trust your feelings !";
        else if (randomTip === 4)tip.textContent = "Tip : If you can't win it, make it a draw !";
        else tip.textContent = "Tip : Sometimes your opponent is just having a really good day !";
    }
    return {render}
})();