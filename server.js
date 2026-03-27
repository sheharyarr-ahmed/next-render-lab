const { createServer } = require("http");
const server = createServer((req, res) => {
  res.end("Hello world");
});
server.listen(8000, () => console.log("Listening for requests on port 8000"));
