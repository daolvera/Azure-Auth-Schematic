export const environment = {
  production: false,
  apiUrl: "<%= apiUrl %>",
  msalConfig: {
    auth: {
      clientId: "<%= clientId %>",
      authority: "https://login.microsoftonline.com/<%= tenantId %>",
      redirectUri: "<%= redirectUri %>",
    },
  },
  apiConfig: {
    scopes: ["<%= apiScope %>"],
    uri: "<%= apiUrl %>",
  },
};
