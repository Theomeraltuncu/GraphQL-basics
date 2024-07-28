const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const myGraphQLSchema = require("./schema")
const { renderPlaygroundPage } = require("graphql-playground-html");

const app = express()

app.use("/graphql", createHandler({
    schema:myGraphQLSchema,
}))

app.get('/playground', (req, res) => {
    res.send(renderPlaygroundPage({
        endpoint: '/graphql'
    }));
});

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})