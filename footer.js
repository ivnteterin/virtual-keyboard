const footer = document.createElement('div');
footer.style.cssText = `
    opacity:0.5;
    display:inline-block;
    float:right;
    position:relative;
    font-family: 'Trebuchet MS', sans-serif;
  `;
footer.innerHTML =
  '<p style="font-size:1.2vw; display:inline-block; margin:0">Built by <a style="color:black";text-decoration:none;" href="https://github.com/ivnteterin">ivnteterin</a> for RS School 2023 JS Course</p>';

export default footer;
