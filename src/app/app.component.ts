import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConverterComponent } from './converter/converter.component';
import { AppState } from './app.service';
import { Config } from './common/Configuration';

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
    private appConfig: Config
  ) { }

  public ngOnInit() {
    console.log('API URL', this.appConfig.API_URL);
    console.log('Initial App State', this.appState.state);
  }

}