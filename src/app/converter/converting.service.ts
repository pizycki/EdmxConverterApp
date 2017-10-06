import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConverterConfiguration } from "./models/ConverterConfiguration";

@Injectable()
export class ConvertingService {

    constructor(
        private http: Http
    ) { }

    public getConfiguration(): Promise<ConverterConfiguration> { // Why ES6 doesnt work ?
        //let api = "http://edmxconv.azurewebsites.net/api/convert/configuration";
        let api = "http://localhost:5555/api/convert/configuration";
        return this.http.get(api)
            .map(res => res.json())
            .map(json => json as ConverterConfiguration)
            .toPromise();
    }

    public convert(model: string, edmxSource: string, edmxTarget: string) {
        // TODO Add 'edmxTarget' to request
        let payload = {
            edmx: model,
            source: edmxSource,
            target: edmxTarget
        }; // Don't append model with quatation marks

        let headers = new Headers(
            { 'Content-Type': 'application/json' }
        );

        let options = new RequestOptions({ headers: headers });
        
        let api = "http://localhost:5555/api/convert";
        return this.http.post(api, JSON.stringify(payload), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
export class ConvertModel {

    public sourceType: string;
    public source: string;

    public targetType: string;
    public target: string;
}