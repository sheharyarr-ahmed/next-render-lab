const { readFileSync } = require("fs");
const { createServer } = require("http");
const { renderToString } = require("react-dom/server");
const React = require("react");

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}

function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

const server = createServer((req, res) => {
  const pathName = new URL(req.url, "http://127.0.0.1:8000").pathname;

  if (pathName === "/") {
    const renderedHtml = renderToString(<Home />);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(renderedHtml);
  } else if (pathName === "/test") {
    res.end("Test route working");
  } else {
    res.end("THE URL CANNOT BE FOUND");
  }
});

server.listen(8000, () => console.log("Listening for requests on port 8000"));
