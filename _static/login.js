(function () {
  const correctUsername = "abclab";
  const correctPassword = "password";

  const showAccessDenied = () => {
    document.documentElement.innerHTML = `
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background-color:#f9f9f9;text-align:center;font-family:sans-serif;">
        <h1 style="color:#cc0000;">🔒 Access Denied</h1>
        <p>Please contact the <strong>ABC Lab Manager</strong> to request access.</p>
        <p>Email: <a href="mailto:labmanager@abcels.umd.edu">labmanager@abcels.umd.edu</a></p>
      </div>
    `;
  };

  const authenticate = () => {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    if (!username || !password || username !== correctUsername || password !== correctPassword) {
      showAccessDenied();
      return false;
    }

    return true;
  };

  // Block rendering until authenticated
  window.addEventListener("DOMContentLoaded", () => {
    if (!authenticate()) {
      // stop further interaction (in case anything slipped through)
      window.stop();
    }
  });
})();
