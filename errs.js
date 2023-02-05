const screenTooSmall = document.createElement('div');
screenTooSmall.style.cssText = `
height: 20rem;
font-family: 'Trebuchet MS', sans-serif;
font-size:.7rem;
padding:1rem;
text-align:center;
vertical-align: middle;
display:none;
// display: table-cell;
`;
screenTooSmall.innerHTML =
  '<p style="border:1px solid rgba(0,0,0,0.2); padding:1rem 2rem;display:inline-block; border-radius: 1rem;"><img style="width: 2rem;height:auto;margin: 0 auto;margin-bottom: .3rem;display: block;" src="icons/error.svg" alt="Error" class=""><span style="font-weight:bold; margin: .5rem; text-transform:uppercase">Screen width too small</span><br> Resize the window or change screen\'s mode to landscape.</p>';

export default screenTooSmall;
