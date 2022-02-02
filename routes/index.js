const router = require('express').Router();
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const generateTable = require('../generateTable');

/* GET home page. */
router.get('/', (req, res, next) => {
  const jsdom = new JSDOM(fs.readFileSync('./public/template.html', 'utf-8'));
  const document = jsdom.window.document;
  const matrix = generateTable();
  const randomColor = `hsla(${Math.floor(Math.random() * (360))}, 75%, 58%, 1)`;
  for (let i = 0; i < matrix.length; i++) {
    createContainer(document);
    matrix[i].forEach((el, index) => appendNewCell(document, el, i, index, randomColor));
  }
  res.status(200).send(document.documentElement.outerHTML);
});

function appendNewCell(document, el, i, index, randomColor) {
  let container = document.createElement("a");
  if (!el) {
    container.className =  "child-holder blank";
    container.setAttribute('style', `background-color: ${randomColor}`);
  }
  else container.className = "child-holder";
  container.href = `javascript:changeClass(document.getElementsByClassName("flex-container")[${i}].getElementsByClassName("child-holder")[${index}], ${i}, ${index})`;
  let newP = document.createElement("p");
  newP.className = "child";
  let newContent = document.createTextNode(!el ? '' : el);
  newP.appendChild(newContent);
  container.appendChild(newP);
  document.getElementsByClassName("flex-container")[i].appendChild(container);
}

function createContainer(document) {
  const container = document.createElement("div");
  container.className = 'flex-container';
  document.getElementById("main").appendChild(container);
}

module.exports = router;


