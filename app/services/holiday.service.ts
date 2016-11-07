import {Injectable} from "@angular/core";
import {Http, Jsonp, Headers, URLSearchParams, RequestOptions} from "@angular/http";
import {Holiday} from "../models/holiday";
import {Config} from "../shared/config";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HolidayService {
    constructor(private http: Http) {
    }

    getHolidays(startDate: Date, numberDays: number, countryCode: string): Promise<Holiday[]> {

        let headers = new Headers({'Content-Type': 'application/json'});

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("key", Config.API_KEY);
        urlSearchParams.append("upcoming", "true"); // only upcoming holidays
        urlSearchParams.append("country", countryCode);
        urlSearchParams.append("year", startDate.getFullYear().toString());
        urlSearchParams.append("month", (startDate.getMonth() + 1).toString()); // we add 1 because service expects values from 1 to 12 and getMonth() returns values from 0 to 11
        urlSearchParams.append("day", startDate.getDate().toString());

        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });

        return this.http.get(Config.API_URL, options)
            .toPromise()
            .then(response => this.processSuccessRequest(response))
            .catch(this.handleError);

    }


    private processSuccessRequest(response) {
        let jsonResponse = response.json();
        let holidays = jsonResponse.holidays;
        let status = jsonResponse.status;

        if (status === 200 ){
            return holidays as Holiday[];
        } else {
            throw "Server response a code different from 200";
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        // Manage error codes here
        // Return a instance of Error class to have better abstraction

        return Promise.reject(error.message || error);
    }
}