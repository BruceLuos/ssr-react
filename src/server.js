const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  res.end("hello react ssr");
});

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${3000}`);
});
