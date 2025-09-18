import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { Sample } from "./sample/sample";

export const routes: Routes = [
  { path: "", component: Sample, canActivate: [MsalGuard] },
];
