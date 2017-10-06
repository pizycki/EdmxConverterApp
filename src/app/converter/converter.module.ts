import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng2-select';

import { ConverterComponent } from './converter.component';
import { ConvertService } from './convert.service'

@NgModule({

  // TODO
  declarations: [
    ConverterComponent
    
  ],

  // TODO
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SelectModule
  ],

  // TODO
  providers: [
    ConverterComponent
  ],

  // TODO
  bootstrap: [ConverterComponent]
})
export class ConverterModule {

}
