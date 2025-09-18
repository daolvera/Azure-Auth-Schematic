export const environment = {
  production: false,
  apiUrl: "<API_URL_FOR_DEVELOPMENT>",
  msalConfig: {
    auth: {
      clientId: "<YOUR_CLIENT_ID>",
      authority: "https://login.microsoftonline.com/<YOUR_TENANT_ID>",
      scopes: {
        write: ["api://<YOUR_CLIENT_ID>/<YOUR_CONFIGURED_SCOPE>"],
      },
      redirectUri: "/",
    },
  },
  apiConfig: {
    scopes: ["user.read"],
    uri: "https://graph.microsoft-ppe.com/v1.0/me",
  },
};
