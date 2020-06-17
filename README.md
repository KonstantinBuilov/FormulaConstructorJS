# FormulaConstructorJS
Small JavaScript library for building formulas. Supports drag'n'drop, import and export formulas in string or JSON.
Contains 4 main parts: main constructor field, control buttons, input field and result field.

This library could be usefull for making formulas in frontend with another types of data blocks, like OLAP requests, SQL requests etc.

Usage:
-append FormulaConstructorJS.js in script section
-create new instance in code like "const formula = new FormulaConstructor(order)"
-order is optional parameter that can contains 'buttons, input, constructor, result' in order that you need.
For example see index.html

FormulaConstructor supports import and export functions:
 -importClearFormula(string) input string may be like "1+2*(5-2)"
 -exportClearFormula returns string like '1+2*(5-2)'
 -importJSONFormula(string) input JSON string should be like
 "[{"type":"number","value":"1"},{"type":"sign","value":"+"},{"type":"brakets","value":[{"type":"number","value":"2"},{"type":"sign","value":"-"},{"type":"number","value":"3"}]}]"
 -exportJSONFormula() returns JSON string like example above
 
 Else there are another few public functions:
 -addNumber(value) create number block
 -addBrakets() create brakets
 -clear() clear constructor
 -destroy() remove constructor and all listeners

Feel free to use it and edit it in your way.
