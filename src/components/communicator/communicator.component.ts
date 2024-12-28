import {Component} from "@angular/core";
import {StringManipulator} from "../../common/utils";
import {ServerAddress} from "../../common/constants";

@Component({
  selector: "server-communicator",
  imports: [],
  templateUrl: "./communicator.component.html",
  styleUrl: "./communicator.component.css",
})
export class Communicator {
  constructor(
    private stringManipulator: StringManipulator
  ) {
  }

  async sendRequest(): Promise<any> {
    return fetch(ServerAddress + "/add-index", {method: "POST", body: ""}).then(res => console.log(res));
  }

  private createMessage(): ArrayBuffer {
    const str = "Hello server!";
    const buffer = new ArrayBuffer(str.length + 4);
    const view = new DataView(buffer);

    this.stringManipulator.encodeStringToDataView(view, 4, str, buffer.byteLength);

    return buffer;
  }
}
