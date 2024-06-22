const express = require('express');
const recipesRouter = require('./api/recipes-router');

const server = express();

server.use(express.json());
server.use('/api/recipes', recipesRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
