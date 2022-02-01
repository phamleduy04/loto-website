const router = require('express').Router();
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const generateTable = require('../generateTable');

/* GET home page. */
router.get('/', (req, res, next) => {
  const jsdom = new JSDOM(fs.readFileSync('./public/template.html', 'utf-8'));
  const document = jsdom.window.document;
  for (let i = 0; i < 9; i++) createCointainer(document);
  const matrix = generateTable();
  for (let i = 0; i < matrix.length; i++) matrix[i].forEach(el => appendNewCell(document, el, i));
  // fs.writeFileSync('test.html', document.documentElement.outerHTML);
  res.status(200).send(document.documentElement.outerHTML);
});

function appendNewCell(document, el, i) {
  let container = document.createElement("a");
  if (!el) container.className =  "child-holder blank";
  else {
    container.className = "child-holder";
    container.href = 'javascript:alert("clicked")';
  }
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
