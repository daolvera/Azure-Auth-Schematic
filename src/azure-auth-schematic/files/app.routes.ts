import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { SampleComponent } from "./sample/sample";
import { LoginFailedComponent } from "./login-failed/login-failed";

export const routes: Routes = [
  { path: "sample", component: SampleComponent, canActivate: [MsalGuard] },
  { path: "login-failed", component: LoginFailedComponent },
  { path: "**", redirectTo: "" },
];
