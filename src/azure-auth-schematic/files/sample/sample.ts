import { Component } from "@angular/core";

@Component({
  selector: "app-sample",
  standalone: true,
  template: `
    <div
      style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--gray-600);
      border-radius: 1.5rem;
      box-shadow: 0 2px 16px 0 rgb(0 0 0 / 0.16);
      margin: 2rem auto;
      padding: 2.5rem 2rem;
      max-width: 500px;
    "
    >
      <h2
        style="color: #10b981; font-size: 2rem; font-weight: 700; margin-bottom: 1rem; text-align: center; text-shadow: 0 2px 8px #000a;"
      >
        Guarded Content
      </h2>
      <p
        style="color: #a1a1aa; font-size: 1.25rem; text-align: center; margin: 0;"
      >
        This content is an example of guarded content and can only be seen once
        authenticated.
      </p>
    </div>
  `,
})
export class SampleComponent {}
