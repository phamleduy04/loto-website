const router = require('express').Router();
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const generateTable = require('../generateTable');

/* GET home page. */
router.get('/', (req, res, next) => {
  const jsdom = new JSDOM(fs.readFileSync('./public/template.html', 'utf-8'));
  const document = jsdom.window.document;
  const matrix = generateTable();
  for (let i = 0; i < matrix.length; i++) {
    createCointainer(document);
    matrix[i].forEach((el, index) => appendNewCell(document, el, i, index));
  }
  res.status(200).send(document.documentElement.outerHTML);
});

function appendNewCell(document, el, i, index) {
  let container = document.createElement("a");
  if (!el) container.className =  "child-holder blank";
  else container.className = "child-holder";
  container.href = `javascript:changeClass(document.getElementsByClassName("flex-container")[${i}].getElementsByClassName("child-holder")[${index}], ${i}, ${index})`;
  let newP = document.createElement("p");
  newP.className = "child";
  let newContent = document.createTextNode(!el ? '' : el);
  newP.appendChild(newContent);
  container.appendChild(newP);
  document.getElementsByClassName("flex-container")[i].appendChild(container);
}

function createCointainer(document) {
  const container = document.createElement("div");
  container.className = 'flex-container';
  document.body.appendChild(container);
}

module.exports = router;
