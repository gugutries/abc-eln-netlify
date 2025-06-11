(function () {
  const user = prompt("Username:");
  const pass = prompt("Password:");
  const expectedUser = "abclab";
  const expectedPass = "password";

  if (user !== expectedUser || pass !== expectedPass) {
    document.body.innerHTML = "<h1>Unauthorized</h1><p>Reload to try again.</p>";
    throw new Error("Unauthorized");
  }
})();
