const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('li');
const sections = document.querySelectorAll('.section');
const caroussel = document.querySelector('.caroussel');
const carousselSlides = caroussel.querySelectorAll('li');
const carousselControls = caroussel.querySelectorAll('.controls');
const videos = document.querySelectorAll('video');
const modal = document.querySelector('#overlay');
const modalTrigger = document.querySelector('#modal-trigger');
const modalClose = document.querySelector('#modal-close');


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

  // HARDCODED IF AT END OF PAGE, SELECT THE LAST NAV ITEM
  // if ((window.innerHeight + scrollPos) >= (body.offsetHeight + parseInt(nav.style.height))) {
  //   currentSection = sections.length-1;
  // }

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

function navLinksClickHandler(e) {
  let sectionScrollPositions = Array.prototype.map.call(sections, s => s.offsetTop);

  let selectedSectionIndex = Array.prototype.indexOf.call(e.target.parentElement.querySelectorAll('li'), e.target);


  // console.log(sectionScrollPositions[selectedSectionIndex], parseInt(nav.style.height) || 120, nav.style.height)

  scrollTo(document.body, sectionScrollPositions[selectedSectionIndex] - navBarHeightAt(sectionScrollPositions[selectedSectionIndex]), 1000)
}

function modalTriggerClickHandler(e) {
  modal.style.display = "block";
}

function modalCloseClickHandler(e) {
  console.log("hello");
  modal.style.display = "none";
}

function navBarHeightAt(scrollPos) {
  const progress =  Math.min(scrollPos/(window.innerHeight * 0.5), 1.0);
  return initialNavHeight - (0.5 * progress * initialNavHeight);
}

/*********************************************************
 ** Inspired by https://gist.github.com/andjosh/6764939 **
 *********************************************************/
function scrollTo(element, to, duration) {
  var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;
      
  var animateScroll = function(){
      if(element.scrollTop === to) return;
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if(currentTime < duration) {
          setTimeout(animateScroll, increment);
      }
  };
  animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

videos.forEach(vid => vid.volume = 0 )

carousselControls.forEach(el => el.addEventListener('click', carousselClickHandler))

navLinks.forEach(el => el.addEventListener('click', navLinksClickHandler))

modalTrigger.addEventListener('click', modalTriggerClickHandler)

modalClose.addEventListener('click', modalCloseClickHandler)

