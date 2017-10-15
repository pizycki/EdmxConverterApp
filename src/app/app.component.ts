import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ConverterComponent } from './converter/converter.component';
import { AppState } from './app.service';
import { Config } from './common/Configuration';
import { ToastsManager } from 'ng2-toastr';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    private appConfig: Config,
    public toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}