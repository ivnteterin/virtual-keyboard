const screen = document.createElement('textarea');
screen.setAttribute('id', 'screen');
screen.setAttribute('type', 'text');
window.addEventListener('click', () => screen.focus());
screen.autofocus = true;
screen.style.cssText = `
  width: 100%;
  min-height: 7.5rem;
  box-sizing: border-box;
  border-radius: .5rem;
  caret-color: transparent;
  background: #eee;
  resize:none;
  outline: none;
`;

export default screen;
