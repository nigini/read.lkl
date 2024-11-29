const config = {
    DOC_URL: "READ",
    SERVER_PORT: 7777
}

const fs = require('node:fs');
const express = require('express');

const app = express();
app.use(express.static("./static/"));

app.listen(config.SERVER_PORT, () => {
  console.log(`Read.LKL is running at ${config.SERVER_PORT}!`);
})