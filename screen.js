export const screen = document.createElement('textarea');
export const screenArea = document.createElement('div');

screenArea.style.cssText = `
  position:relative;
`;

screen.setAttribute('id', 'screen');
screen.setAttribute('type', 'text');
// window.addEventListener('click', () => screen.blur());
screen.style.cssText = `
  width: 100%;
  min-height: 7.5rem;
  box-sizing: border-box;
  font-size:1.5rem;
  font-family: 'Courier New', monospace;
  border-radius: .5rem;
  caret-color: rgba(0, 0, 0, 0.1);
  background: #eee;
  resize:none;
  outline: none;
`;

const imgCopy = document.createElement("img");
imgCopy.setAttribute("src", "/icons/copy.svg");

imgCopy.style.cssText = `
position:absolute;
width:1rem;
right:1rem;
bottom:1rem;
cursor: pointer;
opacity:.5;
`;

imgCopy.addEventListener('mouseover',()=> {
imgCopy.style.opacity = 1;
})
imgCopy.addEventListener('mouseout',()=> {
  imgCopy.style.opacity = .5;
})

imgCopy.addEventListener('click',()=> {
  })

screenArea.appendChild(screen);
screenArea.appendChild(imgCopy);

imgCopy.addEventListener('click', (event) => {
  console.log(event);
  screen.focus();
  screen.select();
  // event.clipboardData.setData('text/plain', selection.toString());
  // event.preventDefault();
});
