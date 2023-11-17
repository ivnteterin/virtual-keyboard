/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import screenTooSmall from './errs.js';

export const shiftKey1 = 'ShiftLeft';
export const shiftKey2 = 'ShiftRight';
export const altLeft = 'AltLeft';
export const altGraph = 'AltGraph';
export const altRight = 'AltRight';
export const ctrlLeft = 'ControlLeft';
export const ctrlRight = 'ControlRight';
export const capsLock = 'CapsLock';
export const tab = 'Tab';

export const funcButtons = [
  'Enter',
  'Alt',
  tab,
  'Delete',
  capsLock,
  shiftKey1,
  shiftKey2,
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  altRight,
  altGraph,
  ctrlLeft,
  ctrlRight,
  'MetaLeft',
  'Backspace',
  'Space',
];

export const makeActive = (btn) => {
  if (btn) {
    btn.style.background = 'linear-gradient(45deg, #cfd5ff , #b9f0fa)';
    btn.style.outline = '1px solid black';
    btn.style.color = 'white';
    btn.style.fontSize = '117%';
  }
};

export const makeInactive = (btn) => {
  if (btn) {
    btn.style.background = 'unset';
    btn.style.outline = 'unset';
    btn.style.color = 'black';
    btn.style.fontSize = '100%';
  }
};

export const addRow = (row, parent, buttons, langIndex) => {
  function addBtnStyle(btn) {
    btn.style.cssText = `
    width: 100%;
    aspect-ratio: 1;
    min-width:1.25rem;
    border:1px solid black;
    position:relative;
    border-radius: .3em;
    cursor:pointer;
    user-select: none;
    background:white;
    transition: all .2s;
    display: inline-block;
  `;
    btn.addEventListener('mouseenter', () => {
      btn.style.outline = '1px solid black';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.outline = 'unset';
      makeInactive(btn);
    });
    btn.addEventListener('mousedown', () => {
      makeActive(btn);
    });
    btn.addEventListener('touchstart', () => {
      makeActive(btn);
    });
    btn.addEventListener('touchend', () => {
      makeInactive(btn);
    });
    btn.addEventListener('mouseup', () => {
      makeInactive(btn);
    });
  }
  Object.keys(row).forEach((btnNr) => {
    const btn = document.createElement('div');
    addBtnStyle(btn);

    btn.style.flexBasis = `${100 * row[btnNr].colspan}%`;
    if (row[btnNr].colspan) {
      btn.style.aspectRatio = 'unset';
    }
    btn.id = row[btnNr].key;
    if (row[btnNr].lang1) {
      btn.setAttribute('data-lang1', row[btnNr].lang1);
    }
    if (row[btnNr].lang2) {
      btn.setAttribute('data-lang2', row[btnNr].lang2);
    }
    if (row[btnNr].shift1) {
      btn.setAttribute('data-shift1', row[btnNr].shift1);
    }
    if (row[btnNr].shift2) {
      btn.setAttribute('data-shift2', row[btnNr].shift2);
    }
    if (row[btnNr].altGr1) {
      btn.setAttribute('data-alt1', row[btnNr].altGr1);
    }
    if (row[btnNr].altGr2) {
      btn.setAttribute('data-alt2', row[btnNr].altGr2);
    }
    if (row[btnNr].shiftAltGr2) {
      btn.setAttribute('data-altshift2', row[btnNr].shiftAltGr2);
    }
    const mainSign = document.createElement('div');
    mainSign.innerHTML =
      row[btnNr].main || row[btnNr][`lang${langIndex}`].toUpperCase();
    mainSign.style.cssText = `
      position: absolute;
      top: 60%;
      pointer-events: none;
      left: 50%;
      transform:translate(-50%,-50%);
    `;
    btn.appendChild(mainSign);

    const secondarySign = document.createElement('div');
    secondarySign.innerHTML =
      row[btnNr][`shift${langIndex}`] || row[btnNr][`altGr${langIndex}`] || '';
    secondarySign.style.cssText = `
      position: absolute;
      font-size:1.1vw;
      pointer-events: none;
      top: 8%;
      left: 8%;
    `;

    btn.appendChild(secondarySign);

    const thirdSign = document.createElement('div');
    thirdSign.innerHTML =
      row[btnNr][`shiftAltGr${langIndex}`] ||
      row[btnNr][`altGr${langIndex}`] ||
      '';
    thirdSign.style.cssText = `
      position: absolute;
      font-size:1.1vw;
      pointer-events: none;
      top: 8%;
      right: 8%;
    `;
    btn.appendChild(thirdSign);
    btn.addEventListener('click', () => {
      const keyEv = new KeyboardEvent('keydown', { key: mainSign.innerHTML });
      document.dispatchEvent(keyEv);
    });
    buttons.push(btn);
    parent.appendChild(btn);
  });
};

export const addRows = (numberOfRows, keyboard, data, langIndex) => {
  // eslint-disable-next-line no-param-reassign
  keyboard.innerHTML = '';
  const btns = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfRows; i++) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
    display:flex;
    gap:1%;
    margin-bottom: calc(100vw*0.01);
    `;
    addRow(data[`row${i + 1}`], wrapper, btns, langIndex);
    keyboard.appendChild(wrapper);
  }
  return btns;
};

export const checkWidth = (...args) => {
  if (window.innerWidth < 600) {
    args.forEach((el) => {
      el.style.display = 'none';
      return el;
    });
    screenTooSmall.style.display = 'block';
  } else {
    args.forEach((el) => {
      el.style.display = 'block';
      return el;
    });
    screenTooSmall.style.display = 'none';
  }
};
