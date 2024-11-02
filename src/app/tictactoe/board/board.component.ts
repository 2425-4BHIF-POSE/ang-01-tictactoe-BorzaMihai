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
  currentPlayer: 'X' | 'O' = 'X';
  grid: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  winner: string | null = null;

  handleCellClick({ row, col }: { row: number, col: number }) {
    if (!this.grid[row][col] && !this.winner) {
      this.grid[row][col] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const lines = [
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

    return lines.some(line => line.every(cell => cell === this.currentPlayer));
  }

  restartGame() {
    this.grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
