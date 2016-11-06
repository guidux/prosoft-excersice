import {Injectable} from "@angular/core";
@Injectable()
export class Utils {

    validateDate(dateStr: string): boolean {
        var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        return reg.test(dateStr);
    }

    validateNumber(numberStr: string): boolean {
        let number = parseInt(numberStr);
        let res = false;
        if (!isNaN(number)){
            res = (number % 1) === 0;
        }
        return res;
    }
}