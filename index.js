const config = {
    DOC_URL: "this",
}

const express = require('express');
const {JSDOM} = require("jsdom");
const {Readability} = require("@mozilla/readability");
const app = express();
const port = 7777;

function response_page(parsed_article){
    return `
    <!DOCTYPE html>
    <h1>${parsed_article.title}</h1>
    <hr>
    ${parsed_article.content}
    `
}

app.get('/', (req, res) => {
    if(req.query[config.DOC_URL]){
        const request = new Request(req.query[config.DOC_URL]);
        fetch(request).then((response) => {
            if(response.ok) {
                response.text().then((html_body) => {
                    let doc = new JSDOM(html_body, {
                        url: req.query[config.DOC_URL]
                    })
                    let reader = new Readability(doc.window.document);
                    let article = reader.parse();
                    res.send(response_page(article));
                })
            }
        })
    } else {
        res.send(`Hello! Try adding "?${config.DOC_URL}=URL" to read something!`);
    }
})

app.listen(port, () => {
  console.log(`Reader is running at ${port}!`)
})