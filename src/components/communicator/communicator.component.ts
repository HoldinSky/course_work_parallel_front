import {Component} from "@angular/core";
import {ServerAddress, ServerRoutes} from "../../common/constants";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "server-communicator",
  imports: [FormsModule],
  templateUrl: "./communicator.component.html",
  styleUrls: ["./communicator.component.css"],
})
export class Communicator {
  inputField: string = "";
  resultField: string = "";
  isError: boolean = false;

  async processServerResponse(response: Response) {
    const body = (await response.text() as string).trim();

    this.isError = !response.ok;
    this.resultField = body;
  }

  async findFilesWithAnyOfTheWord() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.filesWithAnyWord, {
      method: "POST",
      body: this.inputField,
    });

    await this.processServerResponse(response);
  }

  async findFilesWithAllWords() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.filesWithAllWords, {
      method: "POST",
      body: this.inputField,
    });

    await this.processServerResponse(response);
  }

  async addToIndexRequest() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.addToIndex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
    if (!this.isError) {
      this.resultField = "Success";
    }
  }

  async removeFromIndexRequest() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.removeFromIndex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
    if (!this.isError) {
      this.resultField = "Success";
    }
  }

  async reindex() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.reindex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
  }

  async getAllIndexed() {
    this.isError = false;
    const response = await fetch(ServerAddress + ServerRoutes.getAllIndexed, {
      method: "GET",
    });

    await this.processServerResponse(response);
  }
}
