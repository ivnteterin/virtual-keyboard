import data from './data.js';
import { screenArea, screen } from './screen.js';
import keyboardBody from './keyboard.js';
import footer from './footer.js';
import * as utils from './utils.js';

let altLeftIsPushed = false;
let shiftIsPushed = false;
let capsLockIsPushed = false;
let ctrlIsPushed = false;
let altRightIsPushed = false;
let altGraphIsPushed = false;
let langIndex = 1;
let typeIndex = 0;

window.onload = addVirtualKeyboard;
window.onresize = ()=>utils.checkWidth(keyboardBody,screenArea,footer, utils.langChange);

function changeLang() {
  altLeftIsPushed = false;
  shiftIsPushed = false;
  langIndex = langIndex === 1 ? 2 : 1;
  utils.langChange.innerHTML = utils.langChange.innerHTML.includes('English')
    ? utils.changeLangDesc('Lithuanian (LT)')
    : utils.changeLangDesc('English (UK)');

  console.log('langIndex ' + langIndex);
  utils.addRows(Object.keys(data).length, keyboardBody, data, langIndex);
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
  utils.langChange.innerHTML = utils.changeLangDesc('English (UK)');
  document.body.appendChild(utils.langChange);
  document.body.appendChild(utils.screenTooSmall);

  utils.addRows(Object.keys(data).length, keyboardBody, data, langIndex);
}

window.addEventListener('keydown', (e) => {
  screen.focus();
  
  console.log("e.code");
  console.log(e);
  if(!utils.functionalButtons.includes(e.code) && e.key !== "AltGraph") e.preventDefault(); // prevent abc's
  console.log("TRIG2");
  if (e.code === utils.altLeft) altLeftIsPushed = true;
  if (e.code === utils.shiftKey1 || e.code === utils.shiftKey2) shiftIsPushed = true;
  if (e.code === utils.capsLock) capsLockIsPushed = !capsLockIsPushed;
  if (e.code === utils.ctrlLeft || e.code === utils.ctrlRight) ctrlIsPushed = true;
  if (e.code === utils.altRight) altRightIsPushed = true;
  if (e.key === utils.altGraph) altGraphIsPushed = true;
  
  const activeBtn = utils.btns.find((btn) => e.code == btn.id);
  utils.makeActive(activeBtn);
  // const dataAttr = activeBtn.getAttribute(`data-lang${langIndex}`);
  //typing

  // console.log("altGraphIsPushed "+altGraphIsPushed);
  // console.log("shiftIsPushed "+shiftIsPushed);
  const inputAlt = activeBtn.getAttribute(`data-alt${langIndex}`) || "";
  const inputAltShift = activeBtn.getAttribute(`data-altshift${langIndex}`);
  const inputShift = activeBtn.getAttribute(`data-shift${langIndex}`) || activeBtn.getAttribute(`data-lang${langIndex}`);
  // console.log(activeBtn);
  // console.log("inputAltShift "+ inputAltShift);
  if (inputAltShift && altLeftIsPushed && ctrlIsPushed && shiftIsPushed) {screen.value +=inputAltShift;}
  else if(inputAltShift && altGraphIsPushed && shiftIsPushed) {console.log("TRIGG"); screen.value +=inputAltShift;}
  else if (inputAlt && altLeftIsPushed && ctrlIsPushed) {screen.value +=inputAlt;}
  else if(altGraphIsPushed && e.key !== "AltGraph")  {screen.value +=inputAlt;}
  else if (!capsLockIsPushed) {
    if(document.getElementById("caps")) document.getElementById("CapsLock").removeChild(utils.capsOn);
    if(inputShift) {shiftIsPushed ? screen.value += inputShift.toUpperCase() : screen.value += activeBtn.getAttribute(`data-lang${langIndex}`);}
  } else {
    document.getElementById("CapsLock").appendChild(utils.capsOn);
    const inputShift = activeBtn.getAttribute(`data-shift${langIndex}`) || activeBtn.getAttribute(`data-lang${langIndex}`);
    if(inputShift) { shiftIsPushed ?  screen.value += inputShift : screen.value += activeBtn.getAttribute(`data-lang${langIndex}`).toUpperCase();}}
    if (e.key == 'AltGraph') document.body.appendChild(utils.altGrInstance);
    if(ctrlIsPushed && e.code == "KeyA"){ 
      screen.value=screen.value.substring(0,screen.value.length-1);
      screen.select();
    }

});
window.addEventListener('keyup', (e) => {
  if (!ctrlIsPushed && altLeftIsPushed  && shiftIsPushed) changeLang();
  if (e.code === utils.altLeft) altLeftIsPushed = false;
  if (e.code === utils.shiftKey1) shiftIsPushed = false;
  if (e.code === utils.ctrlLeft || e.code === utils.ctrlRight) ctrlIsPushed = false;
  if (e.code === utils.altRight) altRightIsPushed = false;
  if (e.key === utils.altGraph) altGraphIsPushed = false;
  const activeBtn = utils.btns.find((btn) => e.code == btn.id);
  utils.makeInactive(activeBtn);
  if (e.key == 'AltGraph') document.body.removeChild(utils.altGrInstance);
  typeIndex = screen.value.length;
});

window.addEventListener("click",(e) => {
  console.log(e.target.id);
  // console.log(e);
  if(e.target.id) window.dispatchEvent(new KeyboardEvent('keydown',  {'key': " ", code: e.target.id}));
  if(e.target.id ==="Space") screen.value += " ";
  if(e.target.id ==="Enter") screen.value += "\n";
  if(e.target.id ==="Backspace") screen.value=screen.value.substring(0,screen.value.length-1);
  if(e.target.id ==="Delete") {
    // screen.setSelectionRange(typeIndex,screen.value.length);
    const firstPart = screen.value.slice(typeIndex);
    console.log(typeIndex);
    console.log("firstPart "+firstPart);
    const withDeletedPart = firstPart.substring(0,firstPart.length-1);
    // const secondPart = screen.value.slice(typeIndex,screen.value.length-1);
    screen.value = firstPart;
  }
  if(e.target.id === "ArrowLeft") {typeIndex > 0 ? typeIndex-- : ''; screen.setSelectionRange(typeIndex,typeIndex)};
  if(e.target.id === "ArrowRight") {typeIndex < screen.value.length ? typeIndex++ : ''; screen.setSelectionRange(typeIndex,typeIndex)};
  if(e.target.id === "ArrowUp") {
    let x = typeIndex;
    while (x>0) { x--; console.log(screen.value[x])}
  }
  //Delete
  //Arrows



})

window.addEventListener("blur", function(){
utils.btns.forEach(btn=> utils.makeInactive(btn))})


