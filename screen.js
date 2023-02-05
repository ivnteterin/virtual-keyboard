export const screen = document.createElement('textarea');
export const screenArea = document.createElement('div');

screenArea.style.cssText = `
  position:relative;
`;

screen.setAttribute('id', 'screen');
screen.setAttribute('type', 'text');
window.addEventListener('click', () => screen.focus());
screen.autofocus = true;
screen.style.cssText = `
  width: 100%;
  min-height: 7.5rem;
  box-sizing: border-box;
  font-size:1.5rem;
  font-family: 'Courier New', monospace;
  border-radius: .5rem;
  caret-color: rgba(0, 0, 0, 0.5  );
  background: #eee;
  resize:vertical;
  outline: none;
`;

const imgCopy = document.createElement('img');
imgCopy.setAttribute('src', 'icons/copy.svg');
imgCopy.id = 'copy';

imgCopy.style.cssText = `
position:absolute;
width:1.3rem;
right:1rem;
bottom:1rem;
cursor: pointer;
transition:all .05s;
opacity:.3;
`;

imgCopy.addEventListener('mouseover', () => {
  imgCopy.style.opacity = 1;
  imgCopy.style.transform = 'scale(1.1)';
});
imgCopy.addEventListener('mouseout', () => {
  imgCopy.style.opacity = 0.5;
  imgCopy.style.transform = 'scale(1)';
});
imgCopy.addEventListener('mousedown', () => {
  imgCopy.style.transform = 'scale(.95)';
});
imgCopy.addEventListener('mouseup', () => {
  imgCopy.style.transform = 'scale(1)';
});

screenArea.appendChild(screen);
screenArea.appendChild(imgCopy);

imgCopy.addEventListener('click', () => {
  // console.log(event);
  screen.focus();
  screen.select();
  const selection = document.getSelection();
  navigator.clipboard.writeText(selection);
  const copied = document.createElement('div');
  copied.innerHTML = 'Copied!';
  copied.id = 'copy-text';
  copied.style.cssText = `
  position: absolute;
  font-family: "Trebuchet MS", sans-serif;
  font-size: .9rem;
  right: 2.7rem;
  transition: all .2s;
  line-height: 1;
  color: rgb(150,150,150);
  bottom: 1.2rem;`;

  let timerID;
  const removeCopiedText = () => {
    if (!document.getElementById('copy-text')) {
      screenArea.appendChild(copied);
      screen.blur();
      clearTimeout(timerID);
      return new Promise((resolve) => {
        timerID = setTimeout(() => {
          copied.style.opacity = 0;
          resolve();
        }, 2000);
      });
    }
    return Promise.resolve();
  };
  const timeOut = setTimeout(() => {
    if (screenArea.contains(copied)) screenArea.removeChild(copied);
  }, 1000);
  removeCopiedText().then(() => timeOut);
});
