import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { SampleComponent } from "./sample/sample";
import { LoginFailedComponent } from "./login-failed/login-failed";

export const routes: Routes = [
  { path: "", component: SampleComponent, canActivate: [MsalGuard] },
  { path: "login-failed", component: LoginFailedComponent },
];
