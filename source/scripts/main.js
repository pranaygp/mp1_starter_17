const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('li');
const sections = document.querySelectorAll('.section');
const caroussel = document.querySelector('.caroussel');
const carousselSlides = caroussel.querySelectorAll('li');
const carousselControls = caroussel.querySelectorAll('.controls');

let currentCarrouselSlide = 0;
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

  if ((window.innerHeight + scrollPos) >= (body.offsetHeight + parseInt(nav.style.height))) {
    currentSection = sections.length-1;
  }

  if(currentSection >= 0) {
    navLinks.forEach((node, i) => {
      node.classList.remove("selected");
      if(i === currentSection) {
        node.classList.add("selected");
      }
    })
  }
})

function carousselClickHandler(e) {

  switch(e.target.id) {
    case 'next':
      currentCarrouselSlide = (currentCarrouselSlide+1)%3;
      break;
    case 'prev':
      currentCarrouselSlide = (currentCarrouselSlide-1)%3;
      break;
  }

  switch(currentCarrouselSlide) {
    case 0:
    case -0:
      carousselSlides[0].style.marginTop = "0px";
      carousselSlides[1].style.marginTop = "0px";
      break;
    case 1:
    case -1:
      carousselSlides[0].style.marginTop = "-100%";
      carousselSlides[1].style.marginTop = "0px";
      break;
    case 2:
    case -2:
      carousselSlides[0].style.marginTop = "-100%";
      carousselSlides[1].style.marginTop = "-100%";
      break;
  }
}

carousselControls.forEach(el => el.addEventListener('click', carousselClickHandler))