const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3010;

app.prepare().then(() => {
  const server = express();

  server.use(cors({ origin: "*" }));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
