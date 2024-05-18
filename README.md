# Read.LKL

Read.LKL (reads: read local) is an attempt to build a simple reader (with web-annotation) for HTML documents.

The main values are:

- local first: 
- simplified text layout:
- web standards: 
- innovation: 

## Road Map and Functionalities

### Load an external URL

- The simplest version possible is now implemented: you just need to load the main page with a `?this=URL` attribute to the URL.

### Parse document with [mozilla/Readability](https://github.com/mozilla/readability)

- This is being done by default now. Maybe we need a configuration to say we need the full page?

### Add web annotation with [apache/annotator](https://annotator.apache.org/docs/getting-started/)

- Created a very rough "annotate-lkl" module based on the [Get Started code!](https://annotator.apache.org/docs/getting-started/)
- This only adds a yellow highlight and stores the annotation to the browser storage.
- TODO:
  - Improve highlight tool, adding at least colors
  - Ability to save annotations in the document (which will only be useful if the user has the JS module locally!?)
  - 

### Export page to HTML file

- TODO

### Save web annotation separately

- TODO
