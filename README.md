# Azure Auth Schematic

This repository is a Schematic implementation that serves as a starting point for an authorized angular application using [MSAL.js v5](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular) to authenticate to an Azure resource. This will get you quickly started on creating a cloud ready Angular application.

## Requirements

- Angular 18 or newer (MSAL v5 drops support for Angular 17 and below)
- No Server-Side Rendering or Static Site Generation (for now)
- An Azure AD application registration (see below)

## Usage

1. Run the schematic in your Angular project (View [the package here](https://www.npmjs.com/package/azure-msal-auth-schematic)):

    ```bash
    ng add azure-msal-auth-schematic
    ```

2. The CLI will prompt you for:
    - `clientId`: Your Azure AD Application (client) ID
    - `tenantId`: Your Azure AD Directory (tenant) ID
    - `apiUrl`: The URL of your protected API
    - `apiScope`: The API scope to request

3. The schematic will:

    - Add MSAL v5 dependencies to your `package.json`
    - Overwrite `src/app/app.config.ts` to register MSAL providers
    - Generate:
      - `src/app/services/authentication.service.ts`
      - `src/app/environments/environment.ts` (pre-populated with your values)
      - `src/app/environments/environment.prod.ts`
      - `src/app/app.config.authentication.ts`
      - `src/app/app.routes.ts`, `src/app/app.ts`, `src/app/app.html`
      - `src/app/sample/sample.ts` — an example guarded component
      - `src/app/login-failed/login-failed.ts` — a component shown on auth failure

4. If you skipped the prompts, update `environment.ts` with your Azure AD values:

    - `clientId`: Your Azure AD Application (client) ID
    - `tenantId`: Your Azure AD Directory (tenant) ID (in the `authority` URL)

## Registering an Azure AD Application

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Register a new application in Azure Active Directory
3. Add a redirect URI (e.g., `http://localhost:4200/`)
4. Copy the Application (client) ID and Directory (tenant) ID
5. Update your `environment.ts` accordingly

## Troubleshooting

- Ensure your project uses Angular 18+ (MSAL v5 requires Angular 18 or newer)
- If you see errors about missing modules in the schematic workspace, they are expected and will not appear in your generated Angular project

## Output

The schematic scaffolds a secure Angular app with MSAL.js v5, ready for Azure AD authentication and API calls.
