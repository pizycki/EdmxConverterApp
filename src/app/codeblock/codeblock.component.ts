import { Component, OnInit, ElementRef, AfterViewInit, Input, AfterViewChecked } from '@angular/core';
import { HighlightJsService } from 'angular2-highlight-js'; 

@Component({
  selector: 'codeblock',
  template: `
    <!--Don't break line here-->
    <pre class="codeblock" #codeblock><code #snippet class="xml highlight-this" [innerHtml]="code" style="white-space: pre"></code></pre>

    <div>
        <button id="btnHighlight" md-raised-button color="primary" (click)="highlightByService(snippet)">highlight</button>
    </div>
  `,
  styleUrls: ['./codeblock.css'] 
})
export class CodeblockComponent {   

    @Input()
    code : string;

    @Input('codeblock')
    codeblock;

    constructor(private highlightJsService: HighlightJsService) {
    }

    highlightByService(target: ElementRef) {
        this.highlightJsService.highlight(target);
    }
}