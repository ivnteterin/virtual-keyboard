export const btns = [];

export const addRows = (numberOfRows, keyboard, data) => {
  for (let i = 0; i < numberOfRows; i++) {
    const wrapper = document.createElement('div');
    const row = document.createElement('div');
    wrapper.style.cssText = `
    display:flex;
    gap:1%;
    margin-bottom: calc(100vw*0.01);
    `;
    addRow(data[`row${i + 1}`], wrapper, btns);
    keyboard.appendChild(wrapper);
  }
};

export const makeActive = (btn) => {
  if (btn) {
    btn.style.background = 'linear-gradient(45deg, #d9defc , #d3f0f5)';
    btn.style.outline = '1px solid black';
  }
};

export const makeInactive = (btn) => {
  if (btn) {
    btn.style.background = 'unset';
    btn.style.outline = 'unset';
  }
};

export const addRow = (row, parent, btns) => {
  function addBtnStyle(btn) {
    btn.style.cssText = `
    width: 100%;
    aspect-ratio: 1;
    min-width:1.25rem;
    border:1px solid black;
    position:relative;
    border-radius: .3em;
    cursor:pointer;
    background:white;
    transition: all .2s;
    display: inline-block;
  `;
    btn.addEventListener('mouseenter', () => {
      btn.style.outline = '1px solid black';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.outline = 'unset';
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
    btn.id = row[btnEntry].key;
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
    btns.push(btn);
    parent.appendChild(btn);
  }
};

export const altGrInstance = document.createElement('div');
altGrInstance.style.cssText = `
    opacity:0.5;
    display:block;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:.7rem;
  `;
altGrInstance.innerHTML = `<p style=" font-size:1.1vw;display:inline-block;">AltGr (Alt Graph) is interpreted by Windows as <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: 3px;">Ctrl</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem;  border:1px solid gray; border-radius: 3px;" >Alt</span></p>`;

export const langChange = document.createElement('div');
langChange.style.cssText = `
    opacity:0.5;
    display:inline-block;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:1.1vw;
  `;
langChange.innerHTML = `<p style="font-size:1.1vw; display:inline-block;margin:0">English (UK). Change keyboard language by pressing <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: 3px;">Left Alt</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem; border:1px solid gray; border-radius: 3px;">Shift</span></p>`;

let firstButtonClicked = false;
let secondButtonClicked = false;

// function changeLang() {
//   firstButtonClicked = false;
//   secondButtonClicked = false;
//   console.log(
//     'this is your function you want to run only after 2 button is clicked'
//   );
// }

// button_1.addEventListener('click', () => {
//   firstButtonClicked = true;
//   if (firstButtonClicked && secondButtonClicked) changeLang();
// });
// button_2.addEventListener('click', () => {
//   secondButtonClicked = true;
//   if (firstButtonClicked && secondButtonClicked) changeLang();
// });
