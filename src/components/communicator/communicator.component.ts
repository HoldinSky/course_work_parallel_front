import {Component, OnDestroy, OnInit} from "@angular/core";
import {ServerAddress, ServerRoutes} from "../../common/constants";
import {FormsModule} from "@angular/forms";
import {interval, Subscription} from "rxjs";

@Component({
  selector: "server-communicator",
  imports: [FormsModule],
  templateUrl: "./communicator.component.html",
  styleUrls: ["./communicator.component.css"],
})
export class Communicator implements OnInit, OnDestroy {
  inputField: string = "";
  resultField: string = "";
  isError: boolean = false;

  private readonly testBody: string = "I am sorry";
  private readonly testPath: string = ServerAddress + ServerRoutes.filesWithAllWords;
  private testIntervalId?: any = 0;

  private previouslyProcessedRequests: number = 0;
  processedRequests: number = 0;
  requestsPerSecond: number = 0;

  private millisElapsed = 0;
  private timerSubscription?: Subscription;
  private statsSubscription?: Subscription;
  formattedTime = "0.000";

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private async processServerResponse(response: Response) {
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

  startPerformanceTest() {
    if (this.testIntervalId) {
      return;
    }

    this.testIntervalId = setInterval(async () => {
      const resp = await fetch(this.testPath, {
        method: "POST",
        body: this.testBody,
      });

      if (resp.ok) {
        this.processedRequests++;
      }
    }, 10);

    this.startTimer();
  }

  stopPerformanceTest() {
    clearInterval(this.testIntervalId);
    this.testIntervalId = undefined;

    this.stopTimer();
  }

  private startTimer(): void {
    if (!this.timerSubscription) {
      const startTimestamp = Date.now() - this.millisElapsed;

      this.timerSubscription = interval(50).subscribe(() => {
        this.millisElapsed = Date.now() - startTimestamp;
        this.updateFormattedTime();
      });
    }
    if (!this.statsSubscription) {
      this.statsSubscription = interval(1000).subscribe(() => {
        this.requestsPerSecond = this.processedRequests - this.previouslyProcessedRequests;
        this.previouslyProcessedRequests = this.processedRequests;
      })
    }
  }

  private updateFormattedTime(): void {
    const seconds = Math.floor(this.millisElapsed / 1000);
    const milliseconds = this.millisElapsed % 1000;
    this.formattedTime = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  }

  private stopTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.statsSubscription?.unsubscribe();
    this.timerSubscription = undefined;
    this.statsSubscription = undefined;
  }

  reset(): void {
    this.stopTimer();
    this.millisElapsed = 0;
    this.processedRequests = 0;
    this.requestsPerSecond = 0;
    this.updateFormattedTime();
  }
}
