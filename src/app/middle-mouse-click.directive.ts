import {Directive, Output, EventEmitter, HostListener} from '@angular/core';


@Directive({
  selector: '[appMiddleMouseClick]'
})
export class MiddleMouseClickDirective {
  @Output('middleclick') middleclick = new EventEmitter();

  constructor() {
  }

  @HostListener('mouseup', ['$event'])
  middleclickEvent(event) {
    if (event.which === 2) {
      this.middleclick.emit(event);
    }
  }

}
