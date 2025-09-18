import { Inject, Injectable, signal } from "@angular/core";
import {
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
} from "@azure/msal-angular";
import {
  AccountInfo,
  EventMessage,
  EventType,
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
} from "@azure/msal-browser";
import { filter } from "rxjs";
import { environment } from "../environments/environment";

/**
 * AuthenticationService uses Angular signals for state management.
 * Requires Angular 16 or newer.
 */
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public activeAccount = signal<AccountInfo | null>(null);

  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.msalAuthService.instance.setActiveAccount(payload.account);
        this.activeAccount.set(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  public checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.msalAuthService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.msalAuthService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.msalAuthService.instance.getAllAccounts();
      this.msalAuthService.instance.setActiveAccount(accounts[0]);
    }
    this.activeAccount.set(this.msalAuthService.instance.getActiveAccount());
  }

  public login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.msalAuthService
        .loginPopup({
          scopes: [],
          prompt: "create",
        })
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
        });
    } else {
      this.msalAuthService.loginRedirect({
        scopes: [],
        prompt: "create",
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.msalAuthService.logoutPopup({
        mainWindowRedirectUri: environment.msalConfig.auth.redirectUri,
      });
    } else {
      this.msalAuthService.logoutRedirect();
    }
  }
}
