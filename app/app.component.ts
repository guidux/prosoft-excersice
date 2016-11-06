import { Component } from '@angular/core';
import {start} from "repl";
import {Utils} from "./shared/utils";
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {

    constructor(private appUtils: Utils) { }
    public formData: any = {
        startDate: "",
        numberDays: "",
        countryCode: ""
    };

    showHolidays(): void {
        let formData = this.formData;
        let startDate = formData.startDate;
        let numberDays = formData.numberDays;
        let countryCode = formData.countryCode;

        if (this.validForm(formData) === true)

        console.log("startDate = " + startDate);
        console.log("numberDays = " + numberDays);
        console.log("countryCode = " + countryCode);
    }

    validForm(formData): any {
        let messages: string[] = [];
        let startDate = formData.startDate;
        let numberDays = formData.numberDays;
        let result;

        if (!this.appUtils.validateDate(startDate)) {
            messages.push("Invalid date. You must provide a date in format MM/DD/YYY such as 08/15/2016");
        }

        if (!this.appUtils.validateDate(numberDays)) {
            messages.push("Invalid number of days. You must provide a integer value.")
        }

        if (messages.length == 0) {
            result = true;
        } else {
            result = messages;
        }

        return result;
    }
}