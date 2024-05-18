import { describeTextQuote, createTextQuoteSelectorMatcher, highlightText } from '@apache-annotator/dom';

async function highlightSelectorTarget(textQuoteSelector) {
  const matches = createTextQuoteSelectorMatcher(textQuoteSelector)(document.body);

  // Modifying the DOM while searching can mess up; see issue #112.
  // Therefore, we first collect all matches before highlighting them.
  const matchList = [];
  for await (const match of matches) matchList.push(match);

  for (const match of matchList) highlightText(match);
}

async function describeCurrentSelection() {
  const userSelection = window.getSelection()?.getRangeAt(0);
  if (!userSelection || userSelection.isCollapsed) return;
  return describeTextQuote(userSelection);
}

export {highlightSelectorTarget, describeCurrentSelection, describeTextQuote, highlightText}