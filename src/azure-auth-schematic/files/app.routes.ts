import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { SampleComponent } from "./sample/sample";

export const routes: Routes = [
  { path: "", component: SampleComponent, canActivate: [MsalGuard] },
];
