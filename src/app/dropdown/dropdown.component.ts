import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'dropdown',
  template: `
  <div class="btn-group" [ngClass]="{'dropup': dropup}">
    <button type="button" class="btn">{{text}}</button>
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span>{{value.label}}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li *ngFor="let v of values">
        <a href="#" (click)="selectItem(v.value)">{{v.label}}</a>
      </li>
    </ul>
  </div>
  `
})
export class DropdownComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    if (this.values.length == 0) {
      throw new Error("Index Out of Bounds");
    }

    this.value = this.values[0];
  }

  @Input()
  text: string;

  @Input()
  dropup: boolean;

  _values: DropdownValue[];
  @Input()
  get values(): DropdownValue[] { return this._values; };
  set values(theValues: DropdownValue[]) {
    this._values = theValues;
    this.selectItem(this._values[0].value);
  }


  @Output()
  onChangeEvent = new EventEmitter();

  /**
   * Selected dropdown value
   */
  value: DropdownValue;

  selectItem(value: number): void {
    this.values.forEach(element => {
      if (element.value == value) {
        this.value = element;
        this.onChangeEvent.emit(this.value.value);
        return;
      }
    });
  }
}

export class DropdownValue {
  value: number;
  label: string;

  constructor(value: number, label: string) {
    this.value = value;
    this.label = label;
  }
}