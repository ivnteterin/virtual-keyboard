export const altGrInstance = document.createElement('div');
altGrInstance.style.cssText = `
    opacity:0.5;
    display:block;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:.7rem;
  `;
altGrInstance.innerHTML =
  '<p style=" font-size:1.2vw;display:inline-block;">AltGr (Alt Graph) is interpreted by Windows as <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: 3px;">Ctrl</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem;  border:1px solid gray; border-radius: 3px;" >Alt</span></p>';

export const langChange = document.createElement('div');
langChange.style.cssText = `
    opacity:0.5;
    display:inline-block;
    font-family: 'Trebuchet MS', sans-serif;
    font-size:1.1vw;
  `;

export function changeLangDesc(language) {
  return `<p style="font-size:1.2vw; display:inline-block;margin:0">${language}. Change keyboard language by pressing <span style="padding:.2rem .3rem; border:1px solid gray; border-radius: .3rem;">Left Alt</span>&nbsp;+&nbsp;<span style="padding:.2rem .3rem; border:1px solid gray; border-radius: .3rem;">Shift</span></p>`;
}

export const capsOn = document.createElement('div');
capsOn.id = 'caps';
capsOn.style.cssText = `
position: relative;
text-align: center;
opacity: .35;
font-size: 1.2vw;
font-family: 'Trebuchet MS', sans-serif;
line-height: 1.5;`;
capsOn.innerHTML = '<div>On</div>';
