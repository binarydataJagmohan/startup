const next = require('next');
const https = require('https');
const { parse } = require("url");
const fs = require("fs");

const dev = process.env.NODE_ENV !== 'production';
const port = 3001;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const sslOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/risingcapitalist.com-0001/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/risingcapitalist.com-0001/fullchain.pem")
  };

  const server = https.createServer(sslOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Custom API middleware
    if (pathname.startsWith('/api')) {
      // You might have custom logic for handling API routes
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Custom API Response' }));
    } else {
      // Pass other routes to Next.js
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
