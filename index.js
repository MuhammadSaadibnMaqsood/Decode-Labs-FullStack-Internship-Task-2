const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'backend API is running.',
    endpoints: ['/users', '/users/:id']
  });
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON payload.'
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found.'
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
