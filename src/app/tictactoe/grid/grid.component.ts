import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() grid: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  @Output() cellClicked = new EventEmitter<{ row: number, col: number }>();

  onCellClicked(row: number, col: number) {
    if (!this.grid[row][col]) {
      this.cellClicked.emit({ row, col });
    }
  }
}
