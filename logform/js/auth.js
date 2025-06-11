// logform/js/auth.js

const clientId = '%%AUTH0_CLIENT_ID%%';
const domain = '%%AUTH0_DOMAIN%%';

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
