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

  STYLE_HAS = 'green';
  MATRIX = [];

  ASSETS_FOLDER = 'assets/images/set3/';

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

  onMouseOver(event: MouseEvent): void {
    const el = event.target as HTMLElement;
    const row = el.getAttribute('row');
    const col = el.getAttribute('col');
    el.style.backgroundColor = 'red';
    // $(`#${row}-${col}`).css('backgroundColor', 'red');

    $(`#0-${row}`).css('backgroundColor', 'green');
    $(`#${col}-0`).css('backgroundColor', 'green');

  }

  onMouseLeave(event: MouseEvent): void {
    const el = event.target as HTMLElement;
    const row = el.getAttribute('row');
    const col = el.getAttribute('col');

    if (!(this.MATRIX[col][row].count > 0)) {
      el.style.backgroundColor = 'white';
    }

    if (!(this.MATRIX[col][0].count > 0)) {
      $(`#${col}-0`).css('backgroundColor', 'white');
    }

    if (!(this.MATRIX[0][row].count > 0)) {
      $(`#0-${row}`).css('backgroundColor', 'white');
    }
  }


  onMouseClick(event: MouseEvent) {
    console.log(event);
    const el = event.target as HTMLElement;
    const row = el.getAttribute('row');
    const col = el.getAttribute('col');

    if (row === '0' || col === '0') {
      this.MATRIX[col][row].count += 1;
      this.MATRIX[row][col].count += 1;
    }


    const itemColCount = this.MATRIX[col][0].count;
    const itemRowCount = this.MATRIX[0][row].count;
    if (itemColCount > 0 && itemRowCount > 0) {
      this.buyItem(col, row);
    }
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    const el = event.target as HTMLElement;
    const row = el.getAttribute('row');
    const col = el.getAttribute('col');
    this.MATRIX[col][row].count -= 1;
  }

  buyItem(col, row) {
    this.MATRIX[col][0].count -= 1;
    this.MATRIX[0][row].count -= 1;
  }

  markAsWant(col, row) {
    this.MATRIX[col][row].wanted = !this.MATRIX[col][row].wanted;
  }

  onMiddleMouseClick(event: MouseEvent) {
    const el = event.target as HTMLElement;
    const row = el.getAttribute('row');
    const col = el.getAttribute('col');
    if (event.which === this.MIDDLE_MOUSE_CLICK) {
      this.markAsWant(col, row);
    }
  }

  onMouseLeaveMatrix($event: MouseEvent) {
    for (let col = 1; col < this.MATRIX_DIM.length; col++) {
      for (let row = 1; row < this.MATRIX_DIM.length; row++) {
        if (this.MATRIX[0][row].count > 0 && this.MATRIX[col][0].count > 0) {
          $(`#${col}-${row}`).css('backgroundColor', 'red');
        }
      }
    }
  }

  onMouseEnterMatrix() {
    for (let col = 1; col < this.MATRIX_DIM.length; col++) {
      for (let row = 1; row < this.MATRIX_DIM.length; row++) {
        $(`#${col}-${row}`).css('backgroundColor', 'white');
      }
    }
  }

}
