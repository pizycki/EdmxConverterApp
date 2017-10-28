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

        let error: ErrorModel = ErrorModel.parse(err);

        switch (error.type) {
            case ErrorType.Validation:
                this.ShowWarning(error);
                break;

            case ErrorType.Server:
                this.ShowError(error);
                break;

            default:
                console.log(err);
        }
    }

    private ShowWarning(error: ErrorModel) {
        this.toastr.warning(error.text, "Invalid request");
    }

    private ShowError(error: ErrorModel) {
        this.toastr.error(error.text, "Server error");
    }
}

enum ErrorType { Validation, Server }

class ErrorModel {

    type: ErrorType;
    code: number;
    text: string;

    static parse(err: any): ErrorModel {

        let model: ErrorModel = new ErrorModel();
        let errJson = err.json();

        model.code = err.status;
        model.type = ErrorTypeHelper.mapToErrorType(err.status);
        model.text = model.type === ErrorType.Server ? errJson.exceptionMessage : errJson.message;

        return model;
    }
}

export class ErrorTypeHelper {

    static mapToErrorType = (status: number): ErrorType | undefined =>
        ErrorTypeHelper.is500(status) ? ErrorType.Server
            : ErrorTypeHelper.is400(status) ? ErrorType.Validation
                : undefined;

    static is500 = (status: number): boolean => (status - 500) >= 0;
    static is400 = (status: number): boolean => !ErrorTypeHelper.is500(status) && (status - 400) >= 0;
}