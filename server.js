require('dotenv').config();
const express = require('express');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    userAgent: 'yli-backend',
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const app = express();

// Normally defined as separate endpoints...
// Since these will be doing essentially the same thing, they are combined as one.
app.get('/contents/(:path)?', async (req, res, next) => {
    try {
        const { data } = await octokit.rest.repos.getContent({
            owner: 'yli-yasir',
            repo: 'yli-contents',
            path: req.params.path
        });
        const contents = data.map(content => content.name);
        res.json(contents);
    }
    catch(e){
        e.status ? res.sendStatus(e.status) : next(e);
    }
});



app.listen(process.env.PORT, () => console.log('Server has started!'))

