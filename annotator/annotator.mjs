import {describeTextQuote, createTextQuoteSelectorMatcher, highlightText} from '@apache-annotator/dom';
import {computePosition} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

let STORAGE = null;

const BROWSER_STORAGE = {
    getData: () => {
        return Object.values(JSON.parse(localStorage[document.URL] || '{}'));
    },
    addToStorage: (annotation) => {
        let data = JSON.parse(localStorage[document.URL] || '{}');
        data[annotation.id] = annotation;
        localStorage[document.URL] = JSON.stringify(data);
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

async function highlight(annotation) {
    const matches = createTextQuoteSelectorMatcher(annotation.selector)(document.body);
    const matchList = [];
    for await (const match of matches) matchList.push(match);
    let match = matchList[0];
    if(!annotation.id) annotation.id = Date.now().toString();
    CONFIG.attributes.id = annotation.id;
    CONFIG.attributes.style = `background-color: ${annotation.color};`;
    highlightText(match, CONFIG.tag, CONFIG.attributes);
}

async function describeCurrentSelection() {
    const userSelection = window.getSelection()?.getRangeAt(0);
    if (!userSelection || userSelection.isCollapsed) return;
    return describeTextQuote(userSelection);
}

// *** EXPORTS *** //

function setup(
    highlightClickCallbackStr,
    storageStrategy=BROWSER_STORAGE
) {
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

export {setup, highlightCurrentSelection, refreshHighlights, openEditMenu};