const config = {
    DOC_URL: "this",
    SERVER_PORT: 7777
}

const fs = require('node:fs');
const express = require('express');
const {JSDOM} = require("jsdom");
const {Readability} = require("@mozilla/readability");
const Handlebars = require("handlebars");
const app = express();

let article_template = "";

fs.readFile("./templates/article.html", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        article_template = data;
    }
});

function response_page(parsed_article, source_url){
    let page_template = Handlebars.compile(article_template);
    return page_template({
        title: parsed_article.title,
        author: parsed_article.byline,
        url: source_url,
        site_name: parsed_article.siteName,
        published_time: parsed_article.publishedTime,
        content: parsed_article.content
    });
}

app.get('/', (req, res) => {
    if(req.query[config.DOC_URL]){
        const doc_url = req.query[config.DOC_URL];
        const request = new Request(doc_url);
        fetch(request).then((response) => {
            if(response.ok) {
                response.text().then((html_body) => {
                    let doc = new JSDOM(html_body, {
                        url: doc_url
                    })
                    let reader = new Readability(doc.window.document);
                    let article = reader.parse();
                    res.send(response_page(article, doc_url));
                })
            }
        })
    } else {
        res.send(`Hello! Try adding "?${config.DOC_URL}=URL" to read something!`);
    }
})

app.listen(config.SERVER_PORT, () => {
  console.log(`Read.LKL is running at ${config.SERVER_PORT}!`);
})