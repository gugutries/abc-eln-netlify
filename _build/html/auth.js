let auth0 = null;

const config = {
  domain: "dev-jtpl6u0fgjkefb5p.us.auth0.com",
  client_id: "YOUR_CLIENT_ID", // replace this
  redirect_uri: window.location.origin + window.location.pathname
};

const initAuth = async () => {
  auth0 = await createAuth0Client(config);

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, config.redirect_uri);
  }

  const isAuth = await auth0.isAuthenticated();

  if (!isAuth && window.location.pathname.includes("index.html")) {
    window.location.href = "login.html";
    return;
  }

  if (window.location.pathname.includes("login.html") && isAuth) {
    window.location.href = "index.html";
    return;
  }

  if (isAuth) {
    const user = await auth0.getUser();
    const welcome = document.getElementById("welcome");
    const content = document.getElementById("content");
    if (welcome) welcome.innerText = `Welcome, ${user.name}`;
    if (content) content.style.display = "block";
  }
};

window.onload = async () => {
  await initAuth();

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) loginBtn.addEventListener("click", () => auth0.loginWithRedirect());

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () =>
    auth0.logout({ returnTo: window.location.origin + "/abc-eln-netlify/login.html" })
  );
};
