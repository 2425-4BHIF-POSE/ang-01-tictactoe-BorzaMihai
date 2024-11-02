import { Component } from '@angular/core';
import {GridComponent} from './grid/grid.component';
import {BoardComponent} from './board/board.component';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [
    GridComponent,
    BoardComponent
  ],
  templateUrl: './tictactoe.component.html',
  styleUrl: './tictactoe.component.scss'
})
export class TictactoeComponent {

}
