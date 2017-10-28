import { Injectable, ViewContainerRef } from "@angular/core";
import { ToastsManager } from "ng2-toastr";

@Injectable()
export class ErrorHandler {

    constructor(
        private toastr: ToastsManager) {
    }

    /**
     * This is required for ToastsManager to work.
     * See https://stackoverflow.com/questions/41278179/anguler2-unhandled-promise-rejection-no-provider-for-viewcontainerref-in-d
     */
    public setViewRef(vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    public handle(err: any): void {
        
        let errJson = err.json();
        let status = err.status;

        if (status === 400) {
            this.toastr.warning(errJson.message, "Invalid request");
        }
        else {
            this.toastr.error(errJson.exceptionMessage, "Server error");
        }
    }
}