/* eslint-disable import/extensions */
import data from './data.js';
import { screenArea, screen } from './screen.js';
import keyboardBody from './keyboard.js';
import footer from './footer.js';
import * as misc from './misc.js';
import * as utils from './utils.js';
import screenTooSmall from './errs.js';

let altPushed = false;
let altGraphIsPushed = false;
let shiftIsPushed = false;
let capsLockIsPushed = false;
let tabPushed = false;
let ctrlIsPushed = false;
let langId = 1;
let btns = [];
let typeIndex = 0;
let currIndent = 0;

window.onresize = () => {
  utils.checkWidth(keyboardBody, screenArea, footer, misc.langChange);
};

function changeLang() {
  altPushed = false;
  shiftIsPushed = false;
  langId = langId === 1 ? 2 : 1;
  misc.langChange.innerHTML = misc.langChange.innerHTML.includes('English')
    ? misc.changeLangDesc('Lithuanian (LT)')
    : misc.changeLangDesc('English (UK)');

  // console.log('langId ' + langId);
  btns = utils.addRows(Object.keys(data).length, keyboardBody, data, langId);
}

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
  misc.langChange.innerHTML = misc.changeLangDesc('English (UK)');
  document.body.appendChild(misc.langChange);
  document.body.appendChild(screenTooSmall);

  btns = utils.addRows(Object.keys(data).length, keyboardBody, data, langId);
}

window.onload = addVirtualKeyboard;

function amendScreenValue(input) {
  screen.value =
    screen.value.slice(0, typeIndex) + input + screen.value.slice(typeIndex);
  screen.selectionStart = typeIndex + 1;
  screen.selectionEnd = typeIndex + 1;
}

function doIndent(direction) {
  currIndent = direction === 'forward' ? currIndent + 20 : currIndent - 20;
  if (currIndent < 1) currIndent = 0;
  screen.style.textIndent = `${currIndent}px`;
}

window.addEventListener('keydown', (e) => {
  screen.focus();
  if (!utils.funcButtons.includes(e.code) && e.key !== 'AltGraph') {
    e.preventDefault();
  } // prevent abc's
  if (e.code === utils.altLeft) altPushed = true;
  if (e.code === utils.altRight) altPushed = true;
  if (e.key === utils.altGraph) altGraphIsPushed = true;
  if (e.key === utils.tab) tabPushed = true;

  if (e.code === utils.shiftKey1 || e.code === utils.shiftKey2) {
    shiftIsPushed = true;
  }
  if (e.code === utils.capsLock) capsLockIsPushed = !capsLockIsPushed;
  if (e.code === utils.ctrlLeft || e.code === utils.ctrlRight) {
    ctrlIsPushed = true;
  }

  const actvBtn = btns.find((btn) => e.code === btn.id);
  utils.makeActive(actvBtn);

  function getUsableAttr(x, y) {
    return actvBtn.getAttribute(x) || actvBtn.getAttribute(y);
  }

  const inputAlt = actvBtn.getAttribute(`data-alt${langId}`) || '';
  const inputAltShift = actvBtn.getAttribute(`data-altshift${langId}`);
  const inputShift = getUsableAttr(`data-shift${langId}`, `data-lang${langId}`);

  if (tabPushed && shiftIsPushed) {
    e.preventDefault();
    doIndent('backward');
  }
  if (tabPushed && !shiftIsPushed) {
    e.preventDefault();
    doIndent('forward');
  }
  if (inputAltShift && altPushed && ctrlIsPushed && shiftIsPushed) {
    amendScreenValue(inputAltShift);
  } else if (inputAltShift && altGraphIsPushed && shiftIsPushed) {
    amendScreenValue(inputAltShift);
  } else if (inputAlt && altPushed && ctrlIsPushed) {
    amendScreenValue(inputAlt);
  } else if (altGraphIsPushed && e.key !== 'AltGraph') {
    amendScreenValue(inputAlt);
  } else if (!capsLockIsPushed) {
    if (document.getElementById('caps')) {
      document.getElementById('CapsLock').removeChild(misc.capsOn);
    }
    if (inputShift) {
      if (shiftIsPushed) {
        amendScreenValue(inputShift.toUpperCase());
      } else if (ctrlIsPushed && e.code === 'KeyA') {
        screen.select();
      } else if (ctrlIsPushed && e.code === 'KeyC') {
        document.getElementById('copy').click();
      } else if (ctrlIsPushed && e.code === 'KeyX') {
        document.getElementById('copy').click();
        screen.value = '';
      } else {
        amendScreenValue(actvBtn.getAttribute(`data-lang${langId}`));
      }
    }
  } else {
    document.getElementById('CapsLock').appendChild(misc.capsOn);
    if (inputShift) {
      if (shiftIsPushed) {
        amendScreenValue(inputShift);
      } else {
        const activeBtnUpper = actvBtn
          .getAttribute(`data-lang${langId}`)
          .toUpperCase();
        amendScreenValue(activeBtnUpper);
      }
    }
  }
  if (e.key === 'AltGraph') document.body.appendChild(misc.altGrInstance);

  typeIndex = screen.selectionStart;
});
window.addEventListener('keyup', (e) => {
  if (!ctrlIsPushed && altPushed && shiftIsPushed) changeLang();
  if (e.code === utils.altLeft) altPushed = false;
  if (e.code === utils.shiftKey1) shiftIsPushed = false;
  if (e.code === utils.tab) tabPushed = false;
  if (e.code === utils.ctrlLeft || e.code === utils.ctrlRight) {
    ctrlIsPushed = false;
  }
  if (e.code === utils.altRight) altPushed = false;
  if (e.key === utils.altGraph) altGraphIsPushed = false;
  const actvBtn = btns.find((btn) => e.code === btn.id);
  utils.makeInactive(actvBtn);
  if (e.key === 'AltGraph') document.body.removeChild(misc.altGrInstance);
  typeIndex = screen.selectionStart;
});

window.addEventListener('click', (e) => {
  if (e.target.id && e.target.id !== 'copy' && e.target.id !== 'screen') {
    const keyboardEv = new KeyboardEvent('keydown', {
      key: ' ',
      code: e.target.id,
    });
    window.dispatchEvent(keyboardEv);
  }
  if (e.target.id === 'Space') amendScreenValue(' ');
  if (e.target.id === 'Enter') amendScreenValue('\n');
  if (e.target.id === 'Backspace') {
    if (document.getSelection().toString() === screen.value) screen.value = ''; // if all is selected with ctrl+a
    const secondPart = screen.value.substring(typeIndex);
    let firstPart = screen.value.slice(0, typeIndex);
    firstPart = firstPart.substring(0, firstPart.length - 1);
    screen.value = firstPart + secondPart;
    if (typeIndex !== 0) screen.setSelectionRange(typeIndex - 1, typeIndex - 1);
  }
  if (e.target.id === 'Delete') {
    let secondPart = screen.value.substring(typeIndex);
    secondPart = secondPart.slice(1);
    const firstPart = screen.value.slice(0, typeIndex);
    screen.value = firstPart + secondPart;
    screen.setSelectionRange(typeIndex, typeIndex);
  }
  typeIndex = screen.selectionStart;

  if (e.target.id === 'ArrowLeft' && typeIndex > 0) typeIndex -= 1;
  if (e.target.id === 'ArrowRight' && typeIndex < screen.value.length) {
    typeIndex += 1;
  }
  screen.setSelectionRange(typeIndex, typeIndex);
  if (e.target.id === 'Tab' && !shiftIsPushed) {
    doIndent('forward');
  }
  if (e.target.id === 'Tab' && shiftIsPushed) {
    doIndent('backward');
  }
  if (e.target.id === 'ArrowUp') {
    const getNewLineIndex = screen.value.lastIndexOf('\n', typeIndex - 1);
    const getUpLineIndex = screen.value.lastIndexOf('\n', getNewLineIndex - 1);
    typeIndex =
      getNewLineIndex > -1 ? typeIndex - getNewLineIndex + getUpLineIndex : 0;
    screen.setSelectionRange(typeIndex, typeIndex);
  }

  if (e.target.id === 'ArrowDown') {
    const getNewLineIndex = screen.value.indexOf('\n', typeIndex);
    const getUpLineIndex = screen.value.lastIndexOf('\n', typeIndex);
    typeIndex =
      getNewLineIndex > -1
        ? typeIndex + getNewLineIndex - getUpLineIndex
        : screen.value.length;
    screen.setSelectionRange(typeIndex, typeIndex);
  }
});

window.addEventListener('blur', () => {
  btns.forEach((btn) => utils.makeInactive(btn));
});
