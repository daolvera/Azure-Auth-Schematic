import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login-failed",
  imports: [RouterLink],
  template: `
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 4rem auto;
        max-width: 480px;
        padding: 2.5rem 2rem;
        background: var(--gray-800, #27272a);
        border-radius: 1.5rem;
        box-shadow: 0 2px 16px 0 rgb(0 0 0 / 0.18);
      "
    >
      <h2 style="color: #ef4444; font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">
        Sign-in Failed
      </h2>
      <p style="color: #a1a1aa; font-size: 1.1rem; text-align: center; margin-bottom: 1.5rem;">
        Authentication was unsuccessful. Please try again or contact your administrator.
      </p>
      <a routerLink="/" style="color: #10b981; font-weight: 600; text-decoration: underline;">
        Return to Home
      </a>
    </div>
  `,
})
export class LoginFailedComponent {}
