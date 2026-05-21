import { Injectable, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
 * AuthenticationService uses Angular signals for reactive account state.
 * Requires Angular 18 or newer (MSAL v5 drops Angular 17 and below).
 */
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public activeAccount = signal<AccountInfo | null>(null);

  private readonly msalGuardConfig = inject<MsalGuardConfiguration>(MSAL_GUARD_CONFIG);
  private readonly msalAuthService = inject(MsalService);
  private readonly msalBroadcastService = inject(MsalBroadcastService);

  constructor() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntilDestroyed()
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.msalAuthService.instance.setActiveAccount(payload.account);
        this.activeAccount.set(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  public checkAndSetActiveAccount(): void {
    /**
     * If no active account is set but there are accounts signed in, sets the
     * first account as active. Your app may require more sophisticated selection logic.
     */
    const activeAccount = this.msalAuthService.instance.getActiveAccount();

    if (!activeAccount && this.msalAuthService.instance.getAllAccounts().length > 0) {
      const accounts = this.msalAuthService.instance.getAllAccounts();
      this.msalAuthService.instance.setActiveAccount(accounts[0]);
    }
    this.activeAccount.set(this.msalAuthService.instance.getActiveAccount());
  }

  public login(): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.msalAuthService
        .loginPopup({ scopes: [], prompt: "create" })
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
        });
    } else {
      this.msalAuthService.loginRedirect({ scopes: [], prompt: "create" });
    }
  }

  public logout(popup?: boolean): void {
    if (popup) {
      this.msalAuthService.logoutPopup({
        mainWindowRedirectUri: environment.msalConfig.auth.redirectUri,
      });
    } else {
      this.msalAuthService.logoutRedirect();
    }
  }
}
