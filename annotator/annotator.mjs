import {describeTextQuote, createTextQuoteSelectorMatcher, highlightText} from '@apache-annotator/dom';
import {Readability} from "@mozilla/readability";

let STORAGE = null;
let DOCUMENT_ID = null;

const BROWSER_STORAGE = {
    getData: () => {
        return Object.values(JSON.parse(localStorage[DOCUMENT_ID] || '{}'));
    },
    addToStorage: (annotation) => {
        let data = JSON.parse(localStorage[DOCUMENT_ID] || '{}');
        data[annotation.id] = annotation;
        localStorage[DOCUMENT_ID] = JSON.stringify(data);
    }
}

class Annotation {
    constructor(annotatorSelector, color='yellow', note='', htmlElementID= null) {
        this.id = htmlElementID;
        this.selector = annotatorSelector;
        this.color = color;
        this.note = note;
    }
}

let CONFIG = {
    tag: 'mark-lkl',
    attributes: {
        id: '',
        onclick: ''
    },
}

async function highlight(annotation, scope=document.body) {
    const matches = createTextQuoteSelectorMatcher(annotation.selector)(scope);
    let matchList = [];
    for await (let match of matches) {
        console.log("MATCH", match);
        matchList.push(match);
    }
    let first_match = matchList[0];
    if(first_match) {
        if(!annotation.id) annotation.id = Date.now().toString();
        CONFIG.attributes.id = annotation.id;
        CONFIG.attributes.style = `background-color: ${annotation.color};`;
        highlightText(first_match, CONFIG.tag, CONFIG.attributes);
    } else {
        console.error("No match found for selector", annotation.selector);
    }
}

async function describeCurrentSelection() {
    const userSelection = window.getSelection()?.getRangeAt(0);
    if (!userSelection || userSelection.isCollapsed) return;
    return describeTextQuote(userSelection);
}

// *** EXPORTS *** //

function setupAnnotator(
    highlightClickCallbackStr,
    storageStrategy=BROWSER_STORAGE,
    document_id=document.URL
) {
    DOCUMENT_ID = document_id;
    STORAGE = storageStrategy;
    CONFIG.attributes.onclick = highlightClickCallbackStr;
}

async function highlightCurrentSelection() {
    const selector = await describeCurrentSelection();
    if (selector.exact !== '') {
        let annotation = new Annotation(selector);
        await highlight(annotation);
        STORAGE.addToStorage(annotation);
    }
}

async function refreshHighlights() {
    if (STORAGE) {
        for (const annotation of STORAGE.getData()) {
            console.log("HIGHLIGHT", annotation)
            await highlight(annotation);
        }
    }
}

function openEditMenu(elem_id) {
    let annotation = null;
    for (const annot of STORAGE.getData()) {
        if(annot.id === elem_id){
            annotation = annot;
            break;
        }
    }
    let element = document.getElementById(elem_id);
    if(element && annotation) {
        annotation.color = 'orange';
        element.style.backgroundColor = annotation.color;
        STORAGE.addToStorage(annotation);

    } else {
        console.error(`No highlight element with ID "${elem_id}" found.`);
    }
}

function minimizeHTML(full_page_html, readability_options={}) {
    let iframe_doc = document.getElementById('original-document').contentDocument
    iframe_doc.write(full_page_html);
    let reader = new Readability(iframe_doc, readability_options);
    return reader.parse();
}

export {minimizeHTML, setupAnnotator, highlightCurrentSelection, refreshHighlights, openEditMenu};