import {Component, OnInit} from '@angular/core';
import {element} from 'protractor';
import $ from 'jquery';

export class Cell {
  public wanted: boolean;
  public count: number;
  public imageUrl: string;
  public setImage;

  constructor(wanted, count, imageUrl) {
    this.wanted = wanted;
    this.count = count;
    this.imageUrl = imageUrl;
  }
}

@Component({
  selector: 'app-item-matrix',
  templateUrl: './item-matrix.component.html',
  styleUrls: ['./item-matrix.component.css']
})
export class ItemMatrixComponent implements OnInit {
  MATRIX_DIM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  MIDDLE_MOUSE_CLICK = 2;
  RIGHT_CLICK = 3;

  STYLE_HAS = 'green';
  MATRIX = [];

  ASSETS_FOLDER = 'assets/images/set3/';

  highlight_col_num = -1;
  highlight_row_num = -1;

  constructor() {
    // set inner matrix
    for (let i = 0; i < this.MATRIX_DIM.length; i++) {
      this.MATRIX[i] = new Array(this.MATRIX_DIM.length);
      for (let j = 0; j < this.MATRIX_DIM.length; j++) {
        if (i === 0 && j === 0) {
          this.MATRIX[i][j] = new Cell(false, 0, '');

        } else {
          this.MATRIX[i][j] = new Cell(false, 0, this.ASSETS_FOLDER + `${i}-${j}.png`);

        }
      }
    }
    // // set cols
    // for (let i = 1; i < this.MATRIX_DIM.length; i++) {
    //   this.MATRIX[i][0] = new Cell(false, 0, this.ASSETS_FOLDER + `${i}.png`);
    // }
    // // set rows
    // for (let i = 1; i < this.MATRIX_DIM.length; i++) {
    //   this.MATRIX[0][i] = new Cell(false, 0, this.ASSETS_FOLDER + `${i}.png`);
    // }
  }

  ngOnInit(): void {
  }


  onMouseLeave(): void {
    this.highlight_col_num = -1;
    this.highlight_row_num = -1;
  }


  markAsWant($event, col, row) {
    $event.preventDefault();
    $event.stopPropagation();
    // mark item piece
    if (col === row) {
      this.MATRIX[col][row].wanted = !this.MATRIX[col][row].wanted;
    } else {
      this.MATRIX[row][col].wanted = !this.MATRIX[col][row].wanted;
      this.MATRIX[col][row].wanted = !this.MATRIX[col][row].wanted;
    }

    // if (col === 0 || row === 0) {
    //   this.MATRIX[row][col].wanted = !this.MATRIX[col][row].wanted;
    //   this.MATRIX[col][row].wanted = !this.MATRIX[col][row].wanted;
    // } else {
    //   // mark item
    //
    //   // if any is marked, mark all
    //   if (this.MATRIX[col][row].wanted === true || this.MATRIX[0][row].wanted === true || this.MATRIX[col][0].wanted === true) {
    //     this.MATRIX[col][row].wanted = true;
    //     this.MATRIX[0][row].wanted = true;
    //     this.MATRIX[col][0].wanted = true;
    //   }
    //   // if all is marked, unmark all
    //   else if (this.MATRIX[col][row].wanted === true && this.MATRIX[0][row].wanted === true && this.MATRIX[col][0].wanted === true) {
    //     this.MATRIX[col][row].wanted = false;
    //     this.MATRIX[0][row].wanted = false;
    //     this.MATRIX[col][0].wanted = false;
    //   } else {
    //     // none is marked, mark all
    //     this.MATRIX[col][row].wanted = true;
    //     this.MATRIX[0][row].wanted = true;
    //     this.MATRIX[col][0].wanted = true;
    //   }
    //
    //
    // }

  }


  // ACTIONS

  buyItem(col, row) {
    if (this.MATRIX[col][0].count > 0 && this.MATRIX[0][row].count > 0) {
      this.MATRIX[col][0].count -= 1;
      this.MATRIX[0][row].count -= 1;
    }
  }

  // FLAGS

  canBuy(col, row) {
    return this.MATRIX[0][row].count > 0 && this.MATRIX[col][0].count > 0 && col <= row;
  }


  // MOUSE EVENTS

  onMouseOver(col, row): void {
    this.highlight_col_num = col;
    this.highlight_row_num = row;
  }

  onMouseClick(col, row) {

    // add to count
    if (col === 0 || row === 0) {
      this.MATRIX[col][row].count += 1;
      this.MATRIX[row][col].count += 1;
    } else {
      this.buyItem(col, row);
    }

    // const el = event.target as HTMLElement;
    // const row = el.getAttribute('row');
    // const col = el.getAttribute('col');
    //
    // if (row === '0' || col === '0') {
    //   this.MATRIX[col][row].count += 1;
    //   this.MATRIX[row][col].count += 1;
    // }
    //
    //
    // const itemColCount = this.MATRIX[col][0].count;
    // const itemRowCount = this.MATRIX[0][row].count;
    // if (itemColCount > 0 && itemRowCount > 0) {
    //   this.buyItem(col, row);
    // }
  }

  onOtherClick($event: MouseEvent, col: number, row: number) {
    if ($event.which === this.RIGHT_CLICK) {
      this.MATRIX[col][row].count -= 1;
      this.MATRIX[row][col].count -= 1;
    }
  }
}
