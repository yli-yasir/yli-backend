require("dotenv").config();
const express = require("express");
const cors = require("cors");
let { graphql: githubGraphql } = require("@octokit/graphql");

githubGraphql = githubGraphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN : true,
    optionsSuccessStatus: 200, 
  })
);

app.post("/github/graphql", async (req, res, next) => {
  try {
    const githubRes = await githubGraphql(req.body);
    return res.json({ data: githubRes });
  } catch (error) {
    if (error.name === "GraphqlError") {
      return res.json({ errors: error.errors });
    }
    res.status(error.status || 500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log("Server has started!"));
