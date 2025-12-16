document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("gameBoard");
  const currentPlayerSpan = document.getElementById("currentPlayer");
  const resetBtn = document.getElementById("resetBtn");

  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");
  const scoreTies = document.getElementById("scoreTies");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = Array(9).fill("");

  let scores = { X: 0, O: 0, T: 0 };

  const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.dataset.index = index;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    });
  }

  function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(
      currentPlayer === "X" ? "player-x" : "player-o",
      "disabled"
    );

    if (checkWinner()) {
      scores[currentPlayer]++;
      updateScore();
      gameActive = false;
      return;
    }

    if (!gameState.includes("")) {
      scores.T++;
      updateScore();
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerSpan.textContent = currentPlayer;
  }

  function checkWinner() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        highlightWinner(condition);
        return true;
      }
      return false;
    });
  }

  function highlightWinner(condition) {
    condition.forEach(index => {
      board.children[index].classList.add("winner");
    });
  }

  function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreTies.textContent = scores.T;
  }

  resetBtn.addEventListener("click", () => {
    gameState = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";
    currentPlayerSpan.textContent = currentPlayer;
    createBoard();
  });

  createBoard();
});
