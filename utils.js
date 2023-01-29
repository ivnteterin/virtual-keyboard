export let btns = [];
export const altKey = 'AltLeft';
export const shiftKey1 = 'ShiftLeft';
export const shiftKey2 = 'ShiftRight';

export const addRows = (numberOfRows, keyboard, data, langIndex) => {
  keyboard.innerHTML = '';
  btns = [];

  for (let i = 0; i < numberOfRows; i++) {
    const wrapper = document.createElement('div');
    const row = document.createElement('div');
    wrapper.style.cssText = `
    display:flex;
    gap:1%;
    margin-bottom: calc(100vw*0.01);
    `;
    addRow(data[`row${i + 1}`], wrapper, btns, langIndex);
    keyboard.appendChild(wrapper);
  }
};

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

export const addRow = (row, parent, btns, langIndex) => {
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

  for (let btnEntry in row) {
    const btn = document.createElement('div');
    addBtnStyle(btn);
    // btn.innerHTML = buttons[btnEntry].main || btnEntry;
    btn.style.flexBasis = `${100 * row[btnEntry].colspan}%`;
    if (row[btnEntry].colspan) {
      btn.style.aspectRatio = `unset`;
    }
    btn.id = row[btnEntry].key;
    btn.setAttribute("data-lang1",row[btnEntry].lang1);
    btn.setAttribute("data-lang2",row[btnEntry].lang2);
    const mainSign = document.createElement('div');
    mainSign.innerHTML = row[btnEntry][`main`] || row[btnEntry][`lang${langIndex}`];
    mainSign.style.cssText = `
      position: absolute;
      top: 60%;
      left: 50%;
      transform:translate(-50%,-50%);
    `;
    btn.appendChild(mainSign);

    const secondarySign = document.createElement('div');
    secondarySign.innerHTML =
      row[btnEntry][`shift${langIndex}`] ||
      row[btnEntry][`altGr${langIndex}`] ||
      '';
    secondarySign.style.cssText = `
      position: absolute;
      font-size:1.1vw;
      top: 8%;
      left: 8%;
    `;

    btn.appendChild(secondarySign);

    const thirdSign = document.createElement('div');
    thirdSign.innerHTML =
      row[btnEntry][`shiftAltGr${langIndex}`] ||
      row[btnEntry][`altGr${langIndex}`] ||
      '';
    thirdSign.style.cssText = `
      position: absolute;
      font-size:1.1vw;
      top: 8%;
      right: 8%;
    `;
    btn.appendChild(thirdSign);

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
altGrInstance.innerHTML = `<p style=" font-size:1.2vw;display:inline-block;">AltGr (Alt Graph) is interpreted by Windows as <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: 3px;">Ctrl</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem;  border:1px solid gray; border-radius: 3px;" >Alt</span></p>`;

export const langChange = document.createElement('div');
langChange.style.cssText = `
    opacity:0.5;
    display:inline-block;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:1.1vw;
  `;

export const changeLangDesc = (language) => {
  return `<p style="font-size:1.2vw; display:inline-block;margin:0">${language}. Change keyboard language by pressing <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: .3rem;">Left Alt</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem; border:1px solid gray; border-radius: .3rem;">Shift</span></p>`;
};


export const screenTooSmall = `<div style="height: 20rem; font-family: 'Trebuchet MS', sans-serif; font-size:.7rem; padding:1rem;text-align:center; vertical-align: middle; width: 100vw; display: table-cell;"><p style="border:1px solid rgba(0,0,0,0.2); padding:1rem 2rem;display:inline-block; border-radius: 1rem;"><img style="width: 2rem;height:auto;margin: 0 auto;margin-bottom: .3rem;display: block;" src="icons/error.svg" alt="Error" class=""><span style="font-weight:bold; margin: .5rem; text-transform:uppercase">Screen width too small</span><br> Resize the window or change screen's mode to landscape.</p></div>`;
