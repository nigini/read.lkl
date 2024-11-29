# Read.LKL (v 0.3.0)

Read.LKL (reads: read local) is an attempt to build a simple reader (with web-annotation) for HTML documents.

The main values are:

- local first: 
- simplified text layout:
- web standards:

## TEST IT
DEMO server coming soon!!!

## Road Map and Functionalities

The simplest version possible is now implemented: 
you just need to load the main page `reader.html` 
from an HTTP server configure to serve the `static` folder as `/`. 

By adding `?READ=<URL>` to this reader page, (where `<URL>` is the public web page you want to read),
the reader will load, simplify, and show it with annotations enabled. **Just select text to highlight!**

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

### NODE

Just runs an HTTP server with `express`:
> npm install
> node index.js

### PYTHON

Just run a simple HTTP server with `python`:
*DO NOT use in production*

> cd static
> python -m http.server

