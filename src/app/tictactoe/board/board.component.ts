import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, GridComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  currentPlayer: Player = Player.X;
  grid: string[][] = this.initializeGrid();
  winner: Player | null = null;
  isDraw: boolean = false;

  private initializeGrid(): string[][] {
    return Array(3).fill(null).map(() => Array(3).fill(''));
  }

  handleCellClick({ row, col }: CellClick): void {
    if (!this.grid[row][col] && !this.winner && !this.isDraw) {
      this.grid[row][col] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else if (this.checkDraw()) {
        this.isDraw = true;
      } else {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      }
    }
  }

  checkWinner(): boolean {
    const winningLines = this.getWinningLines();
    return winningLines.some(line => line.every(cell => cell === this.currentPlayer));
  }

  checkDraw(): boolean {
    return this.grid.every(row => row.every(cell => cell));
  }

  private getWinningLines(): string[][] {
    const winningLines: string[][] = [];
    const gridSize = this.grid.length;

    // Rows
    for (let i = 0; i < gridSize; i++) {
      winningLines.push(this.grid[i]);
    }

    // Columns
    for (let i = 0; i < gridSize; i++) {
      const column = this.grid.map(row => row[i]);
      winningLines.push(column);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < gridSize; i++) {
      diagonal1.push(this.grid[i][i]);
      diagonal2.push(this.grid[i][gridSize - 1 - i]);
    }
    winningLines.push(diagonal1, diagonal2);

    return winningLines;
  }

  restartGame(): void {
    this.grid = this.initializeGrid();
    this.currentPlayer = Player.X;
    this.winner = null;
    this.isDraw = false;
  }
}

enum Player {
  O = 'O',
  X = 'X'
}

interface CellClick {
  row: number;
  col: number;
}
