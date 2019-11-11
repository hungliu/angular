import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sexPipe"
})
export class SexPipePipe implements PipeTransform {
  transform(value: any, fallback: string): string {
    let returnText = " ";
    if (value == null || value == undefined || value == "") {
      returnText = fallback;
    } else {
      returnText = value;
    }
    return returnText + "";
  }
}
