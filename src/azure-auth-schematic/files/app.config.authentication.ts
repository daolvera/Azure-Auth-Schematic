import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from "@azure/msal-browser";
import {
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  ProtectedResourceScopes,
} from "@azure/msal-angular";
import { environment } from "./environments/environment";

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: environment.msalConfig.auth.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<
    string,
    Array<string | ProtectedResourceScopes> | null
  >();
  protectedResourceMap.set(
    environment.apiConfig.uri,
    environment.apiConfig.scopes
  );
  protectedResourceMap.set(
    protectedResources.endpoint,
    protectedResources.scopes.write
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

const protectedResources = {
  endpoint: environment.apiUrl,
  scopes: environment.msalConfig.auth.scopes,
};

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes],
    },
    loginFailedRoute: "/login-failed",
  };
}
