import data from './data.js';
import screen from './screen.js';
import keyboardBody from './keyboard.js';
import footer from './footer.js';
import { addRows, addRow, makeActive, makeInactive, btns } from './utils.js';

window.onload = addVirtualKeyboard;

function addVirtualKeyboard() {
  document.body.style.cssText = `
    margin: 0 auto;
    padding-top: 3rem;
    box-sizing: border-box;
    width:85%;`;

  document.body.appendChild(screen);
  document.body.appendChild(keyboardBody);
  document.body.appendChild(footer);

  addRows(Object.keys(data).length, keyboardBody, data);

  window.addEventListener('keydown', (e) => {
    if (e.code == 'Tab') e.preventDefault();
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeActive(activeBtn);
  });
  window.addEventListener('keyup', (e) => {
    const activeBtn = btns.find((btn) => e.code == btn.id);
    makeInactive(activeBtn);
  });
}
