(function () {
  const expectedUser = "%%USERNAME%%";
  const expectedPass = "%%PASSWORD%%";
  const STORAGE_KEY = "eln_logged_in";

  // Already logged in this session
  if (localStorage.getItem(STORAGE_KEY) === "true") return;

  const user = prompt("Username:");
  if (!user || user !== expectedUser) return denyAccess();

  const pass = prompt("Password:");
  if (!pass || pass !== expectedPass) return denyAccess();

  // ✅ Passed both checks — remember session
  localStorage.setItem(STORAGE_KEY, "true");

  function denyAccess() {
    // Clear page and stop interaction completely
    document.querySelector("html").innerHTML = `
      <head>
        <title>Access Denied</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #f5f5f5;
            color: #333;
            margin: 0;
          }
          h1 { color: #c00; }
          a { color: #0077cc; }
        </style>
      </head>
      <body>
        <h1>🔒 Access Denied</h1>
        <p>Please contact the <strong>ABC Lab Manager</strong> to request access.</p>
        <p>Email: <a href="mailto:labmanager@abclab.umd.edu">labmanager@abclab.umd.edu</a></p>
      </body>
    `;

    // Prevent anything else from running
    throw new Error("Access denied – blocked by login.js");
  }
})();
