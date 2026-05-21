export const environment = {
  production: true,
  apiUrl: "<%= apiUrl %>",
  msalConfig: {
    auth: {
      clientId: "<%= clientId %>",
      authority: "https://login.microsoftonline.com/<%= tenantId %>",
      scopes: {
        write: ["api://<%= clientId %>/<%= apiScope %>"],
      },
      redirectUri: "<%= redirectUri %>",
    },
  },
  apiConfig: {
    scopes: ["<%= apiScope %>"],
    uri: "<%= apiUrl %>",
  },
};
