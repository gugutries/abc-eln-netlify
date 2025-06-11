// _static/js/auth.js

const clientId = 'ztaCW1XvvKmV1I57VcC8HRJI1S82cZSm';
const domain = 'dev-jtpl6u0fgjkefb5p.us.auth0.com';

window.onload = async () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    const auth0 = await createAuth0Client({
      domain,
      client_id: clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    const user = await auth0.getUser();
    if (!user) {
      auth0.loginWithRedirect();
    } else {
      localStorage.setItem("isLoggedIn", true);
    }
  }
};
