window.onload = addVirtualKeyboard;
function addVirtualKeyboard() {
  document.body.style.margin = '0';
  document.body.style.padding = '2rem';
  document.body.style.paddingBottom = '0';
  document.body.style.boxSizing = 'border-box';

  const keyboard = document.createElement('div');
  const screen = document.createElement('textarea');

  keyboard.setAttribute('id', 'keyboard');
  keyboard.style.cssText = `
    margin-top:1rem;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:1.7vw;
`;
  screen.setAttribute('id', 'screen');
  screen.setAttribute('type', 'text');
  screen.style.cssText = `
    width: 100%;
    min-height: 7.5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 2px solid black;
    background: #eeee;
    resize:none;
`;

  const addRows = (numberOfRows) => {
    for (let i = 0; i < numberOfRows; i++) {
      const wrapper = document.createElement('div');
      const row = document.createElement('div');
      wrapper.style.cssText = `
      display:flex;
      gap:1%;
      margin-bottom: calc(100vw*0.01);
      `;
      addRow(data[`row${i + 1}`], wrapper);
      keyboard.appendChild(wrapper);
    }
  };

  document.body.appendChild(screen);
  document.body.appendChild(keyboard);
  addRows(Object.keys(data).length);
}

const makeActive = (btn) => {
  btn.style.background = 'linear-gradient(0.25turn, #b0baff , #92EFFD)';
};

const makeInactive = (btn) => {
  btn.style.background = 'unset';
};

const addRow = (row, parent) => {
  function addBtnStyle(btn) {
    btn.style.cssText = `
    width: 100%;
    aspect-ratio: 1;
    min-width:1.5rem;
    border:2px solid black;
    position:relative;
    border-radius: .3em;
    cursor:pointer;
    background:white;
    transition: background .2s;
    display: inline-block;
  `;
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'linear-gradient(0.25turn, #eeee , #dddd)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'white';
    });
  }

  for (let btnEntry in row) {
    const btn = document.createElement('div');
    addBtnStyle(btn);
    // btn.innerHTML = buttons[btnEntry].main || btnEntry;
    btn.style.flexBasis = `${100 * row[btnEntry].colspan}%`;
    if (row[btnEntry].colspan) {
      btn.style.aspectRatio = `unset`;
    }
    const mainSign = document.createElement('div');
    mainSign.innerHTML = row[btnEntry].main || row[btnEntry].lang1;
    mainSign.style.cssText = `
      position: absolute;
      top: 60%;
      left: 50%;
      transform:translate(-50%,-50%);
    `;
    btn.appendChild(mainSign);

    const secondarySign = document.createElement('div');
    secondarySign.innerHTML = row[btnEntry].shift || '';
    secondarySign.style.cssText = `
      position: absolute;
      top: 8%;
      left: 8%;
    `;

    btn.appendChild(secondarySign);

    const thirdSign = document.createElement('div');

    parent.appendChild(btn);
  }
};

const data = {
  row1: {
    1: {
      main: '`',
      lang1: null,
      lang2: null,
      shift: '¬',
      altGr: '¦',
    },
    2: {
      main: '1',
      lang1: null,
      lang2: null,
      shift: '!',
      altGr: null,
    },
    3: {
      main: '2',
      lang1: null,
      lang2: null,
      shift: '"',
      altGr: null,
    },
    4: {
      main: '3',
      lang1: null,
      lang2: null,
      shift: '£',
      altGr: null,
    },
    5: {
      main: '4',
      lang1: null,
      lang2: null,
      shift: '$',
      altGr: '€',
    },
    6: {
      main: '5',
      lang1: null,
      lang2: null,
      shift: '%',
      altGr: null,
    },
    7: {
      main: '6',
      lang1: null,
      lang2: null,
      shift: '^',
      altGr: null,
    },
    8: {
      main: '7',
      lang1: null,
      lang2: null,
      shift: '&',
      altGr: null,
    },
    9: {
      main: '8',
      lang1: null,
      lang2: null,
      shift: '*',
      altGr: null,
    },
    10: {
      main: '9',
      lang1: null,
      lang2: null,
      shift: '(',
      altGr: null,
    },
    11: {
      main: '0',
      lang1: null,
      lang2: null,
      shift: ')',
      altGr: null,
    },
    12: {
      main: '-',
      lang1: null,
      lang2: null,
      shift: '_',
      altGr: null,
    },
    13: {
      main: '=',
      lang1: null,
      lang2: null,
      shift: '+',
      altGr: null,
    },
    14: { colspan: 1.6, main: 'Bksp' },
  },

  row2: {
    1: {
      main: 'Tab',
      colspan: 1.6,
    },
    2: {
      lang1: 'Q',
    },
    3: {
      lang1: 'W',
    },
    4: {
      lang1: 'E',
    },
    5: {
      lang1: 'R',
    },
    6: {
      lang1: 'T',
    },
    7: {
      lang1: 'Y',
    },
    8: {
      lang1: 'U',
    },
    9: {
      lang1: 'I',
    },
    10: {
      lang1: 'O',
    },
    11: {
      lang1: 'P',
    },
    12: {
      main: '[',
      shift: '{',
    },
    13: {
      main: ']',
      shift: '}',
    },
    14: { main: 'Del' },
  },

  row3: {
    1: {
      main: 'Caps',
    },
    2: {
      lang1: 'A',
    },
    3: {
      lang1: 'S',
    },
    4: {
      lang1: 'D',
    },
    5: {
      lang1: 'F',
    },
    6: {
      lang1: 'G',
    },
    7: {
      lang1: 'H',
    },
    8: {
      lang1: 'J',
    },
    9: {
      lang1: 'K',
    },
    10: {
      lang1: 'L',
    },
    11: {
      main: ';',
      shift: ':',
    },
    12: {
      main: "'",
      shift: '@',
    },
    13: {
      main: '#',
      shift: '~',
    },
    14: { colspan: 1.6, main: 'Enter' },
  },
  row4: {
    1: {
      main: 'Shift',
      colspan: 1.6,
    },
    2: {
      lang1: '\\',
    },
    3: {
      lang1: 'Z',
    },
    4: {
      lang1: 'X',
    },
    5: {
      lang1: 'C',
    },
    6: {
      lang1: 'V',
    },
    7: {
      lang1: 'B',
    },
    8: {
      lang1: 'N',
    },
    9: {
      lang1: 'M',
    },
    10: {
      main: ',',
      shift: '<',
    },
    11: {
      main: '.',
      shift: '>',
    },
    12: {
      main: '/',
      shift: '?',
    },
    13: {
      main: '↑',
    },
    14: {
      main: 'Shift',
    },
  },
  row5: {
    1: {
      main: 'Ctrl',
    },
    2: {
      main: 'Win',
    },
    3: {
      main: 'Alt',
    },
    4: {
      main: 'Space',
      colspan: 7.3,
    },
    5: {
      main: 'AltGr',
      colspan: 1.5,
    },
    6: {
      main: 'Ctrl',
    },
    7: {
      main: '←',
    },
    8: {
      main: '↓',
    },
    9: {
      main: '→',
    },
  },
};
