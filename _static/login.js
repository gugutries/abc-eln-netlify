(function () {
  const expectedUser = "%%USERNAME%%";
  const expectedPass = "%%PASSWORD%%";
  const STORAGE_KEY = "eln_logged_in";

  // Already logged in?
  if (localStorage.getItem(STORAGE_KEY) === "true") return;

  const user = prompt("Username:");
  if (!user || user !== expectedUser) {
    return showAccessDenied();
  }

  const pass = prompt("Password:");
  if (!pass || pass !== expectedPass) {
    return showAccessDenied();
  }

  // Save login in localStorage
  localStorage.setItem(STORAGE_KEY, "true");

  function showAccessDenied() {
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;text-align:center;font-family:sans-serif;">
        <h1 style="color:#d9534f;">🔒 Access Denied</h1>
        <p style="font-size:1.1em;">Incorrect credentials. Please contact the <strong>ABC Lab Manager</strong>.</p>
        <p style="margin-top:1em;color:#666;">Email: <a href="mailto:labmanager@abclab.umd.edu">labmanager@abclab.umd.edu</a></p>
      </div>
    `;
  }
})();
