let users = {};
let scores = [];
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let players = { X: '', O: '' };
let wins = {}; // Track win count per player

window.onload = function()
{
    const storedUsers = localStorage.getItem('users');
    const storedScores = localStorage.getItem('scores');
    const storedWins = localStorage.getItem('wins');
    if (storedUsers) users = JSON.parse(storedUsers);
    if (storedScores) scores = JSON.parse(storedScores);
    if (storedWins) wins = JSON.parse(storedWins);
};

function registerPlayer(symbol)
{
    const username = document.getElementById(`player${symbol}`).value;
    const password = document.getElementById(`pass${symbol}`).value;
    if (!username || !password) {
      alert(`Please enter username and password for Player ${symbol}`);
      return;
    }
    if (users[username]) {
      alert(`Username already exists. Choose a different one.`);
      return;
    }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Player ${symbol} registered successfully.`);
  }

function loginPlayer(symbol)
{
    const username = document.getElementById(`player${symbol}`).value;
    const password = document.getElementById(`pass${symbol}`).value;
    if (!username || !password) {
      alert(`Please enter login credentials for Player ${symbol}`);
      return;
    }
    if (!users[username]) {
      alert(`User not found.`);
      return;
    }
    if (users[username] !== password) {
      alert(`Incorrect password.`);
      return;
    }
    players[symbol] = username;
    alert(`Player ${symbol} logged in successfully.`);
}

function forgotPassword(symbol)
{
    const username = document.getElementById(`player${symbol}`).value;
    if (!username || !users[username]) {
      alert('Username not found.');
      return;
    }
    const newPassword = prompt(`Enter a new password for ${username}:`);
    if (newPassword) {
      users[username] = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password updated successfully.');
    }
}

function startMultiplayerGame()
{
    if (!players.X || !players.O) {
      alert('Both players must log in first.');
      return;
    }
    if (players.X === players.O) {
      alert('Players must be different users');
      return;
    }
    document.getElementById('playerSelect').classList.add('hidden');
    document.getElementById('gameSection').classList.remove('hidden');
    document.getElementById('status').innerText = `${players[currentPlayer]} (as ${currentPlayer})'s turn`;
    drawBoard();
}

function drawBoard() 
{
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    board.forEach((cell, idx) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      div.innerText = cell;
      div.onclick = () => handleMove(idx);
      boardEl.appendChild(div);
    });
}

function handleMove(index) 
{
    if (!gameActive || board[index]) return;
    board[index] = currentPlayer;
    drawBoard();
    if (checkWin()) {
      document.getElementById('status').innerText = `${players[currentPlayer]} (as ${currentPlayer}) wins!`;
      gameActive = false;
      // Record win for player
      if (!wins[players[currentPlayer]]) wins[players[currentPlayer]] = 0;
      wins[players[currentPlayer]]++;
      localStorage.setItem('wins', JSON.stringify(wins));
    } else if (board.every(cell => cell)) {
      document.getElementById('status').innerText = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `${players[currentPlayer]} (as ${currentPlayer})'s turn`;
    }
}

function checkWin() 
{
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return wins.some(([a,b,c]) => board[a] && board[a] === board[b] && board[b] === board[c]);
}

function resetGame()
{
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = `${players[currentPlayer]} (as ${currentPlayer})'s turn`;
    drawBoard();
}

function recordScore()
{
    const result = document.getElementById('status').innerText;
    scores.push(result);
    localStorage.setItem('scores', JSON.stringify(scores));
    showScores();
}

function showScores() 
{
    const scoreBoard = document.getElementById('scoreBoard');
    const scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';

    // Display win counts in descending order
    const sorted = Object.entries(wins).sort((a,b) => b[1]-a[1]);
    sorted.forEach(([user, winCount]) => {
      const li = document.createElement('li');
      li.innerText = `${user}: ${winCount} win${winCount !== 1 ? 's' : ''}`;
      scoreList.appendChild(li);
    });

    scoreBoard.classList.remove('hidden');
}

function logoutPlayers() 
{
    players = { X: '', O: '' };
    document.getElementById('playerSelect').classList.remove('hidden');
    document.getElementById('gameSection').classList.add('hidden');
    document.getElementById('scoreBoard').classList.add('hidden');
    resetGame();
}