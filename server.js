require('dotenv').config();
const express = require('express');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    userAgent: 'yli-backend',
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const app = express();

app.get('/categories', async (req, res, next) => {
    const { data } = await octokit.rest.repos.getContent({
        owner: 'yli-yasir',
        repo: 'yli-contents',
    });
    const categories = data.map((category) => category.name);
    res.json(categories);
})

app.listen(process.env.PORT, () => console.log('Server has started!'))

