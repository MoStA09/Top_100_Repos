//Imports
const express = require('express');
const repos = require('./getRepos');

//Initialize the app
const app = express();
app.use(express.json());

//APIs
app.use('/api/repos', repos)

//Start the server on port 5000
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));