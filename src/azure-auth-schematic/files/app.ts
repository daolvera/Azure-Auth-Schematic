import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
})
export class App {
  protected readonly title = signal("Azure Auth Schematic Sample");
  protected readonly authService = inject(AuthenticationService);
}
