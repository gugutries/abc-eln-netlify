const fetch = require("node-fetch");

exports.handler = async function (event) {
  const data = JSON.parse(event.body);
  const token = process.env.GITHUB_PAT;

  const filename = `notebooks/${data.date}_${data.pid}.md`;
  const content = `# Session Log – ${data.date} (${data.pid})\n\n**RA**: ${data.ra}\n**Task Order**: ${data.tasks}\n**Bonus**: ${data.bonus}\n\n---\n\n## Session Notes\n\n${data.notes || "_No notes provided_"}`;

  const encoded = Buffer.from(content).toString("base64");

  const res = await fetch(`https://api.github.com/repos/gugutries/abc-eln-netlify/contents/${filename}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Add log for ${data.pid}`,
      content: encoded
    })
  });

  return {
    statusCode: res.ok ? 200 : 500,
    body: await res.text()
  };
};

