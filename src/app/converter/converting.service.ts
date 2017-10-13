import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConverterConfiguration } from "./models/ConverterConfiguration";
import { Config } from '../common/Configuration';

@Injectable()
export class ConvertingService {

    constructor(
        private appConfig: Config,
        private http: Http
    ) { }

    public getConfiguration = (): Promise<ConverterConfiguration> =>
        this.http.get(`${this.appConfig.API_URL}/api/convert/configuration`)
            .map(res => res.json())
            .map(json => json as ConverterConfiguration)
            .toPromise();

    public convert(model: string, edmxSource: string, edmxTarget: string) {
        let payload = {
            edmx: model,
            source: edmxSource,
            target: edmxTarget
        }; // Don't append model with quatation marks

        let options = new RequestOptions({
            headers: new Headers(
                { 'Content-Type': 'application/json' }
            )
        });

        return this.http
            .post(`${this.appConfig.API_URL}/api/convert`, JSON.stringify(payload), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}