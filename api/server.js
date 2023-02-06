const express = require("express");

const server = express();

const accountRouter = require ("./accounts/accounts-router");

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.use("*", (req, res)=>
{ 
    res.status(404).json({
        message: "Not Found"
    })
}
)

module.exports = server;
