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

  private initializeGrid(): string[][] {
    return Array(3).fill(null).map(() => Array(3).fill(''));
  }

  handleCellClick({ row, col }: CellClick): void {
    if (!this.grid[row][col] && !this.winner) {
      this.grid[row][col] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      }
    }
  }

  checkWinner(): boolean {
    const winningLines = this.getWinningLines();
    return winningLines.some(line => line.every(cell => cell === this.currentPlayer));
  }

  private getWinningLines(): string[][] {
    return [
      // Rows
      [this.grid[0][0], this.grid[0][1], this.grid[0][2]],
      [this.grid[1][0], this.grid[1][1], this.grid[1][2]],
      [this.grid[2][0], this.grid[2][1], this.grid[2][2]],
      // Columns
      [this.grid[0][0], this.grid[1][0], this.grid[2][0]],
      [this.grid[0][1], this.grid[1][1], this.grid[2][1]],
      [this.grid[0][2], this.grid[1][2], this.grid[2][2]],
      // Diagonals
      [this.grid[0][0], this.grid[1][1], this.grid[2][2]],
      [this.grid[0][2], this.grid[1][1], this.grid[2][0]]
    ];
  }

  restartGame(): void {
    this.grid = this.initializeGrid();
    this.currentPlayer = Player.X;
    this.winner = null;
  }
}

enum Player{
  O = 'O',
  X = 'X'
}

interface CellClick{
  row: number;
  col: number;
}
