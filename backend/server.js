const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default port
const port = process.env.PORT || 3001;

// Enable CORS for all routes
server.use(cors());
server.use(middlewares);

// Add custom middleware to handle POST/PUT/PATCH requests
server.use(jsonServer.bodyParser);

// Add custom routes if needed
server.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Use default router
server.use(router);

// Start server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`API available at: http://localhost:${port}`);
});
