enum Player {
  White,
  Black
}

enum PieceType {
  Man,
  King
}

class Checker {
  constructor(public player: Player, public type: PieceType = PieceType.Man) {}

  crown() {
    this.type = PieceType.King;
  }

  isKing(): boolean {
    return this.type === PieceType.King;
  }
}

class Board {
  private board: (Checker | null)[][];

  constructor() {
    this.board = this.initializeBoard();
  }

  private initializeBoard(): (Checker | null)[][] {
    const newBoard: (Checker | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

    for (let row = 0; row < 3; row++) {
      for (let col = (row + 1) % 2; col < 8; col += 2) {
        newBoard[row][col] = new Checker(Player.White);
      }
    }

    for (let row = 5; row < 8; row++) {
      for (let col = (row + 1) % 2; col < 8; col += 2) {
        newBoard[row][col] = new Checker(Player.Black);
      }
    }

    return newBoard;
  }

  getPiece(row: number, col: number): Checker | null {
    return this.board[row][col];
  }

  movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number): void {
    const piece = this.getPiece(fromRow, fromCol);
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;

    if (piece && piece.player === Player.White && toRow === 7) {
      piece.crown();
    } else if (piece && piece.player === Player.Black && toRow === 0) {
      piece.crown();
    }
  }

  removePiece(row: number, col: number): void {
    this.board[row][col] = null;
  }

  isValidCapture(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const piece = this.getPiece(fromRow, fromCol);
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if (!piece || rowDiff !== 2 || colDiff !== 2) {
      return false;
    }

    const midRow = (fromRow + toRow) / 2;
    const midCol = (fromCol + toCol) / 2;
    const opponentPiece = this.getPiece(midRow, midCol);

    if (opponentPiece && opponentPiece.player !== piece.player) {
      return true;
    }

    return false;
  }

  capturePiece(fromRow: number, fromCol: number, toRow: number, toCol: number): void {
    if (this.isValidCapture(fromRow, fromCol, toRow, toCol)) {
      const midRow = (fromRow + toRow) / 2;
      const midCol = (fromCol + toCol) / 2;
      this.removePiece(midRow, midCol);
      this.movePiece(fromRow, fromCol, toRow, toCol);
    }
  }

  isValidMoveOrCapture(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    return this.isValidMove(fromRow, fromCol, toRow, toCol) || this.isValidCapture(fromRow, fromCol, toRow, toCol);
  }

  isValidMove(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const piece = this.getPiece(fromRow, fromCol);
    if (!piece || this.getPiece(toRow, toCol) !== null) {
      return false;
    }

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if (piece.type === PieceType.Man) {
      if (piece.player === Player.White && toRow > fromRow && rowDiff === 1 && colDiff === 1) {
        return true;
      }
      if (piece.player === Player.Black && toRow < fromRow && rowDiff === 1 && colDiff === 1) {
        return true;
      }
    }

    if (piece.type === PieceType.King && rowDiff === colDiff && rowDiff === 1) {
      return true;
    }

    return false;
  }

  printBoard(): void {
    for (let row = 0; row < 8; row++) {
      let line = "";
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece) {
          line += piece.player === Player.White ? (piece.isKing() ? "W" : "w") : (piece.isKing() ? "B" : "b");
        } else {
          line += ".";
        }
        line += " ";
      }
      console.log(line);
    }
  }

  hasAvailableMoves(player: Player): boolean {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece && piece.player === player) {
          for (let dRow = -2; dRow <= 2; dRow++) {
            for (let dCol = -2; dCol <= 2; dCol++) {
              const newRow = row + dRow;
              const newCol = col + dCol;
              if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if (this.isValidMoveOrCapture(row, col, newRow, newCol)) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  }
}

class Game {
  private board: Board;
  private currentPlayer: Player;

  constructor() {
    this.board = new Board();
    this.currentPlayer = Player.White;
  }

  makeMove(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    if (this.board.isValidCapture(fromRow, fromCol, toRow, toCol)) {
      this.board.capturePiece(fromRow, fromCol, toRow, toCol);

      if (!this.board.hasAvailableMoves(this.currentPlayer)) {
        this.switchPlayer();
      }
      return true;
    } else if (this.board.isValidMove(fromRow, fromCol, toRow, toCol)) {
      this.board.movePiece(fromRow, fromCol, toRow, toCol);
      this.switchPlayer();
      return true;
    } else {
      console.log("Wrong move!");
      return false;
    }
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === Player.White ? Player.Black : Player.White;
  }

  isGameOver(): boolean {
    return !this.board.hasAvailableMoves(Player.White) || !this.board.hasAvailableMoves(Player.Black);
  }

  printBoard(): void {
    this.board.printBoard();
  }
}

const game = new Game();
game.printBoard();

game.makeMove(2, 1, 3, 2);
game.printBoard();
