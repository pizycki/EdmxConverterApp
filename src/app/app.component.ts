import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ConverterComponent } from './converter/converter.component';
import { AppState } from './app.service';
import { Config } from './common/Configuration';
import { ToastsManager } from 'ng2-toastr';
import 'ng2-toastr/bundles/ng2-toastr.min.css';

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
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    public appState: AppState,
    private appConfig: Config,
    public toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    this.toastr.success('You are awesome!', 'Success!');

    console.log('Initial App State', this.appState.state);
  }

  ngAfterViewInit(): void {
    
  }




}