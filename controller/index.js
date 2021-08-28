const express = require('express');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const server = http.createServer(app);


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});