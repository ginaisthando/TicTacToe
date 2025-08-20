# Tic Tac Toe — Local Auth, Leaderboard & Persistent Storage

![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-green)

![Repo Size](https://img.shields.io/github/repo-size/ginaisthando/TicTacToe)
![Last Commit](https://img.shields.io/github/last-commit/ginaisthando/TicTacToe)
![Open Issues](https://img.shields.io/github/issues/ginaisthando/TicTacToe)
![Stars](https://img.shields.io/github/stars/ginaisthando/TicTacToe?style=social)

A lightweight, browser-based Tic Tac Toe game with **user registration, login, password reset, local authentication**, and a **win-based leaderboard** persisted to `localStorage`. No backend or database required.

---

## ✨ Features

- **Two-player local multiplayer** with X and O roles.
- **User accounts**: register, login, logout, and **reset password** (via prompt).
- **Local authentication** (credentials stored in `localStorage` for demo purposes).
- **Win tracking & leaderboard**: keeps a running total of wins per user across sessions.
- **Game status & results** with “Play Again” and “Record Score” controls.
- **Persistent storage** for users, wins, and historical result strings.
- **Responsive, modern UI** with a clean grid board and subtle hover effects.

---

## 🧩 How It Works (Architecture)

### UI Layout
- `index.html` defines three main sections:
  - **Player Select** (register/login for Player X and O)
  - **Game Section** (board, turn status, action buttons)
  - **Scoreboard** (sorted win counts)

### Core Game State
- 3×3 `board` array for cell marks (`'' | 'X' | 'O'`).
- `currentPlayer` toggles between `'X'` and `'O'`.
- `players` maps roles to logged-in usernames: `{ X: string, O: string }`.
- `gameActive` gates interaction after a win/draw.

### Persistence Model (localStorage)
- `users`: `{ [username: string]: password: string }`
- `wins`: `{ [username: string]: number }` – total wins per user
- `scores`: `string[]` – free-form result messages (“UserX (as X) wins!”, “It’s a draw!”, etc.)

> ⚠️ **Security note:** Passwords are stored in plaintext in `localStorage` for simplicity. This is **not suitable for production**; see the Security section for hardening tips.

---

## 🗂 Project Structure

├── index.html # Markup for UI sections and buttons<br>
├── style.css # Styles for layout, board, and controls<br>
└── script.js # Logic for auth, gameplay, storage, and leaderboard<br>


---

## 🚀 Getting Started

### 1) Clone or download
Place the three files in the same folder on your machine.

### 2) Open in a browser
Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). No build tools required.

> Tip: If you run into cross-origin issues while expanding the project, consider serving via a simple static server (e.g., VS Code Live Server, Python `http.server`, or `npx serve`).

---

## 🕹 Usage Guide

### Register Users
1. In **Player 1 (X)** and **Player 2 (O)** sections, enter a **username** and **password**.
2. Click **Register** for each account.

> Usernames must be unique; attempting to reuse a name will show an alert.

### Login
1. Enter the credentials for **Player X** and **Player O**.
2. Click **Login** for each role.
3. Both roles must be logged in and must be **different users**.

### Start a Game
- Click **Start Game** to reveal the board and status line.
- The status shows **who’s turn it is** and which symbol they play.

### Make Moves
- Click any empty cell to place the current player’s mark.
- The game detects **wins** (rows, columns, diagonals) and **draws**.

### Record Score & Leaderboard
- Click **Record Score** to append the current **status/result** to history.
- The **Leaderboard** automatically sorts win totals (descending).
- Win totals are **persistent across sessions**.

### Play Again / Logout
- **Play Again** resets the board and sets the turn back to X (same players).
- **Logout** hides the game, clears the in-memory player mapping, and shows the login/registration form again.

### Forgot Password
- Enter a username and click **Forgot Password** to set a **new password** via prompt.

---

## 🧠 Game Logic Overview

- **Win detection:** Predefined winning triplets are checked after each move.
- **Turn switching:** Toggles `currentPlayer` after a valid move if no win/draw.
- **Board rendering:** The grid is rebuilt after every move for visual sync.
- **State reset:** `resetGame()` clears the board and resets flags/UI.

---

## 🎨 UI/UX Notes

- Clean panel layout with a centered container and subtle shadow.
- Responsive grid-based board (`display: grid`) with hover feedback.
- Accessible hit targets (100×100px cells) and clear status text.

---

## 🔐 Security & Privacy

This is a **demo** that intentionally keeps things simple. To harden for real use:
- **Never store plaintext passwords**. Use a server with salted password hashes (e.g. Argon2, bcrypt).
- Add rate limiting and lockouts on repeated failures.
- Validate and sanitize all user inputs on both client and server.
- Consider replacing `localStorage` with a backend database and proper sessions/JWT.

---

## ⚙️ Configuration & Data Keys

- **`localStorage` keys**
  - `users` — JSON object mapping username → plaintext password
  - `wins` — JSON object mapping username → integer win count
  - `scores` — JSON array of result strings (for history/debugging)

- **Resetting data**
  - Open DevTools → Application → Local Storage → clear `users`, `wins`, `scores`.
  - Or run `localStorage.clear()` in the console to reset everything.

---

## 🧪 Manual Test Plan

1. **Register two distinct users** (e.g., `alice` / `bob`).
2. **Login** as X with `alice` and as O with `bob`.
3. **Start Game**; confirm status shows `alice (as X)`.
4. Play moves until **X wins**; confirm status shows winner text.
5. Click **Record Score**; refresh and check the **Leaderboard** persists.
6. Click **Play Again**; confirm board resets and turn returns to X.
7. **Logout**; confirm UI returns to login/registration view.
8. Test **Forgot Password**; verify login works with the new password.
9. Attempt to **reuse a username** on registration and expect an alert.
10. Try starting a game without both users logged in and expect an alert.

---

## 🛣️ Roadmap Ideas

- Single-player mode vs AI (minimax with difficulty levels).
- Animations for win lines and cell placement.
- Replace `alert/prompt` with inline toasts/modals and client-side form validation.
- Exportable match history with timestamps.
- Dark mode and mobile-first refinements.
- Backend integration (secure auth + DB) and online multiplayer.

---

## 🤝 Contributing

1. Fork the project and create a feature branch.
2. Make your changes with clear commits.
3. Open a PR describing the motivation, approach, and testing steps.

---

## 📄 License

This project is provided **as-is** for learning and demonstration. You may adapt and use it freely. If you include this in a portfolio or coursework, please credit the original author.

---

## 🙌 Acknowledgements

- Built with plain **HTML**, **CSS**, and **JavaScript**.
- Uses **localStorage** for persistence to keep the stack minimal and beginner-friendly.
