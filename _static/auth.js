window.addEventListener("DOMContentLoaded", async () => {
  const auth0 = await createAuth0Client({
    domain: "dev-jtpl6u0fgjkefb5p.us.auth0.com",
    client_id: "ztaCW1XvvKmV1I57VcC8HRJI1S82cZSm",  // Replace with real ID
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });

  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  const isAuthenticated = await auth0.isAuthenticated();

  if (!isAuthenticated) {
    await auth0.loginWithRedirect();
  } else {
    const user = await auth0.getUser();
    const userDiv = document.createElement("div");
    userDiv.style = "position:fixed;top:0;right:0;background:#f3f3f3;padding:5px 10px;border-radius:0 0 0 8px;z-index:9999;font-size:13px;font-family:sans-serif";
    userDiv.innerHTML = `👤 ${user.name} | <a href="#" onclick="logout()">Logout</a>`;
    document.body.appendChild(userDiv);
  }

  window.logout = () => {
    auth0.logout({ returnTo: window.location.origin });
  };
});
