const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(htmlTemplate);
    res.end("Hello world");
  } else if (pathName === "/test") {
    res.end("Test route working");
  } else {
    res.end("THE URL CANNOT BE FOUND");
  }
});

server.listen(8000, () => console.log("Listening for requests on port 8000"));
