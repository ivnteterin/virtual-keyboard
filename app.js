import data from './data.js';
import {screenArea, screen} from './screen.js';
import keyboardBody from './keyboard.js';
import footer from './footer.js';
import {
  addRows,
  makeActive,
  changeLangDesc,
  makeInactive,
  btns,
  altGrInstance,
  langChange,
  altKey,
  screenTooSmall,
  shiftKey1,
} from './utils.js';

let firstButtonClicked = false;
let secondButtonClicked = false;
let langIndex = 1;

function changeLang() {
  firstButtonClicked = false;
  secondButtonClicked = false;
  langIndex = langIndex === 1 ? 2 : 1;
  langChange.innerHTML = langChange.innerHTML.includes('English')
    ? changeLangDesc('Lithuanian (LT)')
    : changeLangDesc('English (UK)');

  console.log('langIndex ' + langIndex);
  addRows(Object.keys(data).length, keyboardBody, data, langIndex);
}


const checkWidth = () => {
  if (window.innerWidth < 500) {
    document.body.innerHTML = screenTooSmall;
  } else {
    document.body.innerHTML = '';
    addVirtualKeyboard();
  }
};

window.onload = checkWidth;
window.onresize = checkWidth;

function addVirtualKeyboard() {
  document.body.style.cssText = `
    margin: 0 auto;
    padding-top: 3rem;
    position:relative;
    box-sizing: border-box;
    width:70%;`;

  document.body.appendChild(screenArea);
  document.body.appendChild(keyboardBody);
  document.body.appendChild(footer);
  langChange.innerHTML = changeLangDesc('English (UK)');
  document.body.appendChild(langChange);

  addRows(Object.keys(data).length, keyboardBody, data, langIndex);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Tab' || e.code === 'AltLeft') e.preventDefault();
    console.log(e.key);
    if (e.code === altKey) firstButtonClicked = true;
    if (e.code === shiftKey1) secondButtonClicked = true;
    
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeActive(activeBtn);
    const dataAttr = activeBtn.getAttribute(`data-lang${langIndex}`);
    console.log(dataAttr);
    //typing
    if(dataAttr !== "undefined") {screen.value += activeBtn.getAttribute(`data-lang${langIndex}`);}

    if (e.key == 'AltGraph') document.body.appendChild(altGrInstance);
  });
  window.addEventListener('keyup', (e) => {
    if (firstButtonClicked && secondButtonClicked) changeLang();
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeInactive(activeBtn);
    if (e.key == 'AltGraph') document.body.removeChild(altGrInstance);
  });
}
