# Azure Auth Schematic

This repository is a Schematic implementation that serves as a starting point for an authorized angular application using [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/msal-lts/lib/msal-angular) to authenticate to an Azure resource. This will get you quickly started on creating a cloud ready angular application.

## Requirements

- Angular 16 or newer (for signal support in the authentication service)
- No Server-Side Rendering or Static Site Generation (for now)
- An Azure AD application registration (see below)

## Usage

1. Run the schematic in your Angular project (View [the package here](https://www.npmjs.com/package/azure-msal-auth-schematic)):

    ```bash
    ng add azure-msal-auth-schematic
    ```

2. The schematic will:

    - Add MSAL dependencies to your `package.json`
    - Overwrite `src/app/app.config.ts` to register MSAL providers
    - Generate:
    - `src/app/services/authentication.service.ts`
    - `src/app/environments/environment.ts`
    - `src/app/app.config.authentication.ts`
    - `src/app/app.routes.ts`, `src/app/app.ts`, `src/app/app.html`, and a simple `sample` component

3. Update `environment.ts` with your Azure AD values:

    - `clientId`: Your Azure AD Application (client) ID
    - `authority`: Your Azure AD authority URL

## Registering an Azure AD Application

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Register a new application in Azure Active Directory
3. Add a redirect URI (e.g., `http://localhost:4200/`)
4. Copy the Application (client) ID and Directory (tenant) ID
5. Update your `environment.ts` accordingly

## Troubleshooting

- Ensure your project uses Angular 16+ (signals are not available in earlier versions)
- If you see errors about missing modules in the schematic workspace, they are expected and will not appear in your generated Angular project

## Output

The schematic scaffolds a secure Angular app with MSAL.js, ready for Azure AD authentication and API calls.
