import { Component, OnInit, Input, OnChanges, EventEmitter, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { IEdmx, EdmxType } from './edmx'
import { ConvertingService } from './converting.service'
import { EmitterService } from '../common/EmitterService'
import { DropdownValue } from "../dropdown/dropdown.component";
import { ConverterConfiguration, ConvertModel } from "./models/ConverterConfiguration";
import { ErrorHandler } from '../common/ErrorHandler';

@Component({
  selector: 'converter',
  templateUrl: "./converter.component.html"
})
export class ConverterComponent implements OnInit {

  /**
   * Request model
   */
  public model: ConvertModel = {
    sourceType: "XML",
    source: "",
    targetType: "Resource",
    target: ""
  };

  /**
   * Source types
   */
  sourceDropdownValues: DropdownValue[] = [new DropdownValue(-1, "")];

  /**
   * Target types
   */
  targetDropdownValues: DropdownValue[] = [new DropdownValue(-1, "")];

  /**
   * @desc Component configuration
   */
  private config: ConverterConfiguration;

  @Input()
  targetWindowId: string;

  /**
   * 
   * @param service 
   */
  constructor(
    private service: ConvertingService,
    private errorHandler: ErrorHandler,
    vRef: ViewContainerRef) {
    this.errorHandler.setViewRef(vRef);
  }

  /**
   * 
   */
  ngOnInit(): void {

    // Get configuration
    this.service.getConfiguration().then(cfg => {
      this.config = cfg;

      // Set dropdowns
      this.sourceDropdownValues = cfg.sources.map(src => new DropdownValue(src.type, src.name));
      this.targetDropdownValues = cfg.targets.map(trgt => new DropdownValue(trgt.type, trgt.name));

      // Select first values
      this.model.sourceType = this.sourceDropdownValues[0].label;
      this.model.targetType = this.targetDropdownValues[0].label;
    })
      .catch(err => this.errorHandler.handle(err));
  }

  /**
   * 
   */
  public convert(): void {

    let convertOperation: Observable<string>; // The result of convert operation is string.

    convertOperation = this.service.convert(this.model.source, this.model.sourceType, this.model.targetType);

    convertOperation.subscribe(res => {

      // Emit target window event
      EmitterService.get(this.targetWindowId).emit(res);

      this.model.target = res;

      // TODO Block editing
      // TODO Show spinner, when spinner closed, enable editing
    }, err => {
      // Log errors if any
      this.errorHandler.handle(err);
    });
  }

  /**
   * 
   * @param value 
   */
  public handleOnSourceChangeEvent(value: string): void {
    this.model.sourceType = value;
  }

  /**
   * 
   * @param value 
   */
  public handleOnTargetChangeEvent(value: string): void {
    this.model.targetType = value;
  }
}
