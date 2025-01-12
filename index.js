const config = {
    DOC_URL: "READ",
    SERVER_PORT: 7777
}

const allowCrossDomain = (req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  next();
};

const fs = require('node:fs');
const express = require('express');

const app = express();
app.use(express.static("./static/"));
app.use(allowCrossDomain);

app.get('/fetch', (req, res) => {
    const request = new Request(req.query.URL);
    fetch(request).then((response) => {
        if(response.ok) {
            response.text().then((html_body) => {
                res.send(html_body);
            })
        }
    })
})

app.listen(config.SERVER_PORT, () => {
  console.log(`Read.LKL is running at ${config.SERVER_PORT}!`);
})