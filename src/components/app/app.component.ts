import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Communicator} from "../communicator/communicator.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Communicator, Communicator],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  readonly title = "Inverted Index client";
}
