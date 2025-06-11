export default async () => {
  return new Response(
    `window.env = {
      AUTH0_DOMAIN: "${process.env.AUTH0_DOMAIN}",
      AUTH0_CLIENT_ID: "${process.env.AUTH0_CLIENT_ID}"
    };`,
    {
      headers: { "Content-Type": "application/javascript" },
    }
  );
};
