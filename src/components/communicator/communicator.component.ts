import {Component} from "@angular/core";
import {ServerAddress, ServerRoutes} from "../../common/constants";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: "server-communicator",
  imports: [FormsModule, NgIf],
  templateUrl: "./communicator.component.html",
  styleUrls: ["./communicator.component.css"],
})
export class Communicator {
  inputField: string = "";
  resultField: string = "";
  errorMessage: string = "";

  async processServerResponse(response: Response) {
    const body = (await response.text() as string).trim();

    if (!response.ok) {
      this.errorMessage = body;
    } else {
      this.resultField = body;
    }
  }

  async findFilesWithAnyOfTheWord() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.filesWithAnyWord, {
      method: "POST",
      body: this.inputField,
    });

    await this.processServerResponse(response);
  }

  async findFilesWithAllWords() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.filesWithAllWords, {
      method: "POST",
      body: this.inputField,
    });

    await this.processServerResponse(response);
  }

  async addToIndexRequest() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.addToIndex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
  }

  async removeFromIndexRequest() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.removeFromIndex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
  }

  async reindex() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.reindex, {
      method: "POST",
      body: this.inputField
    });

    await this.processServerResponse(response);
  }

  async getAllIndexed() {
    this.errorMessage = "";
    const response = await fetch(ServerAddress + ServerRoutes.getAllIndexed, {
      method: "GET",
    });

    await this.processServerResponse(response);
  }
}
