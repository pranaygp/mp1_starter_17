const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('li');
const sections = document.querySelectorAll('.section');

const initialNavHeight = nav.clientHeight;
const initialFontSize = parseInt(window.getComputedStyle(nav.querySelector('li'), null).getPropertyValue('font-size'));

window.addEventListener('scroll', e => {
  const scrollPos = body.scrollTop;  

  // Nav Bar Resizing
  const progress =  Math.min(scrollPos/(window.innerHeight * 0.5), 1.0);
  nav.style.height = initialNavHeight - (0.5 * progress * initialNavHeight) + "px";
  navLinks.forEach(node => {
    node.style.lineHeight = nav.style.height;
    node.style.fontSize = (initialFontSize - (0.15 * progress * initialFontSize)) + "px";
  })

  let sectionScrollPositions = Array.prototype.map.call(sections, s => s.offsetTop);

  let currentSection = -1;
  sectionScrollPositions.forEach((s, i) => {
    if((s-parseInt(nav.style.height)) <= scrollPos) {
      currentSection = i;
    }
  })

  if(currentSection >= 0) {
    navLinks.forEach((node, i) => {
      node.classList.remove("selected");
      if(i === currentSection) {
        node.classList.add("selected");
      }
    })
  }


})