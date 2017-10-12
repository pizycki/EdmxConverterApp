import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    get API_URL(): string {
        return process.env.API_URL;
    }
}