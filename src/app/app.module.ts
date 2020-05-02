import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemMatrixComponent } from './item-matrix/item-matrix.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MiddleMouseClickDirective } from './middle-mouse-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    ItemMatrixComponent,
    MiddleMouseClickDirective
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
