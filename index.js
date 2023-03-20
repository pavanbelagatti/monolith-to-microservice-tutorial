const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the microservices application!');
  });

// Service 1
const { getGreeting } = require('./service1/greetings');
app.get('/service1', (req, res) => {
  const greeting = getGreeting();
  res.send(greeting);
});

// Service 2
const { getColors } = require('./service2/colors');
app.get('/service2', (req, res) => {
  const colors = getColors();
  res.send(colors);
});

// API Gateway
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
