require('dotenv').config();
const express = require('express');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    userAgent: 'yli-backend',
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const app = express();

const repoContentOptions = {
    owner: 'yli-yasir',
    repo: 'yli-contents'
};

app.get('/categories', async (req, res, next) => {
    const { data } = await octokit.rest.repos.getContent(repoContentOptions);
    const categories = data.map((category) => category.name);
    res.json(categories);
});

app.get('/categories/:name', async (req, res, next) => {
    const { data } = await octokit.rest.repos.getContent({
        ...repoContentOptions,
        path: `/${req.params.name}`
    });
    const categoryContents = data.map(({ name, download_url }) => ({
        name,
        download_url
    }));
    res.json(categoryContents);
});



app.listen(process.env.PORT, () => console.log('Server has started!'))

