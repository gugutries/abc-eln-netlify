import { Auth0Client } from "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js";

const auth0 = new Auth0Client({
  domain: window.env.AUTH0_DOMAIN,
  clientId: window.env.AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
});

// Example usage
auth0.isAuthenticated().then((loggedIn) => {
  if (!loggedIn) {
    auth0.loginWithRedirect();
  }
});
