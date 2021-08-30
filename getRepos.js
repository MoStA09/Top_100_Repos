//Imports
const express = require('express')
const router = express.Router();
const fetch = require('node-fetch')

//Get the date one month before current date
var dateObj = new Date();
dateObj.setMonth(dateObj.getMonth() - 1);
var newdate = dateObj.toISOString().split('T')[0];

//GET route to get the languages and the repos using them of top 100 repos on github
router.get('/getRepos', async (req, res) => {
    const results = await fetch(
        `https://api.github.com/search/repositories?q=created:>${newdate}&sort=stars&order=desc?page=1&per_page=100`
    );
    let repos = await results.json();
    //Store the results in map
    var myMap = new Map();
    repos.items.forEach(repo => {
        if (repo.language != null) {
            if (myMap.has(repo.language)) {
                myMap.set(repo.language, myMap.get(repo.language) + ',' + repo.html_url);
            }
            else {
                myMap.set(repo.language, repo.html_url);
            }
        }
    });
    res.send(JSON.stringify([...myMap]));
});

module.exports = router; 