import data from './data.js';
import screen from './screen.js';
import keyboardBody from './keyboard.js';
import footer from './footer.js';
import {
  addRows,
  addRow,
  makeActive,
  makeInactive,
  btns,
  altGrInstance,
  langChange,
} from './utils.js';

window.onload = addVirtualKeyboard;

function addVirtualKeyboard() {
  document.body.style.cssText = `
    margin: 0 auto;
    padding-top: 3rem;
    position:relative;
    box-sizing: border-box;
    width:75%;`;

  document.body.appendChild(screen);
  document.body.appendChild(keyboardBody);
  document.body.appendChild(footer);
  document.body.appendChild(langChange);

  addRows(Object.keys(data).length, keyboardBody, data);

  window.addEventListener('keydown', (e) => {
    if (e.code == 'Tab' || e.code === 'AltLeft') e.preventDefault();
    console.log(e.key);
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeActive(activeBtn);
    if (e.key == 'AltGraph') document.body.appendChild(altGrInstance);
  });
  window.addEventListener('keyup', (e) => {
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeInactive(activeBtn);
    if (e.key == 'AltGraph') document.body.removeChild(altGrInstance);
  });
}
