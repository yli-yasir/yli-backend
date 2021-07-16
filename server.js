require('dotenv').config();
const express = require('express');
let { graphql: githubGraphql } = require("@octokit/graphql");

githubGraphql = githubGraphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const app = express();

app.use(express.json());

// Normally defined as separate endpoints...
// Since these will be doing essentially the same thing, they are combined as one.
app.post('/github/graphql', async (req, res, next) => {
  try {
    const githubRes = await githubGraphql(req.body);
    return res.json(githubRes);
  }
  catch (e) {
    const { errors } = e;
    errors ? res.json({ errors }) :
      res.status(e.status || 500).json({ message: e.message });
  }

});



app.listen(3000, () => console.log('Server has started!'))

