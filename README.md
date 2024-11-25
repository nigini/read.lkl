# Read.LKL

Read.LKL (reads: read local) is an attempt to build a simple reader (with web-annotation) for HTML documents.

The main values are:

- local first: 
- simplified text layout:
- web standards:

## TEST IT
DEMO server coming soon!!!

## Road Map and Functionalities

### Load an external URL

Right now this thing is using Express to process requests:

 - TODO: Maybe we can do it all serverless???

The simplest version possible is now implemented: 
you just need to load the main page by adding `?this=<URL>` to the main page
(where `<URL>` is the page you want to read).

### Reading Mode

I LOVE the reading experience where popular browsers simplify the page, 
removing all the bloat content (like ads, menus, colors, etc.)

- We are simplifying the loaded page with [mozilla/Readability](https://github.com/mozilla/readability). 
- TODO: Maybe we need a configuration to say we need the full page?

### Web annotation

Who doesn't like to read highlighting stuff?
I am using the annotation web standard as implemented by [apache/annotator](https://annotator.apache.org/docs/getting-started/).

- Implemented the "annotate-lkl" module based on the [Get Started code!](https://annotator.apache.org/docs/getting-started/)
- This only adds a yellow highlight and changes to orange when clicked.
- TODO: Improve annotation tools:
  - add color buttons
  - add remove highlight
  - add note

### Save HTML page 

- TODO: Ability to save annotations in the document and load the page (TOTALLY LKL!)

  
### Save web annotation separately

- TODO


## HOW TO RUN IT?

> npm install
> node index.js

Yep, if you have `node` and `npm` it is this simple. 