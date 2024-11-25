/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
import * as __WEBPACK_EXTERNAL_MODULE_https_cdn_jsdelivr_net_npm_floating_ui_dom_1_6_12_esm_44873b7a__ from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm";
/******/ var __webpack_modules__ = ({

/***/ "./node_modules/optimal-select/lib/adapt.js":
/*!**************************************************!*\
  !*** ./node_modules/optimal-select/lib/adapt.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nexports[\"default\"] = adapt;\n/**\n * # Adapt\n *\n * Check and extend the environment for universal usage.\n */\n\n/**\n * Modify the context based on the environment\n *\n * @param  {HTMLELement} element - [description]\n * @param  {Object}      options - [description]\n * @return {boolean}             - [description]\n */\nfunction adapt(element, options) {\n\n  // detect environment setup\n  if (__webpack_require__.g.document) {\n    return false;\n  } else {\n    __webpack_require__.g.document = options.context || function () {\n      var root = element;\n      while (root.parent) {\n        root = root.parent;\n      }\n      return root;\n    }();\n  }\n\n  // https://github.com/fb55/domhandler/blob/master/index.js#L75\n  var ElementPrototype = Object.getPrototypeOf(__webpack_require__.g.document);\n\n  // alternative descriptor to access elements with filtering invalid elements (e.g. textnodes)\n  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'childTags')) {\n    Object.defineProperty(ElementPrototype, 'childTags', {\n      enumerable: true,\n      get: function get() {\n        return this.children.filter(function (node) {\n          // https://github.com/fb55/domelementtype/blob/master/index.js#L12\n          return node.type === 'tag' || node.type === 'script' || node.type === 'style';\n        });\n      }\n    });\n  }\n\n  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'attributes')) {\n    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes\n    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap\n    Object.defineProperty(ElementPrototype, 'attributes', {\n      enumerable: true,\n      get: function get() {\n        var attribs = this.attribs;\n\n        var attributesNames = Object.keys(attribs);\n        var NamedNodeMap = attributesNames.reduce(function (attributes, attributeName, index) {\n          attributes[index] = {\n            name: attributeName,\n            value: attribs[attributeName]\n          };\n          return attributes;\n        }, {});\n        Object.defineProperty(NamedNodeMap, 'length', {\n          enumerable: false,\n          configurable: false,\n          value: attributesNames.length\n        });\n        return NamedNodeMap;\n      }\n    });\n  }\n\n  if (!ElementPrototype.getAttribute) {\n    // https://docs.webplatform.org/wiki/dom/Element/getAttribute\n    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute\n    ElementPrototype.getAttribute = function (name) {\n      return this.attribs[name] || null;\n    };\n  }\n\n  if (!ElementPrototype.getElementsByTagName) {\n    // https://docs.webplatform.org/wiki/dom/Document/getElementsByTagName\n    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName\n    ElementPrototype.getElementsByTagName = function (tagName) {\n      var HTMLCollection = [];\n      traverseDescendants(this.childTags, function (descendant) {\n        if (descendant.name === tagName || tagName === '*') {\n          HTMLCollection.push(descendant);\n        }\n      });\n      return HTMLCollection;\n    };\n  }\n\n  if (!ElementPrototype.getElementsByClassName) {\n    // https://docs.webplatform.org/wiki/dom/Document/getElementsByClassName\n    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName\n    ElementPrototype.getElementsByClassName = function (className) {\n      var names = className.trim().replace(/\\s+/g, ' ').split(' ');\n      var HTMLCollection = [];\n      traverseDescendants([this], function (descendant) {\n        var descendantClassName = descendant.attribs.class;\n        if (descendantClassName && names.every(function (name) {\n          return descendantClassName.indexOf(name) > -1;\n        })) {\n          HTMLCollection.push(descendant);\n        }\n      });\n      return HTMLCollection;\n    };\n  }\n\n  if (!ElementPrototype.querySelectorAll) {\n    // https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll\n    // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll\n    ElementPrototype.querySelectorAll = function (selectors) {\n      var _this = this;\n\n      selectors = selectors.replace(/(>)(\\S)/g, '$1 $2').trim(); // add space for '>' selector\n\n      // using right to left execution => https://github.com/fb55/css-select#how-does-it-work\n      var instructions = getInstructions(selectors);\n      var discover = instructions.shift();\n\n      var total = instructions.length;\n      return discover(this).filter(function (node) {\n        var step = 0;\n        while (step < total) {\n          node = instructions[step](node, _this);\n          if (!node) {\n            // hierarchy doesn't match\n            return false;\n          }\n          step += 1;\n        }\n        return true;\n      });\n    };\n  }\n\n  if (!ElementPrototype.contains) {\n    // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains\n    ElementPrototype.contains = function (element) {\n      var inclusive = false;\n      traverseDescendants([this], function (descendant, done) {\n        if (descendant === element) {\n          inclusive = true;\n          done();\n        }\n      });\n      return inclusive;\n    };\n  }\n\n  return true;\n}\n\n/**\n * Retrieve transformation steps\n *\n * @param  {Array.<string>}   selectors - [description]\n * @return {Array.<Function>}           - [description]\n */\nfunction getInstructions(selectors) {\n  return selectors.split(' ').reverse().map(function (selector, step) {\n    var discover = step === 0;\n\n    var _selector$split = selector.split(':'),\n        _selector$split2 = _slicedToArray(_selector$split, 2),\n        type = _selector$split2[0],\n        pseudo = _selector$split2[1];\n\n    var validate = null;\n    var instruction = null;\n\n    (function () {\n      switch (true) {\n\n        // child: '>'\n        case />/.test(type):\n          instruction = function checkParent(node) {\n            return function (validate) {\n              return validate(node.parent) && node.parent;\n            };\n          };\n          break;\n\n        // class: '.'\n        case /^\\./.test(type):\n          var names = type.substr(1).split('.');\n          validate = function validate(node) {\n            var nodeClassName = node.attribs.class;\n            return nodeClassName && names.every(function (name) {\n              return nodeClassName.indexOf(name) > -1;\n            });\n          };\n          instruction = function checkClass(node, root) {\n            if (discover) {\n              return node.getElementsByClassName(names.join(' '));\n            }\n            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);\n          };\n          break;\n\n        // attribute: '[key=\"value\"]'\n        case /^\\[/.test(type):\n          var _type$replace$split = type.replace(/\\[|\\]|\"/g, '').split('='),\n              _type$replace$split2 = _slicedToArray(_type$replace$split, 2),\n              attributeKey = _type$replace$split2[0],\n              attributeValue = _type$replace$split2[1];\n\n          validate = function validate(node) {\n            var hasAttribute = Object.keys(node.attribs).indexOf(attributeKey) > -1;\n            if (hasAttribute) {\n              // regard optional attributeValue\n              if (!attributeValue || node.attribs[attributeKey] === attributeValue) {\n                return true;\n              }\n            }\n            return false;\n          };\n          instruction = function checkAttribute(node, root) {\n            if (discover) {\n              var _ret2 = function () {\n                var NodeList = [];\n                traverseDescendants([node], function (descendant) {\n                  if (validate(descendant)) {\n                    NodeList.push(descendant);\n                  }\n                });\n                return {\n                  v: NodeList\n                };\n              }();\n\n              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === \"object\") return _ret2.v;\n            }\n            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);\n          };\n          break;\n\n        // id: '#'\n        case /^#/.test(type):\n          var id = type.substr(1);\n          validate = function validate(node) {\n            return node.attribs.id === id;\n          };\n          instruction = function checkId(node, root) {\n            if (discover) {\n              var _ret3 = function () {\n                var NodeList = [];\n                traverseDescendants([node], function (descendant, done) {\n                  if (validate(descendant)) {\n                    NodeList.push(descendant);\n                    done();\n                  }\n                });\n                return {\n                  v: NodeList\n                };\n              }();\n\n              if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === \"object\") return _ret3.v;\n            }\n            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);\n          };\n          break;\n\n        // universal: '*'\n        case /\\*/.test(type):\n          validate = function validate(node) {\n            return true;\n          };\n          instruction = function checkUniversal(node, root) {\n            if (discover) {\n              var _ret4 = function () {\n                var NodeList = [];\n                traverseDescendants([node], function (descendant) {\n                  return NodeList.push(descendant);\n                });\n                return {\n                  v: NodeList\n                };\n              }();\n\n              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === \"object\") return _ret4.v;\n            }\n            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);\n          };\n          break;\n\n        // tag: '...'\n        default:\n          validate = function validate(node) {\n            return node.name === type;\n          };\n          instruction = function checkTag(node, root) {\n            if (discover) {\n              var _ret5 = function () {\n                var NodeList = [];\n                traverseDescendants([node], function (descendant) {\n                  if (validate(descendant)) {\n                    NodeList.push(descendant);\n                  }\n                });\n                return {\n                  v: NodeList\n                };\n              }();\n\n              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === \"object\") return _ret5.v;\n            }\n            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);\n          };\n      }\n    })();\n\n    if (!pseudo) {\n      return instruction;\n    }\n\n    var rule = pseudo.match(/-(child|type)\\((\\d+)\\)$/);\n    var kind = rule[1];\n    var index = parseInt(rule[2], 10) - 1;\n\n    var validatePseudo = function validatePseudo(node) {\n      if (node) {\n        var compareSet = node.parent.childTags;\n        if (kind === 'type') {\n          compareSet = compareSet.filter(validate);\n        }\n        var nodeIndex = compareSet.findIndex(function (child) {\n          return child === node;\n        });\n        if (nodeIndex === index) {\n          return true;\n        }\n      }\n      return false;\n    };\n\n    return function enhanceInstruction(node) {\n      var match = instruction(node);\n      if (discover) {\n        return match.reduce(function (NodeList, matchedNode) {\n          if (validatePseudo(matchedNode)) {\n            NodeList.push(matchedNode);\n          }\n          return NodeList;\n        }, []);\n      }\n      return validatePseudo(match) && match;\n    };\n  });\n}\n\n/**\n * Walking recursive to invoke callbacks\n *\n * @param {Array.<HTMLElement>} nodes   - [description]\n * @param {Function}            handler - [description]\n */\nfunction traverseDescendants(nodes, handler) {\n  nodes.forEach(function (node) {\n    var progress = true;\n    handler(node, function () {\n      return progress = false;\n    });\n    if (node.childTags && progress) {\n      traverseDescendants(node.childTags, handler);\n    }\n  });\n}\n\n/**\n * Bubble up from bottom to top\n *\n * @param  {HTMLELement} node     - [description]\n * @param  {HTMLELement} root     - [description]\n * @param  {Function}    validate - [description]\n * @return {HTMLELement}          - [description]\n */\nfunction getAncestor(node, root, validate) {\n  while (node.parent) {\n    node = node.parent;\n    if (validate(node)) {\n      return node;\n    }\n    if (node === root) {\n      break;\n    }\n  }\n  return null;\n}\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkYXB0LmpzIl0sIm5hbWVzIjpbImFkYXB0IiwiZWxlbWVudCIsIm9wdGlvbnMiLCJnbG9iYWwiLCJkb2N1bWVudCIsImNvbnRleHQiLCJyb290IiwicGFyZW50IiwiRWxlbWVudFByb3RvdHlwZSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiY2hpbGRyZW4iLCJmaWx0ZXIiLCJub2RlIiwidHlwZSIsImF0dHJpYnMiLCJhdHRyaWJ1dGVzTmFtZXMiLCJrZXlzIiwiTmFtZWROb2RlTWFwIiwicmVkdWNlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU5hbWUiLCJpbmRleCIsIm5hbWUiLCJ2YWx1ZSIsImNvbmZpZ3VyYWJsZSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidGFnTmFtZSIsIkhUTUxDb2xsZWN0aW9uIiwidHJhdmVyc2VEZXNjZW5kYW50cyIsImNoaWxkVGFncyIsImRlc2NlbmRhbnQiLCJwdXNoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsYXNzTmFtZSIsIm5hbWVzIiwidHJpbSIsInJlcGxhY2UiLCJzcGxpdCIsImRlc2NlbmRhbnRDbGFzc05hbWUiLCJjbGFzcyIsImV2ZXJ5IiwiaW5kZXhPZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RvcnMiLCJpbnN0cnVjdGlvbnMiLCJnZXRJbnN0cnVjdGlvbnMiLCJkaXNjb3ZlciIsInNoaWZ0IiwidG90YWwiLCJzdGVwIiwiY29udGFpbnMiLCJpbmNsdXNpdmUiLCJkb25lIiwicmV2ZXJzZSIsIm1hcCIsInNlbGVjdG9yIiwicHNldWRvIiwidmFsaWRhdGUiLCJpbnN0cnVjdGlvbiIsInRlc3QiLCJjaGVja1BhcmVudCIsInN1YnN0ciIsIm5vZGVDbGFzc05hbWUiLCJjaGVja0NsYXNzIiwiam9pbiIsImdldEFuY2VzdG9yIiwiYXR0cmlidXRlS2V5IiwiYXR0cmlidXRlVmFsdWUiLCJoYXNBdHRyaWJ1dGUiLCJjaGVja0F0dHJpYnV0ZSIsIk5vZGVMaXN0IiwiaWQiLCJjaGVja0lkIiwiY2hlY2tVbml2ZXJzYWwiLCJjaGVja1RhZyIsInJ1bGUiLCJtYXRjaCIsImtpbmQiLCJwYXJzZUludCIsInZhbGlkYXRlUHNldWRvIiwiY29tcGFyZVNldCIsIm5vZGVJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwiZW5oYW5jZUluc3RydWN0aW9uIiwibWF0Y2hlZE5vZGUiLCJub2RlcyIsImhhbmRsZXIiLCJmb3JFYWNoIiwicHJvZ3Jlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBYXdCQSxLO0FBYnhCOzs7Ozs7QUFNQTs7Ozs7OztBQU9lLFNBQVNBLEtBQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxPQUF6QixFQUFrQzs7QUFFL0M7QUFDQSxNQUFJQyxPQUFPQyxRQUFYLEVBQXFCO0FBQ25CLFdBQU8sS0FBUDtBQUNELEdBRkQsTUFFTztBQUNMRCxXQUFPQyxRQUFQLEdBQWtCRixRQUFRRyxPQUFSLElBQW9CLFlBQU07QUFDMUMsVUFBSUMsT0FBT0wsT0FBWDtBQUNBLGFBQU9LLEtBQUtDLE1BQVosRUFBb0I7QUFDbEJELGVBQU9BLEtBQUtDLE1BQVo7QUFDRDtBQUNELGFBQU9ELElBQVA7QUFDRCxLQU5vQyxFQUFyQztBQU9EOztBQUVEO0FBQ0EsTUFBTUUsbUJBQW1CQyxPQUFPQyxjQUFQLENBQXNCUCxPQUFPQyxRQUE3QixDQUF6Qjs7QUFFQTtBQUNBLE1BQUksQ0FBQ0ssT0FBT0Usd0JBQVAsQ0FBZ0NILGdCQUFoQyxFQUFrRCxXQUFsRCxDQUFMLEVBQXFFO0FBQ25FQyxXQUFPRyxjQUFQLENBQXNCSixnQkFBdEIsRUFBd0MsV0FBeEMsRUFBcUQ7QUFDbkRLLGtCQUFZLElBRHVDO0FBRW5EQyxTQUZtRCxpQkFFNUM7QUFDTCxlQUFPLEtBQUtDLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQixVQUFDQyxJQUFELEVBQVU7QUFDcEM7QUFDQSxpQkFBT0EsS0FBS0MsSUFBTCxLQUFjLEtBQWQsSUFBdUJELEtBQUtDLElBQUwsS0FBYyxRQUFyQyxJQUFpREQsS0FBS0MsSUFBTCxLQUFjLE9BQXRFO0FBQ0QsU0FITSxDQUFQO0FBSUQ7QUFQa0QsS0FBckQ7QUFTRDs7QUFFRCxNQUFJLENBQUNULE9BQU9FLHdCQUFQLENBQWdDSCxnQkFBaEMsRUFBa0QsWUFBbEQsQ0FBTCxFQUFzRTtBQUNwRTtBQUNBO0FBQ0FDLFdBQU9HLGNBQVAsQ0FBc0JKLGdCQUF0QixFQUF3QyxZQUF4QyxFQUFzRDtBQUNwREssa0JBQVksSUFEd0M7QUFFcERDLFNBRm9ELGlCQUU3QztBQUFBLFlBQ0dLLE9BREgsR0FDZSxJQURmLENBQ0dBLE9BREg7O0FBRUwsWUFBTUMsa0JBQWtCWCxPQUFPWSxJQUFQLENBQVlGLE9BQVosQ0FBeEI7QUFDQSxZQUFNRyxlQUFlRixnQkFBZ0JHLE1BQWhCLENBQXVCLFVBQUNDLFVBQUQsRUFBYUMsYUFBYixFQUE0QkMsS0FBNUIsRUFBc0M7QUFDaEZGLHFCQUFXRSxLQUFYLElBQW9CO0FBQ2xCQyxrQkFBTUYsYUFEWTtBQUVsQkcsbUJBQU9ULFFBQVFNLGFBQVI7QUFGVyxXQUFwQjtBQUlBLGlCQUFPRCxVQUFQO0FBQ0QsU0FOb0IsRUFNbEIsRUFOa0IsQ0FBckI7QUFPQWYsZUFBT0csY0FBUCxDQUFzQlUsWUFBdEIsRUFBb0MsUUFBcEMsRUFBOEM7QUFDNUNULHNCQUFZLEtBRGdDO0FBRTVDZ0Isd0JBQWMsS0FGOEI7QUFHNUNELGlCQUFPUixnQkFBZ0JVO0FBSHFCLFNBQTlDO0FBS0EsZUFBT1IsWUFBUDtBQUNEO0FBbEJtRCxLQUF0RDtBQW9CRDs7QUFFRCxNQUFJLENBQUNkLGlCQUFpQnVCLFlBQXRCLEVBQW9DO0FBQ2xDO0FBQ0E7QUFDQXZCLHFCQUFpQnVCLFlBQWpCLEdBQWdDLFVBQVVKLElBQVYsRUFBZ0I7QUFDOUMsYUFBTyxLQUFLUixPQUFMLENBQWFRLElBQWIsS0FBc0IsSUFBN0I7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsTUFBSSxDQUFDbkIsaUJBQWlCd0Isb0JBQXRCLEVBQTRDO0FBQzFDO0FBQ0E7QUFDQXhCLHFCQUFpQndCLG9CQUFqQixHQUF3QyxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pELFVBQU1DLGlCQUFpQixFQUF2QjtBQUNBQywwQkFBb0IsS0FBS0MsU0FBekIsRUFBb0MsVUFBQ0MsVUFBRCxFQUFnQjtBQUNsRCxZQUFJQSxXQUFXVixJQUFYLEtBQW9CTSxPQUFwQixJQUErQkEsWUFBWSxHQUEvQyxFQUFvRDtBQUNsREMseUJBQWVJLElBQWYsQ0FBb0JELFVBQXBCO0FBQ0Q7QUFDRixPQUpEO0FBS0EsYUFBT0gsY0FBUDtBQUNELEtBUkQ7QUFTRDs7QUFFRCxNQUFJLENBQUMxQixpQkFBaUIrQixzQkFBdEIsRUFBOEM7QUFDNUM7QUFDQTtBQUNBL0IscUJBQWlCK0Isc0JBQWpCLEdBQTBDLFVBQVVDLFNBQVYsRUFBcUI7QUFDN0QsVUFBTUMsUUFBUUQsVUFBVUUsSUFBVixHQUFpQkMsT0FBakIsQ0FBeUIsTUFBekIsRUFBaUMsR0FBakMsRUFBc0NDLEtBQXRDLENBQTRDLEdBQTVDLENBQWQ7QUFDQSxVQUFNVixpQkFBaUIsRUFBdkI7QUFDQUMsMEJBQW9CLENBQUMsSUFBRCxDQUFwQixFQUE0QixVQUFDRSxVQUFELEVBQWdCO0FBQzFDLFlBQU1RLHNCQUFzQlIsV0FBV2xCLE9BQVgsQ0FBbUIyQixLQUEvQztBQUNBLFlBQUlELHVCQUF1QkosTUFBTU0sS0FBTixDQUFZLFVBQUNwQixJQUFEO0FBQUEsaUJBQVVrQixvQkFBb0JHLE9BQXBCLENBQTRCckIsSUFBNUIsSUFBb0MsQ0FBQyxDQUEvQztBQUFBLFNBQVosQ0FBM0IsRUFBMEY7QUFDeEZPLHlCQUFlSSxJQUFmLENBQW9CRCxVQUFwQjtBQUNEO0FBQ0YsT0FMRDtBQU1BLGFBQU9ILGNBQVA7QUFDRCxLQVZEO0FBV0Q7O0FBRUQsTUFBSSxDQUFDMUIsaUJBQWlCeUMsZ0JBQXRCLEVBQXdDO0FBQ3RDO0FBQ0E7QUFDQXpDLHFCQUFpQnlDLGdCQUFqQixHQUFvQyxVQUFVQyxTQUFWLEVBQXFCO0FBQUE7O0FBQ3ZEQSxrQkFBWUEsVUFBVVAsT0FBVixDQUFrQixVQUFsQixFQUE4QixPQUE5QixFQUF1Q0QsSUFBdkMsRUFBWixDQUR1RCxDQUNHOztBQUUxRDtBQUNBLFVBQU1TLGVBQWVDLGdCQUFnQkYsU0FBaEIsQ0FBckI7QUFDQSxVQUFNRyxXQUFXRixhQUFhRyxLQUFiLEVBQWpCOztBQUVBLFVBQU1DLFFBQVFKLGFBQWFyQixNQUEzQjtBQUNBLGFBQU91QixTQUFTLElBQVQsRUFBZXJDLE1BQWYsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JDLFlBQUl1QyxPQUFPLENBQVg7QUFDQSxlQUFPQSxPQUFPRCxLQUFkLEVBQXFCO0FBQ25CdEMsaUJBQU9rQyxhQUFhSyxJQUFiLEVBQW1CdkMsSUFBbkIsUUFBUDtBQUNBLGNBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQUU7QUFDWCxtQkFBTyxLQUFQO0FBQ0Q7QUFDRHVDLGtCQUFRLENBQVI7QUFDRDtBQUNELGVBQU8sSUFBUDtBQUNELE9BVk0sQ0FBUDtBQVdELEtBbkJEO0FBb0JEOztBQUVELE1BQUksQ0FBQ2hELGlCQUFpQmlELFFBQXRCLEVBQWdDO0FBQzlCO0FBQ0FqRCxxQkFBaUJpRCxRQUFqQixHQUE0QixVQUFVeEQsT0FBVixFQUFtQjtBQUM3QyxVQUFJeUQsWUFBWSxLQUFoQjtBQUNBdkIsMEJBQW9CLENBQUMsSUFBRCxDQUFwQixFQUE0QixVQUFDRSxVQUFELEVBQWFzQixJQUFiLEVBQXNCO0FBQ2hELFlBQUl0QixlQUFlcEMsT0FBbkIsRUFBNEI7QUFDMUJ5RCxzQkFBWSxJQUFaO0FBQ0FDO0FBQ0Q7QUFDRixPQUxEO0FBTUEsYUFBT0QsU0FBUDtBQUNELEtBVEQ7QUFVRDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsU0FBU04sZUFBVCxDQUEwQkYsU0FBMUIsRUFBcUM7QUFDbkMsU0FBT0EsVUFBVU4sS0FBVixDQUFnQixHQUFoQixFQUFxQmdCLE9BQXJCLEdBQStCQyxHQUEvQixDQUFtQyxVQUFDQyxRQUFELEVBQVdOLElBQVgsRUFBb0I7QUFDNUQsUUFBTUgsV0FBV0csU0FBUyxDQUExQjs7QUFENEQsMEJBRXJDTSxTQUFTbEIsS0FBVCxDQUFlLEdBQWYsQ0FGcUM7QUFBQTtBQUFBLFFBRXJEMUIsSUFGcUQ7QUFBQSxRQUUvQzZDLE1BRitDOztBQUk1RCxRQUFJQyxXQUFXLElBQWY7QUFDQSxRQUFJQyxjQUFjLElBQWxCOztBQUw0RDtBQU81RCxjQUFRLElBQVI7O0FBRUU7QUFDQSxhQUFLLElBQUlDLElBQUosQ0FBU2hELElBQVQsQ0FBTDtBQUNFK0Msd0JBQWMsU0FBU0UsV0FBVCxDQUFzQmxELElBQXRCLEVBQTRCO0FBQ3hDLG1CQUFPLFVBQUMrQyxRQUFEO0FBQUEscUJBQWNBLFNBQVMvQyxLQUFLVixNQUFkLEtBQXlCVSxLQUFLVixNQUE1QztBQUFBLGFBQVA7QUFDRCxXQUZEO0FBR0E7O0FBRUY7QUFDQSxhQUFLLE1BQU0yRCxJQUFOLENBQVdoRCxJQUFYLENBQUw7QUFDRSxjQUFNdUIsUUFBUXZCLEtBQUtrRCxNQUFMLENBQVksQ0FBWixFQUFleEIsS0FBZixDQUFxQixHQUFyQixDQUFkO0FBQ0FvQixxQkFBVyxrQkFBQy9DLElBQUQsRUFBVTtBQUNuQixnQkFBTW9ELGdCQUFnQnBELEtBQUtFLE9BQUwsQ0FBYTJCLEtBQW5DO0FBQ0EsbUJBQU91QixpQkFBaUI1QixNQUFNTSxLQUFOLENBQVksVUFBQ3BCLElBQUQ7QUFBQSxxQkFBVTBDLGNBQWNyQixPQUFkLENBQXNCckIsSUFBdEIsSUFBOEIsQ0FBQyxDQUF6QztBQUFBLGFBQVosQ0FBeEI7QUFDRCxXQUhEO0FBSUFzQyx3QkFBYyxTQUFTSyxVQUFULENBQXFCckQsSUFBckIsRUFBMkJYLElBQTNCLEVBQWlDO0FBQzdDLGdCQUFJK0MsUUFBSixFQUFjO0FBQ1oscUJBQU9wQyxLQUFLc0Isc0JBQUwsQ0FBNEJFLE1BQU04QixJQUFOLENBQVcsR0FBWCxDQUE1QixDQUFQO0FBQ0Q7QUFDRCxtQkFBUSxPQUFPdEQsSUFBUCxLQUFnQixVQUFqQixHQUErQkEsS0FBSytDLFFBQUwsQ0FBL0IsR0FBZ0RRLFlBQVl2RCxJQUFaLEVBQWtCWCxJQUFsQixFQUF3QjBELFFBQXhCLENBQXZEO0FBQ0QsV0FMRDtBQU1BOztBQUVGO0FBQ0EsYUFBSyxNQUFNRSxJQUFOLENBQVdoRCxJQUFYLENBQUw7QUFBQSxvQ0FDeUNBLEtBQUt5QixPQUFMLENBQWEsVUFBYixFQUF5QixFQUF6QixFQUE2QkMsS0FBN0IsQ0FBbUMsR0FBbkMsQ0FEekM7QUFBQTtBQUFBLGNBQ1M2QixZQURUO0FBQUEsY0FDdUJDLGNBRHZCOztBQUVFVixxQkFBVyxrQkFBQy9DLElBQUQsRUFBVTtBQUNuQixnQkFBTTBELGVBQWVsRSxPQUFPWSxJQUFQLENBQVlKLEtBQUtFLE9BQWpCLEVBQTBCNkIsT0FBMUIsQ0FBa0N5QixZQUFsQyxJQUFrRCxDQUFDLENBQXhFO0FBQ0EsZ0JBQUlFLFlBQUosRUFBa0I7QUFBRTtBQUNsQixrQkFBSSxDQUFDRCxjQUFELElBQW9CekQsS0FBS0UsT0FBTCxDQUFhc0QsWUFBYixNQUErQkMsY0FBdkQsRUFBd0U7QUFDdEUsdUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxtQkFBTyxLQUFQO0FBQ0QsV0FSRDtBQVNBVCx3QkFBYyxTQUFTVyxjQUFULENBQXlCM0QsSUFBekIsRUFBK0JYLElBQS9CLEVBQXFDO0FBQ2pELGdCQUFJK0MsUUFBSixFQUFjO0FBQUE7QUFDWixvQkFBTXdCLFdBQVcsRUFBakI7QUFDQTFDLG9DQUFvQixDQUFDbEIsSUFBRCxDQUFwQixFQUE0QixVQUFDb0IsVUFBRCxFQUFnQjtBQUMxQyxzQkFBSTJCLFNBQVMzQixVQUFULENBQUosRUFBMEI7QUFDeEJ3Qyw2QkFBU3ZDLElBQVQsQ0FBY0QsVUFBZDtBQUNEO0FBQ0YsaUJBSkQ7QUFLQTtBQUFBLHFCQUFPd0M7QUFBUDtBQVBZOztBQUFBO0FBUWI7QUFDRCxtQkFBUSxPQUFPNUQsSUFBUCxLQUFnQixVQUFqQixHQUErQkEsS0FBSytDLFFBQUwsQ0FBL0IsR0FBZ0RRLFlBQVl2RCxJQUFaLEVBQWtCWCxJQUFsQixFQUF3QjBELFFBQXhCLENBQXZEO0FBQ0QsV0FYRDtBQVlBOztBQUVGO0FBQ0EsYUFBSyxLQUFLRSxJQUFMLENBQVVoRCxJQUFWLENBQUw7QUFDRSxjQUFNNEQsS0FBSzVELEtBQUtrRCxNQUFMLENBQVksQ0FBWixDQUFYO0FBQ0FKLHFCQUFXLGtCQUFDL0MsSUFBRCxFQUFVO0FBQ25CLG1CQUFPQSxLQUFLRSxPQUFMLENBQWEyRCxFQUFiLEtBQW9CQSxFQUEzQjtBQUNELFdBRkQ7QUFHQWIsd0JBQWMsU0FBU2MsT0FBVCxDQUFrQjlELElBQWxCLEVBQXdCWCxJQUF4QixFQUE4QjtBQUMxQyxnQkFBSStDLFFBQUosRUFBYztBQUFBO0FBQ1osb0JBQU13QixXQUFXLEVBQWpCO0FBQ0ExQyxvQ0FBb0IsQ0FBQ2xCLElBQUQsQ0FBcEIsRUFBNEIsVUFBQ29CLFVBQUQsRUFBYXNCLElBQWIsRUFBc0I7QUFDaEQsc0JBQUlLLFNBQVMzQixVQUFULENBQUosRUFBMEI7QUFDeEJ3Qyw2QkFBU3ZDLElBQVQsQ0FBY0QsVUFBZDtBQUNBc0I7QUFDRDtBQUNGLGlCQUxEO0FBTUE7QUFBQSxxQkFBT2tCO0FBQVA7QUFSWTs7QUFBQTtBQVNiO0FBQ0QsbUJBQVEsT0FBTzVELElBQVAsS0FBZ0IsVUFBakIsR0FBK0JBLEtBQUsrQyxRQUFMLENBQS9CLEdBQWdEUSxZQUFZdkQsSUFBWixFQUFrQlgsSUFBbEIsRUFBd0IwRCxRQUF4QixDQUF2RDtBQUNELFdBWkQ7QUFhQTs7QUFFRjtBQUNBLGFBQUssS0FBS0UsSUFBTCxDQUFVaEQsSUFBVixDQUFMO0FBQ0U4QyxxQkFBVyxrQkFBQy9DLElBQUQ7QUFBQSxtQkFBVSxJQUFWO0FBQUEsV0FBWDtBQUNBZ0Qsd0JBQWMsU0FBU2UsY0FBVCxDQUF5Qi9ELElBQXpCLEVBQStCWCxJQUEvQixFQUFxQztBQUNqRCxnQkFBSStDLFFBQUosRUFBYztBQUFBO0FBQ1osb0JBQU13QixXQUFXLEVBQWpCO0FBQ0ExQyxvQ0FBb0IsQ0FBQ2xCLElBQUQsQ0FBcEIsRUFBNEIsVUFBQ29CLFVBQUQ7QUFBQSx5QkFBZ0J3QyxTQUFTdkMsSUFBVCxDQUFjRCxVQUFkLENBQWhCO0FBQUEsaUJBQTVCO0FBQ0E7QUFBQSxxQkFBT3dDO0FBQVA7QUFIWTs7QUFBQTtBQUliO0FBQ0QsbUJBQVEsT0FBTzVELElBQVAsS0FBZ0IsVUFBakIsR0FBK0JBLEtBQUsrQyxRQUFMLENBQS9CLEdBQWdEUSxZQUFZdkQsSUFBWixFQUFrQlgsSUFBbEIsRUFBd0IwRCxRQUF4QixDQUF2RDtBQUNELFdBUEQ7QUFRQTs7QUFFRjtBQUNBO0FBQ0VBLHFCQUFXLGtCQUFDL0MsSUFBRCxFQUFVO0FBQ25CLG1CQUFPQSxLQUFLVSxJQUFMLEtBQWNULElBQXJCO0FBQ0QsV0FGRDtBQUdBK0Msd0JBQWMsU0FBU2dCLFFBQVQsQ0FBbUJoRSxJQUFuQixFQUF5QlgsSUFBekIsRUFBK0I7QUFDM0MsZ0JBQUkrQyxRQUFKLEVBQWM7QUFBQTtBQUNaLG9CQUFNd0IsV0FBVyxFQUFqQjtBQUNBMUMsb0NBQW9CLENBQUNsQixJQUFELENBQXBCLEVBQTRCLFVBQUNvQixVQUFELEVBQWdCO0FBQzFDLHNCQUFJMkIsU0FBUzNCLFVBQVQsQ0FBSixFQUEwQjtBQUN4QndDLDZCQUFTdkMsSUFBVCxDQUFjRCxVQUFkO0FBQ0Q7QUFDRixpQkFKRDtBQUtBO0FBQUEscUJBQU93QztBQUFQO0FBUFk7O0FBQUE7QUFRYjtBQUNELG1CQUFRLE9BQU81RCxJQUFQLEtBQWdCLFVBQWpCLEdBQStCQSxLQUFLK0MsUUFBTCxDQUEvQixHQUFnRFEsWUFBWXZELElBQVosRUFBa0JYLElBQWxCLEVBQXdCMEQsUUFBeEIsQ0FBdkQ7QUFDRCxXQVhEO0FBekZKO0FBUDREOztBQThHNUQsUUFBSSxDQUFDRCxNQUFMLEVBQWE7QUFDWCxhQUFPRSxXQUFQO0FBQ0Q7O0FBRUQsUUFBTWlCLE9BQU9uQixPQUFPb0IsS0FBUCxDQUFhLHlCQUFiLENBQWI7QUFDQSxRQUFNQyxPQUFPRixLQUFLLENBQUwsQ0FBYjtBQUNBLFFBQU14RCxRQUFRMkQsU0FBU0gsS0FBSyxDQUFMLENBQVQsRUFBa0IsRUFBbEIsSUFBd0IsQ0FBdEM7O0FBRUEsUUFBTUksaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDckUsSUFBRCxFQUFVO0FBQy9CLFVBQUlBLElBQUosRUFBVTtBQUNSLFlBQUlzRSxhQUFhdEUsS0FBS1YsTUFBTCxDQUFZNkIsU0FBN0I7QUFDQSxZQUFJZ0QsU0FBUyxNQUFiLEVBQXFCO0FBQ25CRyx1QkFBYUEsV0FBV3ZFLE1BQVgsQ0FBa0JnRCxRQUFsQixDQUFiO0FBQ0Q7QUFDRCxZQUFNd0IsWUFBWUQsV0FBV0UsU0FBWCxDQUFxQixVQUFDQyxLQUFEO0FBQUEsaUJBQVdBLFVBQVV6RSxJQUFyQjtBQUFBLFNBQXJCLENBQWxCO0FBQ0EsWUFBSXVFLGNBQWM5RCxLQUFsQixFQUF5QjtBQUN2QixpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELGFBQU8sS0FBUDtBQUNELEtBWkQ7O0FBY0EsV0FBTyxTQUFTaUUsa0JBQVQsQ0FBNkIxRSxJQUE3QixFQUFtQztBQUN4QyxVQUFNa0UsUUFBUWxCLFlBQVloRCxJQUFaLENBQWQ7QUFDQSxVQUFJb0MsUUFBSixFQUFjO0FBQ1osZUFBTzhCLE1BQU01RCxNQUFOLENBQWEsVUFBQ3NELFFBQUQsRUFBV2UsV0FBWCxFQUEyQjtBQUM3QyxjQUFJTixlQUFlTSxXQUFmLENBQUosRUFBaUM7QUFDL0JmLHFCQUFTdkMsSUFBVCxDQUFjc0QsV0FBZDtBQUNEO0FBQ0QsaUJBQU9mLFFBQVA7QUFDRCxTQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQ7QUFDRCxhQUFPUyxlQUFlSCxLQUFmLEtBQXlCQSxLQUFoQztBQUNELEtBWEQ7QUFZRCxHQWhKTSxDQUFQO0FBaUpEOztBQUVEOzs7Ozs7QUFNQSxTQUFTaEQsbUJBQVQsQ0FBOEIwRCxLQUE5QixFQUFxQ0MsT0FBckMsRUFBOEM7QUFDNUNELFFBQU1FLE9BQU4sQ0FBYyxVQUFDOUUsSUFBRCxFQUFVO0FBQ3RCLFFBQUkrRSxXQUFXLElBQWY7QUFDQUYsWUFBUTdFLElBQVIsRUFBYztBQUFBLGFBQU0rRSxXQUFXLEtBQWpCO0FBQUEsS0FBZDtBQUNBLFFBQUkvRSxLQUFLbUIsU0FBTCxJQUFrQjRELFFBQXRCLEVBQWdDO0FBQzlCN0QsMEJBQW9CbEIsS0FBS21CLFNBQXpCLEVBQW9DMEQsT0FBcEM7QUFDRDtBQUNGLEdBTkQ7QUFPRDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTdEIsV0FBVCxDQUFzQnZELElBQXRCLEVBQTRCWCxJQUE1QixFQUFrQzBELFFBQWxDLEVBQTRDO0FBQzFDLFNBQU8vQyxLQUFLVixNQUFaLEVBQW9CO0FBQ2xCVSxXQUFPQSxLQUFLVixNQUFaO0FBQ0EsUUFBSXlELFNBQVMvQyxJQUFULENBQUosRUFBb0I7QUFDbEIsYUFBT0EsSUFBUDtBQUNEO0FBQ0QsUUFBSUEsU0FBU1gsSUFBYixFQUFtQjtBQUNqQjtBQUNEO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJhZGFwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBBZGFwdFxuICpcbiAqIENoZWNrIGFuZCBleHRlbmQgdGhlIGVudmlyb25tZW50IGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gKi9cblxuLyoqXG4gKiBNb2RpZnkgdGhlIGNvbnRleHQgYmFzZWQgb24gdGhlIGVudmlyb25tZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVMZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGFwdCAoZWxlbWVudCwgb3B0aW9ucykge1xuXG4gIC8vIGRldGVjdCBlbnZpcm9ubWVudCBzZXR1cFxuICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLmRvY3VtZW50ID0gb3B0aW9ucy5jb250ZXh0IHx8ICgoKSA9PiB7XG4gICAgICB2YXIgcm9vdCA9IGVsZW1lbnRcbiAgICAgIHdoaWxlIChyb290LnBhcmVudCkge1xuICAgICAgICByb290ID0gcm9vdC5wYXJlbnRcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290XG4gICAgfSkoKVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvZG9taGFuZGxlci9ibG9iL21hc3Rlci9pbmRleC5qcyNMNzVcbiAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwuZG9jdW1lbnQpXG5cbiAgLy8gYWx0ZXJuYXRpdmUgZGVzY3JpcHRvciB0byBhY2Nlc3MgZWxlbWVudHMgd2l0aCBmaWx0ZXJpbmcgaW52YWxpZCBlbGVtZW50cyAoZS5nLiB0ZXh0bm9kZXMpXG4gIGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGRUYWdzJykpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkVGFncycsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmI1NS9kb21lbGVtZW50dHlwZS9ibG9iL21hc3Rlci9pbmRleC5qcyNMMTJcbiAgICAgICAgICByZXR1cm4gbm9kZS50eXBlID09PSAndGFnJyB8fCBub2RlLnR5cGUgPT09ICdzY3JpcHQnIHx8IG5vZGUudHlwZSA9PT0gJ3N0eWxlJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudFByb3RvdHlwZSwgJ2F0dHJpYnV0ZXMnKSkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dHJpYnV0ZXNcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTmFtZWROb2RlTWFwXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnRQcm90b3R5cGUsICdhdHRyaWJ1dGVzJywge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIGNvbnN0IHsgYXR0cmlicyB9ID0gdGhpc1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJzKVxuICAgICAgICBjb25zdCBOYW1lZE5vZGVNYXAgPSBhdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChhdHRyaWJ1dGVzLCBhdHRyaWJ1dGVOYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGF0dHJpYnV0ZXNbaW5kZXhdID0ge1xuICAgICAgICAgICAgbmFtZTogYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBhdHRyaWJzW2F0dHJpYnV0ZU5hbWVdXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gICAgICAgIH0sIHsgfSlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5hbWVkTm9kZU1hcCwgJ2xlbmd0aCcsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBhdHRyaWJ1dGVzTmFtZXMubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBOYW1lZE5vZGVNYXBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmdldEF0dHJpYnV0ZSkge1xuICAgIC8vIGh0dHBzOi8vZG9jcy53ZWJwbGF0Zm9ybS5vcmcvd2lraS9kb20vRWxlbWVudC9nZXRBdHRyaWJ1dGVcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRBdHRyaWJ1dGVcbiAgICBFbGVtZW50UHJvdG90eXBlLmdldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJzW25hbWVdIHx8IG51bGxcbiAgICB9XG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvZG9tL0RvY3VtZW50L2dldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0RWxlbWVudHNCeVRhZ05hbWVcbiAgICBFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lID0gZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgIGNvbnN0IEhUTUxDb2xsZWN0aW9uID0gW11cbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHModGhpcy5jaGlsZFRhZ3MsIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgIGlmIChkZXNjZW5kYW50Lm5hbWUgPT09IHRhZ05hbWUgfHwgdGFnTmFtZSA9PT0gJyonKSB7XG4gICAgICAgICAgSFRNTENvbGxlY3Rpb24ucHVzaChkZXNjZW5kYW50KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIEhUTUxDb2xsZWN0aW9uXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvZG9tL0RvY3VtZW50L2dldEVsZW1lbnRzQnlDbGFzc05hbWVcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRFbGVtZW50c0J5Q2xhc3NOYW1lXG4gICAgRWxlbWVudFByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgY29uc3QgbmFtZXMgPSBjbGFzc05hbWUudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKS5zcGxpdCgnICcpXG4gICAgICBjb25zdCBIVE1MQ29sbGVjdGlvbiA9IFtdXG4gICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFt0aGlzXSwgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudENsYXNzTmFtZSA9IGRlc2NlbmRhbnQuYXR0cmlicy5jbGFzc1xuICAgICAgICBpZiAoZGVzY2VuZGFudENsYXNzTmFtZSAmJiBuYW1lcy5ldmVyeSgobmFtZSkgPT4gZGVzY2VuZGFudENsYXNzTmFtZS5pbmRleE9mKG5hbWUpID4gLTEpKSB7XG4gICAgICAgICAgSFRNTENvbGxlY3Rpb24ucHVzaChkZXNjZW5kYW50KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIEhUTUxDb2xsZWN0aW9uXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvY3NzL3NlbGVjdG9yc19hcGkvcXVlcnlTZWxlY3RvckFsbFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3F1ZXJ5U2VsZWN0b3JBbGxcbiAgICBFbGVtZW50UHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG4gICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKD4pKFxcUykvZywgJyQxICQyJykudHJpbSgpIC8vIGFkZCBzcGFjZSBmb3IgJz4nIHNlbGVjdG9yXG5cbiAgICAgIC8vIHVzaW5nIHJpZ2h0IHRvIGxlZnQgZXhlY3V0aW9uID0+IGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2Nzcy1zZWxlY3QjaG93LWRvZXMtaXQtd29ya1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZ2V0SW5zdHJ1Y3Rpb25zKHNlbGVjdG9ycylcbiAgICAgIGNvbnN0IGRpc2NvdmVyID0gaW5zdHJ1Y3Rpb25zLnNoaWZ0KClcblxuICAgICAgY29uc3QgdG90YWwgPSBpbnN0cnVjdGlvbnMubGVuZ3RoXG4gICAgICByZXR1cm4gZGlzY292ZXIodGhpcykuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgIHZhciBzdGVwID0gMFxuICAgICAgICB3aGlsZSAoc3RlcCA8IHRvdGFsKSB7XG4gICAgICAgICAgbm9kZSA9IGluc3RydWN0aW9uc1tzdGVwXShub2RlLCB0aGlzKVxuICAgICAgICAgIGlmICghbm9kZSkgeyAvLyBoaWVyYXJjaHkgZG9lc24ndCBtYXRjaFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ZXAgKz0gMVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5jb250YWlucykge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL2NvbnRhaW5zXG4gICAgRWxlbWVudFByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgaW5jbHVzaXZlID0gZmFsc2VcbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW3RoaXNdLCAoZGVzY2VuZGFudCwgZG9uZSkgPT4ge1xuICAgICAgICBpZiAoZGVzY2VuZGFudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIGluY2x1c2l2ZSA9IHRydWVcbiAgICAgICAgICBkb25lKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBpbmNsdXNpdmVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIHRyYW5zZm9ybWF0aW9uIHN0ZXBzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59ICAgc2VsZWN0b3JzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPEZ1bmN0aW9uPn0gICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBnZXRJbnN0cnVjdGlvbnMgKHNlbGVjdG9ycykge1xuICByZXR1cm4gc2VsZWN0b3JzLnNwbGl0KCcgJykucmV2ZXJzZSgpLm1hcCgoc2VsZWN0b3IsIHN0ZXApID0+IHtcbiAgICBjb25zdCBkaXNjb3ZlciA9IHN0ZXAgPT09IDBcbiAgICBjb25zdCBbdHlwZSwgcHNldWRvXSA9IHNlbGVjdG9yLnNwbGl0KCc6JylcblxuICAgIHZhciB2YWxpZGF0ZSA9IG51bGxcbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBudWxsXG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcblxuICAgICAgLy8gY2hpbGQ6ICc+J1xuICAgICAgY2FzZSAvPi8udGVzdCh0eXBlKTpcbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja1BhcmVudCAobm9kZSkge1xuICAgICAgICAgIHJldHVybiAodmFsaWRhdGUpID0+IHZhbGlkYXRlKG5vZGUucGFyZW50KSAmJiBub2RlLnBhcmVudFxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGNsYXNzOiAnLidcbiAgICAgIGNhc2UgL15cXC4vLnRlc3QodHlwZSk6XG4gICAgICAgIGNvbnN0IG5hbWVzID0gdHlwZS5zdWJzdHIoMSkuc3BsaXQoJy4nKVxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUNsYXNzTmFtZSA9IG5vZGUuYXR0cmlicy5jbGFzc1xuICAgICAgICAgIHJldHVybiBub2RlQ2xhc3NOYW1lICYmIG5hbWVzLmV2ZXJ5KChuYW1lKSA9PiBub2RlQ2xhc3NOYW1lLmluZGV4T2YobmFtZSkgPiAtMSlcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrQ2xhc3MgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZXMuam9pbignICcpKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gYXR0cmlidXRlOiAnW2tleT1cInZhbHVlXCJdJ1xuICAgICAgY2FzZSAvXlxcWy8udGVzdCh0eXBlKTpcbiAgICAgICAgY29uc3QgW2F0dHJpYnV0ZUtleSwgYXR0cmlidXRlVmFsdWVdID0gdHlwZS5yZXBsYWNlKC9cXFt8XFxdfFwiL2csICcnKS5zcGxpdCgnPScpXG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNBdHRyaWJ1dGUgPSBPYmplY3Qua2V5cyhub2RlLmF0dHJpYnMpLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+IC0xXG4gICAgICAgICAgaWYgKGhhc0F0dHJpYnV0ZSkgeyAvLyByZWdhcmQgb3B0aW9uYWwgYXR0cmlidXRlVmFsdWVcbiAgICAgICAgICAgIGlmICghYXR0cmlidXRlVmFsdWUgfHwgKG5vZGUuYXR0cmlic1thdHRyaWJ1dGVLZXldID09PSBhdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja0F0dHJpYnV0ZSAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgY29uc3QgTm9kZUxpc3QgPSBbXVxuICAgICAgICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbbm9kZV0sIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0ZShkZXNjZW5kYW50KSkge1xuICAgICAgICAgICAgICAgIE5vZGVMaXN0LnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gaWQ6ICcjJ1xuICAgICAgY2FzZSAvXiMvLnRlc3QodHlwZSk6XG4gICAgICAgIGNvbnN0IGlkID0gdHlwZS5zdWJzdHIoMSlcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBub2RlLmF0dHJpYnMuaWQgPT09IGlkXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja0lkIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQsIGRvbmUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlKGRlc2NlbmRhbnQpKSB7XG4gICAgICAgICAgICAgICAgTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KVxuICAgICAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyB1bml2ZXJzYWw6ICcqJ1xuICAgICAgY2FzZSAvXFwqLy50ZXN0KHR5cGUpOlxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB0cnVlXG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tVbml2ZXJzYWwgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IE5vZGVMaXN0ID0gW11cbiAgICAgICAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW25vZGVdLCAoZGVzY2VuZGFudCkgPT4gTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gdGFnOiAnLi4uJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBub2RlLm5hbWUgPT09IHR5cGVcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrVGFnIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlKGRlc2NlbmRhbnQpKSB7XG4gICAgICAgICAgICAgICAgTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcHNldWRvKSB7XG4gICAgICByZXR1cm4gaW5zdHJ1Y3Rpb25cbiAgICB9XG5cbiAgICBjb25zdCBydWxlID0gcHNldWRvLm1hdGNoKC8tKGNoaWxkfHR5cGUpXFwoKFxcZCspXFwpJC8pXG4gICAgY29uc3Qga2luZCA9IHJ1bGVbMV1cbiAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KHJ1bGVbMl0sIDEwKSAtIDFcblxuICAgIGNvbnN0IHZhbGlkYXRlUHNldWRvID0gKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHZhciBjb21wYXJlU2V0ID0gbm9kZS5wYXJlbnQuY2hpbGRUYWdzXG4gICAgICAgIGlmIChraW5kID09PSAndHlwZScpIHtcbiAgICAgICAgICBjb21wYXJlU2V0ID0gY29tcGFyZVNldC5maWx0ZXIodmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gY29tcGFyZVNldC5maW5kSW5kZXgoKGNoaWxkKSA9PiBjaGlsZCA9PT0gbm9kZSlcbiAgICAgICAgaWYgKG5vZGVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZW5oYW5jZUluc3RydWN0aW9uIChub2RlKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGluc3RydWN0aW9uKG5vZGUpXG4gICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlZHVjZSgoTm9kZUxpc3QsIG1hdGNoZWROb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRlUHNldWRvKG1hdGNoZWROb2RlKSkge1xuICAgICAgICAgICAgTm9kZUxpc3QucHVzaChtYXRjaGVkTm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgIH0sIFtdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbGlkYXRlUHNldWRvKG1hdGNoKSAmJiBtYXRjaFxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBXYWxraW5nIHJlY3Vyc2l2ZSB0byBpbnZva2UgY2FsbGJhY2tzXG4gKlxuICogQHBhcmFtIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBub2RlcyAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgICAgICBoYW5kbGVyIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZURlc2NlbmRhbnRzIChub2RlcywgaGFuZGxlcikge1xuICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgdmFyIHByb2dyZXNzID0gdHJ1ZVxuICAgIGhhbmRsZXIobm9kZSwgKCkgPT4gcHJvZ3Jlc3MgPSBmYWxzZSlcbiAgICBpZiAobm9kZS5jaGlsZFRhZ3MgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMobm9kZS5jaGlsZFRhZ3MsIGhhbmRsZXIpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEJ1YmJsZSB1cCBmcm9tIGJvdHRvbSB0byB0b3BcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRUxlbWVudH0gbm9kZSAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRUxlbWVudH0gcm9vdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgdmFsaWRhdGUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtIVE1MRUxlbWVudH0gICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGdldEFuY2VzdG9yIChub2RlLCByb290LCB2YWxpZGF0ZSkge1xuICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRcbiAgICBpZiAodmFsaWRhdGUobm9kZSkpIHtcbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuICAgIGlmIChub2RlID09PSByb290KSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuIl19\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/adapt.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/common.js":
/*!***************************************************!*\
  !*** ./node_modules/optimal-select/lib/common.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.getCommonAncestor = getCommonAncestor;\nexports.getCommonProperties = getCommonProperties;\n/**\n * # Common\n *\n * Process collections for similarities.\n */\n\n/**\n * Find the last common ancestor of elements\n *\n * @param  {Array.<HTMLElements>} elements - [description]\n * @return {HTMLElement}                   - [description]\n */\nfunction getCommonAncestor(elements) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var _options$root = options.root,\n      root = _options$root === undefined ? document : _options$root;\n\n\n  var ancestors = [];\n\n  elements.forEach(function (element, index) {\n    var parents = [];\n    while (element !== root) {\n      element = element.parentNode;\n      parents.unshift(element);\n    }\n    ancestors[index] = parents;\n  });\n\n  ancestors.sort(function (curr, next) {\n    return curr.length - next.length;\n  });\n\n  var shallowAncestor = ancestors.shift();\n\n  var ancestor = null;\n\n  var _loop = function _loop() {\n    var parent = shallowAncestor[i];\n    var missing = ancestors.some(function (otherParents) {\n      return !otherParents.some(function (otherParent) {\n        return otherParent === parent;\n      });\n    });\n\n    if (missing) {\n      // TODO: find similar sub-parents, not the top root, e.g. sharing a class selector\n      return 'break';\n    }\n\n    ancestor = parent;\n  };\n\n  for (var i = 0, l = shallowAncestor.length; i < l; i++) {\n    var _ret = _loop();\n\n    if (_ret === 'break') break;\n  }\n\n  return ancestor;\n}\n\n/**\n * Get a set of common properties of elements\n *\n * @param  {Array.<HTMLElement>} elements - [description]\n * @return {Object}                       - [description]\n */\nfunction getCommonProperties(elements) {\n\n  var commonProperties = {\n    classes: [],\n    attributes: {},\n    tag: null\n  };\n\n  elements.forEach(function (element) {\n    var commonClasses = commonProperties.classes,\n        commonAttributes = commonProperties.attributes,\n        commonTag = commonProperties.tag;\n\n    // ~ classes\n\n    if (commonClasses !== undefined) {\n      var classes = element.getAttribute('class');\n      if (classes) {\n        classes = classes.trim().split(' ');\n        if (!commonClasses.length) {\n          commonProperties.classes = classes;\n        } else {\n          commonClasses = commonClasses.filter(function (entry) {\n            return classes.some(function (name) {\n              return name === entry;\n            });\n          });\n          if (commonClasses.length) {\n            commonProperties.classes = commonClasses;\n          } else {\n            delete commonProperties.classes;\n          }\n        }\n      } else {\n        // TODO: restructure removal as 2x set / 2x delete, instead of modify always replacing with new collection\n        delete commonProperties.classes;\n      }\n    }\n\n    // ~ attributes\n    if (commonAttributes !== undefined) {\n      (function () {\n        var elementAttributes = element.attributes;\n        var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {\n          var attribute = elementAttributes[key];\n          var attributeName = attribute.name;\n          // NOTE: workaround detection for non-standard phantomjs NamedNodeMap behaviour\n          // (issue: https://github.com/ariya/phantomjs/issues/14634)\n          if (attribute && attributeName !== 'class') {\n            attributes[attributeName] = attribute.value;\n          }\n          return attributes;\n        }, {});\n\n        var attributesNames = Object.keys(attributes);\n        var commonAttributesNames = Object.keys(commonAttributes);\n\n        if (attributesNames.length) {\n          if (!commonAttributesNames.length) {\n            commonProperties.attributes = attributes;\n          } else {\n            commonAttributes = commonAttributesNames.reduce(function (nextCommonAttributes, name) {\n              var value = commonAttributes[name];\n              if (value === attributes[name]) {\n                nextCommonAttributes[name] = value;\n              }\n              return nextCommonAttributes;\n            }, {});\n            if (Object.keys(commonAttributes).length) {\n              commonProperties.attributes = commonAttributes;\n            } else {\n              delete commonProperties.attributes;\n            }\n          }\n        } else {\n          delete commonProperties.attributes;\n        }\n      })();\n    }\n\n    // ~ tag\n    if (commonTag !== undefined) {\n      var tag = element.tagName.toLowerCase();\n      if (!commonTag) {\n        commonProperties.tag = tag;\n      } else if (tag !== commonTag) {\n        delete commonProperties.tag;\n      }\n    }\n  });\n\n  return commonProperties;\n}\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJnZXRDb21tb25BbmNlc3RvciIsImdldENvbW1vblByb3BlcnRpZXMiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJyb290IiwiZG9jdW1lbnQiLCJhbmNlc3RvcnMiLCJmb3JFYWNoIiwiZWxlbWVudCIsImluZGV4IiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0IiwibGVuZ3RoIiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsInBhcmVudCIsImkiLCJtaXNzaW5nIiwic29tZSIsIm90aGVyUGFyZW50cyIsIm90aGVyUGFyZW50IiwibCIsImNvbW1vblByb3BlcnRpZXMiLCJjbGFzc2VzIiwiYXR0cmlidXRlcyIsInRhZyIsImNvbW1vbkNsYXNzZXMiLCJjb21tb25BdHRyaWJ1dGVzIiwiY29tbW9uVGFnIiwidW5kZWZpbmVkIiwiZ2V0QXR0cmlidXRlIiwidHJpbSIsInNwbGl0IiwiZmlsdGVyIiwiZW50cnkiLCJuYW1lIiwiZWxlbWVudEF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwia2V5IiwiYXR0cmlidXRlIiwiYXR0cmlidXRlTmFtZSIsInZhbHVlIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWdCQSxpQixHQUFBQSxpQjtRQThDQUMsbUIsR0FBQUEsbUI7QUExRGhCOzs7Ozs7QUFNQTs7Ozs7O0FBTU8sU0FBU0QsaUJBQVQsQ0FBNEJFLFFBQTVCLEVBQW9EO0FBQUEsTUFBZEMsT0FBYyx1RUFBSixFQUFJO0FBQUEsc0JBSXJEQSxPQUpxRCxDQUd2REMsSUFIdUQ7QUFBQSxNQUd2REEsSUFIdUQsaUNBR2hEQyxRQUhnRDs7O0FBTXpELE1BQU1DLFlBQVksRUFBbEI7O0FBRUFKLFdBQVNLLE9BQVQsQ0FBaUIsVUFBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQW9CO0FBQ25DLFFBQU1DLFVBQVUsRUFBaEI7QUFDQSxXQUFPRixZQUFZSixJQUFuQixFQUF5QjtBQUN2QkksZ0JBQVVBLFFBQVFHLFVBQWxCO0FBQ0FELGNBQVFFLE9BQVIsQ0FBZ0JKLE9BQWhCO0FBQ0Q7QUFDREYsY0FBVUcsS0FBVixJQUFtQkMsT0FBbkI7QUFDRCxHQVBEOztBQVNBSixZQUFVTyxJQUFWLENBQWUsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQO0FBQUEsV0FBZ0JELEtBQUtFLE1BQUwsR0FBY0QsS0FBS0MsTUFBbkM7QUFBQSxHQUFmOztBQUVBLE1BQU1DLGtCQUFrQlgsVUFBVVksS0FBVixFQUF4Qjs7QUFFQSxNQUFJQyxXQUFXLElBQWY7O0FBckJ5RDtBQXdCdkQsUUFBTUMsU0FBU0gsZ0JBQWdCSSxDQUFoQixDQUFmO0FBQ0EsUUFBTUMsVUFBVWhCLFVBQVVpQixJQUFWLENBQWUsVUFBQ0MsWUFBRCxFQUFrQjtBQUMvQyxhQUFPLENBQUNBLGFBQWFELElBQWIsQ0FBa0IsVUFBQ0UsV0FBRDtBQUFBLGVBQWlCQSxnQkFBZ0JMLE1BQWpDO0FBQUEsT0FBbEIsQ0FBUjtBQUNELEtBRmUsQ0FBaEI7O0FBSUEsUUFBSUUsT0FBSixFQUFhO0FBQ1g7QUFDQTtBQUNEOztBQUVESCxlQUFXQyxNQUFYO0FBbEN1RDs7QUF1QnpELE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdLLElBQUlULGdCQUFnQkQsTUFBcEMsRUFBNENLLElBQUlLLENBQWhELEVBQW1ETCxHQUFuRCxFQUF3RDtBQUFBOztBQUFBLDBCQVFwRDtBQUlIOztBQUVELFNBQU9GLFFBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTU8sU0FBU2xCLG1CQUFULENBQThCQyxRQUE5QixFQUF3Qzs7QUFFN0MsTUFBTXlCLG1CQUFtQjtBQUN2QkMsYUFBUyxFQURjO0FBRXZCQyxnQkFBWSxFQUZXO0FBR3ZCQyxTQUFLO0FBSGtCLEdBQXpCOztBQU1BNUIsV0FBU0ssT0FBVCxDQUFpQixVQUFDQyxPQUFELEVBQWE7QUFBQSxRQUdqQnVCLGFBSGlCLEdBTXhCSixnQkFOd0IsQ0FHMUJDLE9BSDBCO0FBQUEsUUFJZEksZ0JBSmMsR0FNeEJMLGdCQU53QixDQUkxQkUsVUFKMEI7QUFBQSxRQUtyQkksU0FMcUIsR0FNeEJOLGdCQU53QixDQUsxQkcsR0FMMEI7O0FBUTVCOztBQUNBLFFBQUlDLGtCQUFrQkcsU0FBdEIsRUFBaUM7QUFDL0IsVUFBSU4sVUFBVXBCLFFBQVEyQixZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFJUCxPQUFKLEVBQWE7QUFDWEEsa0JBQVVBLFFBQVFRLElBQVIsR0FBZUMsS0FBZixDQUFxQixHQUFyQixDQUFWO0FBQ0EsWUFBSSxDQUFDTixjQUFjZixNQUFuQixFQUEyQjtBQUN6QlcsMkJBQWlCQyxPQUFqQixHQUEyQkEsT0FBM0I7QUFDRCxTQUZELE1BRU87QUFDTEcsMEJBQWdCQSxjQUFjTyxNQUFkLENBQXFCLFVBQUNDLEtBQUQ7QUFBQSxtQkFBV1gsUUFBUUwsSUFBUixDQUFhLFVBQUNpQixJQUFEO0FBQUEscUJBQVVBLFNBQVNELEtBQW5CO0FBQUEsYUFBYixDQUFYO0FBQUEsV0FBckIsQ0FBaEI7QUFDQSxjQUFJUixjQUFjZixNQUFsQixFQUEwQjtBQUN4QlcsNkJBQWlCQyxPQUFqQixHQUEyQkcsYUFBM0I7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT0osaUJBQWlCQyxPQUF4QjtBQUNEO0FBQ0Y7QUFDRixPQVpELE1BWU87QUFDTDtBQUNBLGVBQU9ELGlCQUFpQkMsT0FBeEI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsUUFBSUkscUJBQXFCRSxTQUF6QixFQUFvQztBQUFBO0FBQ2xDLFlBQU1PLG9CQUFvQmpDLFFBQVFxQixVQUFsQztBQUNBLFlBQU1BLGFBQWFhLE9BQU9DLElBQVAsQ0FBWUYsaUJBQVosRUFBK0JHLE1BQS9CLENBQXNDLFVBQUNmLFVBQUQsRUFBYWdCLEdBQWIsRUFBcUI7QUFDNUUsY0FBTUMsWUFBWUwsa0JBQWtCSSxHQUFsQixDQUFsQjtBQUNBLGNBQU1FLGdCQUFnQkQsVUFBVU4sSUFBaEM7QUFDQTtBQUNBO0FBQ0EsY0FBSU0sYUFBYUMsa0JBQWtCLE9BQW5DLEVBQTRDO0FBQzFDbEIsdUJBQVdrQixhQUFYLElBQTRCRCxVQUFVRSxLQUF0QztBQUNEO0FBQ0QsaUJBQU9uQixVQUFQO0FBQ0QsU0FUa0IsRUFTaEIsRUFUZ0IsQ0FBbkI7O0FBV0EsWUFBTW9CLGtCQUFrQlAsT0FBT0MsSUFBUCxDQUFZZCxVQUFaLENBQXhCO0FBQ0EsWUFBTXFCLHdCQUF3QlIsT0FBT0MsSUFBUCxDQUFZWCxnQkFBWixDQUE5Qjs7QUFFQSxZQUFJaUIsZ0JBQWdCakMsTUFBcEIsRUFBNEI7QUFDMUIsY0FBSSxDQUFDa0Msc0JBQXNCbEMsTUFBM0IsRUFBbUM7QUFDakNXLDZCQUFpQkUsVUFBakIsR0FBOEJBLFVBQTlCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xHLCtCQUFtQmtCLHNCQUFzQk4sTUFBdEIsQ0FBNkIsVUFBQ08sb0JBQUQsRUFBdUJYLElBQXZCLEVBQWdDO0FBQzlFLGtCQUFNUSxRQUFRaEIsaUJBQWlCUSxJQUFqQixDQUFkO0FBQ0Esa0JBQUlRLFVBQVVuQixXQUFXVyxJQUFYLENBQWQsRUFBZ0M7QUFDOUJXLHFDQUFxQlgsSUFBckIsSUFBNkJRLEtBQTdCO0FBQ0Q7QUFDRCxxQkFBT0csb0JBQVA7QUFDRCxhQU5rQixFQU1oQixFQU5nQixDQUFuQjtBQU9BLGdCQUFJVCxPQUFPQyxJQUFQLENBQVlYLGdCQUFaLEVBQThCaEIsTUFBbEMsRUFBMEM7QUFDeENXLCtCQUFpQkUsVUFBakIsR0FBOEJHLGdCQUE5QjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPTCxpQkFBaUJFLFVBQXhCO0FBQ0Q7QUFDRjtBQUNGLFNBakJELE1BaUJPO0FBQ0wsaUJBQU9GLGlCQUFpQkUsVUFBeEI7QUFDRDtBQW5DaUM7QUFvQ25DOztBQUVEO0FBQ0EsUUFBSUksY0FBY0MsU0FBbEIsRUFBNkI7QUFDM0IsVUFBTUosTUFBTXRCLFFBQVE0QyxPQUFSLENBQWdCQyxXQUFoQixFQUFaO0FBQ0EsVUFBSSxDQUFDcEIsU0FBTCxFQUFnQjtBQUNkTix5QkFBaUJHLEdBQWpCLEdBQXVCQSxHQUF2QjtBQUNELE9BRkQsTUFFTyxJQUFJQSxRQUFRRyxTQUFaLEVBQXVCO0FBQzVCLGVBQU9OLGlCQUFpQkcsR0FBeEI7QUFDRDtBQUNGO0FBQ0YsR0E3RUQ7O0FBK0VBLFNBQU9ILGdCQUFQO0FBQ0QiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbW1vblxuICpcbiAqIFByb2Nlc3MgY29sbGVjdGlvbnMgZm9yIHNpbWlsYXJpdGllcy5cbiAqL1xuXG4vKipcbiAqIEZpbmQgdGhlIGxhc3QgY29tbW9uIGFuY2VzdG9yIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50cz59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uQW5jZXN0b3IgKGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uUHJvcGVydGllcyAoZWxlbWVudHMpIHtcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJylcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogcmVzdHJ1Y3R1cmUgcmVtb3ZhbCBhcyAyeCBzZXQgLyAyeCBkZWxldGUsIGluc3RlYWQgb2YgbW9kaWZ5IGFsd2F5cyByZXBsYWNpbmcgd2l0aCBuZXcgY29sbGVjdGlvblxuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiBhdHRyaWJ1dGVzXG4gICAgaWYgKGNvbW1vbkF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZWxlbWVudEF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbGVtZW50QXR0cmlidXRlcykucmVkdWNlKChhdHRyaWJ1dGVzLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudEF0dHJpYnV0ZXNba2V5XVxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICAgICAgLy8gTk9URTogd29ya2Fyb3VuZCBkZXRlY3Rpb24gZm9yIG5vbi1zdGFuZGFyZCBwaGFudG9tanMgTmFtZWROb2RlTWFwIGJlaGF2aW91clxuICAgICAgICAvLyAoaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzE0NjM0KVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cbiJdfQ==\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/common.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/optimal-select/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = exports.common = exports.optimize = exports.getMultiSelector = exports.getSingleSelector = exports.select = undefined;\n\nvar _select2 = __webpack_require__(/*! ./select */ \"./node_modules/optimal-select/lib/select.js\");\n\nObject.defineProperty(exports, \"getSingleSelector\", ({\n  enumerable: true,\n  get: function get() {\n    return _select2.getSingleSelector;\n  }\n}));\nObject.defineProperty(exports, \"getMultiSelector\", ({\n  enumerable: true,\n  get: function get() {\n    return _select2.getMultiSelector;\n  }\n}));\n\nvar _select3 = _interopRequireDefault(_select2);\n\nvar _optimize2 = __webpack_require__(/*! ./optimize */ \"./node_modules/optimal-select/lib/optimize.js\");\n\nvar _optimize3 = _interopRequireDefault(_optimize2);\n\nvar _common2 = __webpack_require__(/*! ./common */ \"./node_modules/optimal-select/lib/common.js\");\n\nvar _common = _interopRequireWildcard(_common2);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.select = _select3.default;\nexports.optimize = _optimize3.default;\nexports.common = _common;\nexports[\"default\"] = _select3.default;\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldFNpbmdsZVNlbGVjdG9yIiwiZ2V0TXVsdGlTZWxlY3RvciIsInNlbGVjdCIsIm9wdGltaXplIiwiY29tbW9uIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUFpQkEsaUI7Ozs7OztvQkFBbUJDLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBN0JDLE07UUFDQUMsUTtRQUNLQyxNO1FBRUxDLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgc2VsZWN0LCB7IGdldFNpbmdsZVNlbGVjdG9yLCBnZXRNdWx0aVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3QnXG5leHBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmV4cG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbidcblxuZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9zZWxlY3QnXG4iXX0=\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/index.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/match.js":
/*!**************************************************!*\
  !*** ./node_modules/optimal-select/lib/match.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = match;\n\nvar _utilities = __webpack_require__(/*! ./utilities */ \"./node_modules/optimal-select/lib/utilities.js\");\n\nvar defaultIgnore = {\n  attribute: function attribute(attributeName) {\n    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;\n  }\n};\n\n/**\n * Get the path of the element\n *\n * @param  {HTMLElement} node    - [description]\n * @param  {Object}      options - [description]\n * @return {string}              - [description]\n */\n/**\n * # Match\n *\n * Retrieve selector for a node.\n */\n\nfunction match(node, options) {\n  var _options$root = options.root,\n      root = _options$root === undefined ? document : _options$root,\n      _options$skip = options.skip,\n      skip = _options$skip === undefined ? null : _options$skip,\n      _options$priority = options.priority,\n      priority = _options$priority === undefined ? ['id', 'class', 'href', 'src'] : _options$priority,\n      _options$ignore = options.ignore,\n      ignore = _options$ignore === undefined ? {} : _options$ignore;\n\n\n  var path = [];\n  var element = node;\n  var length = path.length;\n  var ignoreClass = false;\n\n  var skipCompare = skip && (Array.isArray(skip) ? skip : [skip]).map(function (entry) {\n    if (typeof entry !== 'function') {\n      return function (element) {\n        return element === entry;\n      };\n    }\n    return entry;\n  });\n\n  var skipChecks = function skipChecks(element) {\n    return skip && skipCompare.some(function (compare) {\n      return compare(element);\n    });\n  };\n\n  Object.keys(ignore).forEach(function (type) {\n    if (type === 'class') {\n      ignoreClass = true;\n    }\n    var predicate = ignore[type];\n    if (typeof predicate === 'function') return;\n    if (typeof predicate === 'number') {\n      predicate = predicate.toString();\n    }\n    if (typeof predicate === 'string') {\n      predicate = new RegExp((0, _utilities.escapeValue)(predicate).replace(/\\\\/g, '\\\\\\\\'));\n    }\n    if (typeof predicate === 'boolean') {\n      predicate = predicate ? /(?:)/ : /.^/;\n    }\n    // check class-/attributename for regex\n    ignore[type] = function (name, value) {\n      return predicate.test(value);\n    };\n  });\n\n  if (ignoreClass) {\n    (function () {\n      var ignoreAttribute = ignore.attribute;\n      ignore.attribute = function (name, value, defaultPredicate) {\n        return ignore.class(value) || ignoreAttribute && ignoreAttribute(name, value, defaultPredicate);\n      };\n    })();\n  }\n\n  while (element !== root) {\n    if (skipChecks(element) !== true) {\n      // ~ global\n      if (checkAttributes(priority, element, ignore, path, root)) break;\n      if (checkTag(element, ignore, path, root)) break;\n\n      // ~ local\n      checkAttributes(priority, element, ignore, path);\n      if (path.length === length) {\n        checkTag(element, ignore, path);\n      }\n\n      // define only one part each iteration\n      if (path.length === length) {\n        checkChilds(priority, element, ignore, path);\n      }\n    }\n\n    element = element.parentNode;\n    length = path.length;\n  }\n\n  if (element === root) {\n    var pattern = findPattern(priority, element, ignore);\n    path.unshift(pattern);\n  }\n\n  return path.join(' ');\n}\n\n/**\n * Extend path with attribute identifier\n *\n * @param  {Array.<string>} priority - [description]\n * @param  {HTMLElement}    element  - [description]\n * @param  {Object}         ignore   - [description]\n * @param  {Array.<string>} path     - [description]\n * @param  {HTMLElement}    parent   - [description]\n * @return {boolean}                 - [description]\n */\nfunction checkAttributes(priority, element, ignore, path) {\n  var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : element.parentNode;\n\n  var pattern = findAttributesPattern(priority, element, ignore);\n  if (pattern) {\n    var matches = parent.querySelectorAll(pattern);\n    if (matches.length === 1) {\n      path.unshift(pattern);\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Lookup attribute identifier\n *\n * @param  {Array.<string>} priority - [description]\n * @param  {HTMLElement}    element  - [description]\n * @param  {Object}         ignore   - [description]\n * @return {string?}                 - [description]\n */\nfunction findAttributesPattern(priority, element, ignore) {\n  var attributes = element.attributes;\n  var sortedKeys = Object.keys(attributes).sort(function (curr, next) {\n    var currPos = priority.indexOf(attributes[curr].name);\n    var nextPos = priority.indexOf(attributes[next].name);\n    if (nextPos === -1) {\n      if (currPos === -1) {\n        return 0;\n      }\n      return -1;\n    }\n    return currPos - nextPos;\n  });\n\n  for (var i = 0, l = sortedKeys.length; i < l; i++) {\n    var key = sortedKeys[i];\n    var attribute = attributes[key];\n    var attributeName = attribute.name;\n    var attributeValue = (0, _utilities.escapeValue)(attribute.value);\n\n    var currentIgnore = ignore[attributeName] || ignore.attribute;\n    var currentDefaultIgnore = defaultIgnore[attributeName] || defaultIgnore.attribute;\n    if (checkIgnore(currentIgnore, attributeName, attributeValue, currentDefaultIgnore)) {\n      continue;\n    }\n\n    var pattern = '[' + attributeName + '=\"' + attributeValue + '\"]';\n\n    if (/\\b\\d/.test(attributeValue) === false) {\n      if (attributeName === 'id') {\n        pattern = '#' + attributeValue;\n      }\n\n      if (attributeName === 'class') {\n        var className = attributeValue.trim().replace(/\\s+/g, '.');\n        pattern = '.' + className;\n      }\n    }\n\n    return pattern;\n  }\n  return null;\n}\n\n/**\n * Extend path with tag identifier\n *\n * @param  {HTMLElement}    element - [description]\n * @param  {Object}         ignore  - [description]\n * @param  {Array.<string>} path    - [description]\n * @param  {HTMLElement}    parent  - [description]\n * @return {boolean}                - [description]\n */\nfunction checkTag(element, ignore, path) {\n  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : element.parentNode;\n\n  var pattern = findTagPattern(element, ignore);\n  if (pattern) {\n    var matches = parent.getElementsByTagName(pattern);\n    if (matches.length === 1) {\n      path.unshift(pattern);\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Lookup tag identifier\n *\n * @param  {HTMLElement} element - [description]\n * @param  {Object}      ignore  - [description]\n * @return {boolean}             - [description]\n */\nfunction findTagPattern(element, ignore) {\n  var tagName = element.tagName.toLowerCase();\n  if (checkIgnore(ignore.tag, null, tagName)) {\n    return null;\n  }\n  return tagName;\n}\n\n/**\n * Extend path with specific child identifier\n *\n * NOTE: 'childTags' is a custom property to use as a view filter for tags using 'adapter.js'\n *\n * @param  {Array.<string>} priority - [description]\n * @param  {HTMLElement}    element  - [description]\n * @param  {Object}         ignore   - [description]\n * @param  {Array.<string>} path     - [description]\n * @return {boolean}                 - [description]\n */\nfunction checkChilds(priority, element, ignore, path) {\n  var parent = element.parentNode;\n  var children = parent.childTags || parent.children;\n  for (var i = 0, l = children.length; i < l; i++) {\n    var child = children[i];\n    if (child === element) {\n      var childPattern = findPattern(priority, child, ignore);\n      if (!childPattern) {\n        return console.warn('\\n          Element couldn\\'t be matched through strict ignore pattern!\\n        ', child, ignore, childPattern);\n      }\n      var pattern = '> ' + childPattern + ':nth-child(' + (i + 1) + ')';\n      path.unshift(pattern);\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Lookup identifier\n *\n * @param  {Array.<string>} priority - [description]\n * @param  {HTMLElement}    element  - [description]\n * @param  {Object}         ignore   - [description]\n * @return {string}                  - [description]\n */\nfunction findPattern(priority, element, ignore) {\n  var pattern = findAttributesPattern(priority, element, ignore);\n  if (!pattern) {\n    pattern = findTagPattern(element, ignore);\n  }\n  return pattern;\n}\n\n/**\n * Validate with custom and default functions\n *\n * @param  {Function} predicate        - [description]\n * @param  {string?}  name             - [description]\n * @param  {string}   value            - [description]\n * @param  {Function} defaultPredicate - [description]\n * @return {boolean}                   - [description]\n */\nfunction checkIgnore(predicate, name, value, defaultPredicate) {\n  if (!value) {\n    return true;\n  }\n  var check = predicate || defaultPredicate;\n  if (!check) {\n    return false;\n  }\n  return check(name, value, defaultPredicate);\n}\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGNoLmpzIl0sIm5hbWVzIjpbIm1hdGNoIiwiZGVmYXVsdElnbm9yZSIsImF0dHJpYnV0ZSIsImF0dHJpYnV0ZU5hbWUiLCJpbmRleE9mIiwibm9kZSIsIm9wdGlvbnMiLCJyb290IiwiZG9jdW1lbnQiLCJza2lwIiwicHJpb3JpdHkiLCJpZ25vcmUiLCJwYXRoIiwiZWxlbWVudCIsImxlbmd0aCIsImlnbm9yZUNsYXNzIiwic2tpcENvbXBhcmUiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJlbnRyeSIsInNraXBDaGVja3MiLCJzb21lIiwiY29tcGFyZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwidHlwZSIsInByZWRpY2F0ZSIsInRvU3RyaW5nIiwiUmVnRXhwIiwicmVwbGFjZSIsIm5hbWUiLCJ2YWx1ZSIsInRlc3QiLCJpZ25vcmVBdHRyaWJ1dGUiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2xhc3MiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImNoZWNrQ2hpbGRzIiwicGFyZW50Tm9kZSIsInBhdHRlcm4iLCJmaW5kUGF0dGVybiIsInVuc2hpZnQiLCJqb2luIiwicGFyZW50IiwiZmluZEF0dHJpYnV0ZXNQYXR0ZXJuIiwibWF0Y2hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhdHRyaWJ1dGVzIiwic29ydGVkS2V5cyIsInNvcnQiLCJjdXJyIiwibmV4dCIsImN1cnJQb3MiLCJuZXh0UG9zIiwiaSIsImwiLCJrZXkiLCJhdHRyaWJ1dGVWYWx1ZSIsImN1cnJlbnRJZ25vcmUiLCJjdXJyZW50RGVmYXVsdElnbm9yZSIsImNoZWNrSWdub3JlIiwiY2xhc3NOYW1lIiwidHJpbSIsImZpbmRUYWdQYXR0ZXJuIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJ0YWciLCJjaGlsZHJlbiIsImNoaWxkVGFncyIsImNoaWxkIiwiY2hpbGRQYXR0ZXJuIiwiY29uc29sZSIsIndhcm4iLCJjaGVjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBeUJ3QkEsSzs7QUFuQnhCOztBQUVBLElBQU1DLGdCQUFnQjtBQUNwQkMsV0FEb0IscUJBQ1RDLGFBRFMsRUFDTTtBQUN4QixXQUFPLENBQ0wsT0FESyxFQUVMLGNBRkssRUFHTCxxQkFISyxFQUlMQyxPQUpLLENBSUdELGFBSkgsSUFJb0IsQ0FBQyxDQUo1QjtBQUtEO0FBUG1CLENBQXRCOztBQVVBOzs7Ozs7O0FBbEJBOzs7Ozs7QUF5QmUsU0FBU0gsS0FBVCxDQUFnQkssSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO0FBQUEsc0JBT3hDQSxPQVB3QyxDQUcxQ0MsSUFIMEM7QUFBQSxNQUcxQ0EsSUFIMEMsaUNBR25DQyxRQUhtQztBQUFBLHNCQU94Q0YsT0FQd0MsQ0FJMUNHLElBSjBDO0FBQUEsTUFJMUNBLElBSjBDLGlDQUluQyxJQUptQztBQUFBLDBCQU94Q0gsT0FQd0MsQ0FLMUNJLFFBTDBDO0FBQUEsTUFLMUNBLFFBTDBDLHFDQUsvQixDQUFDLElBQUQsRUFBTyxPQUFQLEVBQWdCLE1BQWhCLEVBQXdCLEtBQXhCLENBTCtCO0FBQUEsd0JBT3hDSixPQVB3QyxDQU0xQ0ssTUFOMEM7QUFBQSxNQU0xQ0EsTUFOMEMsbUNBTWpDLEVBTmlDOzs7QUFTNUMsTUFBTUMsT0FBTyxFQUFiO0FBQ0EsTUFBSUMsVUFBVVIsSUFBZDtBQUNBLE1BQUlTLFNBQVNGLEtBQUtFLE1BQWxCO0FBQ0EsTUFBSUMsY0FBYyxLQUFsQjs7QUFFQSxNQUFNQyxjQUFjUCxRQUFRLENBQUNRLE1BQU1DLE9BQU4sQ0FBY1QsSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUE5QixFQUFzQ1UsR0FBdEMsQ0FBMEMsVUFBQ0MsS0FBRCxFQUFXO0FBQy9FLFFBQUksT0FBT0EsS0FBUCxLQUFpQixVQUFyQixFQUFpQztBQUMvQixhQUFPLFVBQUNQLE9BQUQ7QUFBQSxlQUFhQSxZQUFZTyxLQUF6QjtBQUFBLE9BQVA7QUFDRDtBQUNELFdBQU9BLEtBQVA7QUFDRCxHQUwyQixDQUE1Qjs7QUFPQSxNQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ1IsT0FBRCxFQUFhO0FBQzlCLFdBQU9KLFFBQVFPLFlBQVlNLElBQVosQ0FBaUIsVUFBQ0MsT0FBRDtBQUFBLGFBQWFBLFFBQVFWLE9BQVIsQ0FBYjtBQUFBLEtBQWpCLENBQWY7QUFDRCxHQUZEOztBQUlBVyxTQUFPQyxJQUFQLENBQVlkLE1BQVosRUFBb0JlLE9BQXBCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUNwQyxRQUFJQSxTQUFTLE9BQWIsRUFBc0I7QUFDcEJaLG9CQUFjLElBQWQ7QUFDRDtBQUNELFFBQUlhLFlBQVlqQixPQUFPZ0IsSUFBUCxDQUFoQjtBQUNBLFFBQUksT0FBT0MsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNyQyxRQUFJLE9BQU9BLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDakNBLGtCQUFZQSxVQUFVQyxRQUFWLEVBQVo7QUFDRDtBQUNELFFBQUksT0FBT0QsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUNqQ0Esa0JBQVksSUFBSUUsTUFBSixDQUFXLDRCQUFZRixTQUFaLEVBQXVCRyxPQUF2QixDQUErQixLQUEvQixFQUFzQyxNQUF0QyxDQUFYLENBQVo7QUFDRDtBQUNELFFBQUksT0FBT0gsU0FBUCxLQUFxQixTQUF6QixFQUFvQztBQUNsQ0Esa0JBQVlBLFlBQVksTUFBWixHQUFxQixJQUFqQztBQUNEO0FBQ0Q7QUFDQWpCLFdBQU9nQixJQUFQLElBQWUsVUFBQ0ssSUFBRCxFQUFPQyxLQUFQO0FBQUEsYUFBaUJMLFVBQVVNLElBQVYsQ0FBZUQsS0FBZixDQUFqQjtBQUFBLEtBQWY7QUFDRCxHQWpCRDs7QUFtQkEsTUFBSWxCLFdBQUosRUFBaUI7QUFBQTtBQUNmLFVBQU1vQixrQkFBa0J4QixPQUFPVCxTQUEvQjtBQUNBUyxhQUFPVCxTQUFQLEdBQW1CLFVBQUM4QixJQUFELEVBQU9DLEtBQVAsRUFBY0csZ0JBQWQsRUFBbUM7QUFDcEQsZUFBT3pCLE9BQU8wQixLQUFQLENBQWFKLEtBQWIsS0FBdUJFLG1CQUFtQkEsZ0JBQWdCSCxJQUFoQixFQUFzQkMsS0FBdEIsRUFBNkJHLGdCQUE3QixDQUFqRDtBQUNELE9BRkQ7QUFGZTtBQUtoQjs7QUFFRCxTQUFPdkIsWUFBWU4sSUFBbkIsRUFBeUI7QUFDdkIsUUFBSWMsV0FBV1IsT0FBWCxNQUF3QixJQUE1QixFQUFrQztBQUNoQztBQUNBLFVBQUl5QixnQkFBZ0I1QixRQUFoQixFQUEwQkcsT0FBMUIsRUFBbUNGLE1BQW5DLEVBQTJDQyxJQUEzQyxFQUFpREwsSUFBakQsQ0FBSixFQUE0RDtBQUM1RCxVQUFJZ0MsU0FBUzFCLE9BQVQsRUFBa0JGLE1BQWxCLEVBQTBCQyxJQUExQixFQUFnQ0wsSUFBaEMsQ0FBSixFQUEyQzs7QUFFM0M7QUFDQStCLHNCQUFnQjVCLFFBQWhCLEVBQTBCRyxPQUExQixFQUFtQ0YsTUFBbkMsRUFBMkNDLElBQTNDO0FBQ0EsVUFBSUEsS0FBS0UsTUFBTCxLQUFnQkEsTUFBcEIsRUFBNEI7QUFDMUJ5QixpQkFBUzFCLE9BQVQsRUFBa0JGLE1BQWxCLEVBQTBCQyxJQUExQjtBQUNEOztBQUVEO0FBQ0EsVUFBSUEsS0FBS0UsTUFBTCxLQUFnQkEsTUFBcEIsRUFBNEI7QUFDMUIwQixvQkFBWTlCLFFBQVosRUFBc0JHLE9BQXRCLEVBQStCRixNQUEvQixFQUF1Q0MsSUFBdkM7QUFDRDtBQUNGOztBQUVEQyxjQUFVQSxRQUFRNEIsVUFBbEI7QUFDQTNCLGFBQVNGLEtBQUtFLE1BQWQ7QUFDRDs7QUFFRCxNQUFJRCxZQUFZTixJQUFoQixFQUFzQjtBQUNwQixRQUFNbUMsVUFBVUMsWUFBWWpDLFFBQVosRUFBc0JHLE9BQXRCLEVBQStCRixNQUEvQixDQUFoQjtBQUNBQyxTQUFLZ0MsT0FBTCxDQUFhRixPQUFiO0FBQ0Q7O0FBRUQsU0FBTzlCLEtBQUtpQyxJQUFMLENBQVUsR0FBVixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7QUFVQSxTQUFTUCxlQUFULENBQTBCNUIsUUFBMUIsRUFBb0NHLE9BQXBDLEVBQTZDRixNQUE3QyxFQUFxREMsSUFBckQsRUFBd0Y7QUFBQSxNQUE3QmtDLE1BQTZCLHVFQUFwQmpDLFFBQVE0QixVQUFZOztBQUN0RixNQUFNQyxVQUFVSyxzQkFBc0JyQyxRQUF0QixFQUFnQ0csT0FBaEMsRUFBeUNGLE1BQXpDLENBQWhCO0FBQ0EsTUFBSStCLE9BQUosRUFBYTtBQUNYLFFBQU1NLFVBQVVGLE9BQU9HLGdCQUFQLENBQXdCUCxPQUF4QixDQUFoQjtBQUNBLFFBQUlNLFFBQVFsQyxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCRixXQUFLZ0MsT0FBTCxDQUFhRixPQUFiO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sS0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFBLFNBQVNLLHFCQUFULENBQWdDckMsUUFBaEMsRUFBMENHLE9BQTFDLEVBQW1ERixNQUFuRCxFQUEyRDtBQUN6RCxNQUFNdUMsYUFBYXJDLFFBQVFxQyxVQUEzQjtBQUNBLE1BQU1DLGFBQWEzQixPQUFPQyxJQUFQLENBQVl5QixVQUFaLEVBQXdCRSxJQUF4QixDQUE2QixVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDOUQsUUFBTUMsVUFBVTdDLFNBQVNOLE9BQVQsQ0FBaUI4QyxXQUFXRyxJQUFYLEVBQWlCckIsSUFBbEMsQ0FBaEI7QUFDQSxRQUFNd0IsVUFBVTlDLFNBQVNOLE9BQVQsQ0FBaUI4QyxXQUFXSSxJQUFYLEVBQWlCdEIsSUFBbEMsQ0FBaEI7QUFDQSxRQUFJd0IsWUFBWSxDQUFDLENBQWpCLEVBQW9CO0FBQ2xCLFVBQUlELFlBQVksQ0FBQyxDQUFqQixFQUFvQjtBQUNsQixlQUFPLENBQVA7QUFDRDtBQUNELGFBQU8sQ0FBQyxDQUFSO0FBQ0Q7QUFDRCxXQUFPQSxVQUFVQyxPQUFqQjtBQUNELEdBVmtCLENBQW5COztBQVlBLE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUlQLFdBQVdyQyxNQUEvQixFQUF1QzJDLElBQUlDLENBQTNDLEVBQThDRCxHQUE5QyxFQUFtRDtBQUNqRCxRQUFNRSxNQUFNUixXQUFXTSxDQUFYLENBQVo7QUFDQSxRQUFNdkQsWUFBWWdELFdBQVdTLEdBQVgsQ0FBbEI7QUFDQSxRQUFNeEQsZ0JBQWdCRCxVQUFVOEIsSUFBaEM7QUFDQSxRQUFNNEIsaUJBQWlCLDRCQUFZMUQsVUFBVStCLEtBQXRCLENBQXZCOztBQUVBLFFBQU00QixnQkFBZ0JsRCxPQUFPUixhQUFQLEtBQXlCUSxPQUFPVCxTQUF0RDtBQUNBLFFBQU00RCx1QkFBdUI3RCxjQUFjRSxhQUFkLEtBQWdDRixjQUFjQyxTQUEzRTtBQUNBLFFBQUk2RCxZQUFZRixhQUFaLEVBQTJCMUQsYUFBM0IsRUFBMEN5RCxjQUExQyxFQUEwREUsb0JBQTFELENBQUosRUFBcUY7QUFDbkY7QUFDRDs7QUFFRCxRQUFJcEIsZ0JBQWN2QyxhQUFkLFVBQWdDeUQsY0FBaEMsT0FBSjs7QUFFQSxRQUFLLE1BQUQsQ0FBUzFCLElBQVQsQ0FBYzBCLGNBQWQsTUFBa0MsS0FBdEMsRUFBNkM7QUFDM0MsVUFBSXpELGtCQUFrQixJQUF0QixFQUE0QjtBQUMxQnVDLHdCQUFja0IsY0FBZDtBQUNEOztBQUVELFVBQUl6RCxrQkFBa0IsT0FBdEIsRUFBK0I7QUFDN0IsWUFBTTZELFlBQVlKLGVBQWVLLElBQWYsR0FBc0JsQyxPQUF0QixDQUE4QixNQUE5QixFQUFzQyxHQUF0QyxDQUFsQjtBQUNBVyx3QkFBY3NCLFNBQWQ7QUFDRDtBQUNGOztBQUVELFdBQU90QixPQUFQO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU0gsUUFBVCxDQUFtQjFCLE9BQW5CLEVBQTRCRixNQUE1QixFQUFvQ0MsSUFBcEMsRUFBdUU7QUFBQSxNQUE3QmtDLE1BQTZCLHVFQUFwQmpDLFFBQVE0QixVQUFZOztBQUNyRSxNQUFNQyxVQUFVd0IsZUFBZXJELE9BQWYsRUFBd0JGLE1BQXhCLENBQWhCO0FBQ0EsTUFBSStCLE9BQUosRUFBYTtBQUNYLFFBQU1NLFVBQVVGLE9BQU9xQixvQkFBUCxDQUE0QnpCLE9BQTVCLENBQWhCO0FBQ0EsUUFBSU0sUUFBUWxDLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJGLFdBQUtnQyxPQUFMLENBQWFGLE9BQWI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTd0IsY0FBVCxDQUF5QnJELE9BQXpCLEVBQWtDRixNQUFsQyxFQUEwQztBQUN4QyxNQUFNeUQsVUFBVXZELFFBQVF1RCxPQUFSLENBQWdCQyxXQUFoQixFQUFoQjtBQUNBLE1BQUlOLFlBQVlwRCxPQUFPMkQsR0FBbkIsRUFBd0IsSUFBeEIsRUFBOEJGLE9BQTlCLENBQUosRUFBNEM7QUFDMUMsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxTQUFPQSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O0FBV0EsU0FBUzVCLFdBQVQsQ0FBc0I5QixRQUF0QixFQUFnQ0csT0FBaEMsRUFBeUNGLE1BQXpDLEVBQWlEQyxJQUFqRCxFQUF1RDtBQUNyRCxNQUFNa0MsU0FBU2pDLFFBQVE0QixVQUF2QjtBQUNBLE1BQU04QixXQUFXekIsT0FBTzBCLFNBQVAsSUFBb0IxQixPQUFPeUIsUUFBNUM7QUFDQSxPQUFLLElBQUlkLElBQUksQ0FBUixFQUFXQyxJQUFJYSxTQUFTekQsTUFBN0IsRUFBcUMyQyxJQUFJQyxDQUF6QyxFQUE0Q0QsR0FBNUMsRUFBaUQ7QUFDL0MsUUFBTWdCLFFBQVFGLFNBQVNkLENBQVQsQ0FBZDtBQUNBLFFBQUlnQixVQUFVNUQsT0FBZCxFQUF1QjtBQUNyQixVQUFNNkQsZUFBZS9CLFlBQVlqQyxRQUFaLEVBQXNCK0QsS0FBdEIsRUFBNkI5RCxNQUE3QixDQUFyQjtBQUNBLFVBQUksQ0FBQytELFlBQUwsRUFBbUI7QUFDakIsZUFBT0MsUUFBUUMsSUFBUixzRkFFSkgsS0FGSSxFQUVHOUQsTUFGSCxFQUVXK0QsWUFGWCxDQUFQO0FBR0Q7QUFDRCxVQUFNaEMsaUJBQWVnQyxZQUFmLG9CQUF5Q2pCLElBQUUsQ0FBM0MsT0FBTjtBQUNBN0MsV0FBS2dDLE9BQUwsQ0FBYUYsT0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTQyxXQUFULENBQXNCakMsUUFBdEIsRUFBZ0NHLE9BQWhDLEVBQXlDRixNQUF6QyxFQUFpRDtBQUMvQyxNQUFJK0IsVUFBVUssc0JBQXNCckMsUUFBdEIsRUFBZ0NHLE9BQWhDLEVBQXlDRixNQUF6QyxDQUFkO0FBQ0EsTUFBSSxDQUFDK0IsT0FBTCxFQUFjO0FBQ1pBLGNBQVV3QixlQUFlckQsT0FBZixFQUF3QkYsTUFBeEIsQ0FBVjtBQUNEO0FBQ0QsU0FBTytCLE9BQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU3FCLFdBQVQsQ0FBc0JuQyxTQUF0QixFQUFpQ0ksSUFBakMsRUFBdUNDLEtBQXZDLEVBQThDRyxnQkFBOUMsRUFBZ0U7QUFDOUQsTUFBSSxDQUFDSCxLQUFMLEVBQVk7QUFDVixXQUFPLElBQVA7QUFDRDtBQUNELE1BQU00QyxRQUFRakQsYUFBYVEsZ0JBQTNCO0FBQ0EsTUFBSSxDQUFDeUMsS0FBTCxFQUFZO0FBQ1YsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPQSxNQUFNN0MsSUFBTixFQUFZQyxLQUFaLEVBQW1CRyxnQkFBbkIsQ0FBUDtBQUNEIiwiZmlsZSI6Im1hdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIE1hdGNoXG4gKlxuICogUmV0cmlldmUgc2VsZWN0b3IgZm9yIGEgbm9kZS5cbiAqL1xuXG5pbXBvcnQgeyBlc2NhcGVWYWx1ZSB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG5jb25zdCBkZWZhdWx0SWdub3JlID0ge1xuICBhdHRyaWJ1dGUgKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3N0eWxlJyxcbiAgICAgICdkYXRhLXJlYWN0aWQnLFxuICAgICAgJ2RhdGEtcmVhY3QtY2hlY2tzdW0nXG4gICAgXS5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTFcbiAgfVxufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2ggKG5vZGUsIG9wdGlvbnMpIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50LFxuICAgIHNraXAgPSBudWxsLFxuICAgIHByaW9yaXR5ID0gWydpZCcsICdjbGFzcycsICdocmVmJywgJ3NyYyddLFxuICAgIGlnbm9yZSA9IHt9XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIHZhciBlbGVtZW50ID0gbm9kZVxuICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgdmFyIGlnbm9yZUNsYXNzID0gZmFsc2VcblxuICBjb25zdCBza2lwQ29tcGFyZSA9IHNraXAgJiYgKEFycmF5LmlzQXJyYXkoc2tpcCkgPyBza2lwIDogW3NraXBdKS5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBlbnRyeVxuICAgIH1cbiAgICByZXR1cm4gZW50cnlcbiAgfSlcblxuICBjb25zdCBza2lwQ2hlY2tzID0gKGVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gc2tpcCAmJiBza2lwQ29tcGFyZS5zb21lKChjb21wYXJlKSA9PiBjb21wYXJlKGVsZW1lbnQpKVxuICB9XG5cbiAgT2JqZWN0LmtleXMoaWdub3JlKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09ICdjbGFzcycpIHtcbiAgICAgIGlnbm9yZUNsYXNzID0gdHJ1ZVxuICAgIH1cbiAgICB2YXIgcHJlZGljYXRlID0gaWdub3JlW3R5cGVdXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdmdW5jdGlvbicpIHJldHVyblxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlLnRvU3RyaW5nKClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwcmVkaWNhdGUgPSBuZXcgUmVnRXhwKGVzY2FwZVZhbHVlKHByZWRpY2F0ZSkucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSlcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdib29sZWFuJykge1xuICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlID8gLyg/OikvIDogLy5eL1xuICAgIH1cbiAgICAvLyBjaGVjayBjbGFzcy0vYXR0cmlidXRlbmFtZSBmb3IgcmVnZXhcbiAgICBpZ25vcmVbdHlwZV0gPSAobmFtZSwgdmFsdWUpID0+IHByZWRpY2F0ZS50ZXN0KHZhbHVlKVxuICB9KVxuXG4gIGlmIChpZ25vcmVDbGFzcykge1xuICAgIGNvbnN0IGlnbm9yZUF0dHJpYnV0ZSA9IGlnbm9yZS5hdHRyaWJ1dGVcbiAgICBpZ25vcmUuYXR0cmlidXRlID0gKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSA9PiB7XG4gICAgICByZXR1cm4gaWdub3JlLmNsYXNzKHZhbHVlKSB8fCBpZ25vcmVBdHRyaWJ1dGUgJiYgaWdub3JlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxuICAgIH1cbiAgfVxuXG4gIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgaWYgKHNraXBDaGVja3MoZWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgIC8vIH4gZ2xvYmFsXG4gICAgICBpZiAoY2hlY2tBdHRyaWJ1dGVzKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHJvb3QpKSBicmVha1xuICAgICAgaWYgKGNoZWNrVGFnKGVsZW1lbnQsIGlnbm9yZSwgcGF0aCwgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBwYXRoKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgaWdub3JlLCBwYXRoKVxuICAgICAgfVxuXG4gICAgICAvLyBkZWZpbmUgb25seSBvbmUgcGFydCBlYWNoIGl0ZXJhdGlvblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tDaGlsZHMocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgcGF0aClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbGVtZW50ID09PSByb290KSB7XG4gICAgY29uc3QgcGF0dGVybiA9IGZpbmRQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUpXG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gIH1cblxuICByZXR1cm4gcGF0aC5qb2luKCcgJylcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0F0dHJpYnV0ZXMgKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUpXG4gIGlmIChwYXR0ZXJuKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBhdHRyaWJ1dGUgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZz99ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuIChwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKSB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgY29uc3Qgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLnNvcnQoKGN1cnIsIG5leHQpID0+IHtcbiAgICBjb25zdCBjdXJyUG9zID0gcHJpb3JpdHkuaW5kZXhPZihhdHRyaWJ1dGVzW2N1cnJdLm5hbWUpXG4gICAgY29uc3QgbmV4dFBvcyA9IHByaW9yaXR5LmluZGV4T2YoYXR0cmlidXRlc1tuZXh0XS5uYW1lKVxuICAgIGlmIChuZXh0UG9zID09PSAtMSkge1xuICAgICAgaWYgKGN1cnJQb3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJQb3MgLSBuZXh0UG9zXG4gIH0pXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzb3J0ZWRLZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHNvcnRlZEtleXNbaV1cbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2tleV1cbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSlcblxuICAgIGNvbnN0IGN1cnJlbnRJZ25vcmUgPSBpZ25vcmVbYXR0cmlidXRlTmFtZV0gfHwgaWdub3JlLmF0dHJpYnV0ZVxuICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0SWdub3JlID0gZGVmYXVsdElnbm9yZVthdHRyaWJ1dGVOYW1lXSB8fCBkZWZhdWx0SWdub3JlLmF0dHJpYnV0ZVxuICAgIGlmIChjaGVja0lnbm9yZShjdXJyZW50SWdub3JlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgY3VycmVudERlZmF1bHRJZ25vcmUpKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBwYXR0ZXJuID0gYFske2F0dHJpYnV0ZU5hbWV9PVwiJHthdHRyaWJ1dGVWYWx1ZX1cIl1gXG5cbiAgICBpZiAoKC9cXGJcXGQvKS50ZXN0KGF0dHJpYnV0ZVZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnaWQnKSB7XG4gICAgICAgIHBhdHRlcm4gPSBgIyR7YXR0cmlidXRlVmFsdWV9YFxuICAgICAgfVxuXG4gICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBhdHRyaWJ1dGVWYWx1ZS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLicpXG4gICAgICAgIHBhdHRlcm4gPSBgLiR7Y2xhc3NOYW1lfWBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0dGVyblxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrVGFnIChlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICBpZiAocGF0dGVybikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocGF0dGVybilcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogTG9va3VwIHRhZyBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaW5kVGFnUGF0dGVybiAoZWxlbWVudCwgaWdub3JlKSB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLnRhZywgbnVsbCwgdGFnTmFtZSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJldHVybiB0YWdOYW1lXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBzcGVjaWZpYyBjaGlsZCBpZGVudGlmaWVyXG4gKlxuICogTk9URTogJ2NoaWxkVGFncycgaXMgYSBjdXN0b20gcHJvcGVydHkgdG8gdXNlIGFzIGEgdmlldyBmaWx0ZXIgZm9yIHRhZ3MgdXNpbmcgJ2FkYXB0ZXIuanMnXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0NoaWxkcyAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgcGF0aCkge1xuICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRUYWdzIHx8IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBpZiAoY2hpbGQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkUGF0dGVybiA9IGZpbmRQYXR0ZXJuKHByaW9yaXR5LCBjaGlsZCwgaWdub3JlKVxuICAgICAgaWYgKCFjaGlsZFBhdHRlcm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICAgICAgRWxlbWVudCBjb3VsZG5cXCd0IGJlIG1hdGNoZWQgdGhyb3VnaCBzdHJpY3QgaWdub3JlIHBhdHRlcm4hXG4gICAgICAgIGAsIGNoaWxkLCBpZ25vcmUsIGNoaWxkUGF0dGVybilcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBgPiAke2NoaWxkUGF0dGVybn06bnRoLWNoaWxkKCR7aSsxfSlgXG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaW5kUGF0dGVybiAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSkge1xuICB2YXIgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKVxuICBpZiAoIXBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICB9XG4gIHJldHVybiBwYXR0ZXJuXG59XG5cbi8qKlxuICogVmFsaWRhdGUgd2l0aCBjdXN0b20gYW5kIGRlZmF1bHQgZnVuY3Rpb25zXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IHByZWRpY2F0ZSAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmc/fSAgbmFtZSAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICB2YWx1ZSAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7RnVuY3Rpb259IGRlZmF1bHRQcmVkaWNhdGUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tJZ25vcmUgKHByZWRpY2F0ZSwgbmFtZSwgdmFsdWUsIGRlZmF1bHRQcmVkaWNhdGUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY29uc3QgY2hlY2sgPSBwcmVkaWNhdGUgfHwgZGVmYXVsdFByZWRpY2F0ZVxuICBpZiAoIWNoZWNrKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxufVxuIl19\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/match.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/optimize.js":
/*!*****************************************************!*\
  !*** ./node_modules/optimal-select/lib/optimize.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = optimize;\n\nvar _adapt = __webpack_require__(/*! ./adapt */ \"./node_modules/optimal-select/lib/adapt.js\");\n\nvar _adapt2 = _interopRequireDefault(_adapt);\n\nvar _utilities = __webpack_require__(/*! ./utilities */ \"./node_modules/optimal-select/lib/utilities.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Apply different optimization techniques\n *\n * @param  {string}                          selector - [description]\n * @param  {HTMLElement|Array.<HTMLElement>} element  - [description]\n * @param  {Object}                          options  - [description]\n * @return {string}                                   - [description]\n */\n/**\n * # Optimize\n *\n * 1.) Improve efficiency through shorter selectors by removing redundancy\n * 2.) Improve robustness through selector transformation\n */\n\nfunction optimize(selector, elements) {\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n\n  // convert single entry and NodeList\n  if (!Array.isArray(elements)) {\n    elements = !elements.length ? [elements] : (0, _utilities.convertNodeList)(elements);\n  }\n\n  if (!elements.length || elements.some(function (element) {\n    return element.nodeType !== 1;\n  })) {\n    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing \"elements\")');\n  }\n\n  var globalModified = (0, _adapt2.default)(elements[0], options);\n\n  // chunk parts outside of quotes (http://stackoverflow.com/a/25663729)\n  var path = selector.replace(/> /g, '>').split(/\\s+(?=(?:(?:[^\"]*\"){2})*[^\"]*$)/);\n\n  if (path.length < 2) {\n    return optimizePart('', selector, '', elements);\n  }\n\n  var shortened = [path.pop()];\n  while (path.length > 1) {\n    var current = path.pop();\n    var prePart = path.join(' ');\n    var postPart = shortened.join(' ');\n\n    var pattern = prePart + ' ' + postPart;\n    var matches = document.querySelectorAll(pattern);\n    if (matches.length !== elements.length) {\n      shortened.unshift(optimizePart(prePart, current, postPart, elements));\n    }\n  }\n  shortened.unshift(path[0]);\n  path = shortened;\n\n  // optimize start + end\n  path[0] = optimizePart('', path[0], path.slice(1).join(' '), elements);\n  path[path.length - 1] = optimizePart(path.slice(0, -1).join(' '), path[path.length - 1], '', elements);\n\n  if (globalModified) {\n    delete __webpack_require__.g.document;\n  }\n\n  return path.join(' ').replace(/>/g, '> ').trim();\n}\n\n/**\n * Improve a chunk of the selector\n *\n * @param  {string}              prePart  - [description]\n * @param  {string}              current  - [description]\n * @param  {string}              postPart - [description]\n * @param  {Array.<HTMLElement>} elements - [description]\n * @return {string}                       - [description]\n */\nfunction optimizePart(prePart, current, postPart, elements) {\n  if (prePart.length) prePart = prePart + ' ';\n  if (postPart.length) postPart = ' ' + postPart;\n\n  // robustness: attribute without value (generalization)\n  if (/\\[*\\]/.test(current)) {\n    var key = current.replace(/=.*$/, ']');\n    var pattern = '' + prePart + key + postPart;\n    var matches = document.querySelectorAll(pattern);\n    if (compareResults(matches, elements)) {\n      current = key;\n    } else {\n      // robustness: replace specific key-value with base tag (heuristic)\n      var references = document.querySelectorAll('' + prePart + key);\n\n      var _loop = function _loop() {\n        var reference = references[i];\n        if (elements.some(function (element) {\n          return reference.contains(element);\n        })) {\n          var description = reference.tagName.toLowerCase();\n          pattern = '' + prePart + description + postPart;\n          matches = document.querySelectorAll(pattern);\n\n          if (compareResults(matches, elements)) {\n            current = description;\n          }\n          return 'break';\n        }\n      };\n\n      for (var i = 0, l = references.length; i < l; i++) {\n        var pattern;\n        var matches;\n\n        var _ret = _loop();\n\n        if (_ret === 'break') break;\n      }\n    }\n  }\n\n  // robustness: descendant instead child (heuristic)\n  if (/>/.test(current)) {\n    var descendant = current.replace(/>/, '');\n    var pattern = '' + prePart + descendant + postPart;\n    var matches = document.querySelectorAll(pattern);\n    if (compareResults(matches, elements)) {\n      current = descendant;\n    }\n  }\n\n  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)\n  if (/:nth-child/.test(current)) {\n    // TODO: consider complete coverage of 'nth-of-type' replacement\n    var type = current.replace(/nth-child/g, 'nth-of-type');\n    var pattern = '' + prePart + type + postPart;\n    var matches = document.querySelectorAll(pattern);\n    if (compareResults(matches, elements)) {\n      current = type;\n    }\n  }\n\n  // efficiency: combinations of classname (partial permutations)\n  if (/\\.\\S+\\.\\S+/.test(current)) {\n    var names = current.trim().split('.').slice(1).map(function (name) {\n      return '.' + name;\n    }).sort(function (curr, next) {\n      return curr.length - next.length;\n    });\n    while (names.length) {\n      var partial = current.replace(names.shift(), '').trim();\n      var pattern = ('' + prePart + partial + postPart).trim();\n      if (!pattern.length || pattern.charAt(0) === '>' || pattern.charAt(pattern.length - 1) === '>') {\n        break;\n      }\n      var matches = document.querySelectorAll(pattern);\n      if (compareResults(matches, elements)) {\n        current = partial;\n      }\n    }\n\n    // robustness: degrade complex classname (heuristic)\n    names = current && current.match(/\\./g);\n    if (names && names.length > 2) {\n      var _references = document.querySelectorAll('' + prePart + current);\n\n      var _loop2 = function _loop2() {\n        var reference = _references[i];\n        if (elements.some(function (element) {\n          return reference.contains(element);\n        })) {\n          // TODO:\n          // - check using attributes + regard excludes\n          var description = reference.tagName.toLowerCase();\n          pattern = '' + prePart + description + postPart;\n          matches = document.querySelectorAll(pattern);\n\n          if (compareResults(matches, elements)) {\n            current = description;\n          }\n          return 'break';\n        }\n      };\n\n      for (var i = 0, l = _references.length; i < l; i++) {\n        var pattern;\n        var matches;\n\n        var _ret2 = _loop2();\n\n        if (_ret2 === 'break') break;\n      }\n    }\n  }\n\n  return current;\n}\n\n/**\n * Evaluate matches with expected elements\n *\n * @param  {Array.<HTMLElement>} matches  - [description]\n * @param  {Array.<HTMLElement>} elements - [description]\n * @return {Boolean}                      - [description]\n */\nfunction compareResults(matches, elements) {\n  var length = matches.length;\n\n  return length === elements.length && elements.every(function (element) {\n    for (var i = 0; i < length; i++) {\n      if (matches[i] === element) {\n        return true;\n      }\n    }\n    return false;\n  });\n}\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGltaXplLmpzIl0sIm5hbWVzIjpbIm9wdGltaXplIiwic2VsZWN0b3IiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzb21lIiwiZWxlbWVudCIsIm5vZGVUeXBlIiwiRXJyb3IiLCJnbG9iYWxNb2RpZmllZCIsInBhdGgiLCJyZXBsYWNlIiwic3BsaXQiLCJvcHRpbWl6ZVBhcnQiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwicHJlUGFydCIsImpvaW4iLCJwb3N0UGFydCIsInBhdHRlcm4iLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidW5zaGlmdCIsInNsaWNlIiwiZ2xvYmFsIiwidHJpbSIsInRlc3QiLCJrZXkiLCJjb21wYXJlUmVzdWx0cyIsInJlZmVyZW5jZXMiLCJyZWZlcmVuY2UiLCJpIiwiY29udGFpbnMiLCJkZXNjcmlwdGlvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImwiLCJkZXNjZW5kYW50IiwidHlwZSIsIm5hbWVzIiwibWFwIiwibmFtZSIsInNvcnQiLCJjdXJyIiwibmV4dCIsInBhcnRpYWwiLCJzaGlmdCIsImNoYXJBdCIsIm1hdGNoIiwiZXZlcnkiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWtCd0JBLFE7O0FBWHhCOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7QUFWQTs7Ozs7OztBQWtCZSxTQUFTQSxRQUFULENBQW1CQyxRQUFuQixFQUE2QkMsUUFBN0IsRUFBcUQ7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLEVBQUk7OztBQUVsRTtBQUNBLE1BQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjSCxRQUFkLENBQUwsRUFBOEI7QUFDNUJBLGVBQVcsQ0FBQ0EsU0FBU0ksTUFBVixHQUFtQixDQUFDSixRQUFELENBQW5CLEdBQWdDLGdDQUFnQkEsUUFBaEIsQ0FBM0M7QUFDRDs7QUFFRCxNQUFJLENBQUNBLFNBQVNJLE1BQVYsSUFBb0JKLFNBQVNLLElBQVQsQ0FBYyxVQUFDQyxPQUFEO0FBQUEsV0FBYUEsUUFBUUMsUUFBUixLQUFxQixDQUFsQztBQUFBLEdBQWQsQ0FBeEIsRUFBNEU7QUFDMUUsVUFBTSxJQUFJQyxLQUFKLDhIQUFOO0FBQ0Q7O0FBRUQsTUFBTUMsaUJBQWlCLHFCQUFNVCxTQUFTLENBQVQsQ0FBTixFQUFtQkMsT0FBbkIsQ0FBdkI7O0FBRUE7QUFDQSxNQUFJUyxPQUFPWCxTQUFTWSxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCQyxLQUE3QixDQUFtQyxpQ0FBbkMsQ0FBWDs7QUFFQSxNQUFJRixLQUFLTixNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDbkIsV0FBT1MsYUFBYSxFQUFiLEVBQWlCZCxRQUFqQixFQUEyQixFQUEzQixFQUErQkMsUUFBL0IsQ0FBUDtBQUNEOztBQUVELE1BQU1jLFlBQVksQ0FBQ0osS0FBS0ssR0FBTCxFQUFELENBQWxCO0FBQ0EsU0FBT0wsS0FBS04sTUFBTCxHQUFjLENBQXJCLEVBQXlCO0FBQ3ZCLFFBQU1ZLFVBQVVOLEtBQUtLLEdBQUwsRUFBaEI7QUFDQSxRQUFNRSxVQUFVUCxLQUFLUSxJQUFMLENBQVUsR0FBVixDQUFoQjtBQUNBLFFBQU1DLFdBQVdMLFVBQVVJLElBQVYsQ0FBZSxHQUFmLENBQWpCOztBQUVBLFFBQU1FLFVBQWFILE9BQWIsU0FBd0JFLFFBQTlCO0FBQ0EsUUFBTUUsVUFBVUMsU0FBU0MsZ0JBQVQsQ0FBMEJILE9BQTFCLENBQWhCO0FBQ0EsUUFBSUMsUUFBUWpCLE1BQVIsS0FBbUJKLFNBQVNJLE1BQWhDLEVBQXdDO0FBQ3RDVSxnQkFBVVUsT0FBVixDQUFrQlgsYUFBYUksT0FBYixFQUFzQkQsT0FBdEIsRUFBK0JHLFFBQS9CLEVBQXlDbkIsUUFBekMsQ0FBbEI7QUFDRDtBQUNGO0FBQ0RjLFlBQVVVLE9BQVYsQ0FBa0JkLEtBQUssQ0FBTCxDQUFsQjtBQUNBQSxTQUFPSSxTQUFQOztBQUVBO0FBQ0FKLE9BQUssQ0FBTCxJQUFVRyxhQUFhLEVBQWIsRUFBaUJILEtBQUssQ0FBTCxDQUFqQixFQUEwQkEsS0FBS2UsS0FBTCxDQUFXLENBQVgsRUFBY1AsSUFBZCxDQUFtQixHQUFuQixDQUExQixFQUFtRGxCLFFBQW5ELENBQVY7QUFDQVUsT0FBS0EsS0FBS04sTUFBTCxHQUFZLENBQWpCLElBQXNCUyxhQUFhSCxLQUFLZSxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixFQUFrQlAsSUFBbEIsQ0FBdUIsR0FBdkIsQ0FBYixFQUEwQ1IsS0FBS0EsS0FBS04sTUFBTCxHQUFZLENBQWpCLENBQTFDLEVBQStELEVBQS9ELEVBQW1FSixRQUFuRSxDQUF0Qjs7QUFFQSxNQUFJUyxjQUFKLEVBQW9CO0FBQ2xCLFdBQU9pQixPQUFPSixRQUFkO0FBQ0Q7O0FBRUQsU0FBT1osS0FBS1EsSUFBTCxDQUFVLEdBQVYsRUFBZVAsT0FBZixDQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUFtQ2dCLElBQW5DLEVBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU2QsWUFBVCxDQUF1QkksT0FBdkIsRUFBZ0NELE9BQWhDLEVBQXlDRyxRQUF6QyxFQUFtRG5CLFFBQW5ELEVBQTZEO0FBQzNELE1BQUlpQixRQUFRYixNQUFaLEVBQW9CYSxVQUFhQSxPQUFiO0FBQ3BCLE1BQUlFLFNBQVNmLE1BQWIsRUFBcUJlLGlCQUFlQSxRQUFmOztBQUVyQjtBQUNBLE1BQUksUUFBUVMsSUFBUixDQUFhWixPQUFiLENBQUosRUFBMkI7QUFDekIsUUFBTWEsTUFBTWIsUUFBUUwsT0FBUixDQUFnQixNQUFoQixFQUF3QixHQUF4QixDQUFaO0FBQ0EsUUFBSVMsZUFBYUgsT0FBYixHQUF1QlksR0FBdkIsR0FBNkJWLFFBQWpDO0FBQ0EsUUFBSUUsVUFBVUMsU0FBU0MsZ0JBQVQsQ0FBMEJILE9BQTFCLENBQWQ7QUFDQSxRQUFJVSxlQUFlVCxPQUFmLEVBQXdCckIsUUFBeEIsQ0FBSixFQUF1QztBQUNyQ2dCLGdCQUFVYSxHQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0w7QUFDQSxVQUFNRSxhQUFhVCxTQUFTQyxnQkFBVCxNQUE2Qk4sT0FBN0IsR0FBdUNZLEdBQXZDLENBQW5COztBQUZLO0FBSUgsWUFBTUcsWUFBWUQsV0FBV0UsQ0FBWCxDQUFsQjtBQUNBLFlBQUlqQyxTQUFTSyxJQUFULENBQWMsVUFBQ0MsT0FBRDtBQUFBLGlCQUFhMEIsVUFBVUUsUUFBVixDQUFtQjVCLE9BQW5CLENBQWI7QUFBQSxTQUFkLENBQUosRUFBNkQ7QUFDM0QsY0FBTTZCLGNBQWNILFVBQVVJLE9BQVYsQ0FBa0JDLFdBQWxCLEVBQXBCO0FBQ0lqQix5QkFBYUgsT0FBYixHQUF1QmtCLFdBQXZCLEdBQXFDaEIsUUFGa0I7QUFHdkRFLG9CQUFVQyxTQUFTQyxnQkFBVCxDQUEwQkgsT0FBMUIsQ0FINkM7O0FBSTNELGNBQUlVLGVBQWVULE9BQWYsRUFBd0JyQixRQUF4QixDQUFKLEVBQXVDO0FBQ3JDZ0Isc0JBQVVtQixXQUFWO0FBQ0Q7QUFDRDtBQUNEO0FBYkU7O0FBR0wsV0FBSyxJQUFJRixJQUFJLENBQVIsRUFBV0ssSUFBSVAsV0FBVzNCLE1BQS9CLEVBQXVDNkIsSUFBSUssQ0FBM0MsRUFBOENMLEdBQTlDLEVBQW1EO0FBQUEsWUFJM0NiLE9BSjJDO0FBQUEsWUFLM0NDLE9BTDJDOztBQUFBOztBQUFBLDhCQVMvQztBQUVIO0FBQ0Y7QUFDRjs7QUFFRDtBQUNBLE1BQUksSUFBSU8sSUFBSixDQUFTWixPQUFULENBQUosRUFBdUI7QUFDckIsUUFBTXVCLGFBQWF2QixRQUFRTCxPQUFSLENBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQW5CO0FBQ0EsUUFBSVMsZUFBYUgsT0FBYixHQUF1QnNCLFVBQXZCLEdBQW9DcEIsUUFBeEM7QUFDQSxRQUFJRSxVQUFVQyxTQUFTQyxnQkFBVCxDQUEwQkgsT0FBMUIsQ0FBZDtBQUNBLFFBQUlVLGVBQWVULE9BQWYsRUFBd0JyQixRQUF4QixDQUFKLEVBQXVDO0FBQ3JDZ0IsZ0JBQVV1QixVQUFWO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLE1BQUksYUFBYVgsSUFBYixDQUFrQlosT0FBbEIsQ0FBSixFQUFnQztBQUM5QjtBQUNBLFFBQU13QixPQUFPeEIsUUFBUUwsT0FBUixDQUFnQixZQUFoQixFQUE4QixhQUE5QixDQUFiO0FBQ0EsUUFBSVMsZUFBYUgsT0FBYixHQUF1QnVCLElBQXZCLEdBQThCckIsUUFBbEM7QUFDQSxRQUFJRSxVQUFVQyxTQUFTQyxnQkFBVCxDQUEwQkgsT0FBMUIsQ0FBZDtBQUNBLFFBQUlVLGVBQWVULE9BQWYsRUFBd0JyQixRQUF4QixDQUFKLEVBQXVDO0FBQ3JDZ0IsZ0JBQVV3QixJQUFWO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLE1BQUksYUFBYVosSUFBYixDQUFrQlosT0FBbEIsQ0FBSixFQUFnQztBQUM5QixRQUFJeUIsUUFBUXpCLFFBQVFXLElBQVIsR0FBZWYsS0FBZixDQUFxQixHQUFyQixFQUEwQmEsS0FBMUIsQ0FBZ0MsQ0FBaEMsRUFDMEJpQixHQUQxQixDQUM4QixVQUFDQyxJQUFEO0FBQUEsbUJBQWNBLElBQWQ7QUFBQSxLQUQ5QixFQUUwQkMsSUFGMUIsQ0FFK0IsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQO0FBQUEsYUFBZ0JELEtBQUt6QyxNQUFMLEdBQWMwQyxLQUFLMUMsTUFBbkM7QUFBQSxLQUYvQixDQUFaO0FBR0EsV0FBT3FDLE1BQU1yQyxNQUFiLEVBQXFCO0FBQ25CLFVBQU0yQyxVQUFVL0IsUUFBUUwsT0FBUixDQUFnQjhCLE1BQU1PLEtBQU4sRUFBaEIsRUFBK0IsRUFBL0IsRUFBbUNyQixJQUFuQyxFQUFoQjtBQUNBLFVBQUlQLFVBQVUsTUFBR0gsT0FBSCxHQUFhOEIsT0FBYixHQUF1QjVCLFFBQXZCLEVBQWtDUSxJQUFsQyxFQUFkO0FBQ0EsVUFBSSxDQUFDUCxRQUFRaEIsTUFBVCxJQUFtQmdCLFFBQVE2QixNQUFSLENBQWUsQ0FBZixNQUFzQixHQUF6QyxJQUFnRDdCLFFBQVE2QixNQUFSLENBQWU3QixRQUFRaEIsTUFBUixHQUFlLENBQTlCLE1BQXFDLEdBQXpGLEVBQThGO0FBQzVGO0FBQ0Q7QUFDRCxVQUFJaUIsVUFBVUMsU0FBU0MsZ0JBQVQsQ0FBMEJILE9BQTFCLENBQWQ7QUFDQSxVQUFJVSxlQUFlVCxPQUFmLEVBQXdCckIsUUFBeEIsQ0FBSixFQUF1QztBQUNyQ2dCLGtCQUFVK0IsT0FBVjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQU4sWUFBUXpCLFdBQVdBLFFBQVFrQyxLQUFSLENBQWMsS0FBZCxDQUFuQjtBQUNBLFFBQUlULFNBQVNBLE1BQU1yQyxNQUFOLEdBQWUsQ0FBNUIsRUFBK0I7QUFDN0IsVUFBTTJCLGNBQWFULFNBQVNDLGdCQUFULE1BQTZCTixPQUE3QixHQUF1Q0QsT0FBdkMsQ0FBbkI7O0FBRDZCO0FBRzNCLFlBQU1nQixZQUFZRCxZQUFXRSxDQUFYLENBQWxCO0FBQ0EsWUFBSWpDLFNBQVNLLElBQVQsQ0FBYyxVQUFDQyxPQUFEO0FBQUEsaUJBQWEwQixVQUFVRSxRQUFWLENBQW1CNUIsT0FBbkIsQ0FBYjtBQUFBLFNBQWQsQ0FBSixFQUE4RDtBQUM1RDtBQUNBO0FBQ0EsY0FBTTZCLGNBQWNILFVBQVVJLE9BQVYsQ0FBa0JDLFdBQWxCLEVBQXBCO0FBQ0lqQix5QkFBYUgsT0FBYixHQUF1QmtCLFdBQXZCLEdBQXFDaEIsUUFKbUI7QUFLeERFLG9CQUFVQyxTQUFTQyxnQkFBVCxDQUEwQkgsT0FBMUIsQ0FMOEM7O0FBTTVELGNBQUlVLGVBQWVULE9BQWYsRUFBd0JyQixRQUF4QixDQUFKLEVBQXVDO0FBQ3JDZ0Isc0JBQVVtQixXQUFWO0FBQ0Q7QUFDRDtBQUNEO0FBZDBCOztBQUU3QixXQUFLLElBQUlGLElBQUksQ0FBUixFQUFXSyxJQUFJUCxZQUFXM0IsTUFBL0IsRUFBdUM2QixJQUFJSyxDQUEzQyxFQUE4Q0wsR0FBOUMsRUFBbUQ7QUFBQSxZQU0zQ2IsT0FOMkM7QUFBQSxZQU8zQ0MsT0FQMkM7O0FBQUE7O0FBQUEsK0JBVy9DO0FBRUg7QUFDRjtBQUNGOztBQUVELFNBQU9MLE9BQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVNjLGNBQVQsQ0FBeUJULE9BQXpCLEVBQWtDckIsUUFBbEMsRUFBNEM7QUFBQSxNQUNsQ0ksTUFEa0MsR0FDdkJpQixPQUR1QixDQUNsQ2pCLE1BRGtDOztBQUUxQyxTQUFPQSxXQUFXSixTQUFTSSxNQUFwQixJQUE4QkosU0FBU21ELEtBQVQsQ0FBZSxVQUFDN0MsT0FBRCxFQUFhO0FBQy9ELFNBQUssSUFBSTJCLElBQUksQ0FBYixFQUFnQkEsSUFBSTdCLE1BQXBCLEVBQTRCNkIsR0FBNUIsRUFBaUM7QUFDL0IsVUFBSVosUUFBUVksQ0FBUixNQUFlM0IsT0FBbkIsRUFBNEI7QUFDMUIsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sS0FBUDtBQUNELEdBUG9DLENBQXJDO0FBUUQiLCJmaWxlIjoib3B0aW1pemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMgT3B0aW1pemVcbiAqXG4gKiAxLikgSW1wcm92ZSBlZmZpY2llbmN5IHRocm91Z2ggc2hvcnRlciBzZWxlY3RvcnMgYnkgcmVtb3ZpbmcgcmVkdW5kYW5jeVxuICogMi4pIEltcHJvdmUgcm9idXN0bmVzcyB0aHJvdWdoIHNlbGVjdG9yIHRyYW5zZm9ybWF0aW9uXG4gKi9cblxuaW1wb3J0IGFkYXB0IGZyb20gJy4vYWRhcHQnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcblxuLyoqXG4gKiBBcHBseSBkaWZmZXJlbnQgb3B0aW1pemF0aW9uIHRlY2huaXF1ZXNcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHNlbGVjdG9yLCBlbGVtZW50cywgb3B0aW9ucyA9IHt9KSB7XG5cbiAgLy8gY29udmVydCBzaW5nbGUgZW50cnkgYW5kIE5vZGVMaXN0XG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9ICFlbGVtZW50cy5sZW5ndGggPyBbZWxlbWVudHNdIDogY29udmVydE5vZGVMaXN0KGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKCFlbGVtZW50cy5sZW5ndGggfHwgZWxlbWVudHMuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSB0byBjb21wYXJlIEhUTUxFbGVtZW50cyBpdHMgbmVjZXNzYXJ5IHRvIHByb3ZpZGUgYSByZWZlcmVuY2Ugb2YgdGhlIHNlbGVjdGVkIG5vZGUocykhIChtaXNzaW5nIFwiZWxlbWVudHNcIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICAvLyBjaHVuayBwYXJ0cyBvdXRzaWRlIG9mIHF1b3RlcyAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjU2NjM3MjkpXG4gIHZhciBwYXRoID0gc2VsZWN0b3IucmVwbGFjZSgvPiAvZywgJz4nKS5zcGxpdCgvXFxzKyg/PSg/Oig/OlteXCJdKlwiKXsyfSkqW15cIl0qJCkvKVxuXG4gIGlmIChwYXRoLmxlbmd0aCA8IDIpIHtcbiAgICByZXR1cm4gb3B0aW1pemVQYXJ0KCcnLCBzZWxlY3RvciwgJycsIGVsZW1lbnRzKVxuICB9XG5cbiAgY29uc3Qgc2hvcnRlbmVkID0gW3BhdGgucG9wKCldXG4gIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpICB7XG4gICAgY29uc3QgY3VycmVudCA9IHBhdGgucG9wKClcbiAgICBjb25zdCBwcmVQYXJ0ID0gcGF0aC5qb2luKCcgJylcbiAgICBjb25zdCBwb3N0UGFydCA9IHNob3J0ZW5lZC5qb2luKCcgJylcblxuICAgIGNvbnN0IHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSAke3Bvc3RQYXJ0fWBcbiAgICBjb25zdCBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICBzaG9ydGVuZWQudW5zaGlmdChvcHRpbWl6ZVBhcnQocHJlUGFydCwgY3VycmVudCwgcG9zdFBhcnQsIGVsZW1lbnRzKSlcbiAgICB9XG4gIH1cbiAgc2hvcnRlbmVkLnVuc2hpZnQocGF0aFswXSlcbiAgcGF0aCA9IHNob3J0ZW5lZFxuXG4gIC8vIG9wdGltaXplIHN0YXJ0ICsgZW5kXG4gIHBhdGhbMF0gPSBvcHRpbWl6ZVBhcnQoJycsIHBhdGhbMF0sIHBhdGguc2xpY2UoMSkuam9pbignICcpLCBlbGVtZW50cylcbiAgcGF0aFtwYXRoLmxlbmd0aC0xXSA9IG9wdGltaXplUGFydChwYXRoLnNsaWNlKDAsIC0xKS5qb2luKCcgJyksIHBhdGhbcGF0aC5sZW5ndGgtMV0sICcnLCBlbGVtZW50cylcblxuICBpZiAoZ2xvYmFsTW9kaWZpZWQpIHtcbiAgICBkZWxldGUgZ2xvYmFsLmRvY3VtZW50XG4gIH1cblxuICByZXR1cm4gcGF0aC5qb2luKCcgJykucmVwbGFjZSgvPi9nLCAnPiAnKS50cmltKClcbn1cblxuLyoqXG4gKiBJbXByb3ZlIGEgY2h1bmsgb2YgdGhlIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgcHJlUGFydCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgIHBvc3RQYXJ0IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gb3B0aW1pemVQYXJ0IChwcmVQYXJ0LCBjdXJyZW50LCBwb3N0UGFydCwgZWxlbWVudHMpIHtcbiAgaWYgKHByZVBhcnQubGVuZ3RoKSBwcmVQYXJ0ID0gYCR7cHJlUGFydH0gYFxuICBpZiAocG9zdFBhcnQubGVuZ3RoKSBwb3N0UGFydCA9IGAgJHtwb3N0UGFydH1gXG5cbiAgLy8gcm9idXN0bmVzczogYXR0cmlidXRlIHdpdGhvdXQgdmFsdWUgKGdlbmVyYWxpemF0aW9uKVxuICBpZiAoL1xcWypcXF0vLnRlc3QoY3VycmVudCkpIHtcbiAgICBjb25zdCBrZXkgPSBjdXJyZW50LnJlcGxhY2UoLz0uKiQvLCAnXScpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7a2V5fSR7cG9zdFBhcnR9YFxuICAgIHZhciBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIGN1cnJlbnQgPSBrZXlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcm9idXN0bmVzczogcmVwbGFjZSBzcGVjaWZpYyBrZXktdmFsdWUgd2l0aCBiYXNlIHRhZyAoaGV1cmlzdGljKVxuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCR7cHJlUGFydH0ke2tleX1gKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWZlcmVuY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkpKSB7XG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSByZWZlcmVuY2UudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY3JpcHRpb259JHtwb3N0UGFydH1gXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyByb2J1c3RuZXNzOiBkZXNjZW5kYW50IGluc3RlYWQgY2hpbGQgKGhldXJpc3RpYylcbiAgaWYgKC8+Ly50ZXN0KGN1cnJlbnQpKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudCA9IGN1cnJlbnQucmVwbGFjZSgvPi8sICcnKVxuICAgIHZhciBwYXR0ZXJuID0gYCR7cHJlUGFydH0ke2Rlc2NlbmRhbnR9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IGRlc2NlbmRhbnRcbiAgICB9XG4gIH1cblxuICAvLyByb2J1c3RuZXNzOiAnbnRoLW9mLXR5cGUnIGluc3RlYWQgJ250aC1jaGlsZCcgKGhldXJpc3RpYylcbiAgaWYgKC86bnRoLWNoaWxkLy50ZXN0KGN1cnJlbnQpKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgY29tcGxldGUgY292ZXJhZ2Ugb2YgJ250aC1vZi10eXBlJyByZXBsYWNlbWVudFxuICAgIGNvbnN0IHR5cGUgPSBjdXJyZW50LnJlcGxhY2UoL250aC1jaGlsZC9nLCAnbnRoLW9mLXR5cGUnKVxuICAgIHZhciBwYXR0ZXJuID0gYCR7cHJlUGFydH0ke3R5cGV9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IHR5cGVcbiAgICB9XG4gIH1cblxuICAvLyBlZmZpY2llbmN5OiBjb21iaW5hdGlvbnMgb2YgY2xhc3NuYW1lIChwYXJ0aWFsIHBlcm11dGF0aW9ucylcbiAgaWYgKC9cXC5cXFMrXFwuXFxTKy8udGVzdChjdXJyZW50KSkge1xuICAgIHZhciBuYW1lcyA9IGN1cnJlbnQudHJpbSgpLnNwbGl0KCcuJykuc2xpY2UoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgobmFtZSkgPT4gYC4ke25hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG4gICAgd2hpbGUgKG5hbWVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgcGFydGlhbCA9IGN1cnJlbnQucmVwbGFjZShuYW1lcy5zaGlmdCgpLCAnJykudHJpbSgpXG4gICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtwYXJ0aWFsfSR7cG9zdFBhcnR9YC50cmltKClcbiAgICAgIGlmICghcGF0dGVybi5sZW5ndGggfHwgcGF0dGVybi5jaGFyQXQoMCkgPT09ICc+JyB8fCBwYXR0ZXJuLmNoYXJBdChwYXR0ZXJuLmxlbmd0aC0xKSA9PT0gJz4nKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgICAgY3VycmVudCA9IHBhcnRpYWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByb2J1c3RuZXNzOiBkZWdyYWRlIGNvbXBsZXggY2xhc3NuYW1lIChoZXVyaXN0aWMpXG4gICAgbmFtZXMgPSBjdXJyZW50ICYmIGN1cnJlbnQubWF0Y2goL1xcLi9nKVxuICAgIGlmIChuYW1lcyAmJiBuYW1lcy5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtwcmVQYXJ0fSR7Y3VycmVudH1gKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWZlcmVuY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkgKSkge1xuICAgICAgICAgIC8vIFRPRE86XG4gICAgICAgICAgLy8gLSBjaGVjayB1c2luZyBhdHRyaWJ1dGVzICsgcmVnYXJkIGV4Y2x1ZGVzXG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSByZWZlcmVuY2UudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY3JpcHRpb259JHtwb3N0UGFydH1gXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIEV2YWx1YXRlIG1hdGNoZXMgd2l0aCBleHBlY3RlZCBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IG1hdGNoZXMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVJlc3VsdHMgKG1hdGNoZXMsIGVsZW1lbnRzKSB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBtYXRjaGVzXG4gIHJldHVybiBsZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4ge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtYXRjaGVzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuIl19\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/optimize.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/select.js":
/*!***************************************************!*\
  !*** ./node_modules/optimal-select/lib/select.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; /**\n                                                                                                                                                                                                                                                                               * # Select\n                                                                                                                                                                                                                                                                               *\n                                                                                                                                                                                                                                                                               * Construct a unique CSS query selector to access the selected DOM element(s).\n                                                                                                                                                                                                                                                                               * For longevity it applies different matching and optimization strategies.\n                                                                                                                                                                                                                                                                               */\n\nexports.getSingleSelector = getSingleSelector;\nexports.getMultiSelector = getMultiSelector;\nexports[\"default\"] = getQuerySelector;\n\nvar _adapt = __webpack_require__(/*! ./adapt */ \"./node_modules/optimal-select/lib/adapt.js\");\n\nvar _adapt2 = _interopRequireDefault(_adapt);\n\nvar _match = __webpack_require__(/*! ./match */ \"./node_modules/optimal-select/lib/match.js\");\n\nvar _match2 = _interopRequireDefault(_match);\n\nvar _optimize = __webpack_require__(/*! ./optimize */ \"./node_modules/optimal-select/lib/optimize.js\");\n\nvar _optimize2 = _interopRequireDefault(_optimize);\n\nvar _utilities = __webpack_require__(/*! ./utilities */ \"./node_modules/optimal-select/lib/utilities.js\");\n\nvar _common = __webpack_require__(/*! ./common */ \"./node_modules/optimal-select/lib/common.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Get a selector for the provided element\n *\n * @param  {HTMLElement} element - [description]\n * @param  {Object}      options - [description]\n * @return {string}              - [description]\n */\nfunction getSingleSelector(element) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\n  if (element.nodeType === 3) {\n    element = element.parentNode;\n  }\n\n  if (element.nodeType !== 1) {\n    throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not \"' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '\")');\n  }\n\n  var globalModified = (0, _adapt2.default)(element, options);\n\n  var selector = (0, _match2.default)(element, options);\n  var optimized = (0, _optimize2.default)(selector, element, options);\n\n  // debug\n  // console.log(`\n  //   selector:  ${selector}\n  //   optimized: ${optimized}\n  // `)\n\n  if (globalModified) {\n    delete __webpack_require__.g.document;\n  }\n\n  return optimized;\n}\n\n/**\n * Get a selector to match multiple descendants from an ancestor\n *\n * @param  {Array.<HTMLElement>|NodeList} elements - [description]\n * @param  {Object}                       options  - [description]\n * @return {string}                                - [description]\n */\nfunction getMultiSelector(elements) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\n  if (!Array.isArray(elements)) {\n    elements = (0, _utilities.convertNodeList)(elements);\n  }\n\n  if (elements.some(function (element) {\n    return element.nodeType !== 1;\n  })) {\n    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');\n  }\n\n  var globalModified = (0, _adapt2.default)(elements[0], options);\n\n  var ancestor = (0, _common.getCommonAncestor)(elements, options);\n  var ancestorSelector = getSingleSelector(ancestor, options);\n\n  // TODO: consider usage of multiple selectors + parent-child relation + check for part redundancy\n  var commonSelectors = getCommonSelectors(elements);\n  var descendantSelector = commonSelectors[0];\n\n  var selector = (0, _optimize2.default)(ancestorSelector + ' ' + descendantSelector, elements, options);\n  var selectorMatches = (0, _utilities.convertNodeList)(document.querySelectorAll(selector));\n\n  if (!elements.every(function (element) {\n    return selectorMatches.some(function (entry) {\n      return entry === element;\n    });\n  })) {\n    // TODO: cluster matches to split into similar groups for sub selections\n    return console.warn('\\n      The selected elements can\\'t be efficiently mapped.\\n      Its probably best to use multiple single selectors instead!\\n    ', elements);\n  }\n\n  if (globalModified) {\n    delete __webpack_require__.g.document;\n  }\n\n  return selector;\n}\n\n/**\n * Get selectors to describe a set of elements\n *\n * @param  {Array.<HTMLElements>} elements - [description]\n * @return {string}                        - [description]\n */\nfunction getCommonSelectors(elements) {\n  var _getCommonProperties = (0, _common.getCommonProperties)(elements),\n      classes = _getCommonProperties.classes,\n      attributes = _getCommonProperties.attributes,\n      tag = _getCommonProperties.tag;\n\n  var selectorPath = [];\n\n  if (tag) {\n    selectorPath.push(tag);\n  }\n\n  if (classes) {\n    var classSelector = classes.map(function (name) {\n      return '.' + name;\n    }).join('');\n    selectorPath.push(classSelector);\n  }\n\n  if (attributes) {\n    var attributeSelector = Object.keys(attributes).reduce(function (parts, name) {\n      parts.push('[' + name + '=\"' + attributes[name] + '\"]');\n      return parts;\n    }, []).join('');\n    selectorPath.push(attributeSelector);\n  }\n\n  if (selectorPath.length) {\n    // TODO: check for parent-child relation\n  }\n\n  return [selectorPath.join('')];\n}\n\n/**\n * Choose action depending on the input (multiple/single)\n *\n * NOTE: extended detection is used for special cases like the <select> element with <options>\n *\n * @param  {HTMLElement|NodeList|Array.<HTMLElement>} input   - [description]\n * @param  {Object}                                   options - [description]\n * @return {string}                                           - [description]\n */\nfunction getQuerySelector(input) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (input.length && !input.name) {\n    return getMultiSelector(input, options);\n  }\n  return getSingleSelector(input, options);\n}\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC5qcyJdLCJuYW1lcyI6WyJnZXRTaW5nbGVTZWxlY3RvciIsImdldE11bHRpU2VsZWN0b3IiLCJnZXRRdWVyeVNlbGVjdG9yIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJub2RlVHlwZSIsInBhcmVudE5vZGUiLCJFcnJvciIsImdsb2JhbE1vZGlmaWVkIiwic2VsZWN0b3IiLCJvcHRpbWl6ZWQiLCJnbG9iYWwiLCJkb2N1bWVudCIsImVsZW1lbnRzIiwiQXJyYXkiLCJpc0FycmF5Iiwic29tZSIsImFuY2VzdG9yIiwiYW5jZXN0b3JTZWxlY3RvciIsImNvbW1vblNlbGVjdG9ycyIsImdldENvbW1vblNlbGVjdG9ycyIsImRlc2NlbmRhbnRTZWxlY3RvciIsInNlbGVjdG9yTWF0Y2hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImVudHJ5IiwiY29uc29sZSIsIndhcm4iLCJjbGFzc2VzIiwiYXR0cmlidXRlcyIsInRhZyIsInNlbGVjdG9yUGF0aCIsInB1c2giLCJjbGFzc1NlbGVjdG9yIiwibWFwIiwibmFtZSIsImpvaW4iLCJhdHRyaWJ1dGVTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJwYXJ0cyIsImxlbmd0aCIsImlucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OFFBQUE7Ozs7Ozs7UUFvQmdCQSxpQixHQUFBQSxpQjtRQW1DQUMsZ0IsR0FBQUEsZ0I7a0JBb0ZRQyxnQjs7QUFwSXhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7QUFPTyxTQUFTRixpQkFBVCxDQUE0QkcsT0FBNUIsRUFBbUQ7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLEVBQUk7OztBQUV4RCxNQUFJRCxRQUFRRSxRQUFSLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCRixjQUFVQSxRQUFRRyxVQUFsQjtBQUNEOztBQUVELE1BQUlILFFBQVFFLFFBQVIsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBTSxJQUFJRSxLQUFKLGdHQUFzR0osT0FBdEcseUNBQXNHQSxPQUF0RyxVQUFOO0FBQ0Q7O0FBRUQsTUFBTUssaUJBQWlCLHFCQUFNTCxPQUFOLEVBQWVDLE9BQWYsQ0FBdkI7O0FBRUEsTUFBTUssV0FBVyxxQkFBTU4sT0FBTixFQUFlQyxPQUFmLENBQWpCO0FBQ0EsTUFBTU0sWUFBWSx3QkFBU0QsUUFBVCxFQUFtQk4sT0FBbkIsRUFBNEJDLE9BQTVCLENBQWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSUksY0FBSixFQUFvQjtBQUNsQixXQUFPRyxPQUFPQyxRQUFkO0FBQ0Q7O0FBRUQsU0FBT0YsU0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT08sU0FBU1QsZ0JBQVQsQ0FBMkJZLFFBQTNCLEVBQW1EO0FBQUEsTUFBZFQsT0FBYyx1RUFBSixFQUFJOzs7QUFFeEQsTUFBSSxDQUFDVSxNQUFNQyxPQUFOLENBQWNGLFFBQWQsQ0FBTCxFQUE4QjtBQUM1QkEsZUFBVyxnQ0FBZ0JBLFFBQWhCLENBQVg7QUFDRDs7QUFFRCxNQUFJQSxTQUFTRyxJQUFULENBQWMsVUFBQ2IsT0FBRDtBQUFBLFdBQWFBLFFBQVFFLFFBQVIsS0FBcUIsQ0FBbEM7QUFBQSxHQUFkLENBQUosRUFBd0Q7QUFDdEQsVUFBTSxJQUFJRSxLQUFKLDBGQUFOO0FBQ0Q7O0FBRUQsTUFBTUMsaUJBQWlCLHFCQUFNSyxTQUFTLENBQVQsQ0FBTixFQUFtQlQsT0FBbkIsQ0FBdkI7O0FBRUEsTUFBTWEsV0FBVywrQkFBa0JKLFFBQWxCLEVBQTRCVCxPQUE1QixDQUFqQjtBQUNBLE1BQU1jLG1CQUFtQmxCLGtCQUFrQmlCLFFBQWxCLEVBQTRCYixPQUE1QixDQUF6Qjs7QUFFQTtBQUNBLE1BQU1lLGtCQUFrQkMsbUJBQW1CUCxRQUFuQixDQUF4QjtBQUNBLE1BQU1RLHFCQUFxQkYsZ0JBQWdCLENBQWhCLENBQTNCOztBQUVBLE1BQU1WLFdBQVcsd0JBQVlTLGdCQUFaLFNBQWdDRyxrQkFBaEMsRUFBc0RSLFFBQXRELEVBQWdFVCxPQUFoRSxDQUFqQjtBQUNBLE1BQU1rQixrQkFBa0IsZ0NBQWdCVixTQUFTVyxnQkFBVCxDQUEwQmQsUUFBMUIsQ0FBaEIsQ0FBeEI7O0FBRUEsTUFBSSxDQUFDSSxTQUFTVyxLQUFULENBQWUsVUFBQ3JCLE9BQUQ7QUFBQSxXQUFhbUIsZ0JBQWdCTixJQUFoQixDQUFxQixVQUFDUyxLQUFEO0FBQUEsYUFBV0EsVUFBVXRCLE9BQXJCO0FBQUEsS0FBckIsQ0FBYjtBQUFBLEdBQWYsQ0FBTCxFQUF1RjtBQUNyRjtBQUNBLFdBQU91QixRQUFRQyxJQUFSLHlJQUdKZCxRQUhJLENBQVA7QUFJRDs7QUFFRCxNQUFJTCxjQUFKLEVBQW9CO0FBQ2xCLFdBQU9HLE9BQU9DLFFBQWQ7QUFDRDs7QUFFRCxTQUFPSCxRQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFNBQVNXLGtCQUFULENBQTZCUCxRQUE3QixFQUF1QztBQUFBLDZCQUVBLGlDQUFvQkEsUUFBcEIsQ0FGQTtBQUFBLE1BRTdCZSxPQUY2Qix3QkFFN0JBLE9BRjZCO0FBQUEsTUFFcEJDLFVBRm9CLHdCQUVwQkEsVUFGb0I7QUFBQSxNQUVSQyxHQUZRLHdCQUVSQSxHQUZROztBQUlyQyxNQUFNQyxlQUFlLEVBQXJCOztBQUVBLE1BQUlELEdBQUosRUFBUztBQUNQQyxpQkFBYUMsSUFBYixDQUFrQkYsR0FBbEI7QUFDRDs7QUFFRCxNQUFJRixPQUFKLEVBQWE7QUFDWCxRQUFNSyxnQkFBZ0JMLFFBQVFNLEdBQVIsQ0FBWSxVQUFDQyxJQUFEO0FBQUEsbUJBQWNBLElBQWQ7QUFBQSxLQUFaLEVBQWtDQyxJQUFsQyxDQUF1QyxFQUF2QyxDQUF0QjtBQUNBTCxpQkFBYUMsSUFBYixDQUFrQkMsYUFBbEI7QUFDRDs7QUFFRCxNQUFJSixVQUFKLEVBQWdCO0FBQ2QsUUFBTVEsb0JBQW9CQyxPQUFPQyxJQUFQLENBQVlWLFVBQVosRUFBd0JXLE1BQXhCLENBQStCLFVBQUNDLEtBQUQsRUFBUU4sSUFBUixFQUFpQjtBQUN4RU0sWUFBTVQsSUFBTixPQUFlRyxJQUFmLFVBQXdCTixXQUFXTSxJQUFYLENBQXhCO0FBQ0EsYUFBT00sS0FBUDtBQUNELEtBSHlCLEVBR3ZCLEVBSHVCLEVBR25CTCxJQUhtQixDQUdkLEVBSGMsQ0FBMUI7QUFJQUwsaUJBQWFDLElBQWIsQ0FBa0JLLGlCQUFsQjtBQUNEOztBQUVELE1BQUlOLGFBQWFXLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRUQsU0FBTyxDQUNMWCxhQUFhSyxJQUFiLENBQWtCLEVBQWxCLENBREssQ0FBUDtBQUdEOztBQUVEOzs7Ozs7Ozs7QUFTZSxTQUFTbEMsZ0JBQVQsQ0FBMkJ5QyxLQUEzQixFQUFnRDtBQUFBLE1BQWR2QyxPQUFjLHVFQUFKLEVBQUk7O0FBQzdELE1BQUl1QyxNQUFNRCxNQUFOLElBQWdCLENBQUNDLE1BQU1SLElBQTNCLEVBQWlDO0FBQy9CLFdBQU9sQyxpQkFBaUIwQyxLQUFqQixFQUF3QnZDLE9BQXhCLENBQVA7QUFDRDtBQUNELFNBQU9KLGtCQUFrQjJDLEtBQWxCLEVBQXlCdkMsT0FBekIsQ0FBUDtBQUNEIiwiZmlsZSI6InNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuXG5pbXBvcnQgYWRhcHQgZnJvbSAnLi9hZGFwdCdcbmltcG9ydCBtYXRjaCBmcm9tICcuL21hdGNoJ1xuaW1wb3J0IG9wdGltaXplIGZyb20gJy4vb3B0aW1pemUnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgZm9yIHRoZSBwcm92aWRlZCBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlU2VsZWN0b3IgKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSBvbmx5IEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBhcmUgc3VwcG9ydGVkISAobm90IFwiJHt0eXBlb2YgZWxlbWVudH1cIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50LCBvcHRpb25zKVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gbWF0Y2goZWxlbWVudCwgb3B0aW9ucylcbiAgY29uc3Qgb3B0aW1pemVkID0gb3B0aW1pemUoc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpXG5cbiAgLy8gZGVidWdcbiAgLy8gY29uc29sZS5sb2coYFxuICAvLyAgIHNlbGVjdG9yOiAgJHtzZWxlY3Rvcn1cbiAgLy8gICBvcHRpbWl6ZWQ6ICR7b3B0aW1pemVkfVxuICAvLyBgKVxuXG4gIGlmIChnbG9iYWxNb2RpZmllZCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnRcbiAgfVxuXG4gIHJldHVybiBvcHRpbWl6ZWRcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RvciAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCFgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclNlbGVjdG9yID0gZ2V0U2luZ2xlU2VsZWN0b3IoYW5jZXN0b3IsIG9wdGlvbnMpXG5cbiAgLy8gVE9ETzogY29uc2lkZXIgdXNhZ2Ugb2YgbXVsdGlwbGUgc2VsZWN0b3JzICsgcGFyZW50LWNoaWxkIHJlbGF0aW9uICsgY2hlY2sgZm9yIHBhcnQgcmVkdW5kYW5jeVxuICBjb25zdCBjb21tb25TZWxlY3RvcnMgPSBnZXRDb21tb25TZWxlY3RvcnMoZWxlbWVudHMpXG4gIGNvbnN0IGRlc2NlbmRhbnRTZWxlY3RvciA9IGNvbW1vblNlbGVjdG9yc1swXVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gb3B0aW1pemUoYCR7YW5jZXN0b3JTZWxlY3Rvcn0gJHtkZXNjZW5kYW50U2VsZWN0b3J9YCwgZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IHNlbGVjdG9yTWF0Y2hlcyA9IGNvbnZlcnROb2RlTGlzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblxuICBpZiAoIWVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBzZWxlY3Rvck1hdGNoZXMuc29tZSgoZW50cnkpID0+IGVudHJ5ID09PSBlbGVtZW50KSApKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICBUaGUgc2VsZWN0ZWQgZWxlbWVudHMgY2FuXFwndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGAsIGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKGdsb2JhbE1vZGlmaWVkKSB7XG4gICAgZGVsZXRlIGdsb2JhbC5kb2N1bWVudFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudHM+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tbW9uU2VsZWN0b3JzIChlbGVtZW50cykge1xuXG4gIGNvbnN0IHsgY2xhc3NlcywgYXR0cmlidXRlcywgdGFnIH0gPSBnZXRDb21tb25Qcm9wZXJ0aWVzKGVsZW1lbnRzKVxuXG4gIGNvbnN0IHNlbGVjdG9yUGF0aCA9IFtdXG5cbiAgaWYgKHRhZykge1xuICAgIHNlbGVjdG9yUGF0aC5wdXNoKHRhZylcbiAgfVxuXG4gIGlmIChjbGFzc2VzKSB7XG4gICAgY29uc3QgY2xhc3NTZWxlY3RvciA9IGNsYXNzZXMubWFwKChuYW1lKSA9PiBgLiR7bmFtZX1gKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGNsYXNzU2VsZWN0b3IpXG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChwYXJ0cywgbmFtZSkgPT4ge1xuICAgICAgcGFydHMucHVzaChgWyR7bmFtZX09XCIke2F0dHJpYnV0ZXNbbmFtZV19XCJdYClcbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH0sIFtdKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGF0dHJpYnV0ZVNlbGVjdG9yKVxuICB9XG5cbiAgaWYgKHNlbGVjdG9yUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgcGFyZW50LWNoaWxkIHJlbGF0aW9uXG4gIH1cblxuICByZXR1cm4gW1xuICAgIHNlbGVjdG9yUGF0aC5qb2luKCcnKVxuICBdXG59XG5cbi8qKlxuICogQ2hvb3NlIGFjdGlvbiBkZXBlbmRpbmcgb24gdGhlIGlucHV0IChtdWx0aXBsZS9zaW5nbGUpXG4gKlxuICogTk9URTogZXh0ZW5kZWQgZGV0ZWN0aW9uIGlzIHVzZWQgZm9yIHNwZWNpYWwgY2FzZXMgbGlrZSB0aGUgPHNlbGVjdD4gZWxlbWVudCB3aXRoIDxvcHRpb25zPlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvciAoaW5wdXQsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKSB7XG4gICAgcmV0dXJuIGdldE11bHRpU2VsZWN0b3IoaW5wdXQsIG9wdGlvbnMpXG4gIH1cbiAgcmV0dXJuIGdldFNpbmdsZVNlbGVjdG9yKGlucHV0LCBvcHRpb25zKVxufVxuIl19\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/select.js?");

/***/ }),

/***/ "./node_modules/optimal-select/lib/utilities.js":
/*!******************************************************!*\
  !*** ./node_modules/optimal-select/lib/utilities.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.convertNodeList = convertNodeList;\nexports.escapeValue = escapeValue;\n/**\n * # Utilities\n *\n * Convenience helpers.\n */\n\n/**\n * Create an array with the DOM nodes of the list\n *\n * @param  {NodeList}             nodes - [description]\n * @return {Array.<HTMLElement>}        - [description]\n */\nfunction convertNodeList(nodes) {\n  var length = nodes.length;\n\n  var arr = new Array(length);\n  for (var i = 0; i < length; i++) {\n    arr[i] = nodes[i];\n  }\n  return arr;\n}\n\n/**\n * Escape special characters and line breaks as a simplified version of 'CSS.escape()'\n *\n * Description of valid characters: https://mathiasbynens.be/notes/css-escapes\n *\n * @param  {String?} value - [description]\n * @return {String}        - [description]\n */\nfunction escapeValue(value) {\n  return value && value.replace(/['\"`\\\\/:\\?&!#$%^()[\\]{|}*+;,.<=>@~]/g, '\\\\$&').replace(/\\n/g, '\\A');\n}\n//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdGllcy5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0Tm9kZUxpc3QiLCJlc2NhcGVWYWx1ZSIsIm5vZGVzIiwibGVuZ3RoIiwiYXJyIiwiQXJyYXkiLCJpIiwidmFsdWUiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7OztRQVlnQkEsZSxHQUFBQSxlO1FBaUJBQyxXLEdBQUFBLFc7QUE3QmhCOzs7Ozs7QUFNQTs7Ozs7O0FBTU8sU0FBU0QsZUFBVCxDQUEwQkUsS0FBMUIsRUFBaUM7QUFBQSxNQUM5QkMsTUFEOEIsR0FDbkJELEtBRG1CLENBQzlCQyxNQUQ4Qjs7QUFFdEMsTUFBTUMsTUFBTSxJQUFJQyxLQUFKLENBQVVGLE1BQVYsQ0FBWjtBQUNBLE9BQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDL0JGLFFBQUlFLENBQUosSUFBU0osTUFBTUksQ0FBTixDQUFUO0FBQ0Q7QUFDRCxTQUFPRixHQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0gsV0FBVCxDQUFzQk0sS0FBdEIsRUFBNkI7QUFDbEMsU0FBT0EsU0FBU0EsTUFBTUMsT0FBTixDQUFjLHNDQUFkLEVBQXNELE1BQXRELEVBQ01BLE9BRE4sQ0FDYyxLQURkLEVBQ3FCLElBRHJCLENBQWhCO0FBRUQiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIFV0aWxpdGllc1xuICpcbiAqIENvbnZlbmllbmNlIGhlbHBlcnMuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgd2l0aCB0aGUgRE9NIG5vZGVzIG9mIHRoZSBsaXN0XG4gKlxuICogQHBhcmFtICB7Tm9kZUxpc3R9ICAgICAgICAgICAgIG5vZGVzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE5vZGVMaXN0IChub2Rlcykge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUucmVwbGFjZSgvWydcImBcXFxcLzpcXD8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxBJylcbn1cbiJdfQ==\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/optimal-select/lib/utilities.js?");

/***/ }),

/***/ "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm":
/*!****************************************************************************!*\
  !*** external "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm" ***!
  \****************************************************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE_https_cdn_jsdelivr_net_npm_floating_ui_dom_1_6_12_esm_44873b7a__;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/array/from.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/array/from.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/array/from */ \"./node_modules/core-js-pure/features/array/from.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/array/from.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/get-iterator-method */ \"./node_modules/core-js-pure/features/get-iterator-method.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/get-iterator */ \"./node_modules/core-js-pure/features/get-iterator.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/concat.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/concat.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/concat */ \"./node_modules/core-js-pure/features/instance/concat.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/concat.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/filter.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/filter.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/filter */ \"./node_modules/core-js-pure/features/instance/filter.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/filter.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/flat-map.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/flat-map.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/flat-map */ \"./node_modules/core-js-pure/features/instance/flat-map.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/map.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/map.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/map */ \"./node_modules/core-js-pure/features/instance/map.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/map.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/reduce.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/reduce.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/reduce */ \"./node_modules/core-js-pure/features/instance/reduce.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/slice */ \"./node_modules/core-js-pure/features/instance/slice.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/instance/starts-with.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/instance/starts-with.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/instance/starts-with */ \"./node_modules/core-js-pure/features/instance/starts-with.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/object/keys.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/object/keys */ \"./node_modules/core-js-pure/features/object/keys.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/object/keys.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/promise.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/promise */ \"./node_modules/core-js-pure/features/promise/index.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/promise.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/reflect/construct.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/reflect/construct.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/reflect/construct */ \"./node_modules/core-js-pure/features/reflect/construct.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js/symbol.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! core-js-pure/features/symbol */ \"./node_modules/core-js-pure/features/symbol/index.js\");\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/core-js/symbol.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/regeneratorRuntime.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/regeneratorRuntime.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _typeof = (__webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime-corejs3/helpers/typeof.js\")[\"default\"]);\nvar _Object$defineProperty = __webpack_require__(/*! core-js-pure/features/object/define-property.js */ \"./node_modules/core-js-pure/features/object/define-property.js\");\nvar _Symbol = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/features/symbol/index.js\");\nvar _Object$create = __webpack_require__(/*! core-js-pure/features/object/create.js */ \"./node_modules/core-js-pure/features/object/create.js\");\nvar _Object$getPrototypeOf = __webpack_require__(/*! core-js-pure/features/object/get-prototype-of.js */ \"./node_modules/core-js-pure/features/object/get-prototype-of.js\");\nvar _forEachInstanceProperty = __webpack_require__(/*! core-js-pure/features/instance/for-each.js */ \"./node_modules/core-js-pure/features/instance/for-each.js\");\nvar _pushInstanceProperty = __webpack_require__(/*! core-js-pure/features/instance/push.js */ \"./node_modules/core-js-pure/features/instance/push.js\");\nvar _Object$setPrototypeOf = __webpack_require__(/*! core-js-pure/features/object/set-prototype-of.js */ \"./node_modules/core-js-pure/features/object/set-prototype-of.js\");\nvar _Promise = __webpack_require__(/*! core-js-pure/features/promise/index.js */ \"./node_modules/core-js-pure/features/promise/index.js\");\nvar _reverseInstanceProperty = __webpack_require__(/*! core-js-pure/features/instance/reverse.js */ \"./node_modules/core-js-pure/features/instance/reverse.js\");\nvar _sliceInstanceProperty = __webpack_require__(/*! core-js-pure/features/instance/slice.js */ \"./node_modules/core-js-pure/features/instance/slice.js\");\nfunction _regeneratorRuntime() {\n  \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */\n  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {\n    return e;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n  var t,\n    e = {},\n    r = Object.prototype,\n    n = r.hasOwnProperty,\n    o = _Object$defineProperty || function (t, e, r) {\n      t[e] = r.value;\n    },\n    i = \"function\" == typeof _Symbol ? _Symbol : {},\n    a = i.iterator || \"@@iterator\",\n    c = i.asyncIterator || \"@@asyncIterator\",\n    u = i.toStringTag || \"@@toStringTag\";\n  function define(t, e, r) {\n    return _Object$defineProperty(t, e, {\n      value: r,\n      enumerable: !0,\n      configurable: !0,\n      writable: !0\n    }), t[e];\n  }\n  try {\n    define({}, \"\");\n  } catch (t) {\n    define = function define(t, e, r) {\n      return t[e] = r;\n    };\n  }\n  function wrap(t, e, r, n) {\n    var i = e && e.prototype instanceof Generator ? e : Generator,\n      a = _Object$create(i.prototype),\n      c = new Context(n || []);\n    return o(a, \"_invoke\", {\n      value: makeInvokeMethod(t, r, c)\n    }), a;\n  }\n  function tryCatch(t, e, r) {\n    try {\n      return {\n        type: \"normal\",\n        arg: t.call(e, r)\n      };\n    } catch (t) {\n      return {\n        type: \"throw\",\n        arg: t\n      };\n    }\n  }\n  e.wrap = wrap;\n  var h = \"suspendedStart\",\n    l = \"suspendedYield\",\n    f = \"executing\",\n    s = \"completed\",\n    y = {};\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n  var p = {};\n  define(p, a, function () {\n    return this;\n  });\n  var d = _Object$getPrototypeOf,\n    v = d && d(d(values([])));\n  v && v !== r && n.call(v, a) && (p = v);\n  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(p);\n  function defineIteratorMethods(t) {\n    var _context;\n    _forEachInstanceProperty(_context = [\"next\", \"throw\", \"return\"]).call(_context, function (e) {\n      define(t, e, function (t) {\n        return this._invoke(e, t);\n      });\n    });\n  }\n  function AsyncIterator(t, e) {\n    function invoke(r, o, i, a) {\n      var c = tryCatch(t[r], t, o);\n      if (\"throw\" !== c.type) {\n        var u = c.arg,\n          h = u.value;\n        return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) {\n          invoke(\"next\", t, i, a);\n        }, function (t) {\n          invoke(\"throw\", t, i, a);\n        }) : e.resolve(h).then(function (t) {\n          u.value = t, i(u);\n        }, function (t) {\n          return invoke(\"throw\", t, i, a);\n        });\n      }\n      a(c.arg);\n    }\n    var r;\n    o(this, \"_invoke\", {\n      value: function value(t, n) {\n        function callInvokeWithMethodAndArg() {\n          return new e(function (e, r) {\n            invoke(t, n, e, r);\n          });\n        }\n        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n      }\n    });\n  }\n  function makeInvokeMethod(e, r, n) {\n    var o = h;\n    return function (i, a) {\n      if (o === f) throw Error(\"Generator is already running\");\n      if (o === s) {\n        if (\"throw\" === i) throw a;\n        return {\n          value: t,\n          done: !0\n        };\n      }\n      for (n.method = i, n.arg = a;;) {\n        var c = n.delegate;\n        if (c) {\n          var u = maybeInvokeDelegate(c, n);\n          if (u) {\n            if (u === y) continue;\n            return u;\n          }\n        }\n        if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) {\n          if (o === h) throw o = s, n.arg;\n          n.dispatchException(n.arg);\n        } else \"return\" === n.method && n.abrupt(\"return\", n.arg);\n        o = f;\n        var p = tryCatch(e, r, n);\n        if (\"normal\" === p.type) {\n          if (o = n.done ? s : l, p.arg === y) continue;\n          return {\n            value: p.arg,\n            done: n.done\n          };\n        }\n        \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg);\n      }\n    };\n  }\n  function maybeInvokeDelegate(e, r) {\n    var n = r.method,\n      o = e.iterator[n];\n    if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y;\n    var i = tryCatch(o, e.iterator, r.arg);\n    if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y;\n    var a = i.arg;\n    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y);\n  }\n  function pushTryEntry(t) {\n    var _context2;\n    var e = {\n      tryLoc: t[0]\n    };\n    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), _pushInstanceProperty(_context2 = this.tryEntries).call(_context2, e);\n  }\n  function resetTryEntry(t) {\n    var e = t.completion || {};\n    e.type = \"normal\", delete e.arg, t.completion = e;\n  }\n  function Context(t) {\n    this.tryEntries = [{\n      tryLoc: \"root\"\n    }], _forEachInstanceProperty(t).call(t, pushTryEntry, this), this.reset(!0);\n  }\n  function values(e) {\n    if (e || \"\" === e) {\n      var r = e[a];\n      if (r) return r.call(e);\n      if (\"function\" == typeof e.next) return e;\n      if (!isNaN(e.length)) {\n        var o = -1,\n          i = function next() {\n            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;\n            return next.value = t, next.done = !0, next;\n          };\n        return i.next = i;\n      }\n    }\n    throw new TypeError(_typeof(e) + \" is not iterable\");\n  }\n  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", {\n    value: GeneratorFunctionPrototype,\n    configurable: !0\n  }), o(GeneratorFunctionPrototype, \"constructor\", {\n    value: GeneratorFunction,\n    configurable: !0\n  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) {\n    var e = \"function\" == typeof t && t.constructor;\n    return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name));\n  }, e.mark = function (t) {\n    return _Object$setPrototypeOf ? _Object$setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = _Object$create(g), t;\n  }, e.awrap = function (t) {\n    return {\n      __await: t\n    };\n  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {\n    return this;\n  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {\n    void 0 === i && (i = _Promise);\n    var a = new AsyncIterator(wrap(t, r, n, o), i);\n    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {\n      return t.done ? t.value : a.next();\n    });\n  }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () {\n    return this;\n  }), define(g, \"toString\", function () {\n    return \"[object Generator]\";\n  }), e.keys = function (t) {\n    var e = Object(t),\n      r = [];\n    for (var n in e) _pushInstanceProperty(r).call(r, n);\n    return _reverseInstanceProperty(r).call(r), function next() {\n      for (; r.length;) {\n        var t = r.pop();\n        if (t in e) return next.value = t, next.done = !1, next;\n      }\n      return next.done = !0, next;\n    };\n  }, e.values = values, Context.prototype = {\n    constructor: Context,\n    reset: function reset(e) {\n      var _context3;\n      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, _forEachInstanceProperty(_context3 = this.tryEntries).call(_context3, resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+_sliceInstanceProperty(r).call(r, 1)) && (this[r] = t);\n    },\n    stop: function stop() {\n      this.done = !0;\n      var t = this.tryEntries[0].completion;\n      if (\"throw\" === t.type) throw t.arg;\n      return this.rval;\n    },\n    dispatchException: function dispatchException(e) {\n      if (this.done) throw e;\n      var r = this;\n      function handle(n, o) {\n        return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o;\n      }\n      for (var o = this.tryEntries.length - 1; o >= 0; --o) {\n        var i = this.tryEntries[o],\n          a = i.completion;\n        if (\"root\" === i.tryLoc) return handle(\"end\");\n        if (i.tryLoc <= this.prev) {\n          var c = n.call(i, \"catchLoc\"),\n            u = n.call(i, \"finallyLoc\");\n          if (c && u) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          } else if (c) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n          } else {\n            if (!u) throw Error(\"try statement without catch or finally\");\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          }\n        }\n      }\n    },\n    abrupt: function abrupt(t, e) {\n      for (var r = this.tryEntries.length - 1; r >= 0; --r) {\n        var o = this.tryEntries[r];\n        if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) {\n          var i = o;\n          break;\n        }\n      }\n      i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);\n      var a = i ? i.completion : {};\n      return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a);\n    },\n    complete: function complete(t, e) {\n      if (\"throw\" === t.type) throw t.arg;\n      return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y;\n    },\n    finish: function finish(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;\n      }\n    },\n    \"catch\": function _catch(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.tryLoc === t) {\n          var n = r.completion;\n          if (\"throw\" === n.type) {\n            var o = n.arg;\n            resetTryEntry(r);\n          }\n          return o;\n        }\n      }\n      throw Error(\"illegal catch attempt\");\n    },\n    delegateYield: function delegateYield(e, r, n) {\n      return this.delegate = {\n        iterator: values(e),\n        resultName: r,\n        nextLoc: n\n      }, \"next\" === this.method && (this.arg = t), y;\n    }\n  }, e;\n}\nmodule.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/regeneratorRuntime.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/typeof.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _Symbol = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/features/symbol/index.js\");\nvar _Symbol$iterator = __webpack_require__(/*! core-js-pure/features/symbol/iterator.js */ \"./node_modules/core-js-pure/features/symbol/iterator.js\");\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return (module.exports = _typeof = \"function\" == typeof _Symbol && \"symbol\" == typeof _Symbol$iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof _Symbol && o.constructor === _Symbol && o !== _Symbol.prototype ? \"symbol\" : typeof o;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports), _typeof(o);\n}\nmodule.exports = _typeof, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/regenerator/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/regenerator/index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// TODO(Babel 8): Remove this file.\n\nvar runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ \"./node_modules/@babel/runtime-corejs3/helpers/regeneratorRuntime.js\")();\nmodule.exports = runtime;\n\n// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/array/from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/array/from.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/array/from */ \"./node_modules/core-js-pure/stable/array/from.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/array/is-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/array/is-array.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/array/is-array */ \"./node_modules/core-js-pure/stable/array/is-array.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/array/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/get-iterator-method.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/get-iterator-method.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../stable/get-iterator-method */ \"./node_modules/core-js-pure/stable/get-iterator-method.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/get-iterator.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/get-iterator.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../stable/get-iterator */ \"./node_modules/core-js-pure/stable/get-iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/bind.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/bind.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/bind */ \"./node_modules/core-js-pure/stable/instance/bind.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/concat.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/concat.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/concat */ \"./node_modules/core-js-pure/stable/instance/concat.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/filter.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/filter */ \"./node_modules/core-js-pure/stable/instance/filter.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/flat-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/flat-map.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/flat-map */ \"./node_modules/core-js-pure/stable/instance/flat-map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/for-each */ \"./node_modules/core-js-pure/stable/instance/for-each.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/index-of.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/index-of.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/index-of */ \"./node_modules/core-js-pure/stable/instance/index-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/map.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/map.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/map */ \"./node_modules/core-js-pure/stable/instance/map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/push.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/push.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/push */ \"./node_modules/core-js-pure/stable/instance/push.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/reduce.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/reduce.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/reduce */ \"./node_modules/core-js-pure/stable/instance/reduce.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/reverse.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/reverse.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/reverse */ \"./node_modules/core-js-pure/stable/instance/reverse.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/slice.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/slice.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/slice */ \"./node_modules/core-js-pure/stable/instance/slice.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/instance/starts-with.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/instance/starts-with.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/instance/starts-with */ \"./node_modules/core-js-pure/stable/instance/starts-with.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/map/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/actual/map/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/map */ \"./node_modules/core-js-pure/stable/map/index.js\");\n__webpack_require__(/*! ../../modules/esnext.map.group-by */ \"./node_modules/core-js-pure/modules/esnext.map.group-by.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/map/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/create.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/object/create */ \"./node_modules/core-js-pure/stable/object/create.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/define-property.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/object/define-property */ \"./node_modules/core-js-pure/stable/object/define-property.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/get-prototype-of.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/object/get-prototype-of */ \"./node_modules/core-js-pure/stable/object/get-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/keys.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/object/keys */ \"./node_modules/core-js-pure/stable/object/keys.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/object/keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/object/set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/object/set-prototype-of.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/object/set-prototype-of */ \"./node_modules/core-js-pure/stable/object/set-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/promise/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/promise/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/promise */ \"./node_modules/core-js-pure/stable/promise/index.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.with-resolvers */ \"./node_modules/core-js-pure/modules/esnext.promise.with-resolvers.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/reflect/construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/reflect/construct.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/reflect/construct */ \"./node_modules/core-js-pure/stable/reflect/construct.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/async-iterator.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/symbol/async-iterator */ \"./node_modules/core-js-pure/stable/symbol/async-iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/symbol/async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/symbol */ \"./node_modules/core-js-pure/stable/symbol/index.js\");\n\n__webpack_require__(/*! ../../modules/esnext.function.metadata */ \"./node_modules/core-js-pure/modules/esnext.function.metadata.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.async-dispose */ \"./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.dispose */ \"./node_modules/core-js-pure/modules/esnext.symbol.dispose.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.metadata */ \"./node_modules/core-js-pure/modules/esnext.symbol.metadata.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/iterator.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/symbol/iterator */ \"./node_modules/core-js-pure/stable/symbol/iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/actual/symbol/to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/actual/symbol/to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../stable/symbol/to-primitive */ \"./node_modules/core-js-pure/stable/symbol/to-primitive.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/actual/symbol/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/from.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/from.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\n__webpack_require__(/*! ../../modules/es.array.from */ \"./node_modules/core-js-pure/modules/es.array.from.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Array.from;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/is-array.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/is-array.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.array.is-array */ \"./node_modules/core-js-pure/modules/es.array.is-array.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Array.isArray;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/concat.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/concat.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.concat */ \"./node_modules/core-js-pure/modules/es.array.concat.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'concat');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/filter.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/filter.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.filter */ \"./node_modules/core-js-pure/modules/es.array.filter.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'filter');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/flat-map.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/flat-map.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.flat-map */ \"./node_modules/core-js-pure/modules/es.array.flat-map.js\");\n__webpack_require__(/*! ../../../modules/es.array.unscopables.flat-map */ \"./node_modules/core-js-pure/modules/es.array.unscopables.flat-map.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'flatMap');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/for-each.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.for-each */ \"./node_modules/core-js-pure/modules/es.array.for-each.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'forEach');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/index-of.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/index-of.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.index-of */ \"./node_modules/core-js-pure/modules/es.array.index-of.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'indexOf');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.map */ \"./node_modules/core-js-pure/modules/es.array.map.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'map');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/push.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/push.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.push */ \"./node_modules/core-js-pure/modules/es.array.push.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'push');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/reduce.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/reduce.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.reduce */ \"./node_modules/core-js-pure/modules/es.array.reduce.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'reduce');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/reverse.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/reverse.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.reverse */ \"./node_modules/core-js-pure/modules/es.array.reverse.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'reverse');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/slice.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/slice.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.array.slice */ \"./node_modules/core-js-pure/modules/es.array.slice.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Array', 'slice');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/array/virtual/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/function/virtual/bind.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/es/function/virtual/bind.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.function.bind */ \"./node_modules/core-js-pure/modules/es.function.bind.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('Function', 'bind');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/function/virtual/bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/get-iterator-method.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/es/get-iterator-method.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\n__webpack_require__(/*! ../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js-pure/internals/get-iterator-method.js\");\n\nmodule.exports = getIteratorMethod;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/get-iterator.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/es/get-iterator.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\n__webpack_require__(/*! ../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\nvar getIterator = __webpack_require__(/*! ../internals/get-iterator */ \"./node_modules/core-js-pure/internals/get-iterator.js\");\n\nmodule.exports = getIterator;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/bind.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/bind.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../function/virtual/bind */ \"./node_modules/core-js-pure/es/function/virtual/bind.js\");\n\nvar FunctionPrototype = Function.prototype;\n\nmodule.exports = function (it) {\n  var own = it.bind;\n  return it === FunctionPrototype || (isPrototypeOf(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/concat.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/concat */ \"./node_modules/core-js-pure/es/array/virtual/concat.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.concat;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.concat) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/filter.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/filter */ \"./node_modules/core-js-pure/es/array/virtual/filter.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.filter;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.filter) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/flat-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/flat-map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/flat-map */ \"./node_modules/core-js-pure/es/array/virtual/flat-map.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.flatMap;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.flatMap) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/index-of.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/index-of */ \"./node_modules/core-js-pure/es/array/virtual/index-of.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.indexOf;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.indexOf) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/map.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/map */ \"./node_modules/core-js-pure/es/array/virtual/map.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.map;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.map) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/push.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/push.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/push */ \"./node_modules/core-js-pure/es/array/virtual/push.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.push;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.push) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/reduce.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/reduce.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/reduce */ \"./node_modules/core-js-pure/es/array/virtual/reduce.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.reduce;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.reduce) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/reverse.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/reverse.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/reverse */ \"./node_modules/core-js-pure/es/array/virtual/reverse.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.reverse;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.reverse) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/slice.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/slice */ \"./node_modules/core-js-pure/es/array/virtual/slice.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  var own = it.slice;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.slice) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/starts-with.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/starts-with.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../string/virtual/starts-with */ \"./node_modules/core-js-pure/es/string/virtual/starts-with.js\");\n\nvar StringPrototype = String.prototype;\n\nmodule.exports = function (it) {\n  var own = it.startsWith;\n  return typeof it == 'string' || it === StringPrototype\n    || (isPrototypeOf(StringPrototype, it) && own === StringPrototype.startsWith) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/map/index.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js-pure/es/map/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\n__webpack_require__(/*! ../../modules/es.map */ \"./node_modules/core-js-pure/modules/es.map.js\");\n__webpack_require__(/*! ../../modules/es.map.group-by */ \"./node_modules/core-js-pure/modules/es.map.group-by.js\");\n__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js-pure/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Map;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/map/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/object/create.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/create.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.object.create */ \"./node_modules/core-js-pure/modules/es.object.create.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nvar Object = path.Object;\n\nmodule.exports = function create(P, D) {\n  return Object.create(P, D);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/object/define-property.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/define-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.object.define-property */ \"./node_modules/core-js-pure/modules/es.object.define-property.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nvar Object = path.Object;\n\nvar defineProperty = module.exports = function defineProperty(it, key, desc) {\n  return Object.defineProperty(it, key, desc);\n};\n\nif (Object.defineProperty.sham) defineProperty.sham = true;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/object/get-prototype-of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/get-prototype-of.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.object.get-prototype-of */ \"./node_modules/core-js-pure/modules/es.object.get-prototype-of.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Object.getPrototypeOf;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/object/keys.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/keys.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.object.keys */ \"./node_modules/core-js-pure/modules/es.object.keys.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Object.keys;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/object/keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/object/set-prototype-of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/object/set-prototype-of.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.object.set-prototype-of */ \"./node_modules/core-js-pure/modules/es.object.set-prototype-of.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Object.setPrototypeOf;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/promise/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/promise/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.aggregate-error */ \"./node_modules/core-js-pure/modules/es.aggregate-error.js\");\n__webpack_require__(/*! ../../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\n__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js-pure/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.promise */ \"./node_modules/core-js-pure/modules/es.promise.js\");\n__webpack_require__(/*! ../../modules/es.promise.all-settled */ \"./node_modules/core-js-pure/modules/es.promise.all-settled.js\");\n__webpack_require__(/*! ../../modules/es.promise.any */ \"./node_modules/core-js-pure/modules/es.promise.any.js\");\n__webpack_require__(/*! ../../modules/es.promise.with-resolvers */ \"./node_modules/core-js-pure/modules/es.promise.with-resolvers.js\");\n__webpack_require__(/*! ../../modules/es.promise.finally */ \"./node_modules/core-js-pure/modules/es.promise.finally.js\");\n__webpack_require__(/*! ../../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Promise;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/reflect/construct.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/reflect/construct.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.reflect.construct */ \"./node_modules/core-js-pure/modules/es.reflect.construct.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Reflect.construct;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/string/virtual/starts-with.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/es/string/virtual/starts-with.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../../modules/es.string.starts-with */ \"./node_modules/core-js-pure/modules/es.string.starts-with.js\");\nvar getBuiltInPrototypeMethod = __webpack_require__(/*! ../../../internals/get-built-in-prototype-method */ \"./node_modules/core-js-pure/internals/get-built-in-prototype-method.js\");\n\nmodule.exports = getBuiltInPrototypeMethod('String', 'startsWith');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/string/virtual/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/async-iterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/async-iterator.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.symbol.async-iterator */ \"./node_modules/core-js-pure/modules/es.symbol.async-iterator.js\");\nvar WrappedWellKnownSymbolModule = __webpack_require__(/*! ../../internals/well-known-symbol-wrapped */ \"./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js\");\n\nmodule.exports = WrappedWellKnownSymbolModule.f('asyncIterator');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/symbol/async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/index.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.array.concat */ \"./node_modules/core-js-pure/modules/es.array.concat.js\");\n__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js-pure/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.symbol */ \"./node_modules/core-js-pure/modules/es.symbol.js\");\n__webpack_require__(/*! ../../modules/es.symbol.async-iterator */ \"./node_modules/core-js-pure/modules/es.symbol.async-iterator.js\");\n__webpack_require__(/*! ../../modules/es.symbol.description */ \"./node_modules/core-js-pure/modules/es.symbol.description.js\");\n__webpack_require__(/*! ../../modules/es.symbol.has-instance */ \"./node_modules/core-js-pure/modules/es.symbol.has-instance.js\");\n__webpack_require__(/*! ../../modules/es.symbol.is-concat-spreadable */ \"./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js\");\n__webpack_require__(/*! ../../modules/es.symbol.iterator */ \"./node_modules/core-js-pure/modules/es.symbol.iterator.js\");\n__webpack_require__(/*! ../../modules/es.symbol.match */ \"./node_modules/core-js-pure/modules/es.symbol.match.js\");\n__webpack_require__(/*! ../../modules/es.symbol.match-all */ \"./node_modules/core-js-pure/modules/es.symbol.match-all.js\");\n__webpack_require__(/*! ../../modules/es.symbol.replace */ \"./node_modules/core-js-pure/modules/es.symbol.replace.js\");\n__webpack_require__(/*! ../../modules/es.symbol.search */ \"./node_modules/core-js-pure/modules/es.symbol.search.js\");\n__webpack_require__(/*! ../../modules/es.symbol.species */ \"./node_modules/core-js-pure/modules/es.symbol.species.js\");\n__webpack_require__(/*! ../../modules/es.symbol.split */ \"./node_modules/core-js-pure/modules/es.symbol.split.js\");\n__webpack_require__(/*! ../../modules/es.symbol.to-primitive */ \"./node_modules/core-js-pure/modules/es.symbol.to-primitive.js\");\n__webpack_require__(/*! ../../modules/es.symbol.to-string-tag */ \"./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js\");\n__webpack_require__(/*! ../../modules/es.symbol.unscopables */ \"./node_modules/core-js-pure/modules/es.symbol.unscopables.js\");\n__webpack_require__(/*! ../../modules/es.json.to-string-tag */ \"./node_modules/core-js-pure/modules/es.json.to-string-tag.js\");\n__webpack_require__(/*! ../../modules/es.math.to-string-tag */ \"./node_modules/core-js-pure/modules/es.math.to-string-tag.js\");\n__webpack_require__(/*! ../../modules/es.reflect.to-string-tag */ \"./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js\");\nvar path = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = path.Symbol;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/iterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/iterator.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\n__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js-pure/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.string.iterator */ \"./node_modules/core-js-pure/modules/es.string.iterator.js\");\n__webpack_require__(/*! ../../modules/es.symbol.iterator */ \"./node_modules/core-js-pure/modules/es.symbol.iterator.js\");\nvar WrappedWellKnownSymbolModule = __webpack_require__(/*! ../../internals/well-known-symbol-wrapped */ \"./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js\");\n\nmodule.exports = WrappedWellKnownSymbolModule.f('iterator');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/es/symbol/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/es/symbol/to-primitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../../modules/es.date.to-primitive */ \"./node_modules/core-js-pure/modules/es.date.to-primitive.js\");\n__webpack_require__(/*! ../../modules/es.symbol.to-primitive */ \"./node_modules/core-js-pure/modules/es.symbol.to-primitive.js\");\nvar WrappedWellKnownSymbolModule = __webpack_require__(/*! ../../internals/well-known-symbol-wrapped */ \"./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js\");\n\nmodule.exports = WrappedWellKnownSymbolModule.f('toPrimitive');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/es/symbol/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/array/from.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/features/array/from.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/array/from */ \"./node_modules/core-js-pure/full/array/from.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/get-iterator-method.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/features/get-iterator-method.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../full/get-iterator-method */ \"./node_modules/core-js-pure/full/get-iterator-method.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/get-iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/features/get-iterator.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../full/get-iterator */ \"./node_modules/core-js-pure/full/get-iterator.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/concat.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/concat.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/concat */ \"./node_modules/core-js-pure/full/instance/concat.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/filter.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/filter.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/filter */ \"./node_modules/core-js-pure/full/instance/filter.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/flat-map.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/flat-map.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/flat-map */ \"./node_modules/core-js-pure/full/instance/flat-map.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/for-each.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/for-each.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/for-each */ \"./node_modules/core-js-pure/full/instance/for-each.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/map.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/map.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/map */ \"./node_modules/core-js-pure/full/instance/map.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/push.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/push.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/push */ \"./node_modules/core-js-pure/full/instance/push.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/reduce.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/reduce.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/reduce */ \"./node_modules/core-js-pure/full/instance/reduce.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/reverse.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/reverse.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/reverse */ \"./node_modules/core-js-pure/full/instance/reverse.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/slice.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/slice.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/slice */ \"./node_modules/core-js-pure/full/instance/slice.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/instance/starts-with.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/features/instance/starts-with.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/instance/starts-with */ \"./node_modules/core-js-pure/full/instance/starts-with.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/object/create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/create.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/object/create */ \"./node_modules/core-js-pure/full/object/create.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/define-property.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/object/define-property */ \"./node_modules/core-js-pure/full/object/define-property.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/object/get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/get-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/object/get-prototype-of */ \"./node_modules/core-js-pure/full/object/get-prototype-of.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/object/keys.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/keys.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/object/keys */ \"./node_modules/core-js-pure/full/object/keys.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/object/keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/object/set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/features/object/set-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/object/set-prototype-of */ \"./node_modules/core-js-pure/full/object/set-prototype-of.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/promise/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/features/promise/index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/promise */ \"./node_modules/core-js-pure/full/promise/index.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/reflect/construct.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/features/reflect/construct.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/reflect/construct */ \"./node_modules/core-js-pure/full/reflect/construct.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/symbol/index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/features/symbol/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/symbol */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/features/symbol/iterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/features/symbol/iterator.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nmodule.exports = __webpack_require__(/*! ../../full/symbol/iterator */ \"./node_modules/core-js-pure/full/symbol/iterator.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/features/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/array/from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/full/array/from.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/array/from */ \"./node_modules/core-js-pure/actual/array/from.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/array/is-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/full/array/is-array.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/array/is-array */ \"./node_modules/core-js-pure/actual/array/is-array.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/array/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/full/get-iterator-method.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../actual/get-iterator-method */ \"./node_modules/core-js-pure/actual/get-iterator-method.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/get-iterator.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/full/get-iterator.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../actual/get-iterator */ \"./node_modules/core-js-pure/actual/get-iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/bind.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/bind.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/bind */ \"./node_modules/core-js-pure/actual/instance/bind.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/concat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/concat.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/concat */ \"./node_modules/core-js-pure/actual/instance/concat.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/filter.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/filter */ \"./node_modules/core-js-pure/actual/instance/filter.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/flat-map.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/flat-map.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/flat-map */ \"./node_modules/core-js-pure/actual/instance/flat-map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/for-each.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/for-each.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/for-each */ \"./node_modules/core-js-pure/actual/instance/for-each.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/index-of.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/index-of.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/index-of */ \"./node_modules/core-js-pure/actual/instance/index-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/map.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/map.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/map */ \"./node_modules/core-js-pure/actual/instance/map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/push.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/push.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/push */ \"./node_modules/core-js-pure/actual/instance/push.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/reduce.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/reduce.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/reduce */ \"./node_modules/core-js-pure/actual/instance/reduce.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/reverse.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/reverse.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/reverse */ \"./node_modules/core-js-pure/actual/instance/reverse.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/slice.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/slice.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/slice */ \"./node_modules/core-js-pure/actual/instance/slice.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/instance/starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/full/instance/starts-with.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/instance/starts-with */ \"./node_modules/core-js-pure/actual/instance/starts-with.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/map/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/full/map/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/map */ \"./node_modules/core-js-pure/actual/map/index.js\");\n__webpack_require__(/*! ../../modules/esnext.map.from */ \"./node_modules/core-js-pure/modules/esnext.map.from.js\");\n__webpack_require__(/*! ../../modules/esnext.map.of */ \"./node_modules/core-js-pure/modules/esnext.map.of.js\");\n__webpack_require__(/*! ../../modules/esnext.map.delete-all */ \"./node_modules/core-js-pure/modules/esnext.map.delete-all.js\");\n__webpack_require__(/*! ../../modules/esnext.map.emplace */ \"./node_modules/core-js-pure/modules/esnext.map.emplace.js\");\n__webpack_require__(/*! ../../modules/esnext.map.every */ \"./node_modules/core-js-pure/modules/esnext.map.every.js\");\n__webpack_require__(/*! ../../modules/esnext.map.filter */ \"./node_modules/core-js-pure/modules/esnext.map.filter.js\");\n__webpack_require__(/*! ../../modules/esnext.map.find */ \"./node_modules/core-js-pure/modules/esnext.map.find.js\");\n__webpack_require__(/*! ../../modules/esnext.map.find-key */ \"./node_modules/core-js-pure/modules/esnext.map.find-key.js\");\n__webpack_require__(/*! ../../modules/esnext.map.includes */ \"./node_modules/core-js-pure/modules/esnext.map.includes.js\");\n__webpack_require__(/*! ../../modules/esnext.map.key-by */ \"./node_modules/core-js-pure/modules/esnext.map.key-by.js\");\n__webpack_require__(/*! ../../modules/esnext.map.key-of */ \"./node_modules/core-js-pure/modules/esnext.map.key-of.js\");\n__webpack_require__(/*! ../../modules/esnext.map.map-keys */ \"./node_modules/core-js-pure/modules/esnext.map.map-keys.js\");\n__webpack_require__(/*! ../../modules/esnext.map.map-values */ \"./node_modules/core-js-pure/modules/esnext.map.map-values.js\");\n__webpack_require__(/*! ../../modules/esnext.map.merge */ \"./node_modules/core-js-pure/modules/esnext.map.merge.js\");\n__webpack_require__(/*! ../../modules/esnext.map.reduce */ \"./node_modules/core-js-pure/modules/esnext.map.reduce.js\");\n__webpack_require__(/*! ../../modules/esnext.map.some */ \"./node_modules/core-js-pure/modules/esnext.map.some.js\");\n__webpack_require__(/*! ../../modules/esnext.map.update */ \"./node_modules/core-js-pure/modules/esnext.map.update.js\");\n// TODO: remove from `core-js@4`\n__webpack_require__(/*! ../../modules/esnext.map.upsert */ \"./node_modules/core-js-pure/modules/esnext.map.upsert.js\");\n// TODO: remove from `core-js@4`\n__webpack_require__(/*! ../../modules/esnext.map.update-or-insert */ \"./node_modules/core-js-pure/modules/esnext.map.update-or-insert.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/map/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/object/create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/object/create */ \"./node_modules/core-js-pure/actual/object/create.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/object/define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/define-property.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/object/define-property */ \"./node_modules/core-js-pure/actual/object/define-property.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/object/get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/get-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/object/get-prototype-of */ \"./node_modules/core-js-pure/actual/object/get-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/object/keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/object/keys */ \"./node_modules/core-js-pure/actual/object/keys.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/object/keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/object/set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/full/object/set-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/object/set-prototype-of */ \"./node_modules/core-js-pure/actual/object/set-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/promise/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/full/promise/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/promise */ \"./node_modules/core-js-pure/actual/promise/index.js\");\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../../modules/esnext.aggregate-error */ \"./node_modules/core-js-pure/modules/esnext.aggregate-error.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.all-settled */ \"./node_modules/core-js-pure/modules/esnext.promise.all-settled.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.try */ \"./node_modules/core-js-pure/modules/esnext.promise.try.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.any */ \"./node_modules/core-js-pure/modules/esnext.promise.any.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/reflect/construct.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/full/reflect/construct.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/reflect/construct */ \"./node_modules/core-js-pure/actual/reflect/construct.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/async-iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/async-iterator.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/symbol/async-iterator */ \"./node_modules/core-js-pure/actual/symbol/async-iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/symbol/async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/index.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/symbol */ \"./node_modules/core-js-pure/actual/symbol/index.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.is-registered-symbol */ \"./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.is-well-known-symbol */ \"./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.custom-matcher */ \"./node_modules/core-js-pure/modules/esnext.symbol.custom-matcher.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.observable */ \"./node_modules/core-js-pure/modules/esnext.symbol.observable.js\");\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../../modules/esnext.symbol.is-registered */ \"./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.is-well-known */ \"./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.matcher */ \"./node_modules/core-js-pure/modules/esnext.symbol.matcher.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.metadata-key */ \"./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.pattern-match */ \"./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.replace-all */ \"./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/symbol/iterator */ \"./node_modules/core-js-pure/actual/symbol/iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/full/symbol/to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/full/symbol/to-primitive.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../actual/symbol/to-primitive */ \"./node_modules/core-js-pure/actual/symbol/to-primitive.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/full/symbol/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-callable.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-callable.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\n\nvar $TypeError = TypeError;\n\n// `Assert: IsCallable(argument) is true`\nmodule.exports = function (argument) {\n  if (isCallable(argument)) return argument;\n  throw new $TypeError(tryToString(argument) + ' is not a function');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/a-callable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-constructor.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isConstructor = __webpack_require__(/*! ../internals/is-constructor */ \"./node_modules/core-js-pure/internals/is-constructor.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\n\nvar $TypeError = TypeError;\n\n// `Assert: IsConstructor(argument) is true`\nmodule.exports = function (argument) {\n  if (isConstructor(argument)) return argument;\n  throw new $TypeError(tryToString(argument) + ' is not a constructor');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/a-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-map.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\n\nvar $TypeError = TypeError;\n\n// Perform ? RequireInternalSlot(M, [[MapData]])\nmodule.exports = function (it) {\n  if (typeof it == 'object' && 'size' in it && 'has' in it && 'get' in it && 'set' in it && 'delete' in it && 'entries' in it) return it;\n  throw new $TypeError(tryToString(it) + ' is not a map');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/a-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-possible-prototype.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-possible-prototype.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPossiblePrototype = __webpack_require__(/*! ../internals/is-possible-prototype */ \"./node_modules/core-js-pure/internals/is-possible-prototype.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\nmodule.exports = function (argument) {\n  if (isPossiblePrototype(argument)) return argument;\n  throw new $TypeError(\"Can't set \" + $String(argument) + ' as a prototype');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/a-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/add-to-unscopables.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/add-to-unscopables.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function () { /* empty */ };\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-instance.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-instance.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\n\nvar $TypeError = TypeError;\n\nmodule.exports = function (it, Prototype) {\n  if (isPrototypeOf(Prototype, it)) return it;\n  throw new $TypeError('Incorrect invocation');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/an-instance.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\n// `Assert: Type(argument) is Object`\nmodule.exports = function (argument) {\n  if (isObject(argument)) return argument;\n  throw new $TypeError($String(argument) + ' is not an object');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-buffer-non-extensible.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-buffer-non-extensible.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nmodule.exports = fails(function () {\n  if (typeof ArrayBuffer == 'function') {\n    var buffer = new ArrayBuffer(8);\n    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe\n    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-buffer-non-extensible.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $forEach = (__webpack_require__(/*! ../internals/array-iteration */ \"./node_modules/core-js-pure/internals/array-iteration.js\").forEach);\nvar arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ \"./node_modules/core-js-pure/internals/array-method-is-strict.js\");\n\nvar STRICT_METHOD = arrayMethodIsStrict('forEach');\n\n// `Array.prototype.forEach` method implementation\n// https://tc39.es/ecma262/#sec-array.prototype.foreach\nmodule.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {\n  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n// eslint-disable-next-line es/no-array-prototype-foreach -- safe\n} : [].forEach;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-from.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-from.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ \"./node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js\");\nvar isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ \"./node_modules/core-js-pure/internals/is-array-iterator-method.js\");\nvar isConstructor = __webpack_require__(/*! ../internals/is-constructor */ \"./node_modules/core-js-pure/internals/is-constructor.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar createProperty = __webpack_require__(/*! ../internals/create-property */ \"./node_modules/core-js-pure/internals/create-property.js\");\nvar getIterator = __webpack_require__(/*! ../internals/get-iterator */ \"./node_modules/core-js-pure/internals/get-iterator.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js-pure/internals/get-iterator-method.js\");\n\nvar $Array = Array;\n\n// `Array.from` method implementation\n// https://tc39.es/ecma262/#sec-array.from\nmodule.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {\n  var O = toObject(arrayLike);\n  var IS_CONSTRUCTOR = isConstructor(this);\n  var argumentsLength = arguments.length;\n  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;\n  var mapping = mapfn !== undefined;\n  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);\n  var iteratorMethod = getIteratorMethod(O);\n  var index = 0;\n  var length, result, step, iterator, next, value;\n  // if the target is not iterable or it's an array with the default iterator - use a simple case\n  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {\n    result = IS_CONSTRUCTOR ? new this() : [];\n    iterator = getIterator(O, iteratorMethod);\n    next = iterator.next;\n    for (;!(step = call(next, iterator)).done; index++) {\n      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;\n      createProperty(result, index, value);\n    }\n  } else {\n    length = lengthOfArrayLike(O);\n    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);\n    for (;length > index; index++) {\n      value = mapping ? mapfn(O[index], index) : O[index];\n      createProperty(result, index, value);\n    }\n  }\n  result.length = index;\n  return result;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-includes.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js-pure/internals/to-absolute-index.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\nvar createMethod = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = lengthOfArrayLike(O);\n    if (length === 0) return !IS_INCLUDES && -1;\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare -- NaN check\n    if (IS_INCLUDES && el !== el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare -- NaN check\n      if (value !== value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) {\n      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.includes` method\n  // https://tc39.es/ecma262/#sec-array.prototype.includes\n  includes: createMethod(true),\n  // `Array.prototype.indexOf` method\n  // https://tc39.es/ecma262/#sec-array.prototype.indexof\n  indexOf: createMethod(false)\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-iteration.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-iteration.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js-pure/internals/indexed-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ \"./node_modules/core-js-pure/internals/array-species-create.js\");\n\nvar push = uncurryThis([].push);\n\n// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation\nvar createMethod = function (TYPE) {\n  var IS_MAP = TYPE === 1;\n  var IS_FILTER = TYPE === 2;\n  var IS_SOME = TYPE === 3;\n  var IS_EVERY = TYPE === 4;\n  var IS_FIND_INDEX = TYPE === 6;\n  var IS_FILTER_REJECT = TYPE === 7;\n  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;\n  return function ($this, callbackfn, that, specificCreate) {\n    var O = toObject($this);\n    var self = IndexedObject(O);\n    var length = lengthOfArrayLike(self);\n    var boundFunction = bind(callbackfn, that);\n    var index = 0;\n    var create = specificCreate || arraySpeciesCreate;\n    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;\n    var value, result;\n    for (;length > index; index++) if (NO_HOLES || index in self) {\n      value = self[index];\n      result = boundFunction(value, index, O);\n      if (TYPE) {\n        if (IS_MAP) target[index] = result; // map\n        else if (result) switch (TYPE) {\n          case 3: return true;              // some\n          case 5: return value;             // find\n          case 6: return index;             // findIndex\n          case 2: push(target, value);      // filter\n        } else switch (TYPE) {\n          case 4: return false;             // every\n          case 7: push(target, value);      // filterReject\n        }\n      }\n    }\n    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.forEach` method\n  // https://tc39.es/ecma262/#sec-array.prototype.foreach\n  forEach: createMethod(0),\n  // `Array.prototype.map` method\n  // https://tc39.es/ecma262/#sec-array.prototype.map\n  map: createMethod(1),\n  // `Array.prototype.filter` method\n  // https://tc39.es/ecma262/#sec-array.prototype.filter\n  filter: createMethod(2),\n  // `Array.prototype.some` method\n  // https://tc39.es/ecma262/#sec-array.prototype.some\n  some: createMethod(3),\n  // `Array.prototype.every` method\n  // https://tc39.es/ecma262/#sec-array.prototype.every\n  every: createMethod(4),\n  // `Array.prototype.find` method\n  // https://tc39.es/ecma262/#sec-array.prototype.find\n  find: createMethod(5),\n  // `Array.prototype.findIndex` method\n  // https://tc39.es/ecma262/#sec-array.prototype.findIndex\n  findIndex: createMethod(6),\n  // `Array.prototype.filterReject` method\n  // https://github.com/tc39/proposal-array-filtering\n  filterReject: createMethod(7)\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-iteration.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-method-has-species-support.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-method-has-species-support.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js-pure/internals/engine-v8-version.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\nmodule.exports = function (METHOD_NAME) {\n  // We can't use this feature detection in V8 since it causes\n  // deoptimization and serious performance degradation\n  // https://github.com/zloirock/core-js/issues/677\n  return V8_VERSION >= 51 || !fails(function () {\n    var array = [];\n    var constructor = array.constructor = {};\n    constructor[SPECIES] = function () {\n      return { foo: 1 };\n    };\n    return array[METHOD_NAME](Boolean).foo !== 1;\n  });\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-method-has-species-support.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-method-is-strict.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-method-is-strict.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nmodule.exports = function (METHOD_NAME, argument) {\n  var method = [][METHOD_NAME];\n  return !!method && fails(function () {\n    // eslint-disable-next-line no-useless-call -- required for testing\n    method.call(null, argument || function () { return 1; }, 1);\n  });\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-method-is-strict.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-reduce.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-reduce.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js-pure/internals/indexed-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\n\nvar $TypeError = TypeError;\n\nvar REDUCE_EMPTY = 'Reduce of empty array with no initial value';\n\n// `Array.prototype.{ reduce, reduceRight }` methods implementation\nvar createMethod = function (IS_RIGHT) {\n  return function (that, callbackfn, argumentsLength, memo) {\n    var O = toObject(that);\n    var self = IndexedObject(O);\n    var length = lengthOfArrayLike(O);\n    aCallable(callbackfn);\n    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);\n    var index = IS_RIGHT ? length - 1 : 0;\n    var i = IS_RIGHT ? -1 : 1;\n    if (argumentsLength < 2) while (true) {\n      if (index in self) {\n        memo = self[index];\n        index += i;\n        break;\n      }\n      index += i;\n      if (IS_RIGHT ? index < 0 : length <= index) {\n        throw new $TypeError(REDUCE_EMPTY);\n      }\n    }\n    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {\n      memo = callbackfn(memo, self[index], index, O);\n    }\n    return memo;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.reduce` method\n  // https://tc39.es/ecma262/#sec-array.prototype.reduce\n  left: createMethod(false),\n  // `Array.prototype.reduceRight` method\n  // https://tc39.es/ecma262/#sec-array.prototype.reduceright\n  right: createMethod(true)\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-set-length.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-set-length.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\n\nvar $TypeError = TypeError;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Safari < 13 does not throw an error in this case\nvar SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {\n  // makes no sense without proper strict mode support\n  if (this !== undefined) return true;\n  try {\n    // eslint-disable-next-line es/no-object-defineproperty -- safe\n    Object.defineProperty([], 'length', { writable: false }).length = 1;\n  } catch (error) {\n    return error instanceof TypeError;\n  }\n}();\n\nmodule.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {\n  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {\n    throw new $TypeError('Cannot set read only .length');\n  } return O.length = length;\n} : function (O, length) {\n  return O.length = length;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-set-length.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-slice.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-slice.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nmodule.exports = uncurryThis([].slice);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-constructor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-constructor.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\nvar isConstructor = __webpack_require__(/*! ../internals/is-constructor */ \"./node_modules/core-js-pure/internals/is-constructor.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar SPECIES = wellKnownSymbol('species');\nvar $Array = Array;\n\n// a part of `ArraySpeciesCreate` abstract operation\n// https://tc39.es/ecma262/#sec-arrayspeciescreate\nmodule.exports = function (originalArray) {\n  var C;\n  if (isArray(originalArray)) {\n    C = originalArray.constructor;\n    // cross-realm fallback\n    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;\n    else if (isObject(C)) {\n      C = C[SPECIES];\n      if (C === null) C = undefined;\n    }\n  } return C === undefined ? $Array : C;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-species-create.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-species-create.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ \"./node_modules/core-js-pure/internals/array-species-constructor.js\");\n\n// `ArraySpeciesCreate` abstract operation\n// https://tc39.es/ecma262/#sec-arrayspeciescreate\nmodule.exports = function (originalArray, length) {\n  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/array-species-create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ \"./node_modules/core-js-pure/internals/iterator-close.js\");\n\n// call something on iterator step with safe closing on error\nmodule.exports = function (iterator, fn, value, ENTRIES) {\n  try {\n    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);\n  } catch (error) {\n    iteratorClose(iterator, 'throw', error);\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/caller.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/caller.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (methodName, numArgs) {\n  return numArgs === 1 ? function (object, arg) {\n    return object[methodName](arg);\n  } : function (object, arg1, arg2) {\n    return object[methodName](arg1, arg2);\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/caller.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/check-correctness-of-iteration.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/check-correctness-of-iteration.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar SAFE_CLOSING = false;\n\ntry {\n  var called = 0;\n  var iteratorWithReturn = {\n    next: function () {\n      return { done: !!called++ };\n    },\n    'return': function () {\n      SAFE_CLOSING = true;\n    }\n  };\n  iteratorWithReturn[ITERATOR] = function () {\n    return this;\n  };\n  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing\n  Array.from(iteratorWithReturn, function () { throw 2; });\n} catch (error) { /* empty */ }\n\nmodule.exports = function (exec, SKIP_CLOSING) {\n  try {\n    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;\n  } catch (error) { return false; } // workaround of old WebKit + `eval` bug\n  var ITERATION_SUPPORT = false;\n  try {\n    var object = {};\n    object[ITERATOR] = function () {\n      return {\n        next: function () {\n          return { done: ITERATION_SUPPORT = true };\n        }\n      };\n    };\n    exec(object);\n  } catch (error) { /* empty */ }\n  return ITERATION_SUPPORT;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/check-correctness-of-iteration.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof-raw.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof-raw.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nvar toString = uncurryThis({}.toString);\nvar stringSlice = uncurryThis(''.slice);\n\nmodule.exports = function (it) {\n  return stringSlice(toString(it), 8, -1);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js-pure/internals/to-string-tag-support.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar $Object = Object;\n\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/collection-from.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/collection-from.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// https://tc39.github.io/proposal-setmap-offrom/\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\n\nmodule.exports = function (C, adder, ENTRY) {\n  return function from(source /* , mapFn, thisArg */) {\n    var O = toObject(source);\n    var length = arguments.length;\n    var mapFn = length > 1 ? arguments[1] : undefined;\n    var mapping = mapFn !== undefined;\n    var boundFunction = mapping ? bind(mapFn, length > 2 ? arguments[2] : undefined) : undefined;\n    var result = new C();\n    var n = 0;\n    iterate(O, function (nextItem) {\n      var entry = mapping ? boundFunction(nextItem, n++) : nextItem;\n      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);\n      else adder(result, entry);\n    });\n    return result;\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/collection-from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/collection-of.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/collection-of.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\n\n// https://tc39.github.io/proposal-setmap-offrom/\nmodule.exports = function (C, adder, ENTRY) {\n  return function of() {\n    var result = new C();\n    var length = arguments.length;\n    for (var index = 0; index < length; index++) {\n      var entry = arguments[index];\n      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);\n      else adder(result, entry);\n    } return result;\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/collection-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/collection-strong.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/collection-strong.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ \"./node_modules/core-js-pure/internals/define-built-in-accessor.js\");\nvar defineBuiltIns = __webpack_require__(/*! ../internals/define-built-ins */ \"./node_modules/core-js-pure/internals/define-built-ins.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar anInstance = __webpack_require__(/*! ../internals/an-instance */ \"./node_modules/core-js-pure/internals/an-instance.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar defineIterator = __webpack_require__(/*! ../internals/iterator-define */ \"./node_modules/core-js-pure/internals/iterator-define.js\");\nvar createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ \"./node_modules/core-js-pure/internals/create-iter-result-object.js\");\nvar setSpecies = __webpack_require__(/*! ../internals/set-species */ \"./node_modules/core-js-pure/internals/set-species.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar fastKey = (__webpack_require__(/*! ../internals/internal-metadata */ \"./node_modules/core-js-pure/internals/internal-metadata.js\").fastKey);\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\n\nvar setInternalState = InternalStateModule.set;\nvar internalStateGetterFor = InternalStateModule.getterFor;\n\nmodule.exports = {\n  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {\n    var Constructor = wrapper(function (that, iterable) {\n      anInstance(that, Prototype);\n      setInternalState(that, {\n        type: CONSTRUCTOR_NAME,\n        index: create(null),\n        first: undefined,\n        last: undefined,\n        size: 0\n      });\n      if (!DESCRIPTORS) that.size = 0;\n      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });\n    });\n\n    var Prototype = Constructor.prototype;\n\n    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);\n\n    var define = function (that, key, value) {\n      var state = getInternalState(that);\n      var entry = getEntry(that, key);\n      var previous, index;\n      // change existing entry\n      if (entry) {\n        entry.value = value;\n      // create new entry\n      } else {\n        state.last = entry = {\n          index: index = fastKey(key, true),\n          key: key,\n          value: value,\n          previous: previous = state.last,\n          next: undefined,\n          removed: false\n        };\n        if (!state.first) state.first = entry;\n        if (previous) previous.next = entry;\n        if (DESCRIPTORS) state.size++;\n        else that.size++;\n        // add to index\n        if (index !== 'F') state.index[index] = entry;\n      } return that;\n    };\n\n    var getEntry = function (that, key) {\n      var state = getInternalState(that);\n      // fast case\n      var index = fastKey(key);\n      var entry;\n      if (index !== 'F') return state.index[index];\n      // frozen object case\n      for (entry = state.first; entry; entry = entry.next) {\n        if (entry.key === key) return entry;\n      }\n    };\n\n    defineBuiltIns(Prototype, {\n      // `{ Map, Set }.prototype.clear()` methods\n      // https://tc39.es/ecma262/#sec-map.prototype.clear\n      // https://tc39.es/ecma262/#sec-set.prototype.clear\n      clear: function clear() {\n        var that = this;\n        var state = getInternalState(that);\n        var entry = state.first;\n        while (entry) {\n          entry.removed = true;\n          if (entry.previous) entry.previous = entry.previous.next = undefined;\n          entry = entry.next;\n        }\n        state.first = state.last = undefined;\n        state.index = create(null);\n        if (DESCRIPTORS) state.size = 0;\n        else that.size = 0;\n      },\n      // `{ Map, Set }.prototype.delete(key)` methods\n      // https://tc39.es/ecma262/#sec-map.prototype.delete\n      // https://tc39.es/ecma262/#sec-set.prototype.delete\n      'delete': function (key) {\n        var that = this;\n        var state = getInternalState(that);\n        var entry = getEntry(that, key);\n        if (entry) {\n          var next = entry.next;\n          var prev = entry.previous;\n          delete state.index[entry.index];\n          entry.removed = true;\n          if (prev) prev.next = next;\n          if (next) next.previous = prev;\n          if (state.first === entry) state.first = next;\n          if (state.last === entry) state.last = prev;\n          if (DESCRIPTORS) state.size--;\n          else that.size--;\n        } return !!entry;\n      },\n      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods\n      // https://tc39.es/ecma262/#sec-map.prototype.foreach\n      // https://tc39.es/ecma262/#sec-set.prototype.foreach\n      forEach: function forEach(callbackfn /* , that = undefined */) {\n        var state = getInternalState(this);\n        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n        var entry;\n        while (entry = entry ? entry.next : state.first) {\n          boundFunction(entry.value, entry.key, this);\n          // revert to the last existing entry\n          while (entry && entry.removed) entry = entry.previous;\n        }\n      },\n      // `{ Map, Set}.prototype.has(key)` methods\n      // https://tc39.es/ecma262/#sec-map.prototype.has\n      // https://tc39.es/ecma262/#sec-set.prototype.has\n      has: function has(key) {\n        return !!getEntry(this, key);\n      }\n    });\n\n    defineBuiltIns(Prototype, IS_MAP ? {\n      // `Map.prototype.get(key)` method\n      // https://tc39.es/ecma262/#sec-map.prototype.get\n      get: function get(key) {\n        var entry = getEntry(this, key);\n        return entry && entry.value;\n      },\n      // `Map.prototype.set(key, value)` method\n      // https://tc39.es/ecma262/#sec-map.prototype.set\n      set: function set(key, value) {\n        return define(this, key === 0 ? 0 : key, value);\n      }\n    } : {\n      // `Set.prototype.add(value)` method\n      // https://tc39.es/ecma262/#sec-set.prototype.add\n      add: function add(value) {\n        return define(this, value = value === 0 ? 0 : value, value);\n      }\n    });\n    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {\n      configurable: true,\n      get: function () {\n        return getInternalState(this).size;\n      }\n    });\n    return Constructor;\n  },\n  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {\n    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';\n    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);\n    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);\n    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods\n    // https://tc39.es/ecma262/#sec-map.prototype.entries\n    // https://tc39.es/ecma262/#sec-map.prototype.keys\n    // https://tc39.es/ecma262/#sec-map.prototype.values\n    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator\n    // https://tc39.es/ecma262/#sec-set.prototype.entries\n    // https://tc39.es/ecma262/#sec-set.prototype.keys\n    // https://tc39.es/ecma262/#sec-set.prototype.values\n    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator\n    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {\n      setInternalState(this, {\n        type: ITERATOR_NAME,\n        target: iterated,\n        state: getInternalCollectionState(iterated),\n        kind: kind,\n        last: undefined\n      });\n    }, function () {\n      var state = getInternalIteratorState(this);\n      var kind = state.kind;\n      var entry = state.last;\n      // revert to the last existing entry\n      while (entry && entry.removed) entry = entry.previous;\n      // get next entry\n      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {\n        // or finish the iteration\n        state.target = undefined;\n        return createIterResultObject(undefined, true);\n      }\n      // return step by kind\n      if (kind === 'keys') return createIterResultObject(entry.key, false);\n      if (kind === 'values') return createIterResultObject(entry.value, false);\n      return createIterResultObject([entry.key, entry.value], false);\n    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);\n\n    // `{ Map, Set }.prototype[@@species]` accessors\n    // https://tc39.es/ecma262/#sec-get-map-@@species\n    // https://tc39.es/ecma262/#sec-get-set-@@species\n    setSpecies(CONSTRUCTOR_NAME);\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/collection-strong.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/collection.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/collection.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ \"./node_modules/core-js-pure/internals/internal-metadata.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar anInstance = __webpack_require__(/*! ../internals/an-instance */ \"./node_modules/core-js-pure/internals/an-instance.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\nvar forEach = (__webpack_require__(/*! ../internals/array-iteration */ \"./node_modules/core-js-pure/internals/array-iteration.js\").forEach);\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\n\nvar setInternalState = InternalStateModule.set;\nvar internalStateGetterFor = InternalStateModule.getterFor;\n\nmodule.exports = function (CONSTRUCTOR_NAME, wrapper, common) {\n  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;\n  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;\n  var ADDER = IS_MAP ? 'set' : 'add';\n  var NativeConstructor = global[CONSTRUCTOR_NAME];\n  var NativePrototype = NativeConstructor && NativeConstructor.prototype;\n  var exported = {};\n  var Constructor;\n\n  if (!DESCRIPTORS || !isCallable(NativeConstructor)\n    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))\n  ) {\n    // create collection constructor\n    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);\n    InternalMetadataModule.enable();\n  } else {\n    Constructor = wrapper(function (target, iterable) {\n      setInternalState(anInstance(target, Prototype), {\n        type: CONSTRUCTOR_NAME,\n        collection: new NativeConstructor()\n      });\n      if (!isNullOrUndefined(iterable)) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });\n    });\n\n    var Prototype = Constructor.prototype;\n\n    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);\n\n    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {\n      var IS_ADDER = KEY === 'add' || KEY === 'set';\n      if (KEY in NativePrototype && !(IS_WEAK && KEY === 'clear')) {\n        createNonEnumerableProperty(Prototype, KEY, function (a, b) {\n          var collection = getInternalState(this).collection;\n          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY === 'get' ? undefined : false;\n          var result = collection[KEY](a === 0 ? 0 : a, b);\n          return IS_ADDER ? this : result;\n        });\n      }\n    });\n\n    IS_WEAK || defineProperty(Prototype, 'size', {\n      configurable: true,\n      get: function () {\n        return getInternalState(this).collection.size;\n      }\n    });\n  }\n\n  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);\n\n  exported[CONSTRUCTOR_NAME] = Constructor;\n  $({ global: true, forced: true }, exported);\n\n  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);\n\n  return Constructor;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/collection.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/copy-constructor-properties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/copy-constructor-properties.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js-pure/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\n\nmodule.exports = function (target, source, exceptions) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {\n      defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n    }\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-is-regexp-logic.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-is-regexp-logic.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar MATCH = wellKnownSymbol('match');\n\nmodule.exports = function (METHOD_NAME) {\n  var regexp = /./;\n  try {\n    '/./'[METHOD_NAME](regexp);\n  } catch (error1) {\n    try {\n      regexp[MATCH] = false;\n      return '/./'[METHOD_NAME](regexp);\n    } catch (error2) { /* empty */ }\n  } return false;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/correct-is-regexp-logic.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-prototype-getter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-prototype-getter.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  function F() { /* empty */ }\n  F.prototype.constructor = null;\n  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing\n  return Object.getPrototypeOf(new F()) !== F.prototype;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/correct-prototype-getter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-iter-result-object.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-iter-result-object.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("\n// `CreateIterResultObject` abstract operation\n// https://tc39.es/ecma262/#sec-createiterresultobject\nmodule.exports = function (value, done) {\n  return { value: value, done: done };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/create-iter-result-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\n\nmodule.exports = DESCRIPTORS ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/create-non-enumerable-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \***************************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\n\nmodule.exports = function (object, key, value) {\n  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));\n  else object[key] = value;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/create-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-built-in-accessor.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-built-in-accessor.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\n\nmodule.exports = function (target, name, descriptor) {\n  return defineProperty.f(target, name, descriptor);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/define-built-in-accessor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-built-in.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-built-in.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\n\nmodule.exports = function (target, key, value, options) {\n  if (options && options.enumerable) target[key] = value;\n  else createNonEnumerableProperty(target, key, value);\n  return target;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/define-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-built-ins.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-built-ins.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\n\nmodule.exports = function (target, src, options) {\n  for (var key in src) {\n    if (options && options.unsafe && target[key]) target[key] = src[key];\n    else defineBuiltIn(target, key, src[key], options);\n  } return target;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/define-built-ins.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/define-global-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-global-property.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\n\n// eslint-disable-next-line es/no-object-defineproperty -- safe\nvar defineProperty = Object.defineProperty;\n\nmodule.exports = function (key, value) {\n  try {\n    defineProperty(global, key, { value: value, configurable: true, writable: true });\n  } catch (error) {\n    global[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/define-global-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/descriptors.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/descriptors.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\n// Detect IE8's incomplete defineProperty implementation\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/document-create-element.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/document-create-element.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\n\nvar document = global.document;\n// typeof document.createElement is 'object' in old IE\nvar EXISTS = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return EXISTS ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js ***!
  \*****************************************************************************/
/***/ ((module) => {

eval("\nvar $TypeError = TypeError;\nvar MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991\n\nmodule.exports = function (it) {\n  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');\n  return it;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/dom-iterables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/dom-iterables.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n// iterable DOM collections\n// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods\nmodule.exports = {\n  CSSRuleList: 0,\n  CSSStyleDeclaration: 0,\n  CSSValueList: 0,\n  ClientRectList: 0,\n  DOMRectList: 0,\n  DOMStringList: 0,\n  DOMTokenList: 1,\n  DataTransferItemList: 0,\n  FileList: 0,\n  HTMLAllCollection: 0,\n  HTMLCollection: 0,\n  HTMLFormElement: 0,\n  HTMLSelectElement: 0,\n  MediaList: 0,\n  MimeTypeArray: 0,\n  NamedNodeMap: 0,\n  NodeList: 1,\n  PaintRequestList: 0,\n  Plugin: 0,\n  PluginArray: 0,\n  SVGLengthList: 0,\n  SVGNumberList: 0,\n  SVGPathSegList: 0,\n  SVGPointList: 0,\n  SVGStringList: 0,\n  SVGTransformList: 0,\n  SourceBufferList: 0,\n  StyleSheetList: 0,\n  TextTrackCueList: 0,\n  TextTrackList: 0,\n  TouchList: 0\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/dom-iterables.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-browser.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-browser.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar IS_DENO = __webpack_require__(/*! ../internals/engine-is-deno */ \"./node_modules/core-js-pure/internals/engine-is-deno.js\");\nvar IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ \"./node_modules/core-js-pure/internals/engine-is-node.js\");\n\nmodule.exports = !IS_DENO && !IS_NODE\n  && typeof window == 'object'\n  && typeof document == 'object';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-browser.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-deno.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-deno.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n/* global Deno -- Deno case */\nmodule.exports = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-deno.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-ios-pebble.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-ios-pebble.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ \"./node_modules/core-js-pure/internals/engine-user-agent.js\");\n\nmodule.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-ios-pebble.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-ios.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-ios.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ \"./node_modules/core-js-pure/internals/engine-user-agent.js\");\n\n// eslint-disable-next-line redos/no-vulnerable -- safe\nmodule.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-ios.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-node.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-node.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\n\nmodule.exports = classof(global.process) === 'process';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-node.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-webos-webkit.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-webos-webkit.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ \"./node_modules/core-js-pure/internals/engine-user-agent.js\");\n\nmodule.exports = /web0s(?!.*chrome)/i.test(userAgent);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-is-webos-webkit.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \******************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ \"./node_modules/core-js-pure/internals/engine-user-agent.js\");\n\nvar process = global.process;\nvar Deno = global.Deno;\nvar versions = process && process.versions || Deno && Deno.version;\nvar v8 = versions && versions.v8;\nvar match, version;\n\nif (v8) {\n  match = v8.split('.');\n  // in old Chrome, versions of V8 isn't V8 = Chrome / 10\n  // but their correct versions are not interesting for us\n  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);\n}\n\n// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`\n// so check `userAgent` even if `.v8` exists, but 0\nif (!version && userAgent) {\n  match = userAgent.match(/Edge\\/(\\d+)/);\n  if (!match || match[1] >= 74) {\n    match = userAgent.match(/Chrome\\/(\\d+)/);\n    if (match) version = +match[1];\n  }\n}\n\nmodule.exports = version;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/engine-v8-version.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/enum-bug-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/enum-bug-keys.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/error-stack-clear.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/error-stack-clear.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nvar $Error = Error;\nvar replace = uncurryThis(''.replace);\n\nvar TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');\n// eslint-disable-next-line redos/no-vulnerable -- safe\nvar V8_OR_CHAKRA_STACK_ENTRY = /\\n\\s*at [^:]*:[^\\n]*/;\nvar IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);\n\nmodule.exports = function (stack, dropEntries) {\n  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {\n    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');\n  } return stack;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/error-stack-clear.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/error-stack-install.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/error-stack-install.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar clearErrorStack = __webpack_require__(/*! ../internals/error-stack-clear */ \"./node_modules/core-js-pure/internals/error-stack-clear.js\");\nvar ERROR_STACK_INSTALLABLE = __webpack_require__(/*! ../internals/error-stack-installable */ \"./node_modules/core-js-pure/internals/error-stack-installable.js\");\n\n// non-standard V8\nvar captureStackTrace = Error.captureStackTrace;\n\nmodule.exports = function (error, C, stack, dropEntries) {\n  if (ERROR_STACK_INSTALLABLE) {\n    if (captureStackTrace) captureStackTrace(error, C);\n    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/error-stack-install.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/error-stack-installable.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/error-stack-installable.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\n\nmodule.exports = !fails(function () {\n  var error = new Error('a');\n  if (!('stack' in error)) return true;\n  // eslint-disable-next-line es/no-object-defineproperty -- safe\n  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));\n  return error.stack !== 7;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/error-stack-installable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/export.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/export.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js-pure/internals/function-apply.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ \"./node_modules/core-js-pure/internals/function-uncurry-this-clause.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js\").f);\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js-pure/internals/is-forced.js\");\nvar path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\n// add debugging info\n__webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js-pure/internals/shared-store.js\");\n\nvar wrapConstructor = function (NativeConstructor) {\n  var Wrapper = function (a, b, c) {\n    if (this instanceof Wrapper) {\n      switch (arguments.length) {\n        case 0: return new NativeConstructor();\n        case 1: return new NativeConstructor(a);\n        case 2: return new NativeConstructor(a, b);\n      } return new NativeConstructor(a, b, c);\n    } return apply(NativeConstructor, this, arguments);\n  };\n  Wrapper.prototype = NativeConstructor.prototype;\n  return Wrapper;\n};\n\n/*\n  options.target         - name of the target object\n  options.global         - target is the global object\n  options.stat           - export as static methods of target\n  options.proto          - export as prototype methods of target\n  options.real           - real prototype method for the `pure` version\n  options.forced         - export even if the native feature is available\n  options.bind           - bind methods to the target, required for the `pure` version\n  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe         - use the simple assignment of property instead of delete + defineProperty\n  options.sham           - add a flag to not completely full polyfills\n  options.enumerable     - export as enumerable property\n  options.dontCallGetSet - prevent calling a getter on target\n  options.name           - the .name of the function if it does not match the key\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var PROTO = options.proto;\n\n  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : global[TARGET] && global[TARGET].prototype;\n\n  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];\n  var targetPrototype = target.prototype;\n\n  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;\n  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;\n\n  for (key in source) {\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contains in native\n    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);\n\n    targetProperty = target[key];\n\n    if (USE_NATIVE) if (options.dontCallGetSet) {\n      descriptor = getOwnPropertyDescriptor(nativeSource, key);\n      nativeProperty = descriptor && descriptor.value;\n    } else nativeProperty = nativeSource[key];\n\n    // export native or implementation\n    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];\n\n    if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;\n\n    // bind methods to global for calling from export context\n    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);\n    // wrap global constructors for prevent changes in this version\n    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);\n    // make static versions for prototype methods\n    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);\n    // default case\n    else resultProperty = sourceProperty;\n\n    // add a flag to not completely full polyfills\n    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {\n      createNonEnumerableProperty(resultProperty, 'sham', true);\n    }\n\n    createNonEnumerableProperty(target, key, resultProperty);\n\n    if (PROTO) {\n      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';\n      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {\n        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});\n      }\n      // export virtual prototype methods\n      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);\n      // export real prototype methods\n      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {\n        createNonEnumerableProperty(targetPrototype, key, sourceProperty);\n      }\n    }\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/fails.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/fails.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/flatten-into-array.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/flatten-into-array.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ \"./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\n\n// `FlattenIntoArray` abstract operation\n// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray\nvar flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {\n  var targetIndex = start;\n  var sourceIndex = 0;\n  var mapFn = mapper ? bind(mapper, thisArg) : false;\n  var element, elementLen;\n\n  while (sourceIndex < sourceLen) {\n    if (sourceIndex in source) {\n      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];\n\n      if (depth > 0 && isArray(element)) {\n        elementLen = lengthOfArrayLike(element);\n        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;\n      } else {\n        doesNotExceedSafeInteger(targetIndex + 1);\n        target[targetIndex] = element;\n      }\n\n      targetIndex++;\n    }\n    sourceIndex++;\n  }\n  return targetIndex;\n};\n\nmodule.exports = flattenIntoArray;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/flatten-into-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/freezing.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/freezing.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing\n  return Object.isExtensible(Object.preventExtensions({}));\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/freezing.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-apply.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-apply.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js-pure/internals/function-bind-native.js\");\n\nvar FunctionPrototype = Function.prototype;\nvar apply = FunctionPrototype.apply;\nvar call = FunctionPrototype.call;\n\n// eslint-disable-next-line es/no-reflect -- safe\nmodule.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {\n  return call.apply(apply, arguments);\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-apply.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-context.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-context.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ \"./node_modules/core-js-pure/internals/function-uncurry-this-clause.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js-pure/internals/function-bind-native.js\");\n\nvar bind = uncurryThis(uncurryThis.bind);\n\n// optional / simple context binding\nmodule.exports = function (fn, that) {\n  aCallable(fn);\n  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-bind-context.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-native.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-native.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es/no-function-prototype-bind -- safe\n  var test = (function () { /* empty */ }).bind();\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return typeof test != 'function' || test.hasOwnProperty('prototype');\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-bind-native.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar arraySlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js-pure/internals/function-bind-native.js\");\n\nvar $Function = Function;\nvar concat = uncurryThis([].concat);\nvar join = uncurryThis([].join);\nvar factories = {};\n\nvar construct = function (C, argsLength, args) {\n  if (!hasOwn(factories, argsLength)) {\n    var list = [];\n    var i = 0;\n    for (; i < argsLength; i++) list[i] = 'a[' + i + ']';\n    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');\n  } return factories[argsLength](C, args);\n};\n\n// `Function.prototype.bind` method implementation\n// https://tc39.es/ecma262/#sec-function.prototype.bind\n// eslint-disable-next-line es/no-function-prototype-bind -- detection\nmodule.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {\n  var F = aCallable(this);\n  var Prototype = F.prototype;\n  var partArgs = arraySlice(arguments, 1);\n  var boundFunction = function bound(/* args... */) {\n    var args = concat(partArgs, arraySlice(arguments));\n    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);\n  };\n  if (isObject(Prototype)) boundFunction.prototype = Prototype;\n  return boundFunction;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-call.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-call.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js-pure/internals/function-bind-native.js\");\n\nvar call = Function.prototype.call;\n\nmodule.exports = NATIVE_BIND ? call.bind(call) : function () {\n  return call.apply(call, arguments);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-call.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-name.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-name.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\n\nvar FunctionPrototype = Function.prototype;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;\n\nvar EXISTS = hasOwn(FunctionPrototype, 'name');\n// additional protection from minified / mangled / dropped function names\nvar PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';\nvar CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));\n\nmodule.exports = {\n  EXISTS: EXISTS,\n  PROPER: PROPER,\n  CONFIGURABLE: CONFIGURABLE\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-name.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\n\nmodule.exports = function (object, key, method) {\n  try {\n    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\n    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));\n  } catch (error) { /* empty */ }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nmodule.exports = function (fn) {\n  // Nashorn bug:\n  //   https://github.com/zloirock/core-js/issues/1128\n  //   https://github.com/zloirock/core-js/issues/1130\n  if (classofRaw(fn) === 'Function') return uncurryThis(fn);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-uncurry-this-clause.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js-pure/internals/function-bind-native.js\");\n\nvar FunctionPrototype = Function.prototype;\nvar call = FunctionPrototype.call;\nvar uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);\n\nmodule.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {\n  return function () {\n    return call.apply(fn, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/function-uncurry-this.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in-prototype-method.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in-prototype-method.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\n\nmodule.exports = function (CONSTRUCTOR, METHOD) {\n  var Namespace = path[CONSTRUCTOR + 'Prototype'];\n  var pureMethod = Namespace && Namespace[METHOD];\n  if (pureMethod) return pureMethod;\n  var NativeConstructor = global[CONSTRUCTOR];\n  var NativePrototype = NativeConstructor && NativeConstructor.prototype;\n  return NativePrototype && NativePrototype[METHOD];\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-built-in-prototype-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-built-in.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\n\nvar aFunction = function (variable) {\n  return isCallable(variable) ? variable : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])\n    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-iterator-method.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js-pure/internals/classof.js\");\nvar getMethod = __webpack_require__(/*! ../internals/get-method */ \"./node_modules/core-js-pure/internals/get-method.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\n\nmodule.exports = function (it) {\n  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)\n    || getMethod(it, '@@iterator')\n    || Iterators[classof(it)];\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-iterator.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js-pure/internals/get-iterator-method.js\");\n\nvar $TypeError = TypeError;\n\nmodule.exports = function (argument, usingIterator) {\n  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;\n  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));\n  throw new $TypeError(tryToString(argument) + ' is not iterable');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-json-replacer-function.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-json-replacer-function.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\n\nvar push = uncurryThis([].push);\n\nmodule.exports = function (replacer) {\n  if (isCallable(replacer)) return replacer;\n  if (!isArray(replacer)) return;\n  var rawLength = replacer.length;\n  var keys = [];\n  for (var i = 0; i < rawLength; i++) {\n    var element = replacer[i];\n    if (typeof element == 'string') push(keys, element);\n    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));\n  }\n  var keysLength = keys.length;\n  var root = true;\n  return function (key, value) {\n    if (root) {\n      root = false;\n      return value;\n    }\n    if (isArray(this)) return value;\n    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;\n  };\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-json-replacer-function.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-method.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-method.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\n\n// `GetMethod` abstract operation\n// https://tc39.es/ecma262/#sec-getmethod\nmodule.exports = function (V, P) {\n  var func = V[P];\n  return isNullOrUndefined(func) ? undefined : aCallable(func);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/get-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/global.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/global.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar check = function (it) {\n  return it && it.Math === Math && it;\n};\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports =\n  // eslint-disable-next-line es/no-global-this -- safe\n  check(typeof globalThis == 'object' && globalThis) ||\n  check(typeof window == 'object' && window) ||\n  // eslint-disable-next-line no-restricted-globals -- safe\n  check(typeof self == 'object' && self) ||\n  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||\n  check(typeof this == 'object' && this) ||\n  // eslint-disable-next-line no-new-func -- fallback\n  (function () { return this; })() || Function('return this')();\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/global.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/has-own-property.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/has-own-property.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\n\nvar hasOwnProperty = uncurryThis({}.hasOwnProperty);\n\n// `HasOwnProperty` abstract operation\n// https://tc39.es/ecma262/#sec-hasownproperty\n// eslint-disable-next-line es/no-object-hasown -- safe\nmodule.exports = Object.hasOwn || function hasOwn(it, key) {\n  return hasOwnProperty(toObject(it), key);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/has-own-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/hidden-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/hidden-keys.js ***!
  \************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = {};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/host-report-errors.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/host-report-errors.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (a, b) {\n  try {\n    // eslint-disable-next-line no-console -- safe\n    arguments.length === 1 ? console.error(a) : console.error(a, b);\n  } catch (error) { /* empty */ }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/host-report-errors.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/html.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/html.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\n\nmodule.exports = getBuiltIn('document', 'documentElement');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js-pure/internals/document-create-element.js\");\n\n// Thanks to IE8 for its funny defineProperty\nmodule.exports = !DESCRIPTORS && !fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty(createElement('div'), 'a', {\n    get: function () { return 7; }\n  }).a !== 7;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/indexed-object.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/indexed-object.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\n\nvar $Object = Object;\nvar split = uncurryThis(''.split);\n\n// fallback for non-array-like ES3 and non-enumerable old V8 strings\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return !$Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) === 'String' ? split(it, '') : $Object(it);\n} : $Object;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/inspect-source.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/inspect-source.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js-pure/internals/shared-store.js\");\n\nvar functionToString = uncurryThis(Function.toString);\n\n// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper\nif (!isCallable(store.inspectSource)) {\n  store.inspectSource = function (it) {\n    return functionToString(it);\n  };\n}\n\nmodule.exports = store.inspectSource;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/inspect-source.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/install-error-cause.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/install-error-cause.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\n\n// `InstallErrorCause` abstract operation\n// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause\nmodule.exports = function (O, options) {\n  if (isObject(options) && 'cause' in options) {\n    createNonEnumerableProperty(O, 'cause', options.cause);\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/install-error-cause.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/internal-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/internal-metadata.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js-pure/internals/hidden-keys.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js-pure/internals/object-get-own-property-names.js\");\nvar getOwnPropertyNamesExternalModule = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ \"./node_modules/core-js-pure/internals/object-get-own-property-names-external.js\");\nvar isExtensible = __webpack_require__(/*! ../internals/object-is-extensible */ \"./node_modules/core-js-pure/internals/object-is-extensible.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js-pure/internals/uid.js\");\nvar FREEZING = __webpack_require__(/*! ../internals/freezing */ \"./node_modules/core-js-pure/internals/freezing.js\");\n\nvar REQUIRED = false;\nvar METADATA = uid('meta');\nvar id = 0;\n\nvar setMetadata = function (it) {\n  defineProperty(it, METADATA, { value: {\n    objectID: 'O' + id++, // object ID\n    weakData: {}          // weak collections IDs\n  } });\n};\n\nvar fastKey = function (it, create) {\n  // return a primitive with prefix\n  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;\n  if (!hasOwn(it, METADATA)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return 'F';\n    // not necessary to add metadata\n    if (!create) return 'E';\n    // add missing metadata\n    setMetadata(it);\n  // return object ID\n  } return it[METADATA].objectID;\n};\n\nvar getWeakData = function (it, create) {\n  if (!hasOwn(it, METADATA)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return true;\n    // not necessary to add metadata\n    if (!create) return false;\n    // add missing metadata\n    setMetadata(it);\n  // return the store of weak collections IDs\n  } return it[METADATA].weakData;\n};\n\n// add metadata on freeze-family methods calling\nvar onFreeze = function (it) {\n  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);\n  return it;\n};\n\nvar enable = function () {\n  meta.enable = function () { /* empty */ };\n  REQUIRED = true;\n  var getOwnPropertyNames = getOwnPropertyNamesModule.f;\n  var splice = uncurryThis([].splice);\n  var test = {};\n  test[METADATA] = 1;\n\n  // prevent exposing of metadata key\n  if (getOwnPropertyNames(test).length) {\n    getOwnPropertyNamesModule.f = function (it) {\n      var result = getOwnPropertyNames(it);\n      for (var i = 0, length = result.length; i < length; i++) {\n        if (result[i] === METADATA) {\n          splice(result, i, 1);\n          break;\n        }\n      } return result;\n    };\n\n    $({ target: 'Object', stat: true, forced: true }, {\n      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f\n    });\n  }\n};\n\nvar meta = module.exports = {\n  enable: enable,\n  fastKey: fastKey,\n  getWeakData: getWeakData,\n  onFreeze: onFreeze\n};\n\nhiddenKeys[METADATA] = true;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/internal-metadata.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/internal-state.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/internal-state.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ \"./node_modules/core-js-pure/internals/weak-map-basic-detection.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar shared = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js-pure/internals/shared-store.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js-pure/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js-pure/internals/hidden-keys.js\");\n\nvar OBJECT_ALREADY_INITIALIZED = 'Object already initialized';\nvar TypeError = global.TypeError;\nvar WeakMap = global.WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP || shared.state) {\n  var store = shared.state || (shared.state = new WeakMap());\n  /* eslint-disable no-self-assign -- prototype methods protection */\n  store.get = store.get;\n  store.has = store.has;\n  store.set = store.set;\n  /* eslint-enable no-self-assign -- prototype methods protection */\n  set = function (it, metadata) {\n    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    store.set(it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return store.get(it) || {};\n  };\n  has = function (it) {\n    return store.has(it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    createNonEnumerableProperty(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return hasOwn(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return hasOwn(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-array-iterator-method.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-array-iterator-method.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar ArrayPrototype = Array.prototype;\n\n// check on default Array iterator\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-array-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-array.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-array.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\n\n// `IsArray` abstract operation\n// https://tc39.es/ecma262/#sec-isarray\n// eslint-disable-next-line es/no-array-isarray -- safe\nmodule.exports = Array.isArray || function isArray(argument) {\n  return classof(argument) === 'Array';\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-callable.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-callable.js ***!
  \************************************************************/
/***/ ((module) => {

eval("\n// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot\nvar documentAll = typeof document == 'object' && document.all;\n\n// `IsCallable` abstract operation\n// https://tc39.es/ecma262/#sec-iscallable\n// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing\nmodule.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {\n  return typeof argument == 'function' || argument === documentAll;\n} : function (argument) {\n  return typeof argument == 'function';\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-callable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js-pure/internals/classof.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js-pure/internals/inspect-source.js\");\n\nvar noop = function () { /* empty */ };\nvar construct = getBuiltIn('Reflect', 'construct');\nvar constructorRegExp = /^\\s*(?:class|function)\\b/;\nvar exec = uncurryThis(constructorRegExp.exec);\nvar INCORRECT_TO_STRING = !constructorRegExp.test(noop);\n\nvar isConstructorModern = function isConstructor(argument) {\n  if (!isCallable(argument)) return false;\n  try {\n    construct(noop, [], argument);\n    return true;\n  } catch (error) {\n    return false;\n  }\n};\n\nvar isConstructorLegacy = function isConstructor(argument) {\n  if (!isCallable(argument)) return false;\n  switch (classof(argument)) {\n    case 'AsyncFunction':\n    case 'GeneratorFunction':\n    case 'AsyncGeneratorFunction': return false;\n  }\n  try {\n    // we can't check .prototype since constructors produced by .bind haven't it\n    // `Function#toString` throws on some built-it function in some legacy engines\n    // (for example, `DOMQuad` and similar in FF41-)\n    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));\n  } catch (error) {\n    return true;\n  }\n};\n\nisConstructorLegacy.sham = true;\n\n// `IsConstructor` abstract operation\n// https://tc39.es/ecma262/#sec-isconstructor\nmodule.exports = !construct || fails(function () {\n  var called;\n  return isConstructorModern(isConstructorModern.call)\n    || !isConstructorModern(Object)\n    || !isConstructorModern(function () { called = true; })\n    || called;\n}) ? isConstructorLegacy : isConstructorModern;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-forced.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-forced.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\n\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value === POLYFILL ? true\n    : value === NATIVE ? false\n    : isCallable(detection) ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n// we can't use just `it == null` since of `document.all` special case\n// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec\nmodule.exports = function (it) {\n  return it === null || it === undefined;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-null-or-undefined.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\n\nmodule.exports = function (it) {\n  return typeof it == 'object' ? it !== null : isCallable(it);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-possible-prototype.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-possible-prototype.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\n\nmodule.exports = function (argument) {\n  return isObject(argument) || argument === null;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-pure.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-pure.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\nmodule.exports = true;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-regexp.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar MATCH = wellKnownSymbol('match');\n\n// `IsRegExp` abstract operation\n// https://tc39.es/ecma262/#sec-isregexp\nmodule.exports = function (it) {\n  var isRegExp;\n  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-regexp.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-symbol.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-symbol.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js-pure/internals/use-symbol-as-uid.js\");\n\nvar $Object = Object;\n\nmodule.exports = USE_SYMBOL_AS_UID ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  var $Symbol = getBuiltIn('Symbol');\n  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/is-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterate-simple.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterate-simple.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\n\nmodule.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {\n  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;\n  var next = record.next;\n  var step, result;\n  while (!(step = call(next, iterator)).done) {\n    result = fn(step.value);\n    if (result !== undefined) return result;\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterate-simple.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterate.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterate.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\nvar isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ \"./node_modules/core-js-pure/internals/is-array-iterator-method.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar getIterator = __webpack_require__(/*! ../internals/get-iterator */ \"./node_modules/core-js-pure/internals/get-iterator.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js-pure/internals/get-iterator-method.js\");\nvar iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ \"./node_modules/core-js-pure/internals/iterator-close.js\");\n\nvar $TypeError = TypeError;\n\nvar Result = function (stopped, result) {\n  this.stopped = stopped;\n  this.result = result;\n};\n\nvar ResultPrototype = Result.prototype;\n\nmodule.exports = function (iterable, unboundFunction, options) {\n  var that = options && options.that;\n  var AS_ENTRIES = !!(options && options.AS_ENTRIES);\n  var IS_RECORD = !!(options && options.IS_RECORD);\n  var IS_ITERATOR = !!(options && options.IS_ITERATOR);\n  var INTERRUPTED = !!(options && options.INTERRUPTED);\n  var fn = bind(unboundFunction, that);\n  var iterator, iterFn, index, length, result, next, step;\n\n  var stop = function (condition) {\n    if (iterator) iteratorClose(iterator, 'normal', condition);\n    return new Result(true, condition);\n  };\n\n  var callFn = function (value) {\n    if (AS_ENTRIES) {\n      anObject(value);\n      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);\n    } return INTERRUPTED ? fn(value, stop) : fn(value);\n  };\n\n  if (IS_RECORD) {\n    iterator = iterable.iterator;\n  } else if (IS_ITERATOR) {\n    iterator = iterable;\n  } else {\n    iterFn = getIteratorMethod(iterable);\n    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');\n    // optimisation for array iterators\n    if (isArrayIteratorMethod(iterFn)) {\n      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {\n        result = callFn(iterable[index]);\n        if (result && isPrototypeOf(ResultPrototype, result)) return result;\n      } return new Result(false);\n    }\n    iterator = getIterator(iterable, iterFn);\n  }\n\n  next = IS_RECORD ? iterable.next : iterator.next;\n  while (!(step = call(next, iterator)).done) {\n    try {\n      result = callFn(step.value);\n    } catch (error) {\n      iteratorClose(iterator, 'throw', error);\n    }\n    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;\n  } return new Result(false);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterate.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-close.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-close.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar getMethod = __webpack_require__(/*! ../internals/get-method */ \"./node_modules/core-js-pure/internals/get-method.js\");\n\nmodule.exports = function (iterator, kind, value) {\n  var innerResult, innerError;\n  anObject(iterator);\n  try {\n    innerResult = getMethod(iterator, 'return');\n    if (!innerResult) {\n      if (kind === 'throw') throw value;\n      return value;\n    }\n    innerResult = call(innerResult, iterator);\n  } catch (error) {\n    innerError = true;\n    innerResult = error;\n  }\n  if (kind === 'throw') throw value;\n  if (innerError) throw innerResult;\n  anObject(innerResult);\n  return value;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterator-close.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-create-constructor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-create-constructor.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js-pure/internals/iterators-core.js\").IteratorPrototype);\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {\n  var TO_STRING_TAG = NAME + ' Iterator';\n  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });\n  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);\n  Iterators[TO_STRING_TAG] = returnThis;\n  return IteratorConstructor;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterator-create-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-define.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-define.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar FunctionName = __webpack_require__(/*! ../internals/function-name */ \"./node_modules/core-js-pure/internals/function-name.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ \"./node_modules/core-js-pure/internals/iterator-create-constructor.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js-pure/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js-pure/internals/object-set-prototype-of.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\nvar IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js-pure/internals/iterators-core.js\");\n\nvar PROPER_FUNCTION_NAME = FunctionName.PROPER;\nvar CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;\nvar IteratorPrototype = IteratorsCore.IteratorPrototype;\nvar BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;\nvar ITERATOR = wellKnownSymbol('iterator');\nvar KEYS = 'keys';\nvar VALUES = 'values';\nvar ENTRIES = 'entries';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {\n  createIteratorConstructor(IteratorConstructor, NAME, next);\n\n  var getIterationMethod = function (KIND) {\n    if (KIND === DEFAULT && defaultIterator) return defaultIterator;\n    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];\n\n    switch (KIND) {\n      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };\n      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };\n      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };\n    }\n\n    return function () { return new IteratorConstructor(this); };\n  };\n\n  var TO_STRING_TAG = NAME + ' Iterator';\n  var INCORRECT_VALUES_NAME = false;\n  var IterablePrototype = Iterable.prototype;\n  var nativeIterator = IterablePrototype[ITERATOR]\n    || IterablePrototype['@@iterator']\n    || DEFAULT && IterablePrototype[DEFAULT];\n  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);\n  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;\n  var CurrentIteratorPrototype, methods, KEY;\n\n  // fix native\n  if (anyNativeIterator) {\n    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));\n    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {\n      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {\n        if (setPrototypeOf) {\n          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);\n        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {\n          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);\n        }\n      }\n      // Set @@toStringTag to native iterators\n      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);\n      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;\n    }\n  }\n\n  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF\n  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {\n    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {\n      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);\n    } else {\n      INCORRECT_VALUES_NAME = true;\n      defaultIterator = function values() { return call(nativeIterator, this); };\n    }\n  }\n\n  // export additional methods\n  if (DEFAULT) {\n    methods = {\n      values: getIterationMethod(VALUES),\n      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),\n      entries: getIterationMethod(ENTRIES)\n    };\n    if (FORCED) for (KEY in methods) {\n      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {\n        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);\n      }\n    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);\n  }\n\n  // define iterator\n  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {\n    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });\n  }\n  Iterators[NAME] = defaultIterator;\n\n  return methods;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterator-define.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators-core.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators-core.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js-pure/internals/object-get-prototype-of.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar BUGGY_SAFARI_ITERATORS = false;\n\n// `%IteratorPrototype%` object\n// https://tc39.es/ecma262/#sec-%iteratorprototype%-object\nvar IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;\n\n/* eslint-disable es/no-array-prototype-keys -- safe */\nif ([].keys) {\n  arrayIterator = [].keys();\n  // Safari 8 has buggy iterators w/o `next`\n  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;\n  else {\n    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));\n    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;\n  }\n}\n\nvar NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {\n  var test = {};\n  // FF44- legacy iterators case\n  return IteratorPrototype[ITERATOR].call(test) !== test;\n});\n\nif (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};\nelse if (IS_PURE) IteratorPrototype = create(IteratorPrototype);\n\n// `%IteratorPrototype%[@@iterator]()` method\n// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator\nif (!isCallable(IteratorPrototype[ITERATOR])) {\n  defineBuiltIn(IteratorPrototype, ITERATOR, function () {\n    return this;\n  });\n}\n\nmodule.exports = {\n  IteratorPrototype: IteratorPrototype,\n  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterators-core.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("\nmodule.exports = {};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/iterators.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/length-of-array-like.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/length-of-array-like.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js-pure/internals/to-length.js\");\n\n// `LengthOfArrayLike` abstract operation\n// https://tc39.es/ecma262/#sec-lengthofarraylike\nmodule.exports = function (obj) {\n  return toLength(obj.length);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/length-of-array-like.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/map-helpers.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/map-helpers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar caller = __webpack_require__(/*! ../internals/caller */ \"./node_modules/core-js-pure/internals/caller.js\");\n\nvar Map = getBuiltIn('Map');\n\nmodule.exports = {\n  Map: Map,\n  set: caller('set', 2),\n  get: caller('get', 1),\n  has: caller('has', 1),\n  remove: caller('delete', 1),\n  proto: Map.prototype\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/map-helpers.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/map-iterate.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/map-iterate.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar iterateSimple = __webpack_require__(/*! ../internals/iterate-simple */ \"./node_modules/core-js-pure/internals/iterate-simple.js\");\n\nmodule.exports = function (map, fn, interruptible) {\n  return interruptible ? iterateSimple(map.entries(), function (entry) {\n    return fn(entry[1], entry[0]);\n  }, true) : map.forEach(fn);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/map-iterate.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/map-upsert.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/map-upsert.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\n\nvar $TypeError = TypeError;\n\n// `Map.prototype.upsert` method\n// https://github.com/tc39/proposal-upsert\nmodule.exports = function upsert(key, updateFn /* , insertFn */) {\n  var map = anObject(this);\n  var get = aCallable(map.get);\n  var has = aCallable(map.has);\n  var set = aCallable(map.set);\n  var insertFn = arguments.length > 2 ? arguments[2] : undefined;\n  var value;\n  if (!isCallable(updateFn) && !isCallable(insertFn)) {\n    throw new $TypeError('At least one callback required');\n  }\n  if (call(has, map, key)) {\n    value = call(get, map, key);\n    if (isCallable(updateFn)) {\n      value = updateFn(value);\n      call(set, map, key, value);\n    }\n  } else if (isCallable(insertFn)) {\n    value = insertFn();\n    call(set, map, key, value);\n  } return value;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/map-upsert.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/math-trunc.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/math-trunc.js ***!
  \***********************************************************/
/***/ ((module) => {

eval("\nvar ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `Math.trunc` method\n// https://tc39.es/ecma262/#sec-math.trunc\n// eslint-disable-next-line es/no-math-trunc -- safe\nmodule.exports = Math.trunc || function trunc(x) {\n  var n = +x;\n  return (n > 0 ? floor : ceil)(n);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/math-trunc.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/microtask.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/microtask.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar safeGetBuiltIn = __webpack_require__(/*! ../internals/safe-get-built-in */ \"./node_modules/core-js-pure/internals/safe-get-built-in.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar macrotask = (__webpack_require__(/*! ../internals/task */ \"./node_modules/core-js-pure/internals/task.js\").set);\nvar Queue = __webpack_require__(/*! ../internals/queue */ \"./node_modules/core-js-pure/internals/queue.js\");\nvar IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ \"./node_modules/core-js-pure/internals/engine-is-ios.js\");\nvar IS_IOS_PEBBLE = __webpack_require__(/*! ../internals/engine-is-ios-pebble */ \"./node_modules/core-js-pure/internals/engine-is-ios-pebble.js\");\nvar IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ \"./node_modules/core-js-pure/internals/engine-is-webos-webkit.js\");\nvar IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ \"./node_modules/core-js-pure/internals/engine-is-node.js\");\n\nvar MutationObserver = global.MutationObserver || global.WebKitMutationObserver;\nvar document = global.document;\nvar process = global.process;\nvar Promise = global.Promise;\nvar microtask = safeGetBuiltIn('queueMicrotask');\nvar notify, toggle, node, promise, then;\n\n// modern engines have queueMicrotask method\nif (!microtask) {\n  var queue = new Queue();\n\n  var flush = function () {\n    var parent, fn;\n    if (IS_NODE && (parent = process.domain)) parent.exit();\n    while (fn = queue.get()) try {\n      fn();\n    } catch (error) {\n      if (queue.head) notify();\n      throw error;\n    }\n    if (parent) parent.enter();\n  };\n\n  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339\n  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898\n  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {\n    toggle = true;\n    node = document.createTextNode('');\n    new MutationObserver(flush).observe(node, { characterData: true });\n    notify = function () {\n      node.data = toggle = !toggle;\n    };\n  // environments with maybe non-completely correct, but existent Promise\n  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {\n    // Promise.resolve without an argument throws an error in LG WebOS 2\n    promise = Promise.resolve(undefined);\n    // workaround of WebKit ~ iOS Safari 10.1 bug\n    promise.constructor = Promise;\n    then = bind(promise.then, promise);\n    notify = function () {\n      then(flush);\n    };\n  // Node.js without promises\n  } else if (IS_NODE) {\n    notify = function () {\n      process.nextTick(flush);\n    };\n  // for other environments - macrotask based on:\n  // - setImmediate\n  // - MessageChannel\n  // - window.postMessage\n  // - onreadystatechange\n  // - setTimeout\n  } else {\n    // `webpack` dev server bug on IE global methods - use bind(fn, global)\n    macrotask = bind(macrotask, global);\n    notify = function () {\n      macrotask(flush);\n    };\n  }\n\n  microtask = function (fn) {\n    if (!queue.head) notify();\n    queue.add(fn);\n  };\n}\n\nmodule.exports = microtask;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/microtask.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/new-promise-capability.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/new-promise-capability.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\n\nvar $TypeError = TypeError;\n\nvar PromiseCapability = function (C) {\n  var resolve, reject;\n  this.promise = new C(function ($$resolve, $$reject) {\n    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');\n    resolve = $$resolve;\n    reject = $$reject;\n  });\n  this.resolve = aCallable(resolve);\n  this.reject = aCallable(reject);\n};\n\n// `NewPromiseCapability` abstract operation\n// https://tc39.es/ecma262/#sec-newpromisecapability\nmodule.exports.f = function (C) {\n  return new PromiseCapability(C);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/new-promise-capability.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/normalize-string-argument.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/normalize-string-argument.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\n\nmodule.exports = function (argument, $default) {\n  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/normalize-string-argument.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/not-a-regexp.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/not-a-regexp.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isRegExp = __webpack_require__(/*! ../internals/is-regexp */ \"./node_modules/core-js-pure/internals/is-regexp.js\");\n\nvar $TypeError = TypeError;\n\nmodule.exports = function (it) {\n  if (isRegExp(it)) {\n    throw new $TypeError(\"The method doesn't accept regular expressions\");\n  } return it;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/not-a-regexp.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-create.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* global ActiveXObject -- old IE, WSH */\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js-pure/internals/object-define-properties.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js-pure/internals/enum-bug-keys.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js-pure/internals/hidden-keys.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js-pure/internals/html.js\");\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js-pure/internals/document-create-element.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js-pure/internals/shared-key.js\");\n\nvar GT = '>';\nvar LT = '<';\nvar PROTOTYPE = 'prototype';\nvar SCRIPT = 'script';\nvar IE_PROTO = sharedKey('IE_PROTO');\n\nvar EmptyConstructor = function () { /* empty */ };\n\nvar scriptTag = function (content) {\n  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;\n};\n\n// Create object with fake `null` prototype: use ActiveX Object with cleared prototype\nvar NullProtoObjectViaActiveX = function (activeXDocument) {\n  activeXDocument.write(scriptTag(''));\n  activeXDocument.close();\n  var temp = activeXDocument.parentWindow.Object;\n  activeXDocument = null; // avoid memory leak\n  return temp;\n};\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar NullProtoObjectViaIFrame = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = documentCreateElement('iframe');\n  var JS = 'java' + SCRIPT + ':';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  html.appendChild(iframe);\n  // https://github.com/zloirock/core-js/issues/475\n  iframe.src = String(JS);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(scriptTag('document.F=Object'));\n  iframeDocument.close();\n  return iframeDocument.F;\n};\n\n// Check for document.domain and active x support\n// No need to use active x approach when document.domain is not set\n// see https://github.com/es-shims/es5-shim/issues/150\n// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346\n// avoid IE GC bug\nvar activeXDocument;\nvar NullProtoObject = function () {\n  try {\n    activeXDocument = new ActiveXObject('htmlfile');\n  } catch (error) { /* ignore */ }\n  NullProtoObject = typeof document != 'undefined'\n    ? document.domain && activeXDocument\n      ? NullProtoObjectViaActiveX(activeXDocument) // old IE\n      : NullProtoObjectViaIFrame()\n    : NullProtoObjectViaActiveX(activeXDocument); // WSH\n  var length = enumBugKeys.length;\n  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];\n  return NullProtoObject();\n};\n\nhiddenKeys[IE_PROTO] = true;\n\n// `Object.create` method\n// https://tc39.es/ecma262/#sec-object.create\n// eslint-disable-next-line es/no-object-create -- safe\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    EmptyConstructor[PROTOTYPE] = anObject(O);\n    result = new EmptyConstructor();\n    EmptyConstructor[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = NullProtoObject();\n  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-properties.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-properties.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js-pure/internals/v8-prototype-define-bug.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js-pure/internals/object-keys.js\");\n\n// `Object.defineProperties` method\n// https://tc39.es/ecma262/#sec-object.defineproperties\n// eslint-disable-next-line es/no-object-defineproperties -- safe\nexports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var props = toIndexedObject(Properties);\n  var keys = objectKeys(Properties);\n  var length = keys.length;\n  var index = 0;\n  var key;\n  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);\n  return O;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-define-properties.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-property.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js-pure/internals/ie8-dom-define.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js-pure/internals/v8-prototype-define-bug.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js-pure/internals/to-property-key.js\");\n\nvar $TypeError = TypeError;\n// eslint-disable-next-line es/no-object-defineproperty -- safe\nvar $defineProperty = Object.defineProperty;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\nvar ENUMERABLE = 'enumerable';\nvar CONFIGURABLE = 'configurable';\nvar WRITABLE = 'writable';\n\n// `Object.defineProperty` method\n// https://tc39.es/ecma262/#sec-object.defineproperty\nexports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {\n    var current = $getOwnPropertyDescriptor(O, P);\n    if (current && current[WRITABLE]) {\n      O[P] = Attributes.value;\n      Attributes = {\n        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],\n        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],\n        writable: false\n      };\n    }\n  } return $defineProperty(O, P, Attributes);\n} : $defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return $defineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js-pure/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js-pure/internals/to-property-key.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js-pure/internals/ie8-dom-define.js\");\n\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// `Object.getOwnPropertyDescriptor` method\n// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor\nexports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPropertyKey(P);\n  if (IE8_DOM_DEFINE) try {\n    return $getOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-names-external.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-names-external.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* eslint-disable es/no-object-getownpropertynames -- safe */\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar $getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js-pure/internals/object-get-own-property-names.js\").f);\nvar arraySlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\n\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames\n  ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return $getOwnPropertyNames(it);\n  } catch (error) {\n    return arraySlice(windowNames);\n  }\n};\n\n// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && classof(it) === 'Window'\n    ? getWindowNames(it)\n    : $getOwnPropertyNames(toIndexedObject(it));\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-get-own-property-names-external.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-names.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-names.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js-pure/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js-pure/internals/enum-bug-keys.js\");\n\nvar hiddenKeys = enumBugKeys.concat('length', 'prototype');\n\n// `Object.getOwnPropertyNames` method\n// https://tc39.es/ecma262/#sec-object.getownpropertynames\n// eslint-disable-next-line es/no-object-getownpropertynames -- safe\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-symbols.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-symbols.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe\nexports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js-pure/internals/shared-key.js\");\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js-pure/internals/correct-prototype-getter.js\");\n\nvar IE_PROTO = sharedKey('IE_PROTO');\nvar $Object = Object;\nvar ObjectPrototype = $Object.prototype;\n\n// `Object.getPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.getprototypeof\n// eslint-disable-next-line es/no-object-getprototypeof -- safe\nmodule.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {\n  var object = toObject(O);\n  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];\n  var constructor = object.constructor;\n  if (isCallable(constructor) && object instanceof constructor) {\n    return constructor.prototype;\n  } return object instanceof $Object ? ObjectPrototype : null;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-is-extensible.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-is-extensible.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js-pure/internals/classof-raw.js\");\nvar ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(/*! ../internals/array-buffer-non-extensible */ \"./node_modules/core-js-pure/internals/array-buffer-non-extensible.js\");\n\n// eslint-disable-next-line es/no-object-isextensible -- safe\nvar $isExtensible = Object.isExtensible;\nvar FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });\n\n// `Object.isExtensible` method\n// https://tc39.es/ecma262/#sec-object.isextensible\nmodule.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {\n  if (!isObject(it)) return false;\n  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;\n  return $isExtensible ? $isExtensible(it) : true;\n} : $isExtensible;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-is-extensible.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nmodule.exports = uncurryThis({}.isPrototypeOf);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-is-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys-internal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys-internal.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar indexOf = (__webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js-pure/internals/array-includes.js\").indexOf);\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js-pure/internals/hidden-keys.js\");\n\nvar push = uncurryThis([].push);\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (hasOwn(O, key = names[i++])) {\n    ~indexOf(result, key) || push(result, key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js-pure/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js-pure/internals/enum-bug-keys.js\");\n\n// `Object.keys` method\n// https://tc39.es/ecma262/#sec-object.keys\n// eslint-disable-next-line es/no-object-keys -- safe\nmodule.exports = Object.keys || function keys(O) {\n  return internalObjectKeys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nvar $propertyIsEnumerable = {}.propertyIsEnumerable;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);\n\n// `Object.prototype.propertyIsEnumerable` method implementation\n// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = getOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : $propertyIsEnumerable;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-set-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-set-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* eslint-disable no-proto -- safe */\nvar uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ \"./node_modules/core-js-pure/internals/function-uncurry-this-accessor.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\nvar aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ \"./node_modules/core-js-pure/internals/a-possible-prototype.js\");\n\n// `Object.setPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.setprototypeof\n// Works with __proto__ only. Old v8 can't work with null proto objects.\n// eslint-disable-next-line es/no-object-setprototypeof -- safe\nmodule.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {\n  var CORRECT_SETTER = false;\n  var test = {};\n  var setter;\n  try {\n    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');\n    setter(test, []);\n    CORRECT_SETTER = test instanceof Array;\n  } catch (error) { /* empty */ }\n  return function setPrototypeOf(O, proto) {\n    requireObjectCoercible(O);\n    aPossiblePrototype(proto);\n    if (!isObject(O)) return O;\n    if (CORRECT_SETTER) setter(O, proto);\n    else O.__proto__ = proto;\n    return O;\n  };\n}() : undefined);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-to-string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-to-string.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js-pure/internals/to-string-tag-support.js\");\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js-pure/internals/classof.js\");\n\n// `Object.prototype.toString` method implementation\n// https://tc39.es/ecma262/#sec-object.prototype.tostring\nmodule.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {\n  return '[object ' + classof(this) + ']';\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/object-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\n\nvar $TypeError = TypeError;\n\n// `OrdinaryToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-ordinarytoprimitive\nmodule.exports = function (input, pref) {\n  var fn, val;\n  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;\n  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  throw new $TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/ordinary-to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/own-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/own-keys.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js-pure/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js-pure/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\n\nvar concat = uncurryThis([].concat);\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/path.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/path.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\nmodule.exports = {};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/path.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/perform.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/perform.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (exec) {\n  try {\n    return { error: false, value: exec() };\n  } catch (error) {\n    return { error: true, value: error };\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/perform.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/promise-constructor-detection.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/promise-constructor-detection.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js-pure/internals/is-forced.js\");\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js-pure/internals/inspect-source.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ \"./node_modules/core-js-pure/internals/engine-is-browser.js\");\nvar IS_DENO = __webpack_require__(/*! ../internals/engine-is-deno */ \"./node_modules/core-js-pure/internals/engine-is-deno.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js-pure/internals/engine-v8-version.js\");\n\nvar NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;\nvar SPECIES = wellKnownSymbol('species');\nvar SUBCLASSING = false;\nvar NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);\n\nvar FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {\n  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);\n  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);\n  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables\n  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565\n  // We can't detect it synchronously, so just check versions\n  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;\n  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution\n  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;\n  // We can't use @@species feature detection in V8 since it causes\n  // deoptimization and performance degradation\n  // https://github.com/zloirock/core-js/issues/679\n  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {\n    // Detect correctness of subclassing with @@species support\n    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });\n    var FakePromise = function (exec) {\n      exec(function () { /* empty */ }, function () { /* empty */ });\n    };\n    var constructor = promise.constructor = {};\n    constructor[SPECIES] = FakePromise;\n    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;\n    if (!SUBCLASSING) return true;\n  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test\n  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT;\n});\n\nmodule.exports = {\n  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,\n  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,\n  SUBCLASSING: SUBCLASSING\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/promise-constructor-detection.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/promise-native-constructor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/promise-native-constructor.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\n\nmodule.exports = global.Promise;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/promise-native-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/promise-resolve.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/promise-resolve.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\n\nmodule.exports = function (C, x) {\n  anObject(C);\n  if (isObject(x) && x.constructor === C) return x;\n  var promiseCapability = newPromiseCapability.f(C);\n  var resolve = promiseCapability.resolve;\n  resolve(x);\n  return promiseCapability.promise;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/promise-resolve.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js":
/*!************************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ \"./node_modules/core-js-pure/internals/check-correctness-of-iteration.js\");\nvar FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ \"./node_modules/core-js-pure/internals/promise-constructor-detection.js\").CONSTRUCTOR);\n\nmodule.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {\n  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/queue.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/queue.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\nvar Queue = function () {\n  this.head = null;\n  this.tail = null;\n};\n\nQueue.prototype = {\n  add: function (item) {\n    var entry = { item: item, next: null };\n    var tail = this.tail;\n    if (tail) tail.next = entry;\n    else this.head = entry;\n    this.tail = entry;\n  },\n  get: function () {\n    var entry = this.head;\n    if (entry) {\n      var next = this.head = entry.next;\n      if (next === null) this.tail = null;\n      return entry.item;\n    }\n  }\n};\n\nmodule.exports = Queue;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/queue.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/require-object-coercible.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\n\nvar $TypeError = TypeError;\n\n// `RequireObjectCoercible` abstract operation\n// https://tc39.es/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (isNullOrUndefined(it)) throw new $TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/safe-get-built-in.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/safe-get-built-in.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\n\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Avoid NodeJS experimental warning\nmodule.exports = function (name) {\n  if (!DESCRIPTORS) return global[name];\n  var descriptor = getOwnPropertyDescriptor(global, name);\n  return descriptor && descriptor.value;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/safe-get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/same-value-zero.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/same-value-zero.js ***!
  \****************************************************************/
/***/ ((module) => {

eval("\n// `SameValueZero` abstract operation\n// https://tc39.es/ecma262/#sec-samevaluezero\nmodule.exports = function (x, y) {\n  // eslint-disable-next-line no-self-compare -- NaN check\n  return x === y || x !== x && y !== y;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/same-value-zero.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/set-species.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-species.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ \"./node_modules/core-js-pure/internals/define-built-in-accessor.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\nmodule.exports = function (CONSTRUCTOR_NAME) {\n  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);\n\n  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {\n    defineBuiltInAccessor(Constructor, SPECIES, {\n      configurable: true,\n      get: function () { return this; }\n    });\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/set-species.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/set-to-string-tag.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-to-string-tag.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js-pure/internals/to-string-tag-support.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar toString = __webpack_require__(/*! ../internals/object-to-string */ \"./node_modules/core-js-pure/internals/object-to-string.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\n\nmodule.exports = function (it, TAG, STATIC, SET_METHOD) {\n  var target = STATIC ? it : it && it.prototype;\n  if (target) {\n    if (!hasOwn(target, TO_STRING_TAG)) {\n      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });\n    }\n    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {\n      createNonEnumerableProperty(target, 'toString', toString);\n    }\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js-pure/internals/uid.js\");\n\nvar keys = shared('keys');\n\nmodule.exports = function (key) {\n  return keys[key] || (keys[key] = uid(key));\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-store.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-store.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar globalThis = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js-pure/internals/define-global-property.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});\n\n(store.versions || (store.versions = [])).push({\n  version: '3.37.1',\n  mode: IS_PURE ? 'pure' : 'global',\n  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',\n  license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',\n  source: 'https://github.com/zloirock/core-js'\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/shared-store.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js-pure/internals/shared-store.js\");\n\nmodule.exports = function (key, value) {\n  return store[key] || (store[key] = value || {});\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/species-constructor.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar aConstructor = __webpack_require__(/*! ../internals/a-constructor */ \"./node_modules/core-js-pure/internals/a-constructor.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js-pure/internals/is-null-or-undefined.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\n// `SpeciesConstructor` abstract operation\n// https://tc39.es/ecma262/#sec-speciesconstructor\nmodule.exports = function (O, defaultConstructor) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-multibyte.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-multibyte.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js-pure/internals/to-integer-or-infinity.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\n\nvar charAt = uncurryThis(''.charAt);\nvar charCodeAt = uncurryThis(''.charCodeAt);\nvar stringSlice = uncurryThis(''.slice);\n\nvar createMethod = function (CONVERT_TO_STRING) {\n  return function ($this, pos) {\n    var S = toString(requireObjectCoercible($this));\n    var position = toIntegerOrInfinity(pos);\n    var size = S.length;\n    var first, second;\n    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;\n    first = charCodeAt(S, position);\n    return first < 0xD800 || first > 0xDBFF || position + 1 === size\n      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF\n        ? CONVERT_TO_STRING\n          ? charAt(S, position)\n          : first\n        : CONVERT_TO_STRING\n          ? stringSlice(S, position, position + 2)\n          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;\n  };\n};\n\nmodule.exports = {\n  // `String.prototype.codePointAt` method\n  // https://tc39.es/ecma262/#sec-string.prototype.codepointat\n  codeAt: createMethod(false),\n  // `String.prototype.at` method\n  // https://github.com/mathiasbynens/String.prototype.at\n  charAt: createMethod(true)\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/string-multibyte.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* eslint-disable es/no-symbol -- required for testing */\nvar V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js-pure/internals/engine-v8-version.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\n\nvar $String = global.String;\n\n// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing\nmodule.exports = !!Object.getOwnPropertySymbols && !fails(function () {\n  var symbol = Symbol('symbol detection');\n  // Chrome 38 Symbol has incorrect toString conversion\n  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances\n  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,\n  // of course, fail.\n  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||\n    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances\n    !Symbol.sham && V8_VERSION && V8_VERSION < 41;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/symbol-constructor-detection.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-define-to-primitive.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-define-to-primitive.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\n\nmodule.exports = function () {\n  var Symbol = getBuiltIn('Symbol');\n  var SymbolPrototype = Symbol && Symbol.prototype;\n  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;\n  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');\n\n  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {\n    // `Symbol.prototype[@@toPrimitive]` method\n    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive\n    // eslint-disable-next-line no-unused-vars -- required for .length\n    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {\n      return call(valueOf, this);\n    }, { arity: 1 });\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/symbol-define-to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-is-registered.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-is-registered.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nvar Symbol = getBuiltIn('Symbol');\nvar keyFor = Symbol.keyFor;\nvar thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);\n\n// `Symbol.isRegisteredSymbol` method\n// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol\nmodule.exports = Symbol.isRegisteredSymbol || function isRegisteredSymbol(value) {\n  try {\n    return keyFor(thisSymbolValue(value)) !== undefined;\n  } catch (error) {\n    return false;\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/symbol-is-registered.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-is-well-known.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-is-well-known.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js-pure/internals/is-symbol.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar Symbol = getBuiltIn('Symbol');\nvar $isWellKnownSymbol = Symbol.isWellKnownSymbol;\nvar getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');\nvar thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);\nvar WellKnownSymbolsStore = shared('wks');\n\nfor (var i = 0, symbolKeys = getOwnPropertyNames(Symbol), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {\n  // some old engines throws on access to some keys like `arguments` or `caller`\n  try {\n    var symbolKey = symbolKeys[i];\n    if (isSymbol(Symbol[symbolKey])) wellKnownSymbol(symbolKey);\n  } catch (error) { /* empty */ }\n}\n\n// `Symbol.isWellKnownSymbol` method\n// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol\n// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected\nmodule.exports = function isWellKnownSymbol(value) {\n  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;\n  try {\n    var symbol = thisSymbolValue(value);\n    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {\n      // eslint-disable-next-line eqeqeq -- polyfilled symbols case\n      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;\n    }\n  } catch (error) { /* empty */ }\n  return false;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/symbol-is-well-known.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/symbol-registry-detection.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/symbol-registry-detection.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\n\n/* eslint-disable es/no-symbol -- safe */\nmodule.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/symbol-registry-detection.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/task.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/task.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js-pure/internals/function-apply.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js-pure/internals/html.js\");\nvar arraySlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js-pure/internals/document-create-element.js\");\nvar validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ \"./node_modules/core-js-pure/internals/validate-arguments-length.js\");\nvar IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ \"./node_modules/core-js-pure/internals/engine-is-ios.js\");\nvar IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ \"./node_modules/core-js-pure/internals/engine-is-node.js\");\n\nvar set = global.setImmediate;\nvar clear = global.clearImmediate;\nvar process = global.process;\nvar Dispatch = global.Dispatch;\nvar Function = global.Function;\nvar MessageChannel = global.MessageChannel;\nvar String = global.String;\nvar counter = 0;\nvar queue = {};\nvar ONREADYSTATECHANGE = 'onreadystatechange';\nvar $location, defer, channel, port;\n\nfails(function () {\n  // Deno throws a ReferenceError on `location` access without `--location` flag\n  $location = global.location;\n});\n\nvar run = function (id) {\n  if (hasOwn(queue, id)) {\n    var fn = queue[id];\n    delete queue[id];\n    fn();\n  }\n};\n\nvar runner = function (id) {\n  return function () {\n    run(id);\n  };\n};\n\nvar eventListener = function (event) {\n  run(event.data);\n};\n\nvar globalPostMessageDefer = function (id) {\n  // old engines have not location.origin\n  global.postMessage(String(id), $location.protocol + '//' + $location.host);\n};\n\n// Node.js 0.9+ & IE10+ has setImmediate, otherwise:\nif (!set || !clear) {\n  set = function setImmediate(handler) {\n    validateArgumentsLength(arguments.length, 1);\n    var fn = isCallable(handler) ? handler : Function(handler);\n    var args = arraySlice(arguments, 1);\n    queue[++counter] = function () {\n      apply(fn, undefined, args);\n    };\n    defer(counter);\n    return counter;\n  };\n  clear = function clearImmediate(id) {\n    delete queue[id];\n  };\n  // Node.js 0.8-\n  if (IS_NODE) {\n    defer = function (id) {\n      process.nextTick(runner(id));\n    };\n  // Sphere (JS game engine) Dispatch API\n  } else if (Dispatch && Dispatch.now) {\n    defer = function (id) {\n      Dispatch.now(runner(id));\n    };\n  // Browsers with MessageChannel, includes WebWorkers\n  // except iOS - https://github.com/zloirock/core-js/issues/624\n  } else if (MessageChannel && !IS_IOS) {\n    channel = new MessageChannel();\n    port = channel.port2;\n    channel.port1.onmessage = eventListener;\n    defer = bind(port.postMessage, port);\n  // Browsers with postMessage, skip WebWorkers\n  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'\n  } else if (\n    global.addEventListener &&\n    isCallable(global.postMessage) &&\n    !global.importScripts &&\n    $location && $location.protocol !== 'file:' &&\n    !fails(globalPostMessageDefer)\n  ) {\n    defer = globalPostMessageDefer;\n    global.addEventListener('message', eventListener, false);\n  // IE8-\n  } else if (ONREADYSTATECHANGE in createElement('script')) {\n    defer = function (id) {\n      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {\n        html.removeChild(this);\n        run(id);\n      };\n    };\n  // Rest old browsers\n  } else {\n    defer = function (id) {\n      setTimeout(runner(id), 0);\n    };\n  }\n}\n\nmodule.exports = {\n  set: set,\n  clear: clear\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/task.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-absolute-index.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js-pure/internals/to-integer-or-infinity.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).\nmodule.exports = function (index, length) {\n  var integer = toIntegerOrInfinity(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-indexed-object.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js-pure/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-integer-or-infinity.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-integer-or-infinity.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar trunc = __webpack_require__(/*! ../internals/math-trunc */ \"./node_modules/core-js-pure/internals/math-trunc.js\");\n\n// `ToIntegerOrInfinity` abstract operation\n// https://tc39.es/ecma262/#sec-tointegerorinfinity\nmodule.exports = function (argument) {\n  var number = +argument;\n  // eslint-disable-next-line no-self-compare -- NaN check\n  return number !== number || number === 0 ? 0 : trunc(number);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-integer-or-infinity.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-length.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-length.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js-pure/internals/to-integer-or-infinity.js\");\n\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.es/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  var len = toIntegerOrInfinity(argument);\n  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\n\nvar $Object = Object;\n\n// `ToObject` abstract operation\n// https://tc39.es/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return $Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-primitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js-pure/internals/is-symbol.js\");\nvar getMethod = __webpack_require__(/*! ../internals/get-method */ \"./node_modules/core-js-pure/internals/get-method.js\");\nvar ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ \"./node_modules/core-js-pure/internals/ordinary-to-primitive.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar $TypeError = TypeError;\nvar TO_PRIMITIVE = wellKnownSymbol('toPrimitive');\n\n// `ToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-toprimitive\nmodule.exports = function (input, pref) {\n  if (!isObject(input) || isSymbol(input)) return input;\n  var exoticToPrim = getMethod(input, TO_PRIMITIVE);\n  var result;\n  if (exoticToPrim) {\n    if (pref === undefined) pref = 'default';\n    result = call(exoticToPrim, input, pref);\n    if (!isObject(result) || isSymbol(result)) return result;\n    throw new $TypeError(\"Can't convert object to primitive value\");\n  }\n  if (pref === undefined) pref = 'number';\n  return ordinaryToPrimitive(input, pref);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-property-key.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-property-key.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js-pure/internals/to-primitive.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js-pure/internals/is-symbol.js\");\n\n// `ToPropertyKey` abstract operation\n// https://tc39.es/ecma262/#sec-topropertykey\nmodule.exports = function (argument) {\n  var key = toPrimitive(argument, 'string');\n  return isSymbol(key) ? key : key + '';\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-property-key.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar test = {};\n\ntest[TO_STRING_TAG] = 'z';\n\nmodule.exports = String(test) === '[object z]';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-string-tag-support.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-string.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js-pure/internals/classof.js\");\n\nvar $String = String;\n\nmodule.exports = function (argument) {\n  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');\n  return $String(argument);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/to-string.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/try-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/try-to-string.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\nvar $String = String;\n\nmodule.exports = function (argument) {\n  try {\n    return $String(argument);\n  } catch (error) {\n    return 'Object';\n  }\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/try-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/uid.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/uid.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\n\nvar id = 0;\nvar postfix = Math.random();\nvar toString = uncurryThis(1.0.toString);\n\nmodule.exports = function (key) {\n  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* eslint-disable es/no-symbol -- required for testing */\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\n\nmodule.exports = NATIVE_SYMBOL\n  && !Symbol.sham\n  && typeof Symbol.iterator == 'symbol';\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/use-symbol-as-uid.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\n// V8 ~ Chrome 36-\n// https://bugs.chromium.org/p/v8/issues/detail?id=3334\nmodule.exports = DESCRIPTORS && fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty(function () { /* empty */ }, 'prototype', {\n    value: 42,\n    writable: false\n  }).prototype !== 42;\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/v8-prototype-define-bug.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/validate-arguments-length.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/validate-arguments-length.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("\nvar $TypeError = TypeError;\n\nmodule.exports = function (passed, required) {\n  if (passed < required) throw new $TypeError('Not enough arguments');\n  return passed;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/validate-arguments-length.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/weak-map-basic-detection.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/weak-map-basic-detection.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\n\nvar WeakMap = global.WeakMap;\n\nmodule.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/weak-map-basic-detection.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol-define.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol-define.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js-pure/internals/path.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ \"./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\n\nmodule.exports = function (NAME) {\n  var Symbol = path.Symbol || (path.Symbol = {});\n  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {\n    value: wrappedWellKnownSymbolModule.f(NAME)\n  });\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/well-known-symbol-define.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nexports.f = wellKnownSymbol;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js-pure/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js-pure/internals/use-symbol-as-uid.js\");\n\nvar Symbol = global.Symbol;\nvar WellKnownSymbolsStore = shared('wks');\nvar createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;\n\nmodule.exports = function (name) {\n  if (!hasOwn(WellKnownSymbolsStore, name)) {\n    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)\n      ? Symbol[name]\n      : createWellKnownSymbol('Symbol.' + name);\n  } return WellKnownSymbolsStore[name];\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.aggregate-error.constructor.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.aggregate-error.constructor.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js-pure/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js-pure/internals/object-set-prototype-of.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js-pure/internals/copy-constructor-properties.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js-pure/internals/create-non-enumerable-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\nvar installErrorCause = __webpack_require__(/*! ../internals/install-error-cause */ \"./node_modules/core-js-pure/internals/install-error-cause.js\");\nvar installErrorStack = __webpack_require__(/*! ../internals/error-stack-install */ \"./node_modules/core-js-pure/internals/error-stack-install.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar normalizeStringArgument = __webpack_require__(/*! ../internals/normalize-string-argument */ \"./node_modules/core-js-pure/internals/normalize-string-argument.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar $Error = Error;\nvar push = [].push;\n\nvar $AggregateError = function AggregateError(errors, message /* , options */) {\n  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);\n  var that;\n  if (setPrototypeOf) {\n    that = setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);\n  } else {\n    that = isInstance ? this : create(AggregateErrorPrototype);\n    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');\n  }\n  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));\n  installErrorStack(that, $AggregateError, that.stack, 1);\n  if (arguments.length > 2) installErrorCause(that, arguments[2]);\n  var errorsArray = [];\n  iterate(errors, push, { that: errorsArray });\n  createNonEnumerableProperty(that, 'errors', errorsArray);\n  return that;\n};\n\nif (setPrototypeOf) setPrototypeOf($AggregateError, $Error);\nelse copyConstructorProperties($AggregateError, $Error, { name: true });\n\nvar AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {\n  constructor: createPropertyDescriptor(1, $AggregateError),\n  message: createPropertyDescriptor(1, ''),\n  name: createPropertyDescriptor(1, 'AggregateError')\n});\n\n// `AggregateError` constructor\n// https://tc39.es/ecma262/#sec-aggregate-error-constructor\n$({ global: true, constructor: true, arity: 2 }, {\n  AggregateError: $AggregateError\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.aggregate-error.constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.aggregate-error.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.aggregate-error.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove this module from `core-js@4` since it's replaced to module below\n__webpack_require__(/*! ../modules/es.aggregate-error.constructor */ \"./node_modules/core-js-pure/modules/es.aggregate-error.constructor.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.aggregate-error.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.concat.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.concat.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ \"./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js\");\nvar createProperty = __webpack_require__(/*! ../internals/create-property */ \"./node_modules/core-js-pure/internals/create-property.js\");\nvar arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ \"./node_modules/core-js-pure/internals/array-species-create.js\");\nvar arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ \"./node_modules/core-js-pure/internals/array-method-has-species-support.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js-pure/internals/engine-v8-version.js\");\n\nvar IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');\n\n// We can't use this feature detection in V8 since it causes\n// deoptimization and serious performance degradation\n// https://github.com/zloirock/core-js/issues/679\nvar IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {\n  var array = [];\n  array[IS_CONCAT_SPREADABLE] = false;\n  return array.concat()[0] !== array;\n});\n\nvar isConcatSpreadable = function (O) {\n  if (!isObject(O)) return false;\n  var spreadable = O[IS_CONCAT_SPREADABLE];\n  return spreadable !== undefined ? !!spreadable : isArray(O);\n};\n\nvar FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');\n\n// `Array.prototype.concat` method\n// https://tc39.es/ecma262/#sec-array.prototype.concat\n// with adding support of @@isConcatSpreadable and @@species\n$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {\n  // eslint-disable-next-line no-unused-vars -- required for `.length`\n  concat: function concat(arg) {\n    var O = toObject(this);\n    var A = arraySpeciesCreate(O, 0);\n    var n = 0;\n    var i, k, length, len, E;\n    for (i = -1, length = arguments.length; i < length; i++) {\n      E = i === -1 ? O : arguments[i];\n      if (isConcatSpreadable(E)) {\n        len = lengthOfArrayLike(E);\n        doesNotExceedSafeInteger(n + len);\n        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);\n      } else {\n        doesNotExceedSafeInteger(n + 1);\n        createProperty(A, n++, E);\n      }\n    }\n    A.length = n;\n    return A;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.filter.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.filter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar $filter = (__webpack_require__(/*! ../internals/array-iteration */ \"./node_modules/core-js-pure/internals/array-iteration.js\").filter);\nvar arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ \"./node_modules/core-js-pure/internals/array-method-has-species-support.js\");\n\nvar HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');\n\n// `Array.prototype.filter` method\n// https://tc39.es/ecma262/#sec-array.prototype.filter\n// with adding support of @@species\n$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {\n  filter: function filter(callbackfn /* , thisArg */) {\n    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.flat-map.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.flat-map.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ \"./node_modules/core-js-pure/internals/flatten-into-array.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ \"./node_modules/core-js-pure/internals/array-species-create.js\");\n\n// `Array.prototype.flatMap` method\n// https://tc39.es/ecma262/#sec-array.prototype.flatmap\n$({ target: 'Array', proto: true }, {\n  flatMap: function flatMap(callbackfn /* , thisArg */) {\n    var O = toObject(this);\n    var sourceLen = lengthOfArrayLike(O);\n    var A;\n    aCallable(callbackfn);\n    A = arraySpeciesCreate(O, 0);\n    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    return A;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.for-each.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.for-each.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar forEach = __webpack_require__(/*! ../internals/array-for-each */ \"./node_modules/core-js-pure/internals/array-for-each.js\");\n\n// `Array.prototype.forEach` method\n// https://tc39.es/ecma262/#sec-array.prototype.foreach\n// eslint-disable-next-line es/no-array-prototype-foreach -- safe\n$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {\n  forEach: forEach\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.from.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.from.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar from = __webpack_require__(/*! ../internals/array-from */ \"./node_modules/core-js-pure/internals/array-from.js\");\nvar checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ \"./node_modules/core-js-pure/internals/check-correctness-of-iteration.js\");\n\nvar INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {\n  // eslint-disable-next-line es/no-array-from -- required for testing\n  Array.from(iterable);\n});\n\n// `Array.from` method\n// https://tc39.es/ecma262/#sec-array.from\n$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {\n  from: from\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.index-of.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.index-of.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/* eslint-disable es/no-array-prototype-indexof -- required for testing */\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ \"./node_modules/core-js-pure/internals/function-uncurry-this-clause.js\");\nvar $indexOf = (__webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js-pure/internals/array-includes.js\").indexOf);\nvar arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ \"./node_modules/core-js-pure/internals/array-method-is-strict.js\");\n\nvar nativeIndexOf = uncurryThis([].indexOf);\n\nvar NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;\nvar FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');\n\n// `Array.prototype.indexOf` method\n// https://tc39.es/ecma262/#sec-array.prototype.indexof\n$({ target: 'Array', proto: true, forced: FORCED }, {\n  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {\n    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;\n    return NEGATIVE_ZERO\n      // convert -0 to +0\n      ? nativeIndexOf(this, searchElement, fromIndex) || 0\n      : $indexOf(this, searchElement, fromIndex);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.is-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.is-array.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\n\n// `Array.isArray` method\n// https://tc39.es/ecma262/#sec-array.isarray\n$({ target: 'Array', stat: true }, {\n  isArray: isArray\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.iterator.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.iterator.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ \"./node_modules/core-js-pure/internals/add-to-unscopables.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\nvar defineIterator = __webpack_require__(/*! ../internals/iterator-define */ \"./node_modules/core-js-pure/internals/iterator-define.js\");\nvar createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ \"./node_modules/core-js-pure/internals/create-iter-result-object.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\n\nvar ARRAY_ITERATOR = 'Array Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);\n\n// `Array.prototype.entries` method\n// https://tc39.es/ecma262/#sec-array.prototype.entries\n// `Array.prototype.keys` method\n// https://tc39.es/ecma262/#sec-array.prototype.keys\n// `Array.prototype.values` method\n// https://tc39.es/ecma262/#sec-array.prototype.values\n// `Array.prototype[@@iterator]` method\n// https://tc39.es/ecma262/#sec-array.prototype-@@iterator\n// `CreateArrayIterator` internal method\n// https://tc39.es/ecma262/#sec-createarrayiterator\nmodule.exports = defineIterator(Array, 'Array', function (iterated, kind) {\n  setInternalState(this, {\n    type: ARRAY_ITERATOR,\n    target: toIndexedObject(iterated), // target\n    index: 0,                          // next index\n    kind: kind                         // kind\n  });\n// `%ArrayIteratorPrototype%.next` method\n// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next\n}, function () {\n  var state = getInternalState(this);\n  var target = state.target;\n  var index = state.index++;\n  if (!target || index >= target.length) {\n    state.target = undefined;\n    return createIterResultObject(undefined, true);\n  }\n  switch (state.kind) {\n    case 'keys': return createIterResultObject(index, false);\n    case 'values': return createIterResultObject(target[index], false);\n  } return createIterResultObject([index, target[index]], false);\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values%\n// https://tc39.es/ecma262/#sec-createunmappedargumentsobject\n// https://tc39.es/ecma262/#sec-createmappedargumentsobject\nvar values = Iterators.Arguments = Iterators.Array;\n\n// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n// V8 ~ Chrome 45- bug\nif (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {\n  defineProperty(values, 'name', { value: 'values' });\n} catch (error) { /* empty */ }\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.map.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar $map = (__webpack_require__(/*! ../internals/array-iteration */ \"./node_modules/core-js-pure/internals/array-iteration.js\").map);\nvar arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ \"./node_modules/core-js-pure/internals/array-method-has-species-support.js\");\n\nvar HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');\n\n// `Array.prototype.map` method\n// https://tc39.es/ecma262/#sec-array.prototype.map\n// with adding support of @@species\n$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {\n  map: function map(callbackfn /* , thisArg */) {\n    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.push.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.push.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ \"./node_modules/core-js-pure/internals/array-set-length.js\");\nvar doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ \"./node_modules/core-js-pure/internals/does-not-exceed-safe-integer.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nvar INCORRECT_TO_LENGTH = fails(function () {\n  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;\n});\n\n// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError\n// https://bugs.chromium.org/p/v8/issues/detail?id=12681\nvar properErrorOnNonWritableLength = function () {\n  try {\n    // eslint-disable-next-line es/no-object-defineproperty -- safe\n    Object.defineProperty([], 'length', { writable: false }).push();\n  } catch (error) {\n    return error instanceof TypeError;\n  }\n};\n\nvar FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();\n\n// `Array.prototype.push` method\n// https://tc39.es/ecma262/#sec-array.prototype.push\n$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {\n  // eslint-disable-next-line no-unused-vars -- required for `.length`\n  push: function push(item) {\n    var O = toObject(this);\n    var len = lengthOfArrayLike(O);\n    var argCount = arguments.length;\n    doesNotExceedSafeInteger(len + argCount);\n    for (var i = 0; i < argCount; i++) {\n      O[len] = arguments[i];\n      len++;\n    }\n    setArrayLength(O, len);\n    return len;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.reduce.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.reduce.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar $reduce = (__webpack_require__(/*! ../internals/array-reduce */ \"./node_modules/core-js-pure/internals/array-reduce.js\").left);\nvar arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ \"./node_modules/core-js-pure/internals/array-method-is-strict.js\");\nvar CHROME_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js-pure/internals/engine-v8-version.js\");\nvar IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ \"./node_modules/core-js-pure/internals/engine-is-node.js\");\n\n// Chrome 80-82 has a critical bug\n// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982\nvar CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;\nvar FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');\n\n// `Array.prototype.reduce` method\n// https://tc39.es/ecma262/#sec-array.prototype.reduce\n$({ target: 'Array', proto: true, forced: FORCED }, {\n  reduce: function reduce(callbackfn /* , initialValue */) {\n    var length = arguments.length;\n    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.reverse.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.reverse.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\n\nvar nativeReverse = uncurryThis([].reverse);\nvar test = [1, 2];\n\n// `Array.prototype.reverse` method\n// https://tc39.es/ecma262/#sec-array.prototype.reverse\n// fix for Safari 12.0 bug\n// https://bugs.webkit.org/show_bug.cgi?id=188794\n$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {\n  reverse: function reverse() {\n    // eslint-disable-next-line no-self-assign -- dirty hack\n    if (isArray(this)) this.length = this.length;\n    return nativeReverse(this);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.slice.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.slice.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js-pure/internals/is-array.js\");\nvar isConstructor = __webpack_require__(/*! ../internals/is-constructor */ \"./node_modules/core-js-pure/internals/is-constructor.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js-pure/internals/to-absolute-index.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js-pure/internals/length-of-array-like.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar createProperty = __webpack_require__(/*! ../internals/create-property */ \"./node_modules/core-js-pure/internals/create-property.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ \"./node_modules/core-js-pure/internals/array-method-has-species-support.js\");\nvar nativeSlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\n\nvar HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');\n\nvar SPECIES = wellKnownSymbol('species');\nvar $Array = Array;\nvar max = Math.max;\n\n// `Array.prototype.slice` method\n// https://tc39.es/ecma262/#sec-array.prototype.slice\n// fallback for not array-like ES3 strings and DOM objects\n$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {\n  slice: function slice(start, end) {\n    var O = toIndexedObject(this);\n    var length = lengthOfArrayLike(O);\n    var k = toAbsoluteIndex(start, length);\n    var fin = toAbsoluteIndex(end === undefined ? length : end, length);\n    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible\n    var Constructor, result, n;\n    if (isArray(O)) {\n      Constructor = O.constructor;\n      // cross-realm fallback\n      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {\n        Constructor = undefined;\n      } else if (isObject(Constructor)) {\n        Constructor = Constructor[SPECIES];\n        if (Constructor === null) Constructor = undefined;\n      }\n      if (Constructor === $Array || Constructor === undefined) {\n        return nativeSlice(O, k, fin);\n      }\n    }\n    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));\n    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);\n    result.length = n;\n    return result;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.unscopables.flat-map.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.unscopables.flat-map.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// this method was added to unscopables after implementation\n// in popular engines, so it's moved to a separate module\nvar addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ \"./node_modules/core-js-pure/internals/add-to-unscopables.js\");\n\n// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables\naddToUnscopables('flatMap');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.array.unscopables.flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.date.to-primitive.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.date.to-primitive.js ***!
  \*******************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.date.to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.function.bind.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.function.bind.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind */ \"./node_modules/core-js-pure/internals/function-bind.js\");\n\n// `Function.prototype.bind` method\n// https://tc39.es/ecma262/#sec-function.prototype.bind\n// eslint-disable-next-line es/no-function-prototype-bind -- detection\n$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {\n  bind: bind\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.function.bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.json.stringify.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.json.stringify.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js-pure/internals/function-apply.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js-pure/internals/is-symbol.js\");\nvar arraySlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\nvar getReplacerFunction = __webpack_require__(/*! ../internals/get-json-replacer-function */ \"./node_modules/core-js-pure/internals/get-json-replacer-function.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\n\nvar $String = String;\nvar $stringify = getBuiltIn('JSON', 'stringify');\nvar exec = uncurryThis(/./.exec);\nvar charAt = uncurryThis(''.charAt);\nvar charCodeAt = uncurryThis(''.charCodeAt);\nvar replace = uncurryThis(''.replace);\nvar numberToString = uncurryThis(1.0.toString);\n\nvar tester = /[\\uD800-\\uDFFF]/g;\nvar low = /^[\\uD800-\\uDBFF]$/;\nvar hi = /^[\\uDC00-\\uDFFF]$/;\n\nvar WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {\n  var symbol = getBuiltIn('Symbol')('stringify detection');\n  // MS Edge converts symbol values to JSON as {}\n  return $stringify([symbol]) !== '[null]'\n    // WebKit converts symbol values to JSON as null\n    || $stringify({ a: symbol }) !== '{}'\n    // V8 throws on boxed symbols\n    || $stringify(Object(symbol)) !== '{}';\n});\n\n// https://github.com/tc39/proposal-well-formed-stringify\nvar ILL_FORMED_UNICODE = fails(function () {\n  return $stringify('\\uDF06\\uD834') !== '\"\\\\udf06\\\\ud834\"'\n    || $stringify('\\uDEAD') !== '\"\\\\udead\"';\n});\n\nvar stringifyWithSymbolsFix = function (it, replacer) {\n  var args = arraySlice(arguments);\n  var $replacer = getReplacerFunction(replacer);\n  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined\n  args[1] = function (key, value) {\n    // some old implementations (like WebKit) could pass numbers as keys\n    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);\n    if (!isSymbol(value)) return value;\n  };\n  return apply($stringify, null, args);\n};\n\nvar fixIllFormed = function (match, offset, string) {\n  var prev = charAt(string, offset - 1);\n  var next = charAt(string, offset + 1);\n  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {\n    return '\\\\u' + numberToString(charCodeAt(match, 0), 16);\n  } return match;\n};\n\nif ($stringify) {\n  // `JSON.stringify` method\n  // https://tc39.es/ecma262/#sec-json.stringify\n  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {\n    // eslint-disable-next-line no-unused-vars -- required for `.length`\n    stringify: function stringify(it, replacer, space) {\n      var args = arraySlice(arguments);\n      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);\n      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;\n    }\n  });\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.json.stringify.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.json.to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.json.to-string-tag.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\n\n// JSON[@@toStringTag] property\n// https://tc39.es/ecma262/#sec-json-@@tostringtag\nsetToStringTag(global.JSON, 'JSON', true);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.json.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.map.constructor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.map.constructor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar collection = __webpack_require__(/*! ../internals/collection */ \"./node_modules/core-js-pure/internals/collection.js\");\nvar collectionStrong = __webpack_require__(/*! ../internals/collection-strong */ \"./node_modules/core-js-pure/internals/collection-strong.js\");\n\n// `Map` constructor\n// https://tc39.es/ecma262/#sec-map-objects\ncollection('Map', function (init) {\n  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };\n}, collectionStrong);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.map.constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.map.group-by.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.map.group-by.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nvar Map = MapHelpers.Map;\nvar has = MapHelpers.has;\nvar get = MapHelpers.get;\nvar set = MapHelpers.set;\nvar push = uncurryThis([].push);\n\nvar DOES_NOT_WORK_WITH_PRIMITIVES = IS_PURE || fails(function () {\n  return Map.groupBy('ab', function (it) {\n    return it;\n  }).get('a').length !== 1;\n});\n\n// `Map.groupBy` method\n// https://github.com/tc39/proposal-array-grouping\n$({ target: 'Map', stat: true, forced: IS_PURE || DOES_NOT_WORK_WITH_PRIMITIVES }, {\n  groupBy: function groupBy(items, callbackfn) {\n    requireObjectCoercible(items);\n    aCallable(callbackfn);\n    var map = new Map();\n    var k = 0;\n    iterate(items, function (value) {\n      var key = callbackfn(value, k++);\n      if (!has(map, key)) set(map, key, [value]);\n      else push(get(map, key), value);\n    });\n    return map;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.map.group-by.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.map.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.map.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove this module from `core-js@4` since it's replaced to module below\n__webpack_require__(/*! ../modules/es.map.constructor */ \"./node_modules/core-js-pure/modules/es.map.constructor.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.math.to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.math.to-string-tag.js ***!
  \********************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.math.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.create.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\n\n// `Object.create` method\n// https://tc39.es/ecma262/#sec-object.create\n$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {\n  create: create\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.define-property.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.define-property.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\n\n// `Object.defineProperty` method\n// https://tc39.es/ecma262/#sec-object.defineproperty\n// eslint-disable-next-line es/no-object-defineproperty -- safe\n$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {\n  defineProperty: defineProperty\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js-pure/internals/object-get-own-property-symbols.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\n\n// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives\n// https://bugs.chromium.org/p/v8/issues/detail?id=3443\nvar FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });\n\n// `Object.getOwnPropertySymbols` method\n// https://tc39.es/ecma262/#sec-object.getownpropertysymbols\n$({ target: 'Object', stat: true, forced: FORCED }, {\n  getOwnPropertySymbols: function getOwnPropertySymbols(it) {\n    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.get-prototype-of.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.get-prototype-of.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar nativeGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js-pure/internals/object-get-prototype-of.js\");\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js-pure/internals/correct-prototype-getter.js\");\n\nvar FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });\n\n// `Object.getPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.getprototypeof\n$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {\n  getPrototypeOf: function getPrototypeOf(it) {\n    return nativeGetPrototypeOf(toObject(it));\n  }\n});\n\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.keys.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.keys.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js-pure/internals/to-object.js\");\nvar nativeKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js-pure/internals/object-keys.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nvar FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });\n\n// `Object.keys` method\n// https://tc39.es/ecma262/#sec-object.keys\n$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {\n  keys: function keys(it) {\n    return nativeKeys(toObject(it));\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.set-prototype-of.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.set-prototype-of.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js-pure/internals/object-set-prototype-of.js\");\n\n// `Object.setPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.setprototypeof\n$({ target: 'Object', stat: true }, {\n  setPrototypeOf: setPrototypeOf\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.to-string.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.to-string.js ***!
  \******************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.all-settled.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.all-settled.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ \"./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js\");\n\n// `Promise.allSettled` method\n// https://tc39.es/ecma262/#sec-promise.allsettled\n$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {\n  allSettled: function allSettled(iterable) {\n    var C = this;\n    var capability = newPromiseCapabilityModule.f(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var promiseResolve = aCallable(C.resolve);\n      var values = [];\n      var counter = 0;\n      var remaining = 1;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyCalled = false;\n        remaining++;\n        call(promiseResolve, C, promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = { status: 'fulfilled', value: value };\n          --remaining || resolve(values);\n        }, function (error) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = { status: 'rejected', reason: error };\n          --remaining || resolve(values);\n        });\n      });\n      --remaining || resolve(values);\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.all-settled.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.all.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.all.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ \"./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js\");\n\n// `Promise.all` method\n// https://tc39.es/ecma262/#sec-promise.all\n$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {\n  all: function all(iterable) {\n    var C = this;\n    var capability = newPromiseCapabilityModule.f(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var $promiseResolve = aCallable(C.resolve);\n      var values = [];\n      var counter = 0;\n      var remaining = 1;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyCalled = false;\n        remaining++;\n        call($promiseResolve, C, promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = value;\n          --remaining || resolve(values);\n        }, reject);\n      });\n      --remaining || resolve(values);\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.all.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.any.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.any.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ \"./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js\");\n\nvar PROMISE_ANY_ERROR = 'No one promise resolved';\n\n// `Promise.any` method\n// https://tc39.es/ecma262/#sec-promise.any\n$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {\n  any: function any(iterable) {\n    var C = this;\n    var AggregateError = getBuiltIn('AggregateError');\n    var capability = newPromiseCapabilityModule.f(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var promiseResolve = aCallable(C.resolve);\n      var errors = [];\n      var counter = 0;\n      var remaining = 1;\n      var alreadyResolved = false;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyRejected = false;\n        remaining++;\n        call(promiseResolve, C, promise).then(function (value) {\n          if (alreadyRejected || alreadyResolved) return;\n          alreadyResolved = true;\n          resolve(value);\n        }, function (error) {\n          if (alreadyRejected || alreadyResolved) return;\n          alreadyRejected = true;\n          errors[index] = error;\n          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));\n        });\n      });\n      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.any.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.catch.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.catch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ \"./node_modules/core-js-pure/internals/promise-constructor-detection.js\").CONSTRUCTOR);\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\n\nvar NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;\n\n// `Promise.prototype.catch` method\n// https://tc39.es/ecma262/#sec-promise.prototype.catch\n$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {\n  'catch': function (onRejected) {\n    return this.then(undefined, onRejected);\n  }\n});\n\n// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`\nif (!IS_PURE && isCallable(NativePromiseConstructor)) {\n  var method = getBuiltIn('Promise').prototype['catch'];\n  if (NativePromisePrototype['catch'] !== method) {\n    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });\n  }\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.catch.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.constructor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.constructor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ \"./node_modules/core-js-pure/internals/engine-is-node.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js-pure/internals/object-set-prototype-of.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar setSpecies = __webpack_require__(/*! ../internals/set-species */ \"./node_modules/core-js-pure/internals/set-species.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar anInstance = __webpack_require__(/*! ../internals/an-instance */ \"./node_modules/core-js-pure/internals/an-instance.js\");\nvar speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ \"./node_modules/core-js-pure/internals/species-constructor.js\");\nvar task = (__webpack_require__(/*! ../internals/task */ \"./node_modules/core-js-pure/internals/task.js\").set);\nvar microtask = __webpack_require__(/*! ../internals/microtask */ \"./node_modules/core-js-pure/internals/microtask.js\");\nvar hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ \"./node_modules/core-js-pure/internals/host-report-errors.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\nvar Queue = __webpack_require__(/*! ../internals/queue */ \"./node_modules/core-js-pure/internals/queue.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar PromiseConstructorDetection = __webpack_require__(/*! ../internals/promise-constructor-detection */ \"./node_modules/core-js-pure/internals/promise-constructor-detection.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\n\nvar PROMISE = 'Promise';\nvar FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;\nvar NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;\nvar NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;\nvar getInternalPromiseState = InternalStateModule.getterFor(PROMISE);\nvar setInternalState = InternalStateModule.set;\nvar NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;\nvar PromiseConstructor = NativePromiseConstructor;\nvar PromisePrototype = NativePromisePrototype;\nvar TypeError = global.TypeError;\nvar document = global.document;\nvar process = global.process;\nvar newPromiseCapability = newPromiseCapabilityModule.f;\nvar newGenericPromiseCapability = newPromiseCapability;\n\nvar DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);\nvar UNHANDLED_REJECTION = 'unhandledrejection';\nvar REJECTION_HANDLED = 'rejectionhandled';\nvar PENDING = 0;\nvar FULFILLED = 1;\nvar REJECTED = 2;\nvar HANDLED = 1;\nvar UNHANDLED = 2;\n\nvar Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;\n\n// helpers\nvar isThenable = function (it) {\n  var then;\n  return isObject(it) && isCallable(then = it.then) ? then : false;\n};\n\nvar callReaction = function (reaction, state) {\n  var value = state.value;\n  var ok = state.state === FULFILLED;\n  var handler = ok ? reaction.ok : reaction.fail;\n  var resolve = reaction.resolve;\n  var reject = reaction.reject;\n  var domain = reaction.domain;\n  var result, then, exited;\n  try {\n    if (handler) {\n      if (!ok) {\n        if (state.rejection === UNHANDLED) onHandleUnhandled(state);\n        state.rejection = HANDLED;\n      }\n      if (handler === true) result = value;\n      else {\n        if (domain) domain.enter();\n        result = handler(value); // can throw\n        if (domain) {\n          domain.exit();\n          exited = true;\n        }\n      }\n      if (result === reaction.promise) {\n        reject(new TypeError('Promise-chain cycle'));\n      } else if (then = isThenable(result)) {\n        call(then, result, resolve, reject);\n      } else resolve(result);\n    } else reject(value);\n  } catch (error) {\n    if (domain && !exited) domain.exit();\n    reject(error);\n  }\n};\n\nvar notify = function (state, isReject) {\n  if (state.notified) return;\n  state.notified = true;\n  microtask(function () {\n    var reactions = state.reactions;\n    var reaction;\n    while (reaction = reactions.get()) {\n      callReaction(reaction, state);\n    }\n    state.notified = false;\n    if (isReject && !state.rejection) onUnhandled(state);\n  });\n};\n\nvar dispatchEvent = function (name, promise, reason) {\n  var event, handler;\n  if (DISPATCH_EVENT) {\n    event = document.createEvent('Event');\n    event.promise = promise;\n    event.reason = reason;\n    event.initEvent(name, false, true);\n    global.dispatchEvent(event);\n  } else event = { promise: promise, reason: reason };\n  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);\n  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);\n};\n\nvar onUnhandled = function (state) {\n  call(task, global, function () {\n    var promise = state.facade;\n    var value = state.value;\n    var IS_UNHANDLED = isUnhandled(state);\n    var result;\n    if (IS_UNHANDLED) {\n      result = perform(function () {\n        if (IS_NODE) {\n          process.emit('unhandledRejection', value, promise);\n        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);\n      });\n      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should\n      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;\n      if (result.error) throw result.value;\n    }\n  });\n};\n\nvar isUnhandled = function (state) {\n  return state.rejection !== HANDLED && !state.parent;\n};\n\nvar onHandleUnhandled = function (state) {\n  call(task, global, function () {\n    var promise = state.facade;\n    if (IS_NODE) {\n      process.emit('rejectionHandled', promise);\n    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);\n  });\n};\n\nvar bind = function (fn, state, unwrap) {\n  return function (value) {\n    fn(state, value, unwrap);\n  };\n};\n\nvar internalReject = function (state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  state.value = value;\n  state.state = REJECTED;\n  notify(state, true);\n};\n\nvar internalResolve = function (state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  try {\n    if (state.facade === value) throw new TypeError(\"Promise can't be resolved itself\");\n    var then = isThenable(value);\n    if (then) {\n      microtask(function () {\n        var wrapper = { done: false };\n        try {\n          call(then, value,\n            bind(internalResolve, wrapper, state),\n            bind(internalReject, wrapper, state)\n          );\n        } catch (error) {\n          internalReject(wrapper, error, state);\n        }\n      });\n    } else {\n      state.value = value;\n      state.state = FULFILLED;\n      notify(state, false);\n    }\n  } catch (error) {\n    internalReject({ done: false }, error, state);\n  }\n};\n\n// constructor polyfill\nif (FORCED_PROMISE_CONSTRUCTOR) {\n  // 25.4.3.1 Promise(executor)\n  PromiseConstructor = function Promise(executor) {\n    anInstance(this, PromisePrototype);\n    aCallable(executor);\n    call(Internal, this);\n    var state = getInternalPromiseState(this);\n    try {\n      executor(bind(internalResolve, state), bind(internalReject, state));\n    } catch (error) {\n      internalReject(state, error);\n    }\n  };\n\n  PromisePrototype = PromiseConstructor.prototype;\n\n  // eslint-disable-next-line no-unused-vars -- required for `.length`\n  Internal = function Promise(executor) {\n    setInternalState(this, {\n      type: PROMISE,\n      done: false,\n      notified: false,\n      parent: false,\n      reactions: new Queue(),\n      rejection: false,\n      state: PENDING,\n      value: undefined\n    });\n  };\n\n  // `Promise.prototype.then` method\n  // https://tc39.es/ecma262/#sec-promise.prototype.then\n  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {\n    var state = getInternalPromiseState(this);\n    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));\n    state.parent = true;\n    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;\n    reaction.fail = isCallable(onRejected) && onRejected;\n    reaction.domain = IS_NODE ? process.domain : undefined;\n    if (state.state === PENDING) state.reactions.add(reaction);\n    else microtask(function () {\n      callReaction(reaction, state);\n    });\n    return reaction.promise;\n  });\n\n  OwnPromiseCapability = function () {\n    var promise = new Internal();\n    var state = getInternalPromiseState(promise);\n    this.promise = promise;\n    this.resolve = bind(internalResolve, state);\n    this.reject = bind(internalReject, state);\n  };\n\n  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {\n    return C === PromiseConstructor || C === PromiseWrapper\n      ? new OwnPromiseCapability(C)\n      : newGenericPromiseCapability(C);\n  };\n\n  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {\n    nativeThen = NativePromisePrototype.then;\n\n    if (!NATIVE_PROMISE_SUBCLASSING) {\n      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs\n      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {\n        var that = this;\n        return new PromiseConstructor(function (resolve, reject) {\n          call(nativeThen, that, resolve, reject);\n        }).then(onFulfilled, onRejected);\n      // https://github.com/zloirock/core-js/issues/640\n      }, { unsafe: true });\n    }\n\n    // make `.constructor === Promise` work for native promise-based APIs\n    try {\n      delete NativePromisePrototype.constructor;\n    } catch (error) { /* empty */ }\n\n    // make `instanceof Promise` work for native promise-based APIs\n    if (setPrototypeOf) {\n      setPrototypeOf(NativePromisePrototype, PromisePrototype);\n    }\n  }\n}\n\n$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {\n  Promise: PromiseConstructor\n});\n\nsetToStringTag(PromiseConstructor, PROMISE, false, true);\nsetSpecies(PROMISE);\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.finally.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.finally.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ \"./node_modules/core-js-pure/internals/species-constructor.js\");\nvar promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ \"./node_modules/core-js-pure/internals/promise-resolve.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\n\nvar NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;\n\n// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829\nvar NON_GENERIC = !!NativePromiseConstructor && fails(function () {\n  // eslint-disable-next-line unicorn/no-thenable -- required for testing\n  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });\n});\n\n// `Promise.prototype.finally` method\n// https://tc39.es/ecma262/#sec-promise.prototype.finally\n$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {\n  'finally': function (onFinally) {\n    var C = speciesConstructor(this, getBuiltIn('Promise'));\n    var isFunction = isCallable(onFinally);\n    return this.then(\n      isFunction ? function (x) {\n        return promiseResolve(C, onFinally()).then(function () { return x; });\n      } : onFinally,\n      isFunction ? function (e) {\n        return promiseResolve(C, onFinally()).then(function () { throw e; });\n      } : onFinally\n    );\n  }\n});\n\n// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`\nif (!IS_PURE && isCallable(NativePromiseConstructor)) {\n  var method = getBuiltIn('Promise').prototype['finally'];\n  if (NativePromisePrototype['finally'] !== method) {\n    defineBuiltIn(NativePromisePrototype, 'finally', method, { unsafe: true });\n  }\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.finally.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove this module from `core-js@4` since it's split to modules listed below\n__webpack_require__(/*! ../modules/es.promise.constructor */ \"./node_modules/core-js-pure/modules/es.promise.constructor.js\");\n__webpack_require__(/*! ../modules/es.promise.all */ \"./node_modules/core-js-pure/modules/es.promise.all.js\");\n__webpack_require__(/*! ../modules/es.promise.catch */ \"./node_modules/core-js-pure/modules/es.promise.catch.js\");\n__webpack_require__(/*! ../modules/es.promise.race */ \"./node_modules/core-js-pure/modules/es.promise.race.js\");\n__webpack_require__(/*! ../modules/es.promise.reject */ \"./node_modules/core-js-pure/modules/es.promise.reject.js\");\n__webpack_require__(/*! ../modules/es.promise.resolve */ \"./node_modules/core-js-pure/modules/es.promise.resolve.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.race.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.race.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ \"./node_modules/core-js-pure/internals/promise-statics-incorrect-iteration.js\");\n\n// `Promise.race` method\n// https://tc39.es/ecma262/#sec-promise.race\n$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {\n  race: function race(iterable) {\n    var C = this;\n    var capability = newPromiseCapabilityModule.f(C);\n    var reject = capability.reject;\n    var result = perform(function () {\n      var $promiseResolve = aCallable(C.resolve);\n      iterate(iterable, function (promise) {\n        call($promiseResolve, C, promise).then(capability.resolve, reject);\n      });\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.race.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.reject.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.reject.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ \"./node_modules/core-js-pure/internals/promise-constructor-detection.js\").CONSTRUCTOR);\n\n// `Promise.reject` method\n// https://tc39.es/ecma262/#sec-promise.reject\n$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {\n  reject: function reject(r) {\n    var capability = newPromiseCapabilityModule.f(this);\n    var capabilityReject = capability.reject;\n    capabilityReject(r);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.reject.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.resolve.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.resolve.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ \"./node_modules/core-js-pure/internals/promise-native-constructor.js\");\nvar FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ \"./node_modules/core-js-pure/internals/promise-constructor-detection.js\").CONSTRUCTOR);\nvar promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ \"./node_modules/core-js-pure/internals/promise-resolve.js\");\n\nvar PromiseConstructorWrapper = getBuiltIn('Promise');\nvar CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;\n\n// `Promise.resolve` method\n// https://tc39.es/ecma262/#sec-promise.resolve\n$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {\n  resolve: function resolve(x) {\n    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.resolve.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.with-resolvers.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.with-resolvers.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\n\n// `Promise.withResolvers` method\n// https://github.com/tc39/proposal-promise-with-resolvers\n$({ target: 'Promise', stat: true }, {\n  withResolvers: function withResolvers() {\n    var promiseCapability = newPromiseCapabilityModule.f(this);\n    return {\n      promise: promiseCapability.promise,\n      resolve: promiseCapability.resolve,\n      reject: promiseCapability.reject\n    };\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.promise.with-resolvers.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.reflect.construct.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.reflect.construct.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js-pure/internals/function-apply.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind */ \"./node_modules/core-js-pure/internals/function-bind.js\");\nvar aConstructor = __webpack_require__(/*! ../internals/a-constructor */ \"./node_modules/core-js-pure/internals/a-constructor.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js-pure/internals/is-object.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\n\nvar nativeConstruct = getBuiltIn('Reflect', 'construct');\nvar ObjectPrototype = Object.prototype;\nvar push = [].push;\n\n// `Reflect.construct` method\n// https://tc39.es/ecma262/#sec-reflect.construct\n// MS Edge supports only 2 arguments and argumentsList argument is optional\n// FF Nightly sets third argument as `new.target`, but does not create `this` from it\nvar NEW_TARGET_BUG = fails(function () {\n  function F() { /* empty */ }\n  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);\n});\n\nvar ARGS_BUG = !fails(function () {\n  nativeConstruct(function () { /* empty */ });\n});\n\nvar FORCED = NEW_TARGET_BUG || ARGS_BUG;\n\n$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {\n  construct: function construct(Target, args /* , newTarget */) {\n    aConstructor(Target);\n    anObject(args);\n    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);\n    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);\n    if (Target === newTarget) {\n      // w/o altered newTarget, optimization for 0-4 arguments\n      switch (args.length) {\n        case 0: return new Target();\n        case 1: return new Target(args[0]);\n        case 2: return new Target(args[0], args[1]);\n        case 3: return new Target(args[0], args[1], args[2]);\n        case 4: return new Target(args[0], args[1], args[2], args[3]);\n      }\n      // w/o altered newTarget, lot of arguments case\n      var $args = [null];\n      apply(push, $args, args);\n      return new (apply(bind, Target, $args))();\n    }\n    // with altered newTarget, not support built-in constructors\n    var proto = newTarget.prototype;\n    var instance = create(isObject(proto) ? proto : ObjectPrototype);\n    var result = apply(Target, instance, args);\n    return isObject(result) ? result : instance;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.reflect.construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js ***!
  \***********************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.reflect.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar charAt = (__webpack_require__(/*! ../internals/string-multibyte */ \"./node_modules/core-js-pure/internals/string-multibyte.js\").charAt);\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\nvar defineIterator = __webpack_require__(/*! ../internals/iterator-define */ \"./node_modules/core-js-pure/internals/iterator-define.js\");\nvar createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ \"./node_modules/core-js-pure/internals/create-iter-result-object.js\");\n\nvar STRING_ITERATOR = 'String Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);\n\n// `String.prototype[@@iterator]` method\n// https://tc39.es/ecma262/#sec-string.prototype-@@iterator\ndefineIterator(String, 'String', function (iterated) {\n  setInternalState(this, {\n    type: STRING_ITERATOR,\n    string: toString(iterated),\n    index: 0\n  });\n// `%StringIteratorPrototype%.next` method\n// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next\n}, function next() {\n  var state = getInternalState(this);\n  var string = state.string;\n  var index = state.index;\n  var point;\n  if (index >= string.length) return createIterResultObject(undefined, true);\n  point = charAt(string, index);\n  state.index += point.length;\n  return createIterResultObject(point, false);\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.string.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.starts-with.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.starts-with.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ \"./node_modules/core-js-pure/internals/function-uncurry-this-clause.js\");\nvar getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js\").f);\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js-pure/internals/to-length.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\nvar notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ \"./node_modules/core-js-pure/internals/not-a-regexp.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js-pure/internals/require-object-coercible.js\");\nvar correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ \"./node_modules/core-js-pure/internals/correct-is-regexp-logic.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\n\nvar stringSlice = uncurryThis(''.slice);\nvar min = Math.min;\n\nvar CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');\n// https://github.com/zloirock/core-js/pull/702\nvar MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {\n  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');\n  return descriptor && !descriptor.writable;\n}();\n\n// `String.prototype.startsWith` method\n// https://tc39.es/ecma262/#sec-string.prototype.startswith\n$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {\n  startsWith: function startsWith(searchString /* , position = 0 */) {\n    var that = toString(requireObjectCoercible(this));\n    notARegExp(searchString);\n    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));\n    var search = toString(searchString);\n    return stringSlice(that, index, index + search.length) === search;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.string.starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.async-iterator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.async-iterator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.asyncIterator` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.asynciterator\ndefineWellKnownSymbol('asyncIterator');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.constructor.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js-pure/internals/function-uncurry-this.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js-pure/internals/is-pure.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js-pure/internals/descriptors.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js-pure/internals/symbol-constructor-detection.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js-pure/internals/fails.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js-pure/internals/an-object.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js-pure/internals/to-indexed-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js-pure/internals/to-property-key.js\");\nvar $toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js-pure/internals/create-property-descriptor.js\");\nvar nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js-pure/internals/object-create.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js-pure/internals/object-keys.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js-pure/internals/object-get-own-property-names.js\");\nvar getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ \"./node_modules/core-js-pure/internals/object-get-own-property-names-external.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js-pure/internals/object-get-own-property-symbols.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\");\nvar definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js-pure/internals/object-define-properties.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js-pure/internals/object-property-is-enumerable.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js-pure/internals/define-built-in.js\");\nvar defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ \"./node_modules/core-js-pure/internals/define-built-in-accessor.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js-pure/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js-pure/internals/hidden-keys.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js-pure/internals/uid.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ \"./node_modules/core-js-pure/internals/well-known-symbol-wrapped.js\");\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\nvar defineSymbolToPrimitive = __webpack_require__(/*! ../internals/symbol-define-to-primitive */ \"./node_modules/core-js-pure/internals/symbol-define-to-primitive.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js-pure/internals/internal-state.js\");\nvar $forEach = (__webpack_require__(/*! ../internals/array-iteration */ \"./node_modules/core-js-pure/internals/array-iteration.js\").forEach);\n\nvar HIDDEN = sharedKey('hidden');\nvar SYMBOL = 'Symbol';\nvar PROTOTYPE = 'prototype';\n\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(SYMBOL);\n\nvar ObjectPrototype = Object[PROTOTYPE];\nvar $Symbol = global.Symbol;\nvar SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];\nvar RangeError = global.RangeError;\nvar TypeError = global.TypeError;\nvar QObject = global.QObject;\nvar nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\nvar nativeDefineProperty = definePropertyModule.f;\nvar nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;\nvar nativePropertyIsEnumerable = propertyIsEnumerableModule.f;\nvar push = uncurryThis([].push);\n\nvar AllSymbols = shared('symbols');\nvar ObjectPrototypeSymbols = shared('op-symbols');\nvar WellKnownSymbolsStore = shared('wks');\n\n// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\nvar USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;\n\n// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\nvar fallbackDefineProperty = function (O, P, Attributes) {\n  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);\n  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];\n  nativeDefineProperty(O, P, Attributes);\n  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {\n    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);\n  }\n};\n\nvar setSymbolDescriptor = DESCRIPTORS && fails(function () {\n  return nativeObjectCreate(nativeDefineProperty({}, 'a', {\n    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }\n  })).a !== 7;\n}) ? fallbackDefineProperty : nativeDefineProperty;\n\nvar wrap = function (tag, description) {\n  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);\n  setInternalState(symbol, {\n    type: SYMBOL,\n    tag: tag,\n    description: description\n  });\n  if (!DESCRIPTORS) symbol.description = description;\n  return symbol;\n};\n\nvar $defineProperty = function defineProperty(O, P, Attributes) {\n  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);\n  anObject(O);\n  var key = toPropertyKey(P);\n  anObject(Attributes);\n  if (hasOwn(AllSymbols, key)) {\n    if (!Attributes.enumerable) {\n      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)));\n      O[HIDDEN][key] = true;\n    } else {\n      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;\n      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });\n    } return setSymbolDescriptor(O, key, Attributes);\n  } return nativeDefineProperty(O, key, Attributes);\n};\n\nvar $defineProperties = function defineProperties(O, Properties) {\n  anObject(O);\n  var properties = toIndexedObject(Properties);\n  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));\n  $forEach(keys, function (key) {\n    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);\n  });\n  return O;\n};\n\nvar $create = function create(O, Properties) {\n  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);\n};\n\nvar $propertyIsEnumerable = function propertyIsEnumerable(V) {\n  var P = toPropertyKey(V);\n  var enumerable = call(nativePropertyIsEnumerable, this, P);\n  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;\n  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]\n    ? enumerable : true;\n};\n\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {\n  var it = toIndexedObject(O);\n  var key = toPropertyKey(P);\n  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;\n  var descriptor = nativeGetOwnPropertyDescriptor(it, key);\n  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {\n    descriptor.enumerable = true;\n  }\n  return descriptor;\n};\n\nvar $getOwnPropertyNames = function getOwnPropertyNames(O) {\n  var names = nativeGetOwnPropertyNames(toIndexedObject(O));\n  var result = [];\n  $forEach(names, function (key) {\n    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);\n  });\n  return result;\n};\n\nvar $getOwnPropertySymbols = function (O) {\n  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;\n  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));\n  var result = [];\n  $forEach(names, function (key) {\n    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {\n      push(result, AllSymbols[key]);\n    }\n  });\n  return result;\n};\n\n// `Symbol` constructor\n// https://tc39.es/ecma262/#sec-symbol-constructor\nif (!NATIVE_SYMBOL) {\n  $Symbol = function Symbol() {\n    if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError('Symbol is not a constructor');\n    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);\n    var tag = uid(description);\n    var setter = function (value) {\n      var $this = this === undefined ? global : this;\n      if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);\n      if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;\n      var descriptor = createPropertyDescriptor(1, value);\n      try {\n        setSymbolDescriptor($this, tag, descriptor);\n      } catch (error) {\n        if (!(error instanceof RangeError)) throw error;\n        fallbackDefineProperty($this, tag, descriptor);\n      }\n    };\n    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });\n    return wrap(tag, description);\n  };\n\n  SymbolPrototype = $Symbol[PROTOTYPE];\n\n  defineBuiltIn(SymbolPrototype, 'toString', function toString() {\n    return getInternalState(this).tag;\n  });\n\n  defineBuiltIn($Symbol, 'withoutSetter', function (description) {\n    return wrap(uid(description), description);\n  });\n\n  propertyIsEnumerableModule.f = $propertyIsEnumerable;\n  definePropertyModule.f = $defineProperty;\n  definePropertiesModule.f = $defineProperties;\n  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;\n  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;\n  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;\n\n  wrappedWellKnownSymbolModule.f = function (name) {\n    return wrap(wellKnownSymbol(name), name);\n  };\n\n  if (DESCRIPTORS) {\n    // https://github.com/tc39/proposal-Symbol-description\n    defineBuiltInAccessor(SymbolPrototype, 'description', {\n      configurable: true,\n      get: function description() {\n        return getInternalState(this).description;\n      }\n    });\n    if (!IS_PURE) {\n      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });\n    }\n  }\n}\n\n$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {\n  Symbol: $Symbol\n});\n\n$forEach(objectKeys(WellKnownSymbolsStore), function (name) {\n  defineWellKnownSymbol(name);\n});\n\n$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {\n  useSetter: function () { USE_SETTER = true; },\n  useSimple: function () { USE_SETTER = false; }\n});\n\n$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {\n  // `Object.create` method\n  // https://tc39.es/ecma262/#sec-object.create\n  create: $create,\n  // `Object.defineProperty` method\n  // https://tc39.es/ecma262/#sec-object.defineproperty\n  defineProperty: $defineProperty,\n  // `Object.defineProperties` method\n  // https://tc39.es/ecma262/#sec-object.defineproperties\n  defineProperties: $defineProperties,\n  // `Object.getOwnPropertyDescriptor` method\n  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor\n});\n\n$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {\n  // `Object.getOwnPropertyNames` method\n  // https://tc39.es/ecma262/#sec-object.getownpropertynames\n  getOwnPropertyNames: $getOwnPropertyNames\n});\n\n// `Symbol.prototype[@@toPrimitive]` method\n// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive\ndefineSymbolToPrimitive();\n\n// `Symbol.prototype[@@toStringTag]` property\n// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag\nsetToStringTag($Symbol, SYMBOL);\n\nhiddenKeys[HIDDEN] = true;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.constructor.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.description.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.description.js ***!
  \********************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.description.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.for.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.for.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js-pure/internals/to-string.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar NATIVE_SYMBOL_REGISTRY = __webpack_require__(/*! ../internals/symbol-registry-detection */ \"./node_modules/core-js-pure/internals/symbol-registry-detection.js\");\n\nvar StringToSymbolRegistry = shared('string-to-symbol-registry');\nvar SymbolToStringRegistry = shared('symbol-to-string-registry');\n\n// `Symbol.for` method\n// https://tc39.es/ecma262/#sec-symbol.for\n$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {\n  'for': function (key) {\n    var string = toString(key);\n    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];\n    var symbol = getBuiltIn('Symbol')(string);\n    StringToSymbolRegistry[string] = symbol;\n    SymbolToStringRegistry[symbol] = string;\n    return symbol;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.for.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.has-instance.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.has-instance.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.hasInstance` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.hasinstance\ndefineWellKnownSymbol('hasInstance');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.has-instance.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.isConcatSpreadable` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable\ndefineWellKnownSymbol('isConcatSpreadable');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.is-concat-spreadable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.iterator` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.iterator\ndefineWellKnownSymbol('iterator');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove this module from `core-js@4` since it's split to modules listed below\n__webpack_require__(/*! ../modules/es.symbol.constructor */ \"./node_modules/core-js-pure/modules/es.symbol.constructor.js\");\n__webpack_require__(/*! ../modules/es.symbol.for */ \"./node_modules/core-js-pure/modules/es.symbol.for.js\");\n__webpack_require__(/*! ../modules/es.symbol.key-for */ \"./node_modules/core-js-pure/modules/es.symbol.key-for.js\");\n__webpack_require__(/*! ../modules/es.json.stringify */ \"./node_modules/core-js-pure/modules/es.json.stringify.js\");\n__webpack_require__(/*! ../modules/es.object.get-own-property-symbols */ \"./node_modules/core-js-pure/modules/es.object.get-own-property-symbols.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.key-for.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.key-for.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js-pure/internals/is-symbol.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js-pure/internals/try-to-string.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js-pure/internals/shared.js\");\nvar NATIVE_SYMBOL_REGISTRY = __webpack_require__(/*! ../internals/symbol-registry-detection */ \"./node_modules/core-js-pure/internals/symbol-registry-detection.js\");\n\nvar SymbolToStringRegistry = shared('symbol-to-string-registry');\n\n// `Symbol.keyFor` method\n// https://tc39.es/ecma262/#sec-symbol.keyfor\n$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');\n    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.key-for.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.match-all.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.match-all.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.matchAll` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.matchall\ndefineWellKnownSymbol('matchAll');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.match-all.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.match.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.match.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.match` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.match\ndefineWellKnownSymbol('match');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.match.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.replace.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.replace.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.replace` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.replace\ndefineWellKnownSymbol('replace');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.replace.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.search.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.search.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.search` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.search\ndefineWellKnownSymbol('search');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.search.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.species.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.species.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.species` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.species\ndefineWellKnownSymbol('species');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.species.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.split.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.split.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.split` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.split\ndefineWellKnownSymbol('split');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.split.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.to-primitive.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.to-primitive.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\nvar defineSymbolToPrimitive = __webpack_require__(/*! ../internals/symbol-define-to-primitive */ \"./node_modules/core-js-pure/internals/symbol-define-to-primitive.js\");\n\n// `Symbol.toPrimitive` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.toprimitive\ndefineWellKnownSymbol('toPrimitive');\n\n// `Symbol.prototype[@@toPrimitive]` method\n// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive\ndefineSymbolToPrimitive();\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js-pure/internals/get-built-in.js\");\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\n\n// `Symbol.toStringTag` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.tostringtag\ndefineWellKnownSymbol('toStringTag');\n\n// `Symbol.prototype[@@toStringTag]` property\n// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag\nsetToStringTag(getBuiltIn('Symbol'), 'Symbol');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.symbol.unscopables.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.symbol.unscopables.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.unscopables` well-known symbol\n// https://tc39.es/ecma262/#sec-symbol.unscopables\ndefineWellKnownSymbol('unscopables');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/es.symbol.unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.aggregate-error.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.aggregate-error.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.aggregate-error */ \"./node_modules/core-js-pure/modules/es.aggregate-error.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.aggregate-error.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.function.metadata.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.function.metadata.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js-pure/internals/well-known-symbol.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js-pure/internals/object-define-property.js\").f);\n\nvar METADATA = wellKnownSymbol('metadata');\nvar FunctionPrototype = Function.prototype;\n\n// Function.prototype[@@metadata]\n// https://github.com/tc39/proposal-decorator-metadata\nif (FunctionPrototype[METADATA] === undefined) {\n  defineProperty(FunctionPrototype, METADATA, {\n    value: null\n  });\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.function.metadata.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.delete-all.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.delete-all.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar remove = (__webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\").remove);\n\n// `Map.prototype.deleteAll` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  deleteAll: function deleteAll(/* ...elements */) {\n    var collection = aMap(this);\n    var allDeleted = true;\n    var wasDeleted;\n    for (var k = 0, len = arguments.length; k < len; k++) {\n      wasDeleted = remove(collection, arguments[k]);\n      allDeleted = allDeleted && wasDeleted;\n    } return !!allDeleted;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.delete-all.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.emplace.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.emplace.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\n\nvar get = MapHelpers.get;\nvar has = MapHelpers.has;\nvar set = MapHelpers.set;\n\n// `Map.prototype.emplace` method\n// https://github.com/tc39/proposal-upsert\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  emplace: function emplace(key, handler) {\n    var map = aMap(this);\n    var value, inserted;\n    if (has(map, key)) {\n      value = get(map, key);\n      if ('update' in handler) {\n        value = handler.update(value, key, map);\n        set(map, key, value);\n      } return value;\n    }\n    inserted = handler.insert(key, map);\n    set(map, key, inserted);\n    return inserted;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.emplace.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.every.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.every.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.every` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  every: function every(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    return iterate(map, function (value, key) {\n      if (!boundFunction(value, key, map)) return false;\n    }, true) !== false;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.every.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.filter.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.filter.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\nvar Map = MapHelpers.Map;\nvar set = MapHelpers.set;\n\n// `Map.prototype.filter` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  filter: function filter(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    var newMap = new Map();\n    iterate(map, function (value, key) {\n      if (boundFunction(value, key, map)) set(newMap, key, value);\n    });\n    return newMap;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.find-key.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.find-key.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.findKey` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  findKey: function findKey(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    var result = iterate(map, function (value, key) {\n      if (boundFunction(value, key, map)) return { key: key };\n    }, true);\n    return result && result.key;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.find-key.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.find.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.find.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.find` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  find: function find(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    var result = iterate(map, function (value, key) {\n      if (boundFunction(value, key, map)) return { value: value };\n    }, true);\n    return result && result.value;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.find.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.from.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.from.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar createCollectionFrom = __webpack_require__(/*! ../internals/collection-from */ \"./node_modules/core-js-pure/internals/collection-from.js\");\n\n// `Map.from` method\n// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from\n$({ target: 'Map', stat: true, forced: true }, {\n  from: createCollectionFrom(MapHelpers.Map, MapHelpers.set, true)\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.group-by.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.group-by.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.map.group-by */ \"./node_modules/core-js-pure/modules/es.map.group-by.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.group-by.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.includes.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.includes.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar sameValueZero = __webpack_require__(/*! ../internals/same-value-zero */ \"./node_modules/core-js-pure/internals/same-value-zero.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.includes` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  includes: function includes(searchElement) {\n    return iterate(aMap(this), function (value) {\n      if (sameValueZero(value, searchElement)) return true;\n    }, true) === true;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.includes.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.key-by.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.key-by.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js-pure/internals/function-call.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js-pure/internals/is-callable.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar Map = (__webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\").Map);\n\n// `Map.keyBy` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', stat: true, forced: true }, {\n  keyBy: function keyBy(iterable, keyDerivative) {\n    var C = isCallable(this) ? this : Map;\n    var newMap = new C();\n    aCallable(keyDerivative);\n    var setter = aCallable(newMap.set);\n    iterate(iterable, function (element) {\n      call(setter, newMap, keyDerivative(element), element);\n    });\n    return newMap;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.key-by.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.key-of.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.key-of.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.keyOf` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  keyOf: function keyOf(searchElement) {\n    var result = iterate(aMap(this), function (value, key) {\n      if (value === searchElement) return { key: key };\n    }, true);\n    return result && result.key;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.key-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.map-keys.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.map-keys.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\nvar Map = MapHelpers.Map;\nvar set = MapHelpers.set;\n\n// `Map.prototype.mapKeys` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  mapKeys: function mapKeys(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    var newMap = new Map();\n    iterate(map, function (value, key) {\n      set(newMap, boundFunction(value, key, map), value);\n    });\n    return newMap;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.map-keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.map-values.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.map-values.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\nvar Map = MapHelpers.Map;\nvar set = MapHelpers.set;\n\n// `Map.prototype.mapValues` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  mapValues: function mapValues(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    var newMap = new Map();\n    iterate(map, function (value, key) {\n      set(newMap, key, boundFunction(value, key, map));\n    });\n    return newMap;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.map-values.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.merge.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.merge.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js-pure/internals/iterate.js\");\nvar set = (__webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\").set);\n\n// `Map.prototype.merge` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, arity: 1, forced: true }, {\n  // eslint-disable-next-line no-unused-vars -- required for `.length`\n  merge: function merge(iterable /* ...iterables */) {\n    var map = aMap(this);\n    var argumentsLength = arguments.length;\n    var i = 0;\n    while (i < argumentsLength) {\n      iterate(arguments[i++], function (key, value) {\n        set(map, key, value);\n      }, { AS_ENTRIES: true });\n    }\n    return map;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.merge.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.of.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\nvar createCollectionOf = __webpack_require__(/*! ../internals/collection-of */ \"./node_modules/core-js-pure/internals/collection-of.js\");\n\n// `Map.of` method\n// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of\n$({ target: 'Map', stat: true, forced: true }, {\n  of: createCollectionOf(MapHelpers.Map, MapHelpers.set, true)\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.reduce.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.reduce.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\nvar $TypeError = TypeError;\n\n// `Map.prototype.reduce` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  reduce: function reduce(callbackfn /* , initialValue */) {\n    var map = aMap(this);\n    var noInitial = arguments.length < 2;\n    var accumulator = noInitial ? undefined : arguments[1];\n    aCallable(callbackfn);\n    iterate(map, function (value, key) {\n      if (noInitial) {\n        noInitial = false;\n        accumulator = value;\n      } else {\n        accumulator = callbackfn(accumulator, value, key, map);\n      }\n    });\n    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');\n    return accumulator;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.some.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.some.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js-pure/internals/function-bind-context.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar iterate = __webpack_require__(/*! ../internals/map-iterate */ \"./node_modules/core-js-pure/internals/map-iterate.js\");\n\n// `Map.prototype.some` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  some: function some(callbackfn /* , thisArg */) {\n    var map = aMap(this);\n    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n    return iterate(map, function (value, key) {\n      if (boundFunction(value, key, map)) return true;\n    }, true) === true;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.some.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.update-or-insert.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.update-or-insert.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: remove from `core-js@4`\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar upsert = __webpack_require__(/*! ../internals/map-upsert */ \"./node_modules/core-js-pure/internals/map-upsert.js\");\n\n// `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.emplace`)\n// https://github.com/thumbsupep/proposal-upsert\n$({ target: 'Map', proto: true, real: true, name: 'upsert', forced: true }, {\n  updateOrInsert: upsert\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.update-or-insert.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.update.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.update.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar aMap = __webpack_require__(/*! ../internals/a-map */ \"./node_modules/core-js-pure/internals/a-map.js\");\nvar MapHelpers = __webpack_require__(/*! ../internals/map-helpers */ \"./node_modules/core-js-pure/internals/map-helpers.js\");\n\nvar $TypeError = TypeError;\nvar get = MapHelpers.get;\nvar has = MapHelpers.has;\nvar set = MapHelpers.set;\n\n// `Map.prototype.update` method\n// https://github.com/tc39/proposal-collection-methods\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  update: function update(key, callback /* , thunk */) {\n    var map = aMap(this);\n    var length = arguments.length;\n    aCallable(callback);\n    var isPresentInMap = has(map, key);\n    if (!isPresentInMap && length < 3) {\n      throw new $TypeError('Updating absent value');\n    }\n    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);\n    set(map, key, callback(value, key, map));\n    return map;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.update.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.map.upsert.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.map.upsert.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: remove from `core-js@4`\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar upsert = __webpack_require__(/*! ../internals/map-upsert */ \"./node_modules/core-js-pure/internals/map-upsert.js\");\n\n// `Map.prototype.upsert` method (replaced by `Map.prototype.emplace`)\n// https://github.com/thumbsupep/proposal-upsert\n$({ target: 'Map', proto: true, real: true, forced: true }, {\n  upsert: upsert\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.map.upsert.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.all-settled.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.all-settled.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.promise.all-settled.js */ \"./node_modules/core-js-pure/modules/es.promise.all-settled.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.promise.all-settled.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.any.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.any.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.promise.any */ \"./node_modules/core-js-pure/modules/es.promise.any.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.promise.any.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.try.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.try.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js-pure/internals/function-apply.js\");\nvar slice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js-pure/internals/array-slice.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js-pure/internals/new-promise-capability.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js-pure/internals/a-callable.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js-pure/internals/perform.js\");\n\n// `Promise.try` method\n// https://github.com/tc39/proposal-promise-try\n$({ target: 'Promise', stat: true, forced: true }, {\n  'try': function (callbackfn /* , ...args */) {\n    var args = slice(arguments, 1);\n    var promiseCapability = newPromiseCapabilityModule.f(this);\n    var result = perform(function () {\n      return apply(aCallable(callbackfn), undefined, args);\n    });\n    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);\n    return promiseCapability.promise;\n  }\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.promise.try.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.with-resolvers.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.with-resolvers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.promise.with-resolvers */ \"./node_modules/core-js-pure/modules/es.promise.with-resolvers.js\");\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.promise.with-resolvers.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.asyncDispose` well-known symbol\n// https://github.com/tc39/proposal-async-explicit-resource-management\ndefineWellKnownSymbol('asyncDispose');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.async-dispose.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.custom-matcher.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.custom-matcher.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.customMatcher` well-known symbol\n// https://github.com/tc39/proposal-pattern-matching\ndefineWellKnownSymbol('customMatcher');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.custom-matcher.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.dispose.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.dispose.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.dispose` well-known symbol\n// https://github.com/tc39/proposal-explicit-resource-management\ndefineWellKnownSymbol('dispose');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.dispose.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isRegisteredSymbol = __webpack_require__(/*! ../internals/symbol-is-registered */ \"./node_modules/core-js-pure/internals/symbol-is-registered.js\");\n\n// `Symbol.isRegisteredSymbol` method\n// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol\n$({ target: 'Symbol', stat: true }, {\n  isRegisteredSymbol: isRegisteredSymbol\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.is-registered-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isRegisteredSymbol = __webpack_require__(/*! ../internals/symbol-is-registered */ \"./node_modules/core-js-pure/internals/symbol-is-registered.js\");\n\n// `Symbol.isRegistered` method\n// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol\n$({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {\n  isRegistered: isRegisteredSymbol\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.is-registered.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isWellKnownSymbol = __webpack_require__(/*! ../internals/symbol-is-well-known */ \"./node_modules/core-js-pure/internals/symbol-is-well-known.js\");\n\n// `Symbol.isWellKnownSymbol` method\n// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol\n// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected\n$({ target: 'Symbol', stat: true, forced: true }, {\n  isWellKnownSymbol: isWellKnownSymbol\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.is-well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js-pure/internals/export.js\");\nvar isWellKnownSymbol = __webpack_require__(/*! ../internals/symbol-is-well-known */ \"./node_modules/core-js-pure/internals/symbol-is-well-known.js\");\n\n// `Symbol.isWellKnown` method\n// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol\n// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected\n$({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {\n  isWellKnown: isWellKnownSymbol\n});\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.is-well-known.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.matcher.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.matcher.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.matcher` well-known symbol\n// https://github.com/tc39/proposal-pattern-matching\ndefineWellKnownSymbol('matcher');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.matcher.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: Remove from `core-js@4`\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.metadataKey` well-known symbol\n// https://github.com/tc39/proposal-decorator-metadata\ndefineWellKnownSymbol('metadataKey');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.metadata-key.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.metadata.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.metadata` well-known symbol\n// https://github.com/tc39/proposal-decorators\ndefineWellKnownSymbol('metadata');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.metadata.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.observable.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.observable` well-known symbol\n// https://github.com/tc39/proposal-observable\ndefineWellKnownSymbol('observable');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.observable.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: remove from `core-js@4`\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\n// `Symbol.patternMatch` well-known symbol\n// https://github.com/tc39/proposal-pattern-matching\ndefineWellKnownSymbol('patternMatch');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.pattern-match.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n// TODO: remove from `core-js@4`\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol-define */ \"./node_modules/core-js-pure/internals/well-known-symbol-define.js\");\n\ndefineWellKnownSymbol('replaceAll');\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/esnext.symbol.replace-all.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.for-each.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.for-each.js ***!
  \***************************************************************************/
/***/ (() => {

eval("// empty\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/web.dom-collections.for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.iterator.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n__webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js-pure/modules/es.array.iterator.js\");\nvar DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ \"./node_modules/core-js-pure/internals/dom-iterables.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js-pure/internals/global.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js-pure/internals/set-to-string-tag.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js-pure/internals/iterators.js\");\n\nfor (var COLLECTION_NAME in DOMIterables) {\n  setToStringTag(global[COLLECTION_NAME], COLLECTION_NAME);\n  Iterators[COLLECTION_NAME] = Iterators.Array;\n}\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/modules/web.dom-collections.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/array/from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/array/from.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/array/from */ \"./node_modules/core-js-pure/es/array/from.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/array/is-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/array/is-array.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/array/is-array */ \"./node_modules/core-js-pure/es/array/is-array.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/array/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/array/virtual/for-each.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/array/virtual/for-each.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../../es/array/virtual/for-each */ \"./node_modules/core-js-pure/es/array/virtual/for-each.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/array/virtual/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/get-iterator-method.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/get-iterator-method.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../es/get-iterator-method */ \"./node_modules/core-js-pure/es/get-iterator-method.js\");\n__webpack_require__(/*! ../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/get-iterator.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/get-iterator.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../es/get-iterator */ \"./node_modules/core-js-pure/es/get-iterator.js\");\n__webpack_require__(/*! ../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/get-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/bind.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/bind.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/bind */ \"./node_modules/core-js-pure/es/instance/bind.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/bind.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/concat.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/concat.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/concat */ \"./node_modules/core-js-pure/es/instance/concat.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/concat.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/filter.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/filter */ \"./node_modules/core-js-pure/es/instance/filter.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/filter.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/flat-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/flat-map.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/flat-map */ \"./node_modules/core-js-pure/es/instance/flat-map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/flat-map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/for-each.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/for-each.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar classof = __webpack_require__(/*! ../../internals/classof */ \"./node_modules/core-js-pure/internals/classof.js\");\nvar hasOwn = __webpack_require__(/*! ../../internals/has-own-property */ \"./node_modules/core-js-pure/internals/has-own-property.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../../internals/object-is-prototype-of */ \"./node_modules/core-js-pure/internals/object-is-prototype-of.js\");\nvar method = __webpack_require__(/*! ../array/virtual/for-each */ \"./node_modules/core-js-pure/stable/array/virtual/for-each.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.for-each */ \"./node_modules/core-js-pure/modules/web.dom-collections.for-each.js\");\n\nvar ArrayPrototype = Array.prototype;\n\nvar DOMIterables = {\n  DOMTokenList: true,\n  NodeList: true\n};\n\nmodule.exports = function (it) {\n  var own = it.forEach;\n  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.forEach)\n    || hasOwn(DOMIterables, classof(it)) ? method : own;\n};\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/for-each.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/index-of.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/index-of.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/index-of */ \"./node_modules/core-js-pure/es/instance/index-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/index-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/map.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/map.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/map */ \"./node_modules/core-js-pure/es/instance/map.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/map.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/push.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/push.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/push */ \"./node_modules/core-js-pure/es/instance/push.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/push.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/reduce.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/reduce.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/reduce */ \"./node_modules/core-js-pure/es/instance/reduce.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/reduce.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/reverse.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/reverse.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/reverse */ \"./node_modules/core-js-pure/es/instance/reverse.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/reverse.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/slice.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/slice.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/slice */ \"./node_modules/core-js-pure/es/instance/slice.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/slice.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/starts-with.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/starts-with.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/instance/starts-with */ \"./node_modules/core-js-pure/es/instance/starts-with.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/instance/starts-with.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/map/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/stable/map/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/map */ \"./node_modules/core-js-pure/es/map/index.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/map/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/create.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/object/create */ \"./node_modules/core-js-pure/es/object/create.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/define-property.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/object/define-property */ \"./node_modules/core-js-pure/es/object/define-property.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/get-prototype-of.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/object/get-prototype-of */ \"./node_modules/core-js-pure/es/object/get-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/keys.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/object/keys */ \"./node_modules/core-js-pure/es/object/keys.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/object/keys.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/set-prototype-of.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/object/set-prototype-of */ \"./node_modules/core-js-pure/es/object/set-prototype-of.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/promise/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/promise/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/promise */ \"./node_modules/core-js-pure/es/promise/index.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/reflect/construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/reflect/construct.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/reflect/construct */ \"./node_modules/core-js-pure/es/reflect/construct.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/reflect/construct.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/async-iterator.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/symbol/async-iterator */ \"./node_modules/core-js-pure/es/symbol/async-iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/symbol/async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/symbol */ \"./node_modules/core-js-pure/es/symbol/index.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/iterator.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/symbol/iterator */ \"./node_modules/core-js-pure/es/symbol/iterator.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ \"./node_modules/core-js-pure/modules/web.dom-collections.iterator.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js-pure/stable/symbol/to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/symbol/to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar parent = __webpack_require__(/*! ../../es/symbol/to-primitive */ \"./node_modules/core-js-pure/es/symbol/to-primitive.js\");\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/core-js-pure/stable/symbol/to-primitive.js?");

/***/ }),

/***/ "./annotator.mjs":
/*!***********************!*\
  !*** ./annotator.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   highlightCurrentSelection: () => (/* binding */ highlightCurrentSelection),\n/* harmony export */   openEditMenu: () => (/* binding */ openEditMenu),\n/* harmony export */   refreshHighlights: () => (/* binding */ refreshHighlights),\n/* harmony export */   setup: () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var _apache_annotator_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apache-annotator/dom */ \"./node_modules/@apache-annotator/dom/lib/index.js\");\n/* harmony import */ var https_cdn_jsdelivr_net_npm_floating_ui_dom_1_6_12_esm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm */ \"https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm\");\n\n\n\nlet STORAGE = null;\n\nconst BROWSER_STORAGE = {\n    getData: () => {\n        return Object.values(JSON.parse(localStorage[document.URL] || '{}'));\n    },\n    addToStorage: (annotation) => {\n        let data = JSON.parse(localStorage[document.URL] || '{}');\n        data[annotation.id] = annotation;\n        localStorage[document.URL] = JSON.stringify(data);\n    }\n}\n\nclass Annotation {\n    constructor(annotatorSelector, color='yellow', note='', htmlElementID= null) {\n        this.id = htmlElementID;\n        this.selector = annotatorSelector;\n        this.color = color;\n        this.note = note;\n    }\n}\n\nlet CONFIG = {\n    tag: 'mark-lkl',\n    attributes: {\n        id: '',\n        onclick: ''\n    },\n}\n\nasync function highlight(annotation) {\n    const matches = (0,_apache_annotator_dom__WEBPACK_IMPORTED_MODULE_0__.createTextQuoteSelectorMatcher)(annotation.selector)(document.body);\n    const matchList = [];\n    for await (const match of matches) matchList.push(match);\n    let match = matchList[0];\n    if(!annotation.id) annotation.id = Date.now().toString();\n    CONFIG.attributes.id = annotation.id;\n    CONFIG.attributes.style = `background-color: ${annotation.color};`;\n    (0,_apache_annotator_dom__WEBPACK_IMPORTED_MODULE_0__.highlightText)(match, CONFIG.tag, CONFIG.attributes);\n}\n\nasync function describeCurrentSelection() {\n    const userSelection = window.getSelection()?.getRangeAt(0);\n    if (!userSelection || userSelection.isCollapsed) return;\n    return (0,_apache_annotator_dom__WEBPACK_IMPORTED_MODULE_0__.describeTextQuote)(userSelection);\n}\n\n// *** EXPORTS *** //\n\nfunction setup(\n    highlightClickCallbackStr,\n    storageStrategy=BROWSER_STORAGE\n) {\n    STORAGE = storageStrategy;\n    CONFIG.attributes.onclick = highlightClickCallbackStr;\n}\n\nasync function highlightCurrentSelection() {\n    const selector = await describeCurrentSelection();\n    if (selector.exact !== '') {\n        let annotation = new Annotation(selector);\n        await highlight(annotation);\n        STORAGE.addToStorage(annotation);\n    }\n}\n\nasync function refreshHighlights() {\n    if (STORAGE) {\n        for (const annotation of STORAGE.getData()) {\n            await highlight(annotation);\n        }\n    }\n}\n\nfunction openEditMenu(elem_id) {\n    let annotation = null;\n    for (const annot of STORAGE.getData()) {\n        if(annot.id === elem_id){\n            annotation = annot;\n            break;\n        }\n    }\n    let element = document.getElementById(elem_id);\n    if(element && annotation) {\n        annotation.color = 'orange';\n        element.style.backgroundColor = annotation.color;\n        STORAGE.addToStorage(annotation);\n\n    } else {\n        console.error(`No highlight element with ID \"${elem_id}\" found.`);\n    }\n}\n\n\n\n//# sourceURL=webpack://annotate.lkl/./annotator.mjs?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/css.js":
/*!*******************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/css.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCssSelectorMatcher: () => (/* binding */ createCssSelectorMatcher),\n/* harmony export */   describeCss: () => (/* binding */ describeCss)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/slice */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/array/from */ \"./node_modules/@babel/runtime-corejs3/core-js/array/from.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/symbol */ \"./node_modules/@babel/runtime-corejs3/core-js/symbol.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator-method */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var optimal_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! optimal-select */ \"./node_modules/optimal-select/lib/index.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_2__ === \"undefined\" || _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_3__(o) == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { var _context3; if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_0__(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_1__(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n/**\n * Find the elements corresponding to the given {@link\n * CssSelector}.\n *\n * The given CssSelector returns all elements within `scope` that it matches.\n *\n * The function is curried, taking first the selector and then the scope.\n *\n * As there may be multiple matches for a given selector, the matcher will\n * return an (async) iterable that produces each match in the order they are\n * found in the document.\n *\n * Note that the Web Annotation specification does not mention whether an\n * ‘ambiguous’ CssSelector should indeed match all elements that match the\n * selector value, or perhaps only the first. This implementation returns all\n * matches to give users the freedom to follow either interpretation. This is\n * also in line with more clearly defined behaviour of the TextQuoteSelector:\n *\n * > “If […] the user agent discovers multiple matching text sequences, then the\n * > selection SHOULD be treated as matching all of the matches.”\n *\n * Note that if `scope` is *not* a Document, the [Web Annotation Data Model](https://www.w3.org/TR/2017/REC-annotation-model-20170223/#css-selector)\n * leaves the behaviour undefined. This implementation will, in such a case,\n * evaluate the selector relative to the document containing the scope, but only\n * return those matches that are fully enclosed within the scope. There might be\n * edge cases where this is not a perfect inverse of {@link describeCss}.\n *\n * @example\n * ```\n * const matches = createCssSelectorMatcher({\n *   type: 'CssSelector',\n *   value: '#target',\n * });\n * for await (const match of matches) {\n *   console.log(match);\n * }\n * // <div id=\"target\" …>\n * ```\n *\n * @param selector - The {@link CssSelector} to be anchored.\n * @returns A {@link Matcher} function that applies `selector` to a given\n * `scope`.\n *\n * @public\n */\n\nfunction createCssSelectorMatcher(selector) {\n  return /*#__PURE__*/function () {\n    var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_7__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_8__.mark(function _callee(scope) {\n      var document, _iterator, _step, element, range;\n\n      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_8__.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              scope = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_11__.toRange)(scope);\n              document = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_10__.ownerDocument)(scope);\n              _iterator = _createForOfIteratorHelper(document.querySelectorAll(selector.value));\n              _context.prev = 3;\n\n              _iterator.s();\n\n            case 5:\n              if ((_step = _iterator.n()).done) {\n                _context.next = 14;\n                break;\n              }\n\n              element = _step.value;\n              range = document.createRange();\n              range.selectNode(element);\n\n              if (!(scope.isPointInRange(range.startContainer, range.startOffset) && scope.isPointInRange(range.endContainer, range.endOffset))) {\n                _context.next = 12;\n                break;\n              }\n\n              _context.next = 12;\n              return element;\n\n            case 12:\n              _context.next = 5;\n              break;\n\n            case 14:\n              _context.next = 19;\n              break;\n\n            case 16:\n              _context.prev = 16;\n              _context.t0 = _context[\"catch\"](3);\n\n              _iterator.e(_context.t0);\n\n            case 19:\n              _context.prev = 19;\n\n              _iterator.f();\n\n              return _context.finish(19);\n\n            case 22:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[3, 16, 19, 22]]);\n    }));\n\n    function matchAll(_x) {\n      return _matchAll.apply(this, arguments);\n    }\n\n    return matchAll;\n  }();\n}\n/**\n * Returns a {@link CssSelector} that unambiguously describes the given\n * element, within the given scope.\n *\n * @example\n * ```\n * const target = document.getElementById('targetelement').firstElementChild;\n * const selector = await describeCss(target);\n * console.log(selector);\n * // {\n * //   type: 'CssSelector',\n * //   value: '#targetelement > :nth-child(1)'\n * // }\n * ```\n *\n * @param element - The element that the selector should describe.\n * @param scope - The node that serves as the ‘document’ for purposes of finding\n * an unambiguous selector. Defaults to the Document that contains `element`.\n * @returns The selector unambiguously describing `element` within `scope`.\n */\n\nfunction describeCss(_x2) {\n  return _describeCss.apply(this, arguments);\n}\n\nfunction _describeCss() {\n  _describeCss = (0,_babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_8__.mark(function _callee2(element) {\n    var scope,\n        selector,\n        _args2 = arguments;\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_8__.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            scope = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : element.ownerDocument;\n            selector = optimal_select__WEBPACK_IMPORTED_MODULE_9__(element, {\n              root: scope\n            });\n            return _context2.abrupt(\"return\", {\n              type: 'CssSelector',\n              value: selector\n            });\n\n          case 3:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _describeCss.apply(this, arguments);\n}\n//# sourceMappingURL=css.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/css.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/highlight-text.js":
/*!******************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/highlight-text.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   highlightText: () => (/* binding */ highlightText)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/object/keys */ \"./node_modules/@babel/runtime-corejs3/core-js/object/keys.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/slice */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/array/from */ \"./node_modules/@babel/runtime-corejs3/core-js/array/from.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/symbol */ \"./node_modules/@babel/runtime-corejs3/core-js/symbol.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator-method */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_3__ === \"undefined\" || _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_4__(o) == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_5__(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { var _context; if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_1__(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_2__(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n/**\n * Wrap each text node in a given Node or Range with a `<mark>` or other\n * element.\n *\n * If a Range is given that starts and/or ends within a Text node, that node\n * will be split in order to only wrap the contained part in the mark element.\n *\n * The highlight can be removed again by calling the function that cleans up the\n * wrapper elements. Note that this might not perfectly restore the DOM to its\n * previous state: text nodes that were split are not merged again. One could\n * consider running `range.commonAncestorContainer.normalize()` afterwards to\n * join all adjacent text nodes.\n *\n * @param target - The Node/Range containing the text. If it is a Range, note\n * that as highlighting modifies the DOM, the Range may be unusable afterwards.\n * @param tagName - The element used to wrap text nodes. Defaults to `'mark'`.\n * @param attributes - An object defining any attributes to be set on the\n * wrapper elements, e.g. its `class`.\n * @returns A function that removes the created highlight.\n *\n * @public\n */\n\nfunction highlightText(target) {\n  var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mark';\n  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  // First put all nodes in an array (splits start and end nodes if needed)\n  var nodes = textNodesInRange((0,_to_range_js__WEBPACK_IMPORTED_MODULE_7__.toRange)(target)); // Highlight each node\n\n  var highlightElements = [];\n\n  var _iterator = _createForOfIteratorHelper(nodes),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var node = _step.value;\n      var highlightElement = wrapNodeInHighlight(node, tagName, attributes);\n      highlightElements.push(highlightElement);\n    } // Return a function that cleans up the highlightElements.\n\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  function removeHighlights() {\n    // Remove each of the created highlightElements.\n    var _iterator2 = _createForOfIteratorHelper(highlightElements),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var highlightElement = _step2.value;\n        removeHighlight(highlightElement);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  }\n\n  return removeHighlights;\n} // Return an array of the text nodes in the range. Split the start and end nodes if required.\n\nfunction textNodesInRange(range) {\n  // If the start or end node is a text node and only partly in the range, split it.\n  if (isTextNode(range.startContainer) && range.startOffset > 0) {\n    var endOffset = range.endOffset; // (this may get lost when the splitting the node)\n\n    var createdNode = range.startContainer.splitText(range.startOffset);\n\n    if (range.endContainer === range.startContainer) {\n      // If the end was in the same container, it will now be in the newly created node.\n      range.setEnd(createdNode, endOffset - range.startOffset);\n    }\n\n    range.setStart(createdNode, 0);\n  }\n\n  if (isTextNode(range.endContainer) && range.endOffset < range.endContainer.length) {\n    range.endContainer.splitText(range.endOffset);\n  } // Collect the text nodes.\n\n\n  var walker = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_6__.ownerDocument)(range).createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {\n    acceptNode: function acceptNode(node) {\n      return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;\n    }\n  });\n  walker.currentNode = range.startContainer; // // Optimise by skipping nodes that are explicitly outside the range.\n  // const NodeTypesWithCharacterOffset = [\n  //  Node.TEXT_NODE,\n  //  Node.PROCESSING_INSTRUCTION_NODE,\n  //  Node.COMMENT_NODE,\n  // ];\n  // if (!NodeTypesWithCharacterOffset.includes(range.startContainer.nodeType)) {\n  //   if (range.startOffset < range.startContainer.childNodes.length) {\n  //     walker.currentNode = range.startContainer.childNodes[range.startOffset];\n  //   } else {\n  //     walker.nextSibling(); // TODO verify this is correct.\n  //   }\n  // }\n\n  var nodes = [];\n  if (isTextNode(walker.currentNode)) nodes.push(walker.currentNode);\n\n  while (walker.nextNode() && range.comparePoint(walker.currentNode, 0) !== 1) {\n    nodes.push(walker.currentNode);\n  }\n\n  return nodes;\n} // Replace [node] with <tagName ...attributes>[node]</tagName>\n\n\nfunction wrapNodeInHighlight(node, tagName, attributes) {\n  var document = node.ownerDocument;\n  var highlightElement = document.createElement(tagName);\n\n  _babel_runtime_corejs3_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__(attributes).forEach(function (key) {\n    highlightElement.setAttribute(key, attributes[key]);\n  });\n\n  var tempRange = document.createRange();\n  tempRange.selectNode(node);\n  tempRange.surroundContents(highlightElement);\n  return highlightElement;\n} // Remove a highlight element created with wrapNodeInHighlight.\n\n\nfunction removeHighlight(highlightElement) {\n  // If it has somehow been removed already, there is nothing to be done.\n  if (!highlightElement.parentNode) return;\n\n  if (highlightElement.childNodes.length === 1) {\n    highlightElement.replaceWith(highlightElement.firstChild);\n  } else {\n    // If the highlight somehow contains multiple nodes now, move them all.\n    while (highlightElement.firstChild) {\n      highlightElement.parentNode.insertBefore(highlightElement.firstChild, highlightElement);\n    }\n\n    highlightElement.remove();\n  }\n}\n\nfunction isTextNode(node) {\n  return node.nodeType === Node.TEXT_NODE;\n}\n//# sourceMappingURL=highlight-text.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/highlight-text.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCssSelectorMatcher: () => (/* reexport safe */ _css_js__WEBPACK_IMPORTED_MODULE_0__.createCssSelectorMatcher),\n/* harmony export */   createTextPositionSelectorMatcher: () => (/* reexport safe */ _text_position_index_js__WEBPACK_IMPORTED_MODULE_3__.createTextPositionSelectorMatcher),\n/* harmony export */   createTextQuoteSelectorMatcher: () => (/* reexport safe */ _text_quote_index_js__WEBPACK_IMPORTED_MODULE_2__.createTextQuoteSelectorMatcher),\n/* harmony export */   describeCss: () => (/* reexport safe */ _css_js__WEBPACK_IMPORTED_MODULE_0__.describeCss),\n/* harmony export */   describeTextPosition: () => (/* reexport safe */ _text_position_index_js__WEBPACK_IMPORTED_MODULE_3__.describeTextPosition),\n/* harmony export */   describeTextQuote: () => (/* reexport safe */ _text_quote_index_js__WEBPACK_IMPORTED_MODULE_2__.describeTextQuote),\n/* harmony export */   highlightText: () => (/* reexport safe */ _highlight_text_js__WEBPACK_IMPORTED_MODULE_4__.highlightText),\n/* harmony export */   makeCreateRangeSelectorMatcher: () => (/* reexport safe */ _range_index_js__WEBPACK_IMPORTED_MODULE_1__.makeCreateRangeSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _css_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css.js */ \"./node_modules/@apache-annotator/dom/lib/css.js\");\n/* harmony import */ var _range_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range/index.js */ \"./node_modules/@apache-annotator/dom/lib/range/index.js\");\n/* harmony import */ var _text_quote_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-quote/index.js */ \"./node_modules/@apache-annotator/dom/lib/text-quote/index.js\");\n/* harmony import */ var _text_position_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-position/index.js */ \"./node_modules/@apache-annotator/dom/lib/text-position/index.js\");\n/* harmony import */ var _highlight_text_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./highlight-text.js */ \"./node_modules/@apache-annotator/dom/lib/highlight-text.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/normalize-range.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/normalize-range.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizeRange: () => (/* binding */ normalizeRange)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n/**\n * TextRange is a Range that guarantees to always have Text nodes as its start\n * and end nodes. To ensure the type remains correct, it also restricts usage\n * of methods that would modify these nodes (note that a user can simply cast\n * the TextRange back to a Range to remove these restrictions).\n */\n\n/**\n * Normalise a {@link https://developer.mozilla.org/en-US/docs/Web/API/Range |\n * Range} such that ranges spanning the same text become exact equals.\n *\n * *Note: in this context ‘text’ means any characters, including whitespace.*\n\n * Normalises a range such that both its start and end are text nodes, and that\n * if there are equivalent text selections it takes the narrowest option (i.e.\n * it prefers the start not to be at the end of a text node, and vice versa).\n *\n * If there is no text between the start and end, they thus collapse onto one a\n * single position; and if there are multiple equivalent positions, it takes the\n * first one; or, if scope is passed, the first equivalent falling within scope.\n *\n * Note that if the given range does not contain non-empty text nodes, it may\n * end up pointing at a text node outside of it (before it if possible, else\n * after). If the document does not contain any text nodes, an error is thrown.\n */\nfunction normalizeRange(range, scope) {\n  var document = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_1__.ownerDocument)(range);\n  var walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, {\n    acceptNode: function acceptNode(node) {\n      return !scope || scope.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;\n    }\n  });\n\n  var _snapBoundaryPointToT = snapBoundaryPointToTextNode(range.startContainer, range.startOffset),\n      _snapBoundaryPointToT2 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_snapBoundaryPointToT, 2),\n      startContainer = _snapBoundaryPointToT2[0],\n      startOffset = _snapBoundaryPointToT2[1]; // If we point at the end of a text node, move to the start of the next one.\n  // The step is repeated to skip over empty text nodes.\n\n\n  walker.currentNode = startContainer;\n\n  while (startOffset === startContainer.length && walker.nextNode()) {\n    startContainer = walker.currentNode;\n    startOffset = 0;\n  } // Set the range’s start; note this might move its end too.\n\n\n  range.setStart(startContainer, startOffset);\n\n  var _snapBoundaryPointToT3 = snapBoundaryPointToTextNode(range.endContainer, range.endOffset),\n      _snapBoundaryPointToT4 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_snapBoundaryPointToT3, 2),\n      endContainer = _snapBoundaryPointToT4[0],\n      endOffset = _snapBoundaryPointToT4[1]; // If we point at the start of a text node, move to the end of the previous one.\n  // The step is repeated to skip over empty text nodes.\n\n\n  walker.currentNode = endContainer;\n\n  while (endOffset === 0 && walker.previousNode()) {\n    endContainer = walker.currentNode;\n    endOffset = endContainer.length;\n  } // Set the range’s end; note this might move its start too.\n\n\n  range.setEnd(endContainer, endOffset);\n  return range;\n} // Given an arbitrary boundary point, this returns either:\n// - that same boundary point, if its node is a text node;\n// - otherwise the first boundary point after it whose node is a text node, if any;\n// - otherwise, the last boundary point before it whose node is a text node.\n// If the document has no text nodes, it throws an error.\n\nfunction snapBoundaryPointToTextNode(node, offset) {\n  var _node$ownerDocument;\n\n  if (isText(node)) return [node, offset]; // Find the node at or right after the boundary point.\n\n  var curNode;\n\n  if (isCharacterData(node)) {\n    curNode = node;\n  } else if (offset < node.childNodes.length) {\n    curNode = node.childNodes[offset];\n  } else {\n    curNode = node;\n\n    while (curNode.nextSibling === null) {\n      if (curNode.parentNode === null) // Boundary point is at end of document\n        throw new Error('not implemented'); // TODO\n\n      curNode = curNode.parentNode;\n    }\n\n    curNode = curNode.nextSibling;\n  }\n\n  if (isText(curNode)) return [curNode, 0]; // Walk to the next text node, or the last if there is none.\n\n  var document = (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : node;\n  var walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);\n  walker.currentNode = curNode;\n\n  if (walker.nextNode() !== null) {\n    return [walker.currentNode, 0];\n  } else if (walker.previousNode() !== null) {\n    return [walker.currentNode, walker.currentNode.length];\n  } else {\n    throw new Error('Document contains no text nodes.');\n  }\n}\n\nfunction isText(node) {\n  return node.nodeType === Node.TEXT_NODE;\n}\n\nfunction isCharacterData(node) {\n  return node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.TEXT_NODE;\n}\n//# sourceMappingURL=normalize-range.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/normalize-range.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/owner-document.js":
/*!******************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/owner-document.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ownerDocument: () => (/* binding */ ownerDocument)\n/* harmony export */ });\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n/**\n * Get the ownerDocument for either a range or a node.\n *\n * @param nodeOrRange the node or range for which to get the owner document.\n */\nfunction ownerDocument(nodeOrRange) {\n  var _node$ownerDocument;\n\n  var node = isRange(nodeOrRange) ? nodeOrRange.startContainer : nodeOrRange; // node.ownerDocument is null iff node is itself a Document.\n\n  return (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : node;\n}\n\nfunction isRange(nodeOrRange) {\n  return 'startContainer' in nodeOrRange;\n}\n//# sourceMappingURL=owner-document.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/owner-document.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/range/cartesian.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/range/cartesian.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cartesian: () => (/* binding */ cartesian)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncIterator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncGeneratorDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/map */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/map.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_promise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/promise */ \"./node_modules/@babel/runtime-corejs3/core-js/promise.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_reduce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/reduce */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/reduce.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_flat_map__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/flat-map */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/flat-map.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_concat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/concat */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/concat.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Generates the Cartesian product of the sets generated by the given iterables.\n *\n *   𝑆₁ × ... × 𝑆ₙ = { (𝑒₁,...,𝑒ₙ) | 𝑒ᵢ ∈ 𝑆ᵢ }\n */\nfunction cartesian() {\n  return _cartesian.apply(this, arguments);\n}\n\nfunction _cartesian() {\n  _cartesian = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_5__.mark(function _callee2() {\n    var _len,\n        iterables,\n        _key,\n        iterators,\n        active,\n        logs,\n        nexts,\n        result,\n        index,\n        value,\n        scratch,\n        closeAll,\n        _args2 = arguments;\n\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_5__.wrap(function _callee2$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            for (_len = _args2.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {\n              iterables[_key] = _args2[_key];\n            }\n\n            // Create iterators for traversing each iterable and tagging every value\n            // with the index of its source iterable.\n            iterators = _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__(iterables).call(iterables, function (iterable, index) {\n              var generator = /*#__PURE__*/function () {\n                var _ref = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_5__.mark(function _callee() {\n                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, value;\n\n                  return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_5__.wrap(function _callee$(_context) {\n                    while (1) {\n                      switch (_context.prev = _context.next) {\n                        case 0:\n                          _iteratorNormalCompletion = true;\n                          _didIteratorError = false;\n                          _context.prev = 2;\n                          _iterator = (0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(iterable);\n\n                        case 4:\n                          _context.next = 6;\n                          return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_iterator.next());\n\n                        case 6:\n                          _step = _context.sent;\n                          _iteratorNormalCompletion = _step.done;\n                          _context.next = 10;\n                          return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_step.value);\n\n                        case 10:\n                          _value = _context.sent;\n\n                          if (_iteratorNormalCompletion) {\n                            _context.next = 18;\n                            break;\n                          }\n\n                          value = _value;\n                          _context.next = 15;\n                          return {\n                            index: index,\n                            value: value\n                          };\n\n                        case 15:\n                          _iteratorNormalCompletion = true;\n                          _context.next = 4;\n                          break;\n\n                        case 18:\n                          _context.next = 24;\n                          break;\n\n                        case 20:\n                          _context.prev = 20;\n                          _context.t0 = _context[\"catch\"](2);\n                          _didIteratorError = true;\n                          _iteratorError = _context.t0;\n\n                        case 24:\n                          _context.prev = 24;\n                          _context.prev = 25;\n\n                          if (!(!_iteratorNormalCompletion && _iterator.return != null)) {\n                            _context.next = 29;\n                            break;\n                          }\n\n                          _context.next = 29;\n                          return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_iterator.return());\n\n                        case 29:\n                          _context.prev = 29;\n\n                          if (!_didIteratorError) {\n                            _context.next = 32;\n                            break;\n                          }\n\n                          throw _iteratorError;\n\n                        case 32:\n                          return _context.finish(29);\n\n                        case 33:\n                          return _context.finish(24);\n\n                        case 34:\n                          return _context.abrupt(\"return\", {\n                            index: index\n                          });\n\n                        case 35:\n                        case \"end\":\n                          return _context.stop();\n                      }\n                    }\n                  }, _callee, null, [[2, 20, 24, 34], [25,, 29, 33]]);\n                }));\n\n                return function generator() {\n                  return _ref.apply(this, arguments);\n                };\n              }();\n\n              return generator();\n            });\n            _context3.prev = 2;\n            // Track the number of non-exhausted iterators.\n            active = iterators.length; // Track all the values of each iterator in a log.\n\n            logs = _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__(iterators).call(iterators, function () {\n              return [];\n            }); // Track the promise of the next value of each iterator.\n\n            nexts = _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__(iterators).call(iterators, function (it) {\n              return it.next();\n            }); // Iterate the values of all the iterators in parallel and yield tuples from\n            // the partial product of each new value and the existing logs of the other\n            // iterators.\n\n          case 6:\n            if (!active) {\n              _context3.next = 23;\n              break;\n            }\n\n            _context3.next = 9;\n            return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_babel_runtime_corejs3_core_js_promise__WEBPACK_IMPORTED_MODULE_7__.race(nexts));\n\n          case 9:\n            result = _context3.sent;\n            index = result.value.index; // If the iterator has exhausted all the values, set the promise\n            // of its next value to never resolve.\n\n            if (!result.done) {\n              _context3.next = 15;\n              break;\n            }\n\n            active--;\n            nexts[index] = new _babel_runtime_corejs3_core_js_promise__WEBPACK_IMPORTED_MODULE_7__(function () {\n              return undefined;\n            });\n            return _context3.abrupt(\"continue\", 6);\n\n          case 15:\n            // Append the new value to the log.\n            value = result.value.value;\n            logs[index].push(value); // Record the promise of the next value.\n\n            nexts[index] = iterators[index].next(); // Create a scratch input for computing a partial product.\n\n            scratch = (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(logs);\n            scratch[index] = [value]; // Synchronously compute and yield tuples of the partial product.\n\n            return _context3.delegateYield((0,_babel_runtime_corejs3_helpers_esm_asyncGeneratorDelegate__WEBPACK_IMPORTED_MODULE_4__[\"default\"])((0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_babel_runtime_corejs3_core_js_instance_reduce__WEBPACK_IMPORTED_MODULE_8__(scratch).call(scratch, function (acc, next) {\n              return _babel_runtime_corejs3_core_js_instance_flat_map__WEBPACK_IMPORTED_MODULE_9__(acc).call(acc, function (v) {\n                return _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__(next).call(next, function (w) {\n                  var _context2;\n\n                  return _babel_runtime_corejs3_core_js_instance_concat__WEBPACK_IMPORTED_MODULE_10__(_context2 = []).call(_context2, (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(v), [w]);\n                });\n              });\n            }, [[]])), _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"]), \"t0\", 21);\n\n          case 21:\n            _context3.next = 6;\n            break;\n\n          case 23:\n            _context3.prev = 23;\n            closeAll = _babel_runtime_corejs3_core_js_instance_map__WEBPACK_IMPORTED_MODULE_6__(iterators).call(iterators, function (it, index) {\n              return it.return({\n                index: index\n              });\n            });\n            _context3.next = 27;\n            return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_babel_runtime_corejs3_core_js_promise__WEBPACK_IMPORTED_MODULE_7__.all(closeAll));\n\n          case 27:\n            return _context3.finish(23);\n\n          case 28:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee2, null, [[2,, 23, 28]]);\n  }));\n  return _cartesian.apply(this, arguments);\n}\n//# sourceMappingURL=cartesian.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/range/cartesian.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/range/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/range/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   makeCreateRangeSelectorMatcher: () => (/* reexport safe */ _match_js__WEBPACK_IMPORTED_MODULE_0__.makeCreateRangeSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./match.js */ \"./node_modules/@apache-annotator/dom/lib/range/match.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/range/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/range/match.js":
/*!***************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/range/match.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   makeCreateRangeSelectorMatcher: () => (/* binding */ makeCreateRangeSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncIterator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cartesian.js */ \"./node_modules/@apache-annotator/dom/lib/range/cartesian.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n/**\n * Find the range(s) corresponding to the given {@link RangeSelector}.\n *\n * As a RangeSelector itself nests two further selectors, one needs to pass a\n * `createMatcher` function that will be used to process those nested selectors.\n *\n * The function is curried, taking first the `createMatcher` function, then the\n * selector, and then the scope.\n *\n * As there may be multiple matches for the start & end selectors, the resulting\n * matcher will return an (async) iterable, that produces a match for each\n * possible pair of matches of the nested selectors (except those where its end\n * would precede its start). *(Note that this behaviour is a rather free\n * interpretation of the Web Annotation Data Model spec, which is silent about\n * the possibility of multiple matches for RangeSelectors)*\n *\n * @example\n * By using a matcher for {@link TextQuoteSelector}s, one\n * could create a matcher for text quotes with ellipsis to select a phrase\n * “ipsum … amet,”:\n * ```\n * const selector = {\n *   type: 'RangeSelector',\n *   startSelector: {\n *     type: 'TextQuoteSelector',\n *     exact: 'ipsum ',\n *   },\n *   endSelector: {\n *     type: 'TextQuoteSelector',\n *     // Because the end of a RangeSelector is *exclusive*, we will present the\n *     // latter part of the quote as the *prefix* so it will be part of the\n *     // match.\n *     exact: '',\n *     prefix: ' amet,',\n *   }\n * };\n * const createRangeSelectorMatcher =\n *   makeCreateRangeSelectorMatcher(createTextQuoteMatcher);\n * const match = createRangeSelectorMatcher(selector)(document.body);\n * console.log(match)\n * // ⇒ Range { startContainer: #text, startOffset: 6, endContainer: #text,\n * //   endOffset: 27, … }\n * ```\n *\n * @example\n * To support RangeSelectors that might themselves contain RangeSelectors,\n * recursion can be created by supplying the resulting matcher creator function\n * as the `createMatcher` parameter:\n * ```\n * const createWhicheverMatcher = (selector) => {\n *   const innerCreateMatcher = {\n *     TextQuoteSelector: createTextQuoteSelectorMatcher,\n *     TextPositionSelector: createTextPositionSelectorMatcher,\n *     RangeSelector: makeCreateRangeSelectorMatcher(createWhicheverMatcher),\n *   }[selector.type];\n *   return innerCreateMatcher(selector);\n * });\n * ```\n *\n * @param createMatcher - The function used to process nested selectors.\n * @returns A function that, given a RangeSelector `selector`, creates a {@link\n * Matcher} function that can apply it to a given `scope`.\n *\n * @public\n */\n\nfunction makeCreateRangeSelectorMatcher(createMatcher) {\n  return function createRangeSelectorMatcher(selector) {\n    var startMatcher = createMatcher(selector.startSelector);\n    var endMatcher = createMatcher(selector.endSelector);\n    return /*#__PURE__*/function () {\n      var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__.mark(function _callee(scope) {\n        var startMatches, endMatches, pairs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, _value2, _value3, start, end, result;\n\n        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                startMatches = startMatcher(scope);\n                endMatches = endMatcher(scope);\n                pairs = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_7__.cartesian)(startMatches, endMatches);\n                _iteratorNormalCompletion = true;\n                _didIteratorError = false;\n                _context.prev = 5;\n                _iterator = (0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(pairs);\n\n              case 7:\n                _context.next = 9;\n                return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_iterator.next());\n\n              case 9:\n                _step = _context.sent;\n                _iteratorNormalCompletion = _step.done;\n                _context.next = 13;\n                return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_step.value);\n\n              case 13:\n                _value = _context.sent;\n\n                if (_iteratorNormalCompletion) {\n                  _context.next = 27;\n                  break;\n                }\n\n                _value2 = _value, _value3 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_value2, 2), start = _value3[0], end = _value3[1];\n                start = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_6__.toRange)(start);\n                end = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_6__.toRange)(end);\n                result = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_5__.ownerDocument)(scope).createRange();\n                result.setStart(start.startContainer, start.startOffset); // Note that a RangeSelector’s match *excludes* the endSelector’s match,\n                // hence we take the end’s startContainer & startOffset.\n\n                result.setEnd(end.startContainer, end.startOffset);\n\n                if (result.collapsed) {\n                  _context.next = 24;\n                  break;\n                }\n\n                _context.next = 24;\n                return result;\n\n              case 24:\n                _iteratorNormalCompletion = true;\n                _context.next = 7;\n                break;\n\n              case 27:\n                _context.next = 33;\n                break;\n\n              case 29:\n                _context.prev = 29;\n                _context.t0 = _context[\"catch\"](5);\n                _didIteratorError = true;\n                _iteratorError = _context.t0;\n\n              case 33:\n                _context.prev = 33;\n                _context.prev = 34;\n\n                if (!(!_iteratorNormalCompletion && _iterator.return != null)) {\n                  _context.next = 38;\n                  break;\n                }\n\n                _context.next = 38;\n                return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_iterator.return());\n\n              case 38:\n                _context.prev = 38;\n\n                if (!_didIteratorError) {\n                  _context.next = 41;\n                  break;\n                }\n\n                throw _iteratorError;\n\n              case 41:\n                return _context.finish(38);\n\n              case 42:\n                return _context.finish(33);\n\n              case 43:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, null, [[5, 29, 33, 43], [34,, 38, 42]]);\n      }));\n\n      function matchAll(_x) {\n        return _matchAll.apply(this, arguments);\n      }\n\n      return matchAll;\n    }();\n  };\n}\n//# sourceMappingURL=match.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/range/match.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-node-chunker.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-node-chunker.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EmptyScopeError: () => (/* binding */ EmptyScopeError),\n/* harmony export */   OutOfScopeError: () => (/* binding */ OutOfScopeError),\n/* harmony export */   TextNodeChunker: () => (/* binding */ TextNodeChunker)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/reflect/construct */ \"./node_modules/@babel/runtime-corejs3/core-js/reflect/construct.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/createClass */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/inherits */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/inherits.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapNativeSuper */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapNativeSuper.js\");\n/* harmony import */ var _normalize_range_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./normalize-range.js */ \"./node_modules/@apache-annotator/dom/lib/normalize-range.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_corejs3_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_corejs3_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this).constructor; result = _babel_runtime_corejs3_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_corejs3_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !_babel_runtime_corejs3_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__) return false; if (_babel_runtime_corejs3_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(_babel_runtime_corejs3_core_js_reflect_construct__WEBPACK_IMPORTED_MODULE_0__(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\nvar EmptyScopeError = /*#__PURE__*/function (_TypeError) {\n  (0,_babel_runtime_corejs3_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(EmptyScopeError, _TypeError);\n\n  var _super = _createSuper(EmptyScopeError);\n\n  function EmptyScopeError(message) {\n    (0,_babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, EmptyScopeError);\n\n    return _super.call(this, message || 'Scope contains no text nodes.');\n  }\n\n  return EmptyScopeError;\n}( /*#__PURE__*/(0,_babel_runtime_corejs3_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(TypeError));\nvar OutOfScopeError = /*#__PURE__*/function (_TypeError2) {\n  (0,_babel_runtime_corejs3_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(OutOfScopeError, _TypeError2);\n\n  var _super2 = _createSuper(OutOfScopeError);\n\n  function OutOfScopeError(message) {\n    (0,_babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, OutOfScopeError);\n\n    return _super2.call(this, message || 'Cannot convert node to chunk, as it falls outside of chunker’s scope.');\n  }\n\n  return OutOfScopeError;\n}( /*#__PURE__*/(0,_babel_runtime_corejs3_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(TypeError));\nvar TextNodeChunker = /*#__PURE__*/function () {\n  /**\n   * @param scope A Range that overlaps with at least one text node.\n   */\n  function TextNodeChunker(scope) {\n    var _this = this;\n\n    (0,_babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, TextNodeChunker);\n\n    (0,_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"scope\", void 0);\n\n    (0,_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"iter\", void 0);\n\n    this.scope = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_10__.toRange)(scope);\n    this.iter = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_9__.ownerDocument)(scope).createNodeIterator(this.scope.commonAncestorContainer, NodeFilter.SHOW_TEXT, {\n      acceptNode: function acceptNode(node) {\n        return _this.scope.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;\n      }\n    }); // Move the iterator to after the start (= root) node.\n\n    this.iter.nextNode(); // If the start node is not a text node, move it to the first text node.\n\n    if (!isText(this.iter.referenceNode)) {\n      var nextNode = this.iter.nextNode();\n      if (nextNode === null) throw new EmptyScopeError();\n    }\n  }\n\n  (0,_babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(TextNodeChunker, [{\n    key: \"currentChunk\",\n    get: function get() {\n      var node = this.iter.referenceNode; // This test should not actually be needed, but it keeps TypeScript happy.\n\n      if (!isText(node)) throw new EmptyScopeError();\n      return this.nodeToChunk(node);\n    }\n  }, {\n    key: \"nodeToChunk\",\n    value: function nodeToChunk(node) {\n      if (!this.scope.intersectsNode(node)) throw new OutOfScopeError();\n      var startOffset = node === this.scope.startContainer ? this.scope.startOffset : 0;\n      var endOffset = node === this.scope.endContainer ? this.scope.endOffset : node.length;\n      return {\n        node: node,\n        startOffset: startOffset,\n        endOffset: endOffset,\n        data: node.data.substring(startOffset, endOffset),\n        equals: function equals(other) {\n          return other.node === this.node && other.startOffset === this.startOffset && other.endOffset === this.endOffset;\n        }\n      };\n    }\n  }, {\n    key: \"rangeToChunkRange\",\n    value: function rangeToChunkRange(range) {\n      range = range.cloneRange(); // Take the part of the range that falls within the scope.\n\n      if (range.compareBoundaryPoints(Range.START_TO_START, this.scope) === -1) range.setStart(this.scope.startContainer, this.scope.startOffset);\n      if (range.compareBoundaryPoints(Range.END_TO_END, this.scope) === 1) range.setEnd(this.scope.endContainer, this.scope.endOffset); // Ensure it starts and ends at text nodes.\n\n      var textRange = (0,_normalize_range_js__WEBPACK_IMPORTED_MODULE_8__.normalizeRange)(range, this.scope);\n      var startChunk = this.nodeToChunk(textRange.startContainer);\n      var startIndex = textRange.startOffset - startChunk.startOffset;\n      var endChunk = this.nodeToChunk(textRange.endContainer);\n      var endIndex = textRange.endOffset - endChunk.startOffset;\n      return {\n        startChunk: startChunk,\n        startIndex: startIndex,\n        endChunk: endChunk,\n        endIndex: endIndex\n      };\n    }\n  }, {\n    key: \"chunkRangeToRange\",\n    value: function chunkRangeToRange(chunkRange) {\n      var range = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_9__.ownerDocument)(this.scope).createRange(); // The `+…startOffset` parts are only relevant for the first chunk, as it\n      // might start within a text node.\n\n      range.setStart(chunkRange.startChunk.node, chunkRange.startIndex + chunkRange.startChunk.startOffset);\n      range.setEnd(chunkRange.endChunk.node, chunkRange.endIndex + chunkRange.endChunk.startOffset);\n      return range;\n    }\n  }, {\n    key: \"nextChunk\",\n    value: function nextChunk() {\n      // Move the iterator to after the current node, so nextNode() will cause a jump.\n      if (this.iter.pointerBeforeReferenceNode) this.iter.nextNode();\n      if (this.iter.nextNode()) return this.currentChunk;else return null;\n    }\n  }, {\n    key: \"previousChunk\",\n    value: function previousChunk() {\n      if (!this.iter.pointerBeforeReferenceNode) this.iter.previousNode();\n      if (this.iter.previousNode()) return this.currentChunk;else return null;\n    }\n  }, {\n    key: \"precedesCurrentChunk\",\n    value: function precedesCurrentChunk(chunk) {\n      if (this.currentChunk === null) return false;\n      return !!(this.currentChunk.node.compareDocumentPosition(chunk.node) & Node.DOCUMENT_POSITION_PRECEDING);\n    }\n  }]);\n\n  return TextNodeChunker;\n}();\n\nfunction isText(node) {\n  return node.nodeType === Node.TEXT_NODE;\n}\n//# sourceMappingURL=text-node-chunker.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-node-chunker.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-position/describe.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-position/describe.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   describeTextPosition: () => (/* binding */ describeTextPosition)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _apache_annotator_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apache-annotator/selector */ \"./node_modules/@apache-annotator/selector/lib/index.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../text-node-chunker.js */ \"./node_modules/@apache-annotator/dom/lib/text-node-chunker.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n/**\n * Returns a {@link TextPositionSelector} that points at the target text within\n * the given scope.\n *\n * When no scope is given, the position is described relative to the document\n * as a whole. Note this means all the characters in all Text nodes are counted\n * to determine the target’s position, including those in the `<head>` and\n * whitespace, hence even a minor modification could make the selector point to\n * a different text than its original target.\n *\n * @example\n * ```\n * const target = window.getSelection().getRangeAt(0);\n * const selector = await describeTextPosition(target);\n * console.log(selector);\n * // {\n * //   type: 'TextPositionSelector',\n * //   start: 702,\n * //   end: 736\n * // }\n * ```\n *\n * @param range - The {@link https://developer.mozilla.org/en-US/docs/Web/API/Range\n * | Range} whose text content will be described.\n * @param scope - A Node or Range that serves as the ‘document’ for purposes of\n * finding occurrences and determining prefix and suffix. Defaults to the full\n * Document that contains `range`.\n * @returns The selector describing `range` within `scope`.\n *\n * @public\n */\n\nfunction describeTextPosition(_x, _x2) {\n  return _describeTextPosition.apply(this, arguments);\n}\n\nfunction _describeTextPosition() {\n  _describeTextPosition = (0,_babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.mark(function _callee(range, scope) {\n    var _scope;\n\n    var textChunks;\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            scope = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_5__.toRange)((_scope = scope) !== null && _scope !== void 0 ? _scope : (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_3__.ownerDocument)(range));\n            textChunks = new _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_4__.TextNodeChunker(scope);\n\n            if (!(textChunks.currentChunk === null)) {\n              _context.next = 4;\n              break;\n            }\n\n            throw new RangeError('Scope does not contain any Text nodes.');\n\n          case 4:\n            _context.next = 6;\n            return (0,_apache_annotator_selector__WEBPACK_IMPORTED_MODULE_2__.describeTextPosition)(textChunks.rangeToChunkRange(range), textChunks);\n\n          case 6:\n            return _context.abrupt(\"return\", _context.sent);\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _describeTextPosition.apply(this, arguments);\n}\n//# sourceMappingURL=describe.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-position/describe.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-position/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-position/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTextPositionSelectorMatcher: () => (/* reexport safe */ _match_js__WEBPACK_IMPORTED_MODULE_1__.createTextPositionSelectorMatcher),\n/* harmony export */   describeTextPosition: () => (/* reexport safe */ _describe_js__WEBPACK_IMPORTED_MODULE_0__.describeTextPosition)\n/* harmony export */ });\n/* harmony import */ var _describe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./describe.js */ \"./node_modules/@apache-annotator/dom/lib/text-position/describe.js\");\n/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match.js */ \"./node_modules/@apache-annotator/dom/lib/text-position/match.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-position/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-position/match.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-position/match.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTextPositionSelectorMatcher: () => (/* binding */ createTextPositionSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncIterator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _apache_annotator_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @apache-annotator/selector */ \"./node_modules/@apache-annotator/selector/lib/index.js\");\n/* harmony import */ var _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text-node-chunker.js */ \"./node_modules/@apache-annotator/dom/lib/text-node-chunker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n/**\n * Find the range of text corresponding to the given {@link\n * TextPositionSelector}.\n *\n * The start and end positions are measured relative to the first text character\n * in the given scope.\n *\n * The function is curried, taking first the selector and then the scope.\n *\n * Its end result is an (async) generator producing a single {@link https://developer.mozilla.org/en-US/docs/Web/API/Range\n * | Range} to represent the match (unlike e.g. a {@link TextQuoteSelector}, a\n * TextPositionSelector cannot have multiple matches).\n *\n * @example\n * ```\n * const selector = { type: 'TextPositionSelector', start: 702, end: 736 };\n * const scope = document.body;\n * const matches = textQuoteSelectorMatcher(selector)(scope);\n * const match = (await matches.next()).value;\n * // ⇒ Range { startContainer: #text, startOffset: 64, endContainer: #text,\n * //   endOffset: 98, … }\n * ```\n *\n * @param selector - The {@link TextPositionSelector} to be anchored.\n * @returns A {@link Matcher} function that applies `selector` within a given\n * `scope`.\n *\n * @public\n */\n\nfunction createTextPositionSelectorMatcher(selector) {\n  var abstractMatcher = (0,_apache_annotator_selector__WEBPACK_IMPORTED_MODULE_4__.textPositionSelectorMatcher)(selector);\n  return /*#__PURE__*/function () {\n    var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__.mark(function _callee(scope) {\n      var textChunks, matches, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, abstractMatch;\n\n      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              textChunks = new _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_5__.TextNodeChunker(scope);\n              matches = abstractMatcher(textChunks);\n              _iteratorNormalCompletion = true;\n              _didIteratorError = false;\n              _context.prev = 4;\n              _iterator = (0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(matches);\n\n            case 6:\n              _context.next = 8;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_iterator.next());\n\n            case 8:\n              _step = _context.sent;\n              _iteratorNormalCompletion = _step.done;\n              _context.next = 12;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_step.value);\n\n            case 12:\n              _value = _context.sent;\n\n              if (_iteratorNormalCompletion) {\n                _context.next = 20;\n                break;\n              }\n\n              abstractMatch = _value;\n              _context.next = 17;\n              return textChunks.chunkRangeToRange(abstractMatch);\n\n            case 17:\n              _iteratorNormalCompletion = true;\n              _context.next = 6;\n              break;\n\n            case 20:\n              _context.next = 26;\n              break;\n\n            case 22:\n              _context.prev = 22;\n              _context.t0 = _context[\"catch\"](4);\n              _didIteratorError = true;\n              _iteratorError = _context.t0;\n\n            case 26:\n              _context.prev = 26;\n              _context.prev = 27;\n\n              if (!(!_iteratorNormalCompletion && _iterator.return != null)) {\n                _context.next = 31;\n                break;\n              }\n\n              _context.next = 31;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_iterator.return());\n\n            case 31:\n              _context.prev = 31;\n\n              if (!_didIteratorError) {\n                _context.next = 34;\n                break;\n              }\n\n              throw _iteratorError;\n\n            case 34:\n              return _context.finish(31);\n\n            case 35:\n              return _context.finish(26);\n\n            case 36:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[4, 22, 26, 36], [27,, 31, 35]]);\n    }));\n\n    function matchAll(_x) {\n      return _matchAll.apply(this, arguments);\n    }\n\n    return matchAll;\n  }();\n}\n//# sourceMappingURL=match.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-position/match.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-quote/describe.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-quote/describe.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   describeTextQuote: () => (/* binding */ describeTextQuote)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _apache_annotator_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apache-annotator/selector */ \"./node_modules/@apache-annotator/selector/lib/index.js\");\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/* harmony import */ var _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../text-node-chunker.js */ \"./node_modules/@apache-annotator/dom/lib/text-node-chunker.js\");\n/* harmony import */ var _to_range_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../to-range.js */ \"./node_modules/@apache-annotator/dom/lib/to-range.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n/**\n * Returns a {@link TextQuoteSelector} that unambiguously describes the given\n * range of text, within the given scope.\n *\n * The selector will contain the *exact* target quote, and in case this quote\n * appears multiple times in the text, sufficient context around the quote will\n * be included in the selector’s *prefix* and *suffix* attributes to\n * disambiguate. By default, more prefix and suffix are included than strictly\n * required; both in order to be robust against slight modifications, and in an\n * attempt to not end halfway a word (mainly for the sake of human readability).\n *\n * @example\n * ```\n * const target = window.getSelection().getRangeAt(0);\n * const selector = await describeTextQuote(target);\n * console.log(selector);\n * // {\n * //   type: 'TextQuoteSelector',\n * //   exact: 'ipsum',\n * //   prefix: 'Lorem ',\n * //   suffix: ' dolor'\n * // }\n * ```\n *\n * @param range - The {@link https://developer.mozilla.org/en-US/docs/Web/API/Range\n * | Range} whose text content will be described\n * @param scope - A Node or Range that serves as the ‘document’ for purposes of\n * finding occurrences and determining prefix and suffix. Defaults to the full\n * Document that contains `range`.\n * @param options - Options to fine-tune the function’s behaviour.\n * @returns The selector unambiguously describing `range` within `scope`.\n *\n * @public\n */\n\nfunction describeTextQuote(_x, _x2) {\n  return _describeTextQuote.apply(this, arguments);\n}\n\nfunction _describeTextQuote() {\n  _describeTextQuote = (0,_babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.mark(function _callee(range, scope) {\n    var options,\n        scopeAsRange,\n        chunker,\n        _args = arguments;\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};\n            scopeAsRange = (0,_to_range_js__WEBPACK_IMPORTED_MODULE_5__.toRange)(scope !== null && scope !== void 0 ? scope : (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_3__.ownerDocument)(range));\n            chunker = new _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_4__.TextNodeChunker(scopeAsRange);\n            _context.next = 5;\n            return (0,_apache_annotator_selector__WEBPACK_IMPORTED_MODULE_2__.describeTextQuote)(chunker.rangeToChunkRange(range), function () {\n              return new _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_4__.TextNodeChunker(scopeAsRange);\n            }, options);\n\n          case 5:\n            return _context.abrupt(\"return\", _context.sent);\n\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _describeTextQuote.apply(this, arguments);\n}\n//# sourceMappingURL=describe.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-quote/describe.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-quote/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-quote/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTextQuoteSelectorMatcher: () => (/* reexport safe */ _match_js__WEBPACK_IMPORTED_MODULE_1__.createTextQuoteSelectorMatcher),\n/* harmony export */   describeTextQuote: () => (/* reexport safe */ _describe_js__WEBPACK_IMPORTED_MODULE_0__.describeTextQuote)\n/* harmony export */ });\n/* harmony import */ var _describe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./describe.js */ \"./node_modules/@apache-annotator/dom/lib/text-quote/describe.js\");\n/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match.js */ \"./node_modules/@apache-annotator/dom/lib/text-quote/match.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-quote/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/text-quote/match.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/text-quote/match.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTextQuoteSelectorMatcher: () => (/* binding */ createTextQuoteSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncIterator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _apache_annotator_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @apache-annotator/selector */ \"./node_modules/@apache-annotator/selector/lib/index.js\");\n/* harmony import */ var _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text-node-chunker.js */ \"./node_modules/@apache-annotator/dom/lib/text-node-chunker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n/**\n * Find occurrences in a text matching the given {@link\n * TextQuoteSelector}.\n *\n * This performs an exact search for the selector’s quote (including prefix and\n * suffix) within the text contained in the given scope (a  {@link\n * https://developer.mozilla.org/en-US/docs/Web/API/Range | Range}).\n *\n * Note the match is based on strict character-by-character equivalence, i.e.\n * it is sensitive to whitespace, capitalisation, etc.\n *\n * The function is curried, taking first the selector and then the scope.\n *\n * As there may be multiple matches for a given selector (when its prefix and\n * suffix attributes are not sufficient to disambiguate it), the matcher will\n * return an (async) generator that produces each match in the order they are\n * found in the text.\n *\n * *XXX Modifying the DOM (e.g. to highlight the text) while the search is still\n * running can mess up and result in an error or an infinite loop. See [issue\n * #112](https://github.com/apache/incubator-annotator/issues/112).*\n *\n * @example\n * ```\n * // Find the word ‘banana’.\n * const selector = { type: 'TextQuoteSelector', exact: 'banana' };\n * const scope = document.body;\n *\n * // Read all matches.\n * const matches = textQuoteSelectorMatcher(selector)(scope);\n * for await (match of matches) console.log(match);\n * // ⇒ Range { startContainer: #text, startOffset: 187, endContainer: #text,\n * //   endOffset: 193, … }\n * // ⇒ Range { startContainer: #text, startOffset: 631, endContainer: #text,\n * //   endOffset: 637, … }\n * ```\n *\n * @param selector - The {@link TextQuoteSelector} to be anchored.\n * @returns A {@link Matcher} function that applies `selector` within a given\n * `scope`.\n *\n * @public\n */\n\nfunction createTextQuoteSelectorMatcher(selector) {\n  var abstractMatcher = (0,_apache_annotator_selector__WEBPACK_IMPORTED_MODULE_4__.textQuoteSelectorMatcher)(selector);\n  return /*#__PURE__*/function () {\n    var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__.mark(function _callee(scope) {\n      var textChunks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, abstractMatch;\n\n      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_3__.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              textChunks = new _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_5__.TextNodeChunker(scope);\n              _context.next = 11;\n              break;\n\n            case 4:\n              _context.prev = 4;\n              _context.t0 = _context[\"catch\"](0);\n\n              if (!(_context.t0 instanceof _text_node_chunker_js__WEBPACK_IMPORTED_MODULE_5__.EmptyScopeError)) {\n                _context.next = 10;\n                break;\n              }\n\n              return _context.abrupt(\"return\");\n\n            case 10:\n              throw _context.t0;\n\n            case 11:\n              _iteratorNormalCompletion = true;\n              _didIteratorError = false;\n              _context.prev = 13;\n              _iterator = (0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(abstractMatcher(textChunks));\n\n            case 15:\n              _context.next = 17;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_iterator.next());\n\n            case 17:\n              _step = _context.sent;\n              _iteratorNormalCompletion = _step.done;\n              _context.next = 21;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_step.value);\n\n            case 21:\n              _value = _context.sent;\n\n              if (_iteratorNormalCompletion) {\n                _context.next = 29;\n                break;\n              }\n\n              abstractMatch = _value;\n              _context.next = 26;\n              return textChunks.chunkRangeToRange(abstractMatch);\n\n            case 26:\n              _iteratorNormalCompletion = true;\n              _context.next = 15;\n              break;\n\n            case 29:\n              _context.next = 35;\n              break;\n\n            case 31:\n              _context.prev = 31;\n              _context.t1 = _context[\"catch\"](13);\n              _didIteratorError = true;\n              _iteratorError = _context.t1;\n\n            case 35:\n              _context.prev = 35;\n              _context.prev = 36;\n\n              if (!(!_iteratorNormalCompletion && _iterator.return != null)) {\n                _context.next = 40;\n                break;\n              }\n\n              _context.next = 40;\n              return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_iterator.return());\n\n            case 40:\n              _context.prev = 40;\n\n              if (!_didIteratorError) {\n                _context.next = 43;\n                break;\n              }\n\n              throw _iteratorError;\n\n            case 43:\n              return _context.finish(40);\n\n            case 44:\n              return _context.finish(35);\n\n            case 45:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 4], [13, 31, 35, 45], [36,, 40, 44]]);\n    }));\n\n    function matchAll(_x) {\n      return _matchAll.apply(this, arguments);\n    }\n\n    return matchAll;\n  }();\n}\n//# sourceMappingURL=match.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/text-quote/match.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/dom/lib/to-range.js":
/*!************************************************************!*\
  !*** ./node_modules/@apache-annotator/dom/lib/to-range.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toRange: () => (/* binding */ toRange)\n/* harmony export */ });\n/* harmony import */ var _owner_document_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./owner-document.js */ \"./node_modules/@apache-annotator/dom/lib/owner-document.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n/**\n * Returns a range that exactly selects the contents of the given node.\n *\n * This function is idempotent: If the given argument is already a range, it\n * simply returns that range.\n *\n * @param nodeOrRange The node/range to convert to a range if it is not already\n * a range.\n */\n\nfunction toRange(nodeOrRange) {\n  if (isRange(nodeOrRange)) {\n    return nodeOrRange;\n  } else {\n    var node = nodeOrRange;\n    var range = (0,_owner_document_js__WEBPACK_IMPORTED_MODULE_0__.ownerDocument)(node).createRange();\n    range.selectNodeContents(node);\n    return range;\n  }\n}\n\nfunction isRange(nodeOrRange) {\n  return 'startContainer' in nodeOrRange;\n}\n//# sourceMappingURL=to-range.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/dom/lib/to-range.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   chunkEquals: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.chunkEquals),\n/* harmony export */   chunkRangeEquals: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.chunkRangeEquals),\n/* harmony export */   describeTextPosition: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.describeTextPosition),\n/* harmony export */   describeTextQuote: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.describeTextQuote),\n/* harmony export */   makeRefinable: () => (/* binding */ makeRefinable),\n/* harmony export */   textPositionSelectorMatcher: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.textPositionSelectorMatcher),\n/* harmony export */   textQuoteSelectorMatcher: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.textQuoteSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncGeneratorDelegate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncIterator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _text_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text/index.js */ \"./node_modules/@apache-annotator/selector/lib/text/index.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n/**\n * Wrap a matcher creation function so that it supports refinement of selection.\n *\n * See {@link https://www.w3.org/TR/2017/REC-annotation-model-20170223/#refinement-of-selection\n * | §4.2.9 Refinement of Selection} in the Web Annotation Data Model.\n *\n * @param matcherCreator - The function to wrap; it will be executed both for\n * {@link Selector}s passed to the returned wrapper function, and for any\n * refining Selector those might contain (and any refinement of that, etc.).\n *\n * @public\n */\n\nfunction makeRefinable(matcherCreator) {\n  return function createMatcherWithRefinement(sourceSelector) {\n    var matcher = matcherCreator(sourceSelector);\n\n    if (sourceSelector.refinedBy) {\n      var refiningSelector = createMatcherWithRefinement(sourceSelector.refinedBy);\n      return /*#__PURE__*/function () {\n        var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__.mark(function _callee(scope) {\n          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, match;\n\n          return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  _iteratorNormalCompletion = true;\n                  _didIteratorError = false;\n                  _context.prev = 2;\n                  _iterator = (0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(matcher(scope));\n\n                case 4:\n                  _context.next = 6;\n                  return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_iterator.next());\n\n                case 6:\n                  _step = _context.sent;\n                  _iteratorNormalCompletion = _step.done;\n                  _context.next = 10;\n                  return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_step.value);\n\n                case 10:\n                  _value = _context.sent;\n\n                  if (_iteratorNormalCompletion) {\n                    _context.next = 17;\n                    break;\n                  }\n\n                  match = _value;\n                  return _context.delegateYield((0,_babel_runtime_corejs3_helpers_esm_asyncGeneratorDelegate__WEBPACK_IMPORTED_MODULE_2__[\"default\"])((0,_babel_runtime_corejs3_helpers_esm_asyncIterator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(refiningSelector(match)), _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"]), \"t0\", 14);\n\n                case 14:\n                  _iteratorNormalCompletion = true;\n                  _context.next = 4;\n                  break;\n\n                case 17:\n                  _context.next = 23;\n                  break;\n\n                case 19:\n                  _context.prev = 19;\n                  _context.t1 = _context[\"catch\"](2);\n                  _didIteratorError = true;\n                  _iteratorError = _context.t1;\n\n                case 23:\n                  _context.prev = 23;\n                  _context.prev = 24;\n\n                  if (!(!_iteratorNormalCompletion && _iterator.return != null)) {\n                    _context.next = 28;\n                    break;\n                  }\n\n                  _context.next = 28;\n                  return (0,_babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_iterator.return());\n\n                case 28:\n                  _context.prev = 28;\n\n                  if (!_didIteratorError) {\n                    _context.next = 31;\n                    break;\n                  }\n\n                  throw _iteratorError;\n\n                case 31:\n                  return _context.finish(28);\n\n                case 32:\n                  return _context.finish(23);\n\n                case 33:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee, null, [[2, 19, 23, 33], [24,, 28, 32]]);\n        }));\n\n        function matchAll(_x) {\n          return _matchAll.apply(this, arguments);\n        }\n\n        return matchAll;\n      }();\n    }\n\n    return matcher;\n  };\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/chunker.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/chunker.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   chunkEquals: () => (/* binding */ chunkEquals),\n/* harmony export */   chunkRangeEquals: () => (/* binding */ chunkRangeEquals)\n/* harmony export */ });\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n/**\n * Represents a piece of text in any kind of ‘file’.\n *\n * Its purpose is to enable generic algorithms to deal with text content of any\n * type of ‘file’ that consists of many pieces of text (e.g. a DOM, PDF, …).\n * Each Chunk represents one piece of text ({@link Chunk.data}). An object\n * implementing this interface would typically have other attributes as well to\n * map the chunk back to its position in the file (e.g. a Text node in the DOM).\n *\n * @typeParam TData - Piece of text, typically `string`\n *\n * @public\n */\n\n/**\n * Test two {@link Chunk}s for equality.\n *\n * Equality here means that both represent the same piece of text (i.e. at the\n * same position) in the file. It compares using the custom {@link Chunk.equals}\n * method if either chunk defines one, and falls back to checking the objects’\n * identity (i.e. `chunk1 === chunk2`).\n *\n * @public\n */\nfunction chunkEquals(chunk1, chunk2) {\n  if (chunk1.equals) return chunk1.equals(chunk2);\n  if (chunk2.equals) return chunk2.equals(chunk1);\n  return chunk1 === chunk2;\n}\n/**\n * Points at a range of characters between two points inside {@link Chunk}s.\n *\n * Analogous to the DOM’s ({@link https://developer.mozilla.org/en-US/docs/Web/API/AbstractRange\n * | Abstract}){@link https://developer.mozilla.org/en-US/docs/Web/API/Range |\n * Range}. Each index expresses an offset inside the value of the corresponding\n * {@link Chunk.data}, and can equal the length of that data in order to point\n * to the position right after the chunk’s last character.\n *\n * @public\n */\n\n/**\n * Test two {@link ChunkRange}s for equality.\n *\n * Equality here means equality of each of their four properties (i.e.\n * {@link startChunk}, {@link startIndex},\n * {@link endChunk}, and {@link endIndex}).\n * For the `startChunk`s and `endChunk`s, this function uses the custom\n * {@link Chunk.equals} method if defined.\n *\n * Note that if the start/end of one range points at the end of a chunk, and the\n * other to the start of a subsequent chunk, they are not considered equal, even\n * though semantically they may be representing the same range of characters. To\n * test for such semantic equivalence, ensure that both inputs are normalised:\n * typically this means the range is shrunk to its narrowest equivalent, and (if\n * it is empty) positioned at its first equivalent.\n *\n * @public\n */\nfunction chunkRangeEquals(range1, range2) {\n  return chunkEquals(range1.startChunk, range2.startChunk) && chunkEquals(range1.endChunk, range2.endChunk) && range1.startIndex === range2.startIndex && range1.endIndex === range2.endIndex;\n}\n/**\n * Presents the pieces of text contained in some underlying ‘file’ as a sequence\n * of {@link Chunk}s.\n *\n * Rather than presenting a list of all pieces, the `Chunker` provides methods\n * to walk through the file piece by piece. This permits implementations to read\n * and convert the file to `Chunk`s lazily.\n *\n * For those familiar with the DOM APIs, it is similar to a NodeIterator (but\n * unlike NodeIterator, it has no concept of being ‘before’ or ‘after’ a chunk).\n *\n * @typeParam TChunk - (sub)type of `Chunk` being used.\n *\n * @public\n */\n//# sourceMappingURL=chunker.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/chunker.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/code-point-seeker.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/code-point-seeker.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CodePointSeeker: () => (/* binding */ CodePointSeeker)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/createClass */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/slice */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_concat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/concat */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/concat.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n/**\n * Seeks through text counting Unicode *code points* instead of *code units*.\n *\n * Javascript characters correspond to 16 bits *code units*, hence two such\n * ‘characters’ might together constitute a single Unicode character (i.e. a\n * *code point*). The {@link CodePointSeeker} allows to ignore this\n * variable-length encoding, by counting code points instead.\n *\n * It is made to wrap a {@link Seeker} that counts code units (presumably a\n * {@link TextSeeker}), which must be passed to its {@link constructor}.\n *\n * When reading from the `CodePointSeeker`, the returned values is not a string\n * but an array of strings, each containing one code point (thus each having a\n * `length` that is either 1 or 2).\n *\n * @public\n */\nvar CodePointSeeker = /*#__PURE__*/function () {\n  /**\n   *\n   * @param raw  The {@link Seeker} to wrap, which counts in code *units* (e.g.\n   * a {@link TextSeeker}). It should have {@link Seeker.position | position}\n   * `0` and its methods must no longer be used directly if the\n   * `CodePointSeeker`’s position is to remain correct.\n   */\n  function CodePointSeeker(raw) {\n    (0,_babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, CodePointSeeker);\n\n    this.raw = raw;\n\n    (0,_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, \"position\", 0);\n  }\n\n  (0,_babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(CodePointSeeker, [{\n    key: \"seekBy\",\n    value: function seekBy(length) {\n      this.seekTo(this.position + length);\n    }\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(target) {\n      this._readOrSeekTo(false, target);\n    }\n  }, {\n    key: \"read\",\n    value: function read(length, roundUp) {\n      return this.readTo(this.position + length, roundUp);\n    }\n  }, {\n    key: \"readTo\",\n    value: function readTo(target, roundUp) {\n      return this._readOrSeekTo(true, target, roundUp);\n    }\n  }, {\n    key: \"currentChunk\",\n    get: function get() {\n      return this.raw.currentChunk;\n    }\n  }, {\n    key: \"offsetInChunk\",\n    get: function get() {\n      return this.raw.offsetInChunk;\n    }\n  }, {\n    key: \"seekToChunk\",\n    value: function seekToChunk(target) {\n      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n      this._readOrSeekToChunk(false, target, offset);\n    }\n  }, {\n    key: \"readToChunk\",\n    value: function readToChunk(target) {\n      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      return this._readOrSeekToChunk(true, target, offset);\n    }\n  }, {\n    key: \"_readOrSeekToChunk\",\n    value: function _readOrSeekToChunk(read, target) {\n      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      var oldRawPosition = this.raw.position;\n      var s = this.raw.readToChunk(target, offset);\n      var movedForward = this.raw.position >= oldRawPosition;\n\n      if (movedForward && endsWithinCharacter(s)) {\n        this.raw.seekBy(-1);\n        s = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(s).call(s, 0, -1);\n      } else if (!movedForward && startsWithinCharacter(s)) {\n        this.raw.seekBy(1);\n        s = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(s).call(s, 1);\n      }\n\n      var result = (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(s);\n\n      this.position = movedForward ? this.position + result.length : this.position - result.length;\n      if (read) return result;\n    }\n  }, {\n    key: \"_readOrSeekTo\",\n    value: function _readOrSeekTo(read, target) {\n      var roundUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      var result = [];\n\n      if (this.position < target) {\n        var unpairedSurrogate = '';\n        var characters = [];\n\n        while (this.position < target) {\n          var s = unpairedSurrogate + this.raw.read(1, true);\n\n          if (endsWithinCharacter(s)) {\n            unpairedSurrogate = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(s).call(s, -1); // consider this half-character part of the next string.\n\n            s = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(s).call(s, 0, -1);\n          } else {\n            unpairedSurrogate = '';\n          }\n\n          characters = (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(s);\n          this.position += characters.length;\n          if (read) result = _babel_runtime_corejs3_core_js_instance_concat__WEBPACK_IMPORTED_MODULE_5__(result).call(result, characters);\n        }\n\n        if (unpairedSurrogate) this.raw.seekBy(-1); // align with the last complete character.\n\n        if (!roundUp && this.position > target) {\n          var overshootInCodePoints = this.position - target;\n\n          var overshootInCodeUnits = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(characters).call(characters, -overshootInCodePoints).join('').length;\n\n          this.position -= overshootInCodePoints;\n          this.raw.seekBy(-overshootInCodeUnits);\n        }\n      } else {\n        // Nearly equal to the if-block, but moving backward in the text.\n        var _unpairedSurrogate = '';\n        var _characters = [];\n\n        while (this.position > target) {\n          var _s = this.raw.read(-1, true) + _unpairedSurrogate;\n\n          if (startsWithinCharacter(_s)) {\n            _unpairedSurrogate = _s[0];\n            _s = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(_s).call(_s, 1);\n          } else {\n            _unpairedSurrogate = '';\n          }\n\n          _characters = (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_s);\n          this.position -= _characters.length;\n          if (read) result = _babel_runtime_corejs3_core_js_instance_concat__WEBPACK_IMPORTED_MODULE_5__(_characters).call(_characters, result);\n        }\n\n        if (_unpairedSurrogate) this.raw.seekBy(1);\n\n        if (!roundUp && this.position < target) {\n          var _overshootInCodePoints = target - this.position;\n\n          var _overshootInCodeUnits = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(_characters).call(_characters, 0, _overshootInCodePoints).join('').length;\n\n          this.position += _overshootInCodePoints;\n          this.raw.seekBy(_overshootInCodeUnits);\n        }\n      }\n\n      if (read) return result;\n    }\n  }]);\n\n  return CodePointSeeker;\n}();\n\nfunction endsWithinCharacter(s) {\n  var codeUnit = s.charCodeAt(s.length - 1);\n  return 0xd800 <= codeUnit && codeUnit <= 0xdbff;\n}\n\nfunction startsWithinCharacter(s) {\n  var codeUnit = s.charCodeAt(0);\n  return 0xdc00 <= codeUnit && codeUnit <= 0xdfff;\n}\n//# sourceMappingURL=code-point-seeker.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/code-point-seeker.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/describe-text-position.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/describe-text-position.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   describeTextPosition: () => (/* binding */ describeTextPosition)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _code_point_seeker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code-point-seeker.js */ \"./node_modules/@apache-annotator/selector/lib/text/code-point-seeker.js\");\n/* harmony import */ var _seeker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./seeker.js */ \"./node_modules/@apache-annotator/selector/lib/text/seeker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n/**\n * Returns a {@link TextPositionSelector} that points at the target text within\n * the given scope.\n *\n * This is an abstract implementation of the function’s logic, which expects a\n * generic {@link Chunker} to represent the text, and a {@link ChunkRange} to\n * represent the target.\n *\n * See {@link dom.describeTextPosition} for a wrapper around\n * this implementation which applies it to the text of an HTML DOM.\n *\n * @param target - The range of characters that the selector should describe\n * @param scope - The text, presented as a {@link Chunker}, which contains the\n * target range, and relative to which its position will be measured\n * @returns The {@link TextPositionSelector} that describes `target` relative\n * to `scope`\n *\n * @public\n */\n\nfunction describeTextPosition(_x, _x2) {\n  return _describeTextPosition.apply(this, arguments);\n}\n\nfunction _describeTextPosition() {\n  _describeTextPosition = (0,_babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.mark(function _callee(target, scope) {\n    var codeUnitSeeker, codePointSeeker, start, end;\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            codeUnitSeeker = new _seeker_js__WEBPACK_IMPORTED_MODULE_3__.TextSeeker(scope);\n            codePointSeeker = new _code_point_seeker_js__WEBPACK_IMPORTED_MODULE_2__.CodePointSeeker(codeUnitSeeker);\n            codePointSeeker.seekToChunk(target.startChunk, target.startIndex);\n            start = codePointSeeker.position;\n            codePointSeeker.seekToChunk(target.endChunk, target.endIndex);\n            end = codePointSeeker.position;\n            return _context.abrupt(\"return\", {\n              type: 'TextPositionSelector',\n              start: start,\n              end: end\n            });\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _describeTextPosition.apply(this, arguments);\n}\n//# sourceMappingURL=describe-text-position.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/describe-text-position.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/describe-text-quote.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/describe-text-quote.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   describeTextQuote: () => (/* binding */ describeTextQuote)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _chunker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunker.js */ \"./node_modules/@apache-annotator/selector/lib/text/chunker.js\");\n/* harmony import */ var _seeker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./seeker.js */ \"./node_modules/@apache-annotator/selector/lib/text/seeker.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ \"./node_modules/@apache-annotator/selector/lib/text/index.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n/**\n * @public\n */\n\n/**\n * Returns a {@link TextQuoteSelector} that points at the target quote in the\n * given text.\n *\n * The selector will contain the exact target quote. In case this quote appears\n * multiple times in the text, sufficient context around the quote will be\n * included in the selector’s `prefix` and `suffix` attributes to disambiguate.\n * By default, more prefix and suffix are included than strictly required; both\n * in order to be robust against slight modifications, and in an attempt to not\n * end halfway a word (mainly for human readability).\n *\n * This is an abstract implementation of the function’s logic, which expects a\n * generic {@link Chunker} to represent the text, and a {@link ChunkRange} to\n * represent the target.\n *\n * See {@link dom.describeTextQuote} for a wrapper around this\n * implementation which applies it to the text of an HTML DOM.\n *\n * @param target - The range of characters that the selector should describe\n * @param scope - The text containing the target range; or, more accurately, a\n * function that produces {@link Chunker}s corresponding to this text.\n * @param options - Options to fine-tune the function’s behaviour.\n * @returns The {@link TextQuoteSelector} that describes `target`.\n *\n * @public\n */\nfunction describeTextQuote(_x, _x2) {\n  return _describeTextQuote.apply(this, arguments);\n}\n\nfunction _describeTextQuote() {\n  _describeTextQuote = (0,_babel_runtime_corejs3_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.mark(function _callee(target, scope) {\n    var options,\n        _options$minimalConte,\n        minimalContext,\n        _options$minimumQuote,\n        minimumQuoteLength,\n        _options$maxWordLengt,\n        maxWordLength,\n        seekerAtTarget,\n        seekerAtUnintendedMatch,\n        exact,\n        prefix,\n        suffix,\n        currentQuoteLength,\n        length,\n        _length,\n        _length2,\n        tentativeSelector,\n        matches,\n        nextMatch,\n        unintendedMatch,\n        extraPrefix,\n        extraSuffix,\n        _args = arguments;\n\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};\n            _options$minimalConte = options.minimalContext, minimalContext = _options$minimalConte === void 0 ? false : _options$minimalConte, _options$minimumQuote = options.minimumQuoteLength, minimumQuoteLength = _options$minimumQuote === void 0 ? 0 : _options$minimumQuote, _options$maxWordLengt = options.maxWordLength, maxWordLength = _options$maxWordLengt === void 0 ? 50 : _options$maxWordLengt; // Create a seeker to read the target quote and the context around it.\n            // TODO Possible optimisation: as it need not be an AbsoluteSeeker, a\n            // different implementation could provide direct ‘jump’ access in seekToChunk\n            // (the scope’s Chunker would of course also have to support this).\n\n            seekerAtTarget = new _seeker_js__WEBPACK_IMPORTED_MODULE_3__.TextSeeker(scope()); // Create a second seeker so that we will be able to simultaneously read\n            // characters near both the target and an unintended match, if we find any.\n\n            seekerAtUnintendedMatch = new _seeker_js__WEBPACK_IMPORTED_MODULE_3__.TextSeeker(scope()); // Read the target’s exact text.\n\n            seekerAtTarget.seekToChunk(target.startChunk, target.startIndex);\n            exact = seekerAtTarget.readToChunk(target.endChunk, target.endIndex); // Start with an empty prefix and suffix.\n\n            prefix = '';\n            suffix = ''; // If the quote is below the given minimum length, add some prefix & suffix.\n\n            currentQuoteLength = function currentQuoteLength() {\n              return prefix.length + exact.length + suffix.length;\n            };\n\n            if (currentQuoteLength() < minimumQuoteLength) {\n              // Expand the prefix, but only to reach halfway towards the desired length.\n              seekerAtTarget.seekToChunk(target.startChunk, target.startIndex - prefix.length);\n              length = Math.floor((minimumQuoteLength - currentQuoteLength()) / 2);\n              prefix = seekerAtTarget.read(-length, false, true) + prefix; // If needed, expand the suffix to achieve the minimum length.\n\n              if (currentQuoteLength() < minimumQuoteLength) {\n                seekerAtTarget.seekToChunk(target.endChunk, target.endIndex + suffix.length);\n                _length = minimumQuoteLength - currentQuoteLength();\n                suffix = suffix + seekerAtTarget.read(_length, false, true); // We might have to expand the prefix again (if at the end of the scope).\n\n                if (currentQuoteLength() < minimumQuoteLength) {\n                  seekerAtTarget.seekToChunk(target.startChunk, target.startIndex - prefix.length);\n                  _length2 = minimumQuoteLength - currentQuoteLength();\n                  prefix = seekerAtTarget.read(-_length2, false, true) + prefix;\n                }\n              }\n            } // Expand prefix & suffix to avoid them ending somewhere halfway in a word.\n\n\n            if (!minimalContext) {\n              seekerAtTarget.seekToChunk(target.startChunk, target.startIndex - prefix.length);\n              prefix = readUntilWhitespace(seekerAtTarget, maxWordLength, true) + prefix;\n              seekerAtTarget.seekToChunk(target.endChunk, target.endIndex + suffix.length);\n              suffix = suffix + readUntilWhitespace(seekerAtTarget, maxWordLength, false);\n            } // Search for matches of the quote using the current prefix and suffix. At\n            // each unintended match we encounter, we extend the prefix or suffix to\n            // ensure it will no longer match.\n\n\n          case 11:\n            if (false) {}\n\n            tentativeSelector = {\n              type: 'TextQuoteSelector',\n              exact: exact,\n              prefix: prefix,\n              suffix: suffix\n            };\n            matches = (0,_index_js__WEBPACK_IMPORTED_MODULE_4__.textQuoteSelectorMatcher)(tentativeSelector)(scope());\n            _context.next = 16;\n            return matches.next();\n\n          case 16:\n            nextMatch = _context.sent;\n\n            if (!(!nextMatch.done && (0,_chunker_js__WEBPACK_IMPORTED_MODULE_2__.chunkRangeEquals)(nextMatch.value, target))) {\n              _context.next = 21;\n              break;\n            }\n\n            _context.next = 20;\n            return matches.next();\n\n          case 20:\n            nextMatch = _context.sent;\n\n          case 21:\n            if (!nextMatch.done) {\n              _context.next = 23;\n              break;\n            }\n\n            return _context.abrupt(\"return\", tentativeSelector);\n\n          case 23:\n            // Possible optimisation: A subsequent search could safely skip the part we\n            // already processed, instead of starting from the beginning again. But we’d\n            // need the matcher to start at the seeker’s position, instead of searching\n            // in the whole current chunk. Then we could just seek back to just after\n            // the start of the prefix: seeker.seekBy(-prefix.length + 1); (don’t forget\n            // to also correct for any changes in the prefix we will make below)\n            // We’ll have to add more prefix/suffix to disqualify this unintended match.\n            unintendedMatch = nextMatch.value; // Count how many characters we’d need as a prefix to disqualify this match.\n\n            seekerAtTarget.seekToChunk(target.startChunk, target.startIndex - prefix.length);\n            seekerAtUnintendedMatch.seekToChunk(unintendedMatch.startChunk, unintendedMatch.startIndex - prefix.length);\n            extraPrefix = readUntilDifferent(seekerAtTarget, seekerAtUnintendedMatch, true);\n            if (extraPrefix !== undefined && !minimalContext) extraPrefix = readUntilWhitespace(seekerAtTarget, maxWordLength, true) + extraPrefix; // Count how many characters we’d need as a suffix to disqualify this match.\n\n            seekerAtTarget.seekToChunk(target.endChunk, target.endIndex + suffix.length);\n            seekerAtUnintendedMatch.seekToChunk(unintendedMatch.endChunk, unintendedMatch.endIndex + suffix.length);\n            extraSuffix = readUntilDifferent(seekerAtTarget, seekerAtUnintendedMatch, false);\n            if (extraSuffix !== undefined && !minimalContext) extraSuffix = extraSuffix + readUntilWhitespace(seekerAtTarget, maxWordLength, false);\n\n            if (!minimalContext) {\n              _context.next = 44;\n              break;\n            }\n\n            if (!(extraPrefix !== undefined && (extraSuffix === undefined || extraPrefix.length <= extraSuffix.length))) {\n              _context.next = 37;\n              break;\n            }\n\n            prefix = extraPrefix + prefix;\n            _context.next = 42;\n            break;\n\n          case 37:\n            if (!(extraSuffix !== undefined)) {\n              _context.next = 41;\n              break;\n            }\n\n            suffix = suffix + extraSuffix;\n            _context.next = 42;\n            break;\n\n          case 41:\n            throw new Error('Target cannot be disambiguated; how could that have happened‽');\n\n          case 42:\n            _context.next = 46;\n            break;\n\n          case 44:\n            // For redundancy, expand both prefix and suffix.\n            if (extraPrefix !== undefined) prefix = extraPrefix + prefix;\n            if (extraSuffix !== undefined) suffix = suffix + extraSuffix;\n\n          case 46:\n            _context.next = 11;\n            break;\n\n          case 48:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _describeTextQuote.apply(this, arguments);\n}\n\nfunction readUntilDifferent(seeker1, seeker2, reverse) {\n  var result = '';\n\n  while (true) {\n    var nextCharacter = void 0;\n\n    try {\n      nextCharacter = seeker1.read(reverse ? -1 : 1);\n    } catch (err) {\n      return undefined; // Start/end of text reached: cannot expand result.\n    }\n\n    result = reverse ? nextCharacter + result : result + nextCharacter; // Check if the newly added character makes the result differ from the second seeker.\n\n    var comparisonCharacter = void 0;\n\n    try {\n      comparisonCharacter = seeker2.read(reverse ? -1 : 1);\n    } catch (err) {\n      // A RangeError would merely mean seeker2 is exhausted.\n      if (!(err instanceof RangeError)) throw err;\n    }\n\n    if (nextCharacter !== comparisonCharacter) return result;\n  }\n}\n\nfunction readUntilWhitespace(seeker) {\n  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;\n  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var result = '';\n\n  while (result.length < limit) {\n    var nextCharacter = void 0;\n\n    try {\n      nextCharacter = seeker.read(reverse ? -1 : 1);\n    } catch (err) {\n      if (!(err instanceof RangeError)) throw err;\n      break; // End/start of text reached.\n    } // Stop if we reached whitespace.\n\n\n    if (isWhitespace(nextCharacter)) {\n      seeker.seekBy(reverse ? 1 : -1); // ‘undo’ the last read.\n\n      break;\n    }\n\n    result = reverse ? nextCharacter + result : result + nextCharacter;\n  }\n\n  return result;\n}\n\nfunction isWhitespace(s) {\n  return /^\\s+$/.test(s);\n}\n//# sourceMappingURL=describe-text-quote.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/describe-text-quote.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   chunkEquals: () => (/* reexport safe */ _chunker_js__WEBPACK_IMPORTED_MODULE_4__.chunkEquals),\n/* harmony export */   chunkRangeEquals: () => (/* reexport safe */ _chunker_js__WEBPACK_IMPORTED_MODULE_4__.chunkRangeEquals),\n/* harmony export */   describeTextPosition: () => (/* reexport safe */ _describe_text_position_js__WEBPACK_IMPORTED_MODULE_2__.describeTextPosition),\n/* harmony export */   describeTextQuote: () => (/* reexport safe */ _describe_text_quote_js__WEBPACK_IMPORTED_MODULE_0__.describeTextQuote),\n/* harmony export */   textPositionSelectorMatcher: () => (/* reexport safe */ _match_text_position_js__WEBPACK_IMPORTED_MODULE_3__.textPositionSelectorMatcher),\n/* harmony export */   textQuoteSelectorMatcher: () => (/* reexport safe */ _match_text_quote_js__WEBPACK_IMPORTED_MODULE_1__.textQuoteSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _describe_text_quote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./describe-text-quote.js */ \"./node_modules/@apache-annotator/selector/lib/text/describe-text-quote.js\");\n/* harmony import */ var _match_text_quote_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match-text-quote.js */ \"./node_modules/@apache-annotator/selector/lib/text/match-text-quote.js\");\n/* harmony import */ var _describe_text_position_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./describe-text-position.js */ \"./node_modules/@apache-annotator/selector/lib/text/describe-text-position.js\");\n/* harmony import */ var _match_text_position_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./match-text-position.js */ \"./node_modules/@apache-annotator/selector/lib/text/match-text-position.js\");\n/* harmony import */ var _chunker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunker.js */ \"./node_modules/@apache-annotator/selector/lib/text/chunker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/index.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/match-text-position.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/match-text-position.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   textPositionSelectorMatcher: () => (/* binding */ textPositionSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _code_point_seeker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code-point-seeker.js */ \"./node_modules/@apache-annotator/selector/lib/text/code-point-seeker.js\");\n/* harmony import */ var _seeker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./seeker.js */ \"./node_modules/@apache-annotator/selector/lib/text/seeker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n/**\n * Find the range of text corresponding to the given {@link TextPositionSelector}.\n *\n * This is an abstract implementation of the function’s logic, which expects a\n * generic {@link Chunker} to represent the text, and returns an (async)\n * generator producing a single {@link ChunkRange} to represent the match.\n * (unlike e.g. TextQuoteSelector, it cannot result in multiple matches).\n *\n * See {@link dom.createTextPositionSelectorMatcher} for a\n * wrapper around this implementation which applies it to the text of an HTML\n * DOM.\n *\n * The function is curried, taking first the selector and then the text.\n *\n * @example\n * ```\n * const selector = { type: 'TextPositionSelector', start: 702, end: 736 };\n * const matches = textPositionSelectorMatcher(selector)(textChunks);\n * const match = (await matches.next()).value;\n * console.log(match);\n * // ⇒ { startChunk: { … }, startIndex: 64, endChunk: { … }, endIndex: 98 }\n * ```\n *\n * @param selector - the {@link TextPositionSelector} to be anchored\n * @returns a {@link Matcher} function that applies `selector` to a given text\n *\n * @public\n */\n\nfunction textPositionSelectorMatcher(selector) {\n  var start = selector.start,\n      end = selector.end;\n  return /*#__PURE__*/function () {\n    var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__.mark(function _callee(textChunks) {\n      var codeUnitSeeker, codePointSeeker, startChunk, startIndex, endChunk, endIndex;\n      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              codeUnitSeeker = new _seeker_js__WEBPACK_IMPORTED_MODULE_4__.TextSeeker(textChunks);\n              codePointSeeker = new _code_point_seeker_js__WEBPACK_IMPORTED_MODULE_3__.CodePointSeeker(codeUnitSeeker);\n              codePointSeeker.seekTo(start);\n              startChunk = codeUnitSeeker.currentChunk;\n              startIndex = codeUnitSeeker.offsetInChunk;\n              codePointSeeker.seekTo(end);\n              endChunk = codeUnitSeeker.currentChunk;\n              endIndex = codeUnitSeeker.offsetInChunk;\n              _context.next = 10;\n              return {\n                startChunk: startChunk,\n                startIndex: startIndex,\n                endChunk: endChunk,\n                endIndex: endIndex\n              };\n\n            case 10:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    function matchAll(_x) {\n      return _matchAll.apply(this, arguments);\n    }\n\n    return matchAll;\n  }();\n}\n//# sourceMappingURL=match-text-position.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/match-text-position.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/match-text-quote.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/match-text-quote.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   textQuoteSelectorMatcher: () => (/* binding */ textQuoteSelectorMatcher)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/slice */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/array/from */ \"./node_modules/@babel/runtime-corejs3/core-js/array/from.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/symbol */ \"./node_modules/@babel/runtime-corejs3/core-js/symbol.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator-method */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator-method.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ \"./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_awaitAsyncGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"./node_modules/@babel/runtime-corejs3/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_starts_with__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/starts-with */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/starts-with.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/filter */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/filter.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _babel_runtime_corejs3_core_js_symbol__WEBPACK_IMPORTED_MODULE_2__ === \"undefined\" || _babel_runtime_corejs3_core_js_get_iterator_method__WEBPACK_IMPORTED_MODULE_3__(o) == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { var _context2; if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_0__(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return _babel_runtime_corejs3_core_js_array_from__WEBPACK_IMPORTED_MODULE_1__(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/**\n * Find occurrences in a text matching the given {@link TextQuoteSelector}.\n *\n * This performs an exact search the selector’s quote (including prefix and\n * suffix) within the given text.\n *\n * Note the match is based on strict character-by-character equivalence, i.e.\n * it is sensitive to whitespace, capitalisation, etc.\n *\n * This is an abstract implementation of the function’s logic, which expects a\n * generic {@link Chunker} to represent the text, and returns an (async)\n * generator of {@link ChunkRange}s to represent the matches.\n *\n * See {@link dom.createTextQuoteSelectorMatcher} for a\n * wrapper around this implementation which applies it to the text of an HTML\n * DOM.\n *\n * The function is curried, taking first the selector and then the text.\n *\n * As there may be multiple matches for a given selector (when its prefix and\n * suffix attributes are not sufficient to disambiguate it), the matcher will\n * return an (async) generator that produces each match in the order they are\n * found in the text.\n *\n * *XXX Modifying the Chunks while the search is still running can mess up and\n * result in an error or an infinite loop. See [issue #112](https://github.com/apache/incubator-annotator/issues/112).*\n *\n * @example\n * ```\n * const selector = { type: 'TextQuoteSelector', exact: 'banana' };\n * const matches = textQuoteSelectorMatcher(selector)(textChunks);\n * for await (match of matches) console.log(match);\n * // ⇒ { startChunk: { … }, startIndex: 187, endChunk: { … }, endIndex: 193 }\n * // ⇒ { startChunk: { … }, startIndex: 631, endChunk: { … }, endIndex: 637 }\n * ```\n *\n * @param selector - The {@link TextQuoteSelector} to be anchored\n * @returns a {@link Matcher} function that applies `selector` to a given text\n *\n * @public\n */\nfunction textQuoteSelectorMatcher(selector) {\n  return /*#__PURE__*/function () {\n    var _matchAll = (0,_babel_runtime_corejs3_helpers_esm_wrapAsyncGenerator__WEBPACK_IMPORTED_MODULE_6__[\"default\"])( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_7__.mark(function _callee(textChunks) {\n      var exact, prefix, suffix, searchPattern, partialMatches, isFirstChunk, chunk, chunkValue, remainingPartialMatches, _iterator, _step, partialMatch, charactersMatched, charactersUntilMatchEnd, charactersUntilMatchStart, charactersUntilSuffixEnd, fromIndex, patternStartIndex, newPartialMatches, searchStartPoint, _loop, i, _iterator2, _step2, partialMatchStartIndex, _charactersMatched, _partialMatch;\n\n      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_7__.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              exact = selector.exact;\n              prefix = selector.prefix || '';\n              suffix = selector.suffix || '';\n              searchPattern = prefix + exact + suffix; // The code below essentially just performs string.indexOf(searchPattern),\n              // but on a string that is chopped up in multiple chunks. It runs a loop\n              // containing three steps:\n              // 1. Continue checking any partial matches from the previous chunk(s).\n              // 2. Try find the whole pattern in the chunk (possibly multiple times).\n              // 3. Check if this chunk ends with a partial match (or even multiple partial matches).\n\n              partialMatches = [];\n              isFirstChunk = true;\n\n            case 6:\n              chunk = textChunks.currentChunk;\n              chunkValue = chunk.data; // 1. Continue checking any partial matches from the previous chunk(s).\n\n              remainingPartialMatches = [];\n              _iterator = _createForOfIteratorHelper(partialMatches);\n              _context.prev = 10;\n\n              _iterator.s();\n\n            case 12:\n              if ((_step = _iterator.n()).done) {\n                _context.next = 27;\n                break;\n              }\n\n              partialMatch = _step.value;\n              charactersMatched = partialMatch.charactersMatched; // If the current chunk contains the start and/or end of the match, record these.\n\n              if (partialMatch.endChunk === undefined) {\n                charactersUntilMatchEnd = prefix.length + exact.length - charactersMatched;\n\n                if (charactersUntilMatchEnd <= chunkValue.length) {\n                  partialMatch.endChunk = chunk;\n                  partialMatch.endIndex = charactersUntilMatchEnd;\n                }\n              }\n\n              if (partialMatch.startChunk === undefined) {\n                charactersUntilMatchStart = prefix.length - charactersMatched;\n\n                if (charactersUntilMatchStart < chunkValue.length || partialMatch.endChunk !== undefined // handles an edge case: an empty quote at the end of a chunk.\n                ) {\n                    partialMatch.startChunk = chunk;\n                    partialMatch.startIndex = charactersUntilMatchStart;\n                  }\n              }\n\n              charactersUntilSuffixEnd = searchPattern.length - charactersMatched;\n\n              if (!(charactersUntilSuffixEnd <= chunkValue.length)) {\n                _context.next = 24;\n                break;\n              }\n\n              if (!_babel_runtime_corejs3_core_js_instance_starts_with__WEBPACK_IMPORTED_MODULE_8__(chunkValue).call(chunkValue, searchPattern.substring(charactersMatched))) {\n                _context.next = 22;\n                break;\n              }\n\n              _context.next = 22;\n              return partialMatch;\n\n            case 22:\n              _context.next = 25;\n              break;\n\n            case 24:\n              if (chunkValue === searchPattern.substring(charactersMatched, charactersMatched + chunkValue.length)) {\n                // The chunk is too short to complete the match; comparison has to be completed in subsequent chunks.\n                partialMatch.charactersMatched += chunkValue.length;\n                remainingPartialMatches.push(partialMatch);\n              }\n\n            case 25:\n              _context.next = 12;\n              break;\n\n            case 27:\n              _context.next = 32;\n              break;\n\n            case 29:\n              _context.prev = 29;\n              _context.t0 = _context[\"catch\"](10);\n\n              _iterator.e(_context.t0);\n\n            case 32:\n              _context.prev = 32;\n\n              _iterator.f();\n\n              return _context.finish(32);\n\n            case 35:\n              partialMatches = remainingPartialMatches; // 2. Try find the whole pattern in the chunk (possibly multiple times).\n\n              if (!(searchPattern.length <= chunkValue.length)) {\n                _context.next = 49;\n                break;\n              }\n\n              fromIndex = 0;\n\n            case 38:\n              if (!(fromIndex <= chunkValue.length)) {\n                _context.next = 49;\n                break;\n              }\n\n              patternStartIndex = chunkValue.indexOf(searchPattern, fromIndex);\n\n              if (!(patternStartIndex === -1)) {\n                _context.next = 42;\n                break;\n              }\n\n              return _context.abrupt(\"break\", 49);\n\n            case 42:\n              fromIndex = patternStartIndex + 1; // Handle edge case: an empty searchPattern would already have been yielded at the end of the last chunk.\n\n              if (!(patternStartIndex === 0 && searchPattern.length === 0 && !isFirstChunk)) {\n                _context.next = 45;\n                break;\n              }\n\n              return _context.abrupt(\"continue\", 38);\n\n            case 45:\n              _context.next = 47;\n              return {\n                startChunk: chunk,\n                startIndex: patternStartIndex + prefix.length,\n                endChunk: chunk,\n                endIndex: patternStartIndex + prefix.length + exact.length\n              };\n\n            case 47:\n              _context.next = 38;\n              break;\n\n            case 49:\n              // 3. Check if this chunk ends with a partial match (or even multiple partial matches).\n              newPartialMatches = [];\n              searchStartPoint = Math.max(chunkValue.length - searchPattern.length + 1, 0);\n\n              _loop = function _loop(i) {\n                var character = chunkValue[i];\n                newPartialMatches = _babel_runtime_corejs3_core_js_instance_filter__WEBPACK_IMPORTED_MODULE_9__(newPartialMatches).call(newPartialMatches, function (partialMatchStartIndex) {\n                  return character === searchPattern[i - partialMatchStartIndex];\n                });\n                if (character === searchPattern[0]) newPartialMatches.push(i);\n              };\n\n              for (i = searchStartPoint; i < chunkValue.length; i++) {\n                _loop(i);\n              }\n\n              _iterator2 = _createForOfIteratorHelper(newPartialMatches);\n\n              try {\n                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                  partialMatchStartIndex = _step2.value;\n                  _charactersMatched = chunkValue.length - partialMatchStartIndex;\n                  _partialMatch = {\n                    charactersMatched: _charactersMatched\n                  };\n\n                  if (_charactersMatched >= prefix.length + exact.length) {\n                    _partialMatch.endChunk = chunk;\n                    _partialMatch.endIndex = partialMatchStartIndex + prefix.length + exact.length;\n                  }\n\n                  if (_charactersMatched > prefix.length || _partialMatch.endChunk !== undefined // handles an edge case: an empty quote at the end of a chunk.\n                  ) {\n                      _partialMatch.startChunk = chunk;\n                      _partialMatch.startIndex = partialMatchStartIndex + prefix.length;\n                    }\n\n                  partialMatches.push(_partialMatch);\n                }\n              } catch (err) {\n                _iterator2.e(err);\n              } finally {\n                _iterator2.f();\n              }\n\n              isFirstChunk = false;\n\n            case 56:\n              if (textChunks.nextChunk() !== null) {\n                _context.next = 6;\n                break;\n              }\n\n            case 57:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[10, 29, 32, 35]]);\n    }));\n\n    function matchAll(_x) {\n      return _matchAll.apply(this, arguments);\n    }\n\n    return matchAll;\n  }();\n}\n//# sourceMappingURL=match-text-quote.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/match-text-quote.js?");

/***/ }),

/***/ "./node_modules/@apache-annotator/selector/lib/text/seeker.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apache-annotator/selector/lib/text/seeker.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TextSeeker: () => (/* binding */ TextSeeker)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/createClass */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/slice */ \"./node_modules/@babel/runtime-corejs3/core-js/instance/slice.js\");\n/* harmony import */ var _chunker_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunker.js */ \"./node_modules/@apache-annotator/selector/lib/text/chunker.js\");\n/**\n * SPDX-FileCopyrightText: 2016-2021 The Apache Software Foundation\n * SPDX-License-Identifier: Apache-2.0\n * @license\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\nvar E_END = 'Iterator exhausted before seek ended.';\n/**\n * Abstraction to seek (jump) or read to a position inside a ‘file’ consisting of a\n * sequence of data chunks.\n *\n * This interface is a combination of three interfaces in one: for seeking to a\n * relative position, an absolute position, or a specific chunk. These three are\n * defined separately for clarity and flexibility, but normally used together.\n *\n * A Seeker internally maintains a pointer to the chunk it is currently ‘in’ and\n * the offset position within that chunk.\n *\n * @typeParam TChunk - Type of chunks the file consists of.\n * @typeParam TData - Type of data this seeker’s read methods will return (not\n * necessarily the same as the `TData` parameter of {@link Chunk}, see e.g.\n * {@link CodePointSeeker})\n *\n * @public\n */\n\n/**\n * A TextSeeker is constructed around a {@link Chunker}, to let it be treated as\n * a continuous sequence of characters.\n *\n * Seeking to a given numeric position will cause a `TextSeeker` to pull chunks\n * from the underlying `Chunker`, counting their lengths until the requested\n * position is reached. `Chunks` are not stored but simply read again when\n * seeking backwards.\n *\n * The `Chunker` is presumed to read an unchanging file. If a chunk’s length\n * would change while seeking, a TextSeeker’s absolute positioning would be\n * incorrect.\n *\n * See {@link CodePointSeeker} for a {@link Seeker} that counts Unicode *code\n * points* instead of Javascript’s ‘normal’ characters.\n *\n * @public\n */\nvar TextSeeker = /*#__PURE__*/function () {\n  function TextSeeker(chunker) {\n    (0,_babel_runtime_corejs3_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, TextSeeker);\n\n    this.chunker = chunker;\n\n    (0,_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, \"currentChunkPosition\", 0);\n\n    (0,_babel_runtime_corejs3_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, \"offsetInChunk\", 0);\n\n    // Walk to the start of the first non-empty chunk inside the scope.\n    this.seekTo(0);\n  }\n\n  (0,_babel_runtime_corejs3_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(TextSeeker, [{\n    key: \"currentChunk\",\n    get: // The chunk containing our current text position.\n    function get() {\n      return this.chunker.currentChunk;\n    } // The index of the first character of the current chunk inside the text.\n\n  }, {\n    key: \"position\",\n    get: // The current text position (measured in code units)\n    function get() {\n      return this.currentChunkPosition + this.offsetInChunk;\n    }\n  }, {\n    key: \"read\",\n    value: function read(length) {\n      var roundUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n      var lessIsFine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      return this._readOrSeekTo(true, this.position + length, roundUp, lessIsFine);\n    }\n  }, {\n    key: \"readTo\",\n    value: function readTo(target) {\n      var roundUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n      return this._readOrSeekTo(true, target, roundUp);\n    }\n  }, {\n    key: \"seekBy\",\n    value: function seekBy(length) {\n      this.seekTo(this.position + length);\n    }\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(target) {\n      this._readOrSeekTo(false, target);\n    }\n  }, {\n    key: \"seekToChunk\",\n    value: function seekToChunk(target) {\n      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n      this._readOrSeekToChunk(false, target, offset);\n    }\n  }, {\n    key: \"readToChunk\",\n    value: function readToChunk(target) {\n      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      return this._readOrSeekToChunk(true, target, offset);\n    }\n  }, {\n    key: \"_readOrSeekToChunk\",\n    value: function _readOrSeekToChunk(read, target) {\n      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      var oldPosition = this.position;\n      var result = ''; // Walk to the requested chunk.\n\n      if (!this.chunker.precedesCurrentChunk(target)) {\n        // Search forwards.\n        while (!(0,_chunker_js__WEBPACK_IMPORTED_MODULE_5__.chunkEquals)(this.currentChunk, target)) {\n          var _this$_readToNextChun = this._readToNextChunk(),\n              _this$_readToNextChun2 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_this$_readToNextChun, 2),\n              data = _this$_readToNextChun2[0],\n              nextChunk = _this$_readToNextChun2[1];\n\n          if (read) result += data;\n          if (nextChunk === null) throw new RangeError(E_END);\n        }\n      } else {\n        // Search backwards.\n        while (!(0,_chunker_js__WEBPACK_IMPORTED_MODULE_5__.chunkEquals)(this.currentChunk, target)) {\n          var _this$_readToPrevious = this._readToPreviousChunk(),\n              _this$_readToPrevious2 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_this$_readToPrevious, 2),\n              _data = _this$_readToPrevious2[0],\n              previousChunk = _this$_readToPrevious2[1];\n\n          if (read) result = _data + result;\n          if (previousChunk === null) throw new RangeError(E_END);\n        }\n      } // Now we know where the chunk is, walk to the requested offset.\n      // Note we might have started inside the chunk, and the offset could even\n      // point at a position before or after the chunk.\n\n\n      var targetPosition = this.currentChunkPosition + offset;\n\n      if (!read) {\n        this.seekTo(targetPosition);\n      } else {\n        if (targetPosition >= this.position) {\n          // Read further until the target.\n          result += this.readTo(targetPosition);\n        } else if (targetPosition >= oldPosition) {\n          // We passed by our target position: step back.\n          this.seekTo(targetPosition);\n          result = _babel_runtime_corejs3_core_js_instance_slice__WEBPACK_IMPORTED_MODULE_4__(result).call(result, 0, targetPosition - oldPosition);\n        } else {\n          // The target precedes our starting position: read backwards from there.\n          this.seekTo(oldPosition);\n          result = this.readTo(targetPosition);\n        }\n\n        return result;\n      }\n    }\n  }, {\n    key: \"_readOrSeekTo\",\n    value: function _readOrSeekTo(read, target) {\n      var roundUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      var lessIsFine = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n      var result = '';\n\n      if (this.position <= target) {\n        while (true) {\n          var endOfChunk = this.currentChunkPosition + this.currentChunk.data.length;\n\n          if (endOfChunk <= target) {\n            // The target is beyond the current chunk.\n            // (we use ≤ not <: if the target is *at* the end of the chunk, possibly\n            // because the current chunk is empty, we prefer to take the next chunk)\n            var _this$_readToNextChun3 = this._readToNextChunk(),\n                _this$_readToNextChun4 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_this$_readToNextChun3, 2),\n                data = _this$_readToNextChun4[0],\n                nextChunk = _this$_readToNextChun4[1];\n\n            if (read) result += data;\n\n            if (nextChunk === null) {\n              if (this.position === target || lessIsFine) break;else throw new RangeError(E_END);\n            }\n          } else {\n            // The target is within the current chunk.\n            var newOffset = roundUp ? this.currentChunk.data.length : target - this.currentChunkPosition;\n            if (read) result += this.currentChunk.data.substring(this.offsetInChunk, newOffset);\n            this.offsetInChunk = newOffset; // If we finish end at the end of the chunk, seek to the start of the next non-empty node.\n            // (TODO decide: should we keep this guarantee of not finishing at the end of a chunk?)\n\n            if (roundUp) this.seekBy(0);\n            break;\n          }\n        }\n      } else {\n        // Similar to the if-block, but moving backward in the text.\n        while (this.position > target) {\n          if (this.currentChunkPosition <= target) {\n            // The target is within the current chunk.\n            var _newOffset = roundUp ? 0 : target - this.currentChunkPosition;\n\n            if (read) result = this.currentChunk.data.substring(_newOffset, this.offsetInChunk) + result;\n            this.offsetInChunk = _newOffset;\n            break;\n          } else {\n            var _this$_readToPrevious3 = this._readToPreviousChunk(),\n                _this$_readToPrevious4 = (0,_babel_runtime_corejs3_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_this$_readToPrevious3, 2),\n                _data2 = _this$_readToPrevious4[0],\n                previousChunk = _this$_readToPrevious4[1];\n\n            if (read) result = _data2 + result;\n\n            if (previousChunk === null) {\n              if (lessIsFine) break;else throw new RangeError(E_END);\n            }\n          }\n        }\n      }\n\n      if (read) return result;\n    } // Read to the start of the next chunk, if any; otherwise to the end of the current chunk.\n\n  }, {\n    key: \"_readToNextChunk\",\n    value: function _readToNextChunk() {\n      var data = this.currentChunk.data.substring(this.offsetInChunk);\n      var chunkLength = this.currentChunk.data.length;\n      var nextChunk = this.chunker.nextChunk();\n\n      if (nextChunk !== null) {\n        this.currentChunkPosition += chunkLength;\n        this.offsetInChunk = 0;\n      } else {\n        this.offsetInChunk = chunkLength;\n      }\n\n      return [data, nextChunk];\n    } // Read backwards to the end of the previous chunk, if any; otherwise to the start of the current chunk.\n\n  }, {\n    key: \"_readToPreviousChunk\",\n    value: function _readToPreviousChunk() {\n      var data = this.currentChunk.data.substring(0, this.offsetInChunk);\n      var previousChunk = this.chunker.previousChunk();\n\n      if (previousChunk !== null) {\n        this.currentChunkPosition -= this.currentChunk.data.length;\n        this.offsetInChunk = this.currentChunk.data.length;\n      } else {\n        this.offsetInChunk = 0;\n      }\n\n      return [data, previousChunk];\n    }\n  }]);\n\n  return TextSeeker;\n}();\n//# sourceMappingURL=seeker.js.map\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@apache-annotator/selector/lib/text/seeker.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/AsyncGenerator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/AsyncGenerator.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AsyncGenerator)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/promise/index.js */ \"./node_modules/core-js-pure/full/promise/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_async_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js-pure/features/symbol/async-iterator.js */ \"./node_modules/core-js-pure/full/symbol/async-iterator.js\");\n/* harmony import */ var _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverloadYield.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js\");\n\n\n\n\nfunction AsyncGenerator(e) {\n  var r, t;\n  function resume(r, t) {\n    try {\n      var n = e[r](t),\n        o = n.value,\n        u = o instanceof _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n      core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_1__.resolve(u ? o.v : o).then(function (t) {\n        if (u) {\n          var i = \"return\" === r ? \"return\" : \"next\";\n          if (!o.k || t.done) return resume(i, t);\n          t = e[i](t).value;\n        }\n        settle(n.done ? \"return\" : \"normal\", t);\n      }, function (e) {\n        resume(\"throw\", e);\n      });\n    } catch (e) {\n      settle(\"throw\", e);\n    }\n  }\n  function settle(e, n) {\n    switch (e) {\n      case \"return\":\n        r.resolve({\n          value: n,\n          done: !0\n        });\n        break;\n      case \"throw\":\n        r.reject(n);\n        break;\n      default:\n        r.resolve({\n          value: n,\n          done: !1\n        });\n    }\n    (r = r.next) ? resume(r.key, r.arg) : t = null;\n  }\n  this._invoke = function (e, n) {\n    return new core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_1__(function (o, u) {\n      var i = {\n        key: e,\n        arg: n,\n        resolve: o,\n        reject: u,\n        next: null\n      };\n      t ? t = t.next = i : (r = t = i, resume(e, n));\n    });\n  }, \"function\" != typeof e[\"return\"] && (this[\"return\"] = void 0);\n}\nAsyncGenerator.prototype[\"function\" == typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_2__ && core_js_pure_features_symbol_async_iterator_js__WEBPACK_IMPORTED_MODULE_3__ || \"@@asyncIterator\"] = function () {\n  return this;\n}, AsyncGenerator.prototype.next = function (e) {\n  return this._invoke(\"next\", e);\n}, AsyncGenerator.prototype[\"throw\"] = function (e) {\n  return this._invoke(\"throw\", e);\n}, AsyncGenerator.prototype[\"return\"] = function (e) {\n  return this._invoke(\"return\", e);\n};\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/AsyncGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _OverloadYield)\n/* harmony export */ });\nfunction _OverloadYield(t, e) {\n  this.v = t, this.k = e;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/arrayLikeToArray.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/arrayLikeToArray.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _arrayLikeToArray)\n/* harmony export */ });\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/arrayLikeToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithHoles.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithHoles.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _arrayWithHoles)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_array_is_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/array/is-array.js */ \"./node_modules/core-js-pure/full/array/is-array.js\");\n\nfunction _arrayWithHoles(arr) {\n  if (core_js_pure_features_array_is_array_js__WEBPACK_IMPORTED_MODULE_0__(arr)) return arr;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithoutHoles.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithoutHoles.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _arrayWithoutHoles)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_array_is_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/array/is-array.js */ \"./node_modules/core-js-pure/full/array/is-array.js\");\n/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/arrayLikeToArray.js\");\n\n\nfunction _arrayWithoutHoles(arr) {\n  if (core_js_pure_features_array_is_array_js__WEBPACK_IMPORTED_MODULE_1__(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arr);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithoutHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/assertThisInitialized.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/assertThisInitialized.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _assertThisInitialized)\n/* harmony export */ });\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n  return self;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _asyncGeneratorDelegate)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/promise/index.js */ \"./node_modules/core-js-pure/full/promise/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js-pure/features/symbol/iterator.js */ \"./node_modules/core-js-pure/full/symbol/iterator.js\");\n/* harmony import */ var _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverloadYield.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js\");\n\n\n\n\nfunction _asyncGeneratorDelegate(t) {\n  var e = {},\n    n = !1;\n  function pump(e, r) {\n    return n = !0, r = new core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_1__(function (n) {\n      n(t[e](r));\n    }), {\n      done: !1,\n      value: new _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](r, 1)\n    };\n  }\n  return e[\"undefined\" != typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_2__ && core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ || \"@@iterator\"] = function () {\n    return this;\n  }, e.next = function (t) {\n    return n ? (n = !1, t) : pump(\"next\", t);\n  }, \"function\" == typeof t[\"throw\"] && (e[\"throw\"] = function (t) {\n    if (n) throw n = !1, t;\n    return pump(\"throw\", t);\n  }), \"function\" == typeof t[\"return\"] && (e[\"return\"] = function (t) {\n    return n ? (n = !1, t) : pump(\"return\", t);\n  }), e;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/asyncGeneratorDelegate.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _asyncIterator)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_async_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/symbol/async-iterator.js */ \"./node_modules/core-js-pure/full/symbol/async-iterator.js\");\n/* harmony import */ var core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/symbol/iterator.js */ \"./node_modules/core-js-pure/full/symbol/iterator.js\");\n/* harmony import */ var core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js-pure/features/promise/index.js */ \"./node_modules/core-js-pure/full/promise/index.js\");\n\n\n\n\nfunction _asyncIterator(r) {\n  var n,\n    t,\n    o,\n    e = 2;\n  for (\"undefined\" != typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ && (t = core_js_pure_features_symbol_async_iterator_js__WEBPACK_IMPORTED_MODULE_1__, o = core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__); e--;) {\n    if (t && null != (n = r[t])) return n.call(r);\n    if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));\n    t = \"@@asyncIterator\", o = \"@@iterator\";\n  }\n  throw new TypeError(\"Object is not async iterable\");\n}\nfunction AsyncFromSyncIterator(r) {\n  function AsyncFromSyncIteratorContinuation(r) {\n    if (Object(r) !== r) return core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_3__.reject(new TypeError(r + \" is not an object.\"));\n    var n = r.done;\n    return core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_3__.resolve(r.value).then(function (r) {\n      return {\n        value: r,\n        done: n\n      };\n    });\n  }\n  return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) {\n    this.s = r, this.n = r.next;\n  }, AsyncFromSyncIterator.prototype = {\n    s: null,\n    n: null,\n    next: function next() {\n      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));\n    },\n    \"return\": function _return(r) {\n      var n = this.s[\"return\"];\n      return void 0 === n ? core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_3__.resolve({\n        value: r,\n        done: !0\n      }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));\n    },\n    \"throw\": function _throw(r) {\n      var n = this.s[\"return\"];\n      return void 0 === n ? core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_3__.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));\n    }\n  }, new AsyncFromSyncIterator(r);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/asyncIterator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _asyncToGenerator)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/promise/index.js */ \"./node_modules/core-js-pure/full/promise/index.js\");\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n  if (info.done) {\n    resolve(value);\n  } else {\n    core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_0__.resolve(value).then(_next, _throw);\n  }\n}\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n      args = arguments;\n    return new core_js_pure_features_promise_index_js__WEBPACK_IMPORTED_MODULE_0__(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n      _next(undefined);\n    });\n  };\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/asyncToGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _awaitAsyncGenerator)\n/* harmony export */ });\n/* harmony import */ var _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverloadYield.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/OverloadYield.js\");\n\nfunction _awaitAsyncGenerator(e) {\n  return new _OverloadYield_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](e, 0);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/awaitAsyncGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _classCallCheck)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/construct.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/construct.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _construct)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/reflect/construct.js */ \"./node_modules/core-js-pure/full/reflect/construct.js\");\n/* harmony import */ var core_js_pure_features_instance_push_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js-pure/features/instance/push.js */ \"./node_modules/core-js-pure/full/instance/push.js\");\n/* harmony import */ var core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js-pure/features/instance/bind.js */ \"./node_modules/core-js-pure/full/instance/bind.js\");\n/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js\");\n/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeReflectConstruct.js\");\n\n\n\n\n\nfunction _construct(t, e, r) {\n  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()) return core_js_pure_features_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__.apply(null, arguments);\n  var o = [null];\n  core_js_pure_features_instance_push_js__WEBPACK_IMPORTED_MODULE_3__(o).apply(o, e);\n  var p = new (core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_4__(t).apply(t, o))();\n  return r && (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(p, r.prototype), p;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/construct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _createClass)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/object/define-property.js */ \"./node_modules/core-js-pure/full/object/define-property.js\");\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/toPropertyKey.js\");\n\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_1__(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(descriptor.key), descriptor);\n  }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_1__(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _defineProperty)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/object/define-property.js */ \"./node_modules/core-js-pure/full/object/define-property.js\");\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/toPropertyKey.js\");\n\n\nfunction _defineProperty(obj, key, value) {\n  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(key);\n  if (key in obj) {\n    core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_1__(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n  return obj;\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/getPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/getPrototypeOf.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _getPrototypeOf)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/object/set-prototype-of.js */ \"./node_modules/core-js-pure/full/object/set-prototype-of.js\");\n/* harmony import */ var core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/instance/bind.js */ \"./node_modules/core-js-pure/full/instance/bind.js\");\n/* harmony import */ var core_js_pure_features_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/object/get-prototype-of.js */ \"./node_modules/core-js-pure/full/object/get-prototype-of.js\");\n\n\n\nfunction _getPrototypeOf(o) {\n  var _context;\n  _getPrototypeOf = core_js_pure_features_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ ? core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_1__(_context = core_js_pure_features_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__).call(_context) : function _getPrototypeOf(o) {\n    return o.__proto__ || core_js_pure_features_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__(o);\n  };\n  return _getPrototypeOf(o);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/inherits.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _inherits)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_object_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/object/create.js */ \"./node_modules/core-js-pure/full/object/create.js\");\n/* harmony import */ var core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/object/define-property.js */ \"./node_modules/core-js-pure/full/object/define-property.js\");\n/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js\");\n\n\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n  subClass.prototype = core_js_pure_features_object_create_js__WEBPACK_IMPORTED_MODULE_1__(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  core_js_pure_features_object_define_property_js__WEBPACK_IMPORTED_MODULE_2__(subClass, \"prototype\", {\n    writable: false\n  });\n  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(subClass, superClass);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeFunction.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeFunction.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _isNativeFunction)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_instance_index_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/instance/index-of.js */ \"./node_modules/core-js-pure/full/instance/index-of.js\");\n\nfunction _isNativeFunction(fn) {\n  try {\n    var _context;\n    return core_js_pure_features_instance_index_of_js__WEBPACK_IMPORTED_MODULE_0__(_context = Function.toString.call(fn)).call(_context, \"[native code]\") !== -1;\n  } catch (e) {\n    return typeof fn === \"function\";\n  }\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeFunction.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeReflectConstruct.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeReflectConstruct.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _isNativeReflectConstruct)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_reflect_construct_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/reflect/construct.js */ \"./node_modules/core-js-pure/full/reflect/construct.js\");\n\nfunction _isNativeReflectConstruct() {\n  try {\n    var t = !Boolean.prototype.valueOf.call(core_js_pure_features_reflect_construct_js__WEBPACK_IMPORTED_MODULE_0__(Boolean, [], function () {}));\n  } catch (t) {}\n  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {\n    return !!t;\n  })();\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeReflectConstruct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArray.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArray.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _iterableToArray)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_get_iterator_method_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/get-iterator-method.js */ \"./node_modules/core-js-pure/full/get-iterator-method.js\");\n/* harmony import */ var core_js_pure_features_array_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/array/from.js */ \"./node_modules/core-js-pure/full/array/from.js\");\n\n\n\nfunction _iterableToArray(iter) {\n  if (typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ !== \"undefined\" && core_js_pure_features_get_iterator_method_js__WEBPACK_IMPORTED_MODULE_1__(iter) != null || iter[\"@@iterator\"] != null) return core_js_pure_features_array_from_js__WEBPACK_IMPORTED_MODULE_2__(iter);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArrayLimit.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArrayLimit.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _iterableToArrayLimit)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_get_iterator_method_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/get-iterator-method.js */ \"./node_modules/core-js-pure/full/get-iterator-method.js\");\n/* harmony import */ var core_js_pure_features_instance_push_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/instance/push.js */ \"./node_modules/core-js-pure/full/instance/push.js\");\n\n\n\nfunction _iterableToArrayLimit(r, l) {\n  var t = null == r ? null : \"undefined\" != typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ && core_js_pure_features_get_iterator_method_js__WEBPACK_IMPORTED_MODULE_1__(r) || r[\"@@iterator\"];\n  if (null != t) {\n    var e,\n      n,\n      i,\n      u,\n      a = [],\n      f = !0,\n      o = !1;\n    try {\n      if (i = (t = t.call(r)).next, 0 === l) {\n        if (Object(t) !== t) return;\n        f = !1;\n      } else for (; !(f = (e = i.call(t)).done) && (core_js_pure_features_instance_push_js__WEBPACK_IMPORTED_MODULE_2__(a).call(a, e.value), a.length !== l); f = !0);\n    } catch (r) {\n      o = !0, n = r;\n    } finally {\n      try {\n        if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return;\n      } finally {\n        if (o) throw n;\n      }\n    }\n    return a;\n  }\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableRest.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableRest.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _nonIterableRest)\n/* harmony export */ });\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableSpread.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableSpread.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _nonIterableSpread)\n/* harmony export */ });\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableSpread.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _possibleConstructorReturn)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js\");\n/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/assertThisInitialized.js\");\n\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  } else if (call !== void 0) {\n    throw new TypeError(\"Derived constructors may only return object or undefined\");\n  }\n  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _setPrototypeOf)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/object/set-prototype-of.js */ \"./node_modules/core-js-pure/full/object/set-prototype-of.js\");\n/* harmony import */ var core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/instance/bind.js */ \"./node_modules/core-js-pure/full/instance/bind.js\");\n\n\nfunction _setPrototypeOf(o, p) {\n  var _context;\n  _setPrototypeOf = core_js_pure_features_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ ? core_js_pure_features_instance_bind_js__WEBPACK_IMPORTED_MODULE_1__(_context = core_js_pure_features_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__).call(_context) : function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n  return _setPrototypeOf(o, p);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _slicedToArray)\n/* harmony export */ });\n/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithHoles.js\");\n/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArrayLimit.js\");\n/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/unsupportedIterableToArray.js\");\n/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableRest.js\");\n\n\n\n\nfunction _slicedToArray(arr, i) {\n  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/slicedToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _toConsumableArray)\n/* harmony export */ });\n/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/arrayWithoutHoles.js\");\n/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/iterableToArray.js\");\n/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/unsupportedIterableToArray.js\");\n/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/nonIterableSpread.js\");\n\n\n\n\nfunction _toConsumableArray(arr) {\n  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/toPrimitive.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/toPrimitive.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPrimitive)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js\");\n/* harmony import */ var core_js_pure_features_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/symbol/to-primitive.js */ \"./node_modules/core-js-pure/full/symbol/to-primitive.js\");\n\n\nfunction toPrimitive(t, r) {\n  if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(t) || !t) return t;\n  var e = t[core_js_pure_features_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_1__];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/toPrimitive.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/toPropertyKey.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/toPropertyKey.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPropertyKey)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js\");\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/toPrimitive.js\");\n\n\nfunction toPropertyKey(t) {\n  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(t, \"string\");\n  return \"symbol\" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i) ? i : i + \"\";\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/toPropertyKey.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _typeof)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js-pure/features/symbol/index.js */ \"./node_modules/core-js-pure/full/symbol/index.js\");\n/* harmony import */ var core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/symbol/iterator.js */ \"./node_modules/core-js-pure/full/symbol/iterator.js\");\n\n\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ && \"symbol\" == typeof core_js_pure_features_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_1__ ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ && o.constructor === core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__ && o !== core_js_pure_features_symbol_index_js__WEBPACK_IMPORTED_MODULE_0__.prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/unsupportedIterableToArray.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/unsupportedIterableToArray.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _unsupportedIterableToArray)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_instance_slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js-pure/features/instance/slice.js */ \"./node_modules/core-js-pure/full/instance/slice.js\");\n/* harmony import */ var core_js_pure_features_array_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js-pure/features/array/from.js */ \"./node_modules/core-js-pure/full/array/from.js\");\n/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/arrayLikeToArray.js\");\n\n\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  var _context;\n  if (!o) return;\n  if (typeof o === \"string\") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(o, minLen);\n  var n = core_js_pure_features_instance_slice_js__WEBPACK_IMPORTED_MODULE_1__(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return core_js_pure_features_array_from_js__WEBPACK_IMPORTED_MODULE_2__(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(o, minLen);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/unsupportedIterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _wrapAsyncGenerator)\n/* harmony export */ });\n/* harmony import */ var _AsyncGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncGenerator.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/AsyncGenerator.js\");\n\nfunction _wrapAsyncGenerator(fn) {\n  return function () {\n    return new _AsyncGenerator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](fn.apply(this, arguments));\n  };\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/wrapAsyncGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/helpers/esm/wrapNativeSuper.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/helpers/esm/wrapNativeSuper.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _wrapNativeSuper)\n/* harmony export */ });\n/* harmony import */ var core_js_pure_features_map_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js-pure/features/map/index.js */ \"./node_modules/core-js-pure/full/map/index.js\");\n/* harmony import */ var core_js_pure_features_object_create_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js-pure/features/object/create.js */ \"./node_modules/core-js-pure/full/object/create.js\");\n/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/setPrototypeOf.js\");\n/* harmony import */ var _isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNativeFunction.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/isNativeFunction.js\");\n/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./construct.js */ \"./node_modules/@babel/runtime-corejs3/helpers/esm/construct.js\");\n\n\n\n\n\n\nfunction _wrapNativeSuper(Class) {\n  var _cache = typeof core_js_pure_features_map_index_js__WEBPACK_IMPORTED_MODULE_4__ === \"function\" ? new core_js_pure_features_map_index_js__WEBPACK_IMPORTED_MODULE_4__() : undefined;\n  _wrapNativeSuper = function _wrapNativeSuper(Class) {\n    if (Class === null || !(0,_isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Class)) return Class;\n    if (typeof Class !== \"function\") {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    if (typeof _cache !== \"undefined\") {\n      if (_cache.has(Class)) return _cache.get(Class);\n      _cache.set(Class, Wrapper);\n    }\n    function Wrapper() {\n      return (0,_construct_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Class, arguments, (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this).constructor);\n    }\n    Wrapper.prototype = core_js_pure_features_object_create_js__WEBPACK_IMPORTED_MODULE_5__(Class.prototype, {\n      constructor: {\n        value: Wrapper,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    return (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Wrapper, Class);\n  };\n  return _wrapNativeSuper(Class);\n}\n\n//# sourceURL=webpack://annotate.lkl/./node_modules/@babel/runtime-corejs3/helpers/esm/wrapNativeSuper.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./annotator.mjs");
/******/ var __webpack_exports__highlightCurrentSelection = __webpack_exports__.highlightCurrentSelection;
/******/ var __webpack_exports__openEditMenu = __webpack_exports__.openEditMenu;
/******/ var __webpack_exports__refreshHighlights = __webpack_exports__.refreshHighlights;
/******/ var __webpack_exports__setup = __webpack_exports__.setup;
/******/ export { __webpack_exports__highlightCurrentSelection as highlightCurrentSelection, __webpack_exports__openEditMenu as openEditMenu, __webpack_exports__refreshHighlights as refreshHighlights, __webpack_exports__setup as setup };
/******/ 
