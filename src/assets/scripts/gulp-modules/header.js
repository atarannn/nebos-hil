// function open(menu) {
//   const createAnimation = (links, translateY = 0, delay = 0) => {
//     links.forEach((link, i) => {
//       gsap.from(link, {
//         delay: delay + i / 10,
//         y: translateY,
//         opacity: 0,
//       });
//     });
//   };
//   const links1 = menu.querySelectorAll('[data-animation1]');
//   const links2 = menu.querySelectorAll('[data-animation2]');
//   const links3 = menu.querySelectorAll('[data-animation3]');
//   const links4 = menu.querySelectorAll('[data-animation4]');
//   const links5 = menu.querySelectorAll('[data-animation5]');
//   createAnimation(links1, 100, 0.2);
//   createAnimation(links2, 100, 0.4);
//   createAnimation(links3, 100, 0.7);
//   createAnimation(links4, 100, 1.0);
//   createAnimation(links5, 100, 1.3);
// }

function callSome(callSelector, contentToOpenSelector, closeSelector) {
  const call = document.querySelector(callSelector);
  const content = document.querySelector(contentToOpenSelector);
  const close = document.querySelector(closeSelector);

  call.addEventListener('click', () => {
    content.classList.add('active');
  });
  close.addEventListener('click', () => {
    content.classList.remove('active');
  });
}
callSome('[data-open-menu]','[data-menu]','[data-close-menu]');

function callPopup(callSelector, contentToOpenSelector, closeSelector) {
  const call = document.querySelectorAll(callSelector);
  const content = document.querySelector(contentToOpenSelector);
  const close = document.querySelector(closeSelector);

  call.forEach(elem => {
    elem.addEventListener('click', () => {
      content.classList.add('active');
    });
  });
  
  close.addEventListener('click', () => {
    content.classList.remove('active');
  });
}
callPopup('[data-open-call-popup]','[data-call-popup]','[data-close-call-popup]');

function init() {
  const unSelectHandler = (container) => {
    const elem = container.querySelector('.select-items');
    if (!elem.classList.contains('select-hide')) {
      container.classList.remove('select-arrow-active');
      elem.classList.add('select-hide');
    }
    window.removeEventListener('click', unSelectHandler);
  };
  const selectHandler = (event) => {
    event.stopPropagation();
    const container = event.target.closest('[data-lang]');
    container.classList.add('select-arrow-active');
    container.querySelector('.select-items').classList.remove('select-hide');
    window.addEventListener('click', unSelectHandler.bind(null, container));
  };
  document.querySelector('[data-lang="mobile"]').addEventListener('click', selectHandler);
  document.querySelector('[data-lang="desktop"]').addEventListener('click', selectHandler);
}

const header = document.querySelector('.header');
function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach((elem) => {
    switch (direction) {
      case 'down':
        elem[0].classList.add(elem[1]);
        break;
      default:
        elem[0].classList.remove(elem[1]);
        break;
    }
  });
}

locoScroll.on('scroll', (position) => {
  if (position.scroll.y > 50) {
    handleVisibilityOnScroll([[header, 'not-on-top']], 'down');
  } else {
    handleVisibilityOnScroll([[header, 'not-on-top']]);
  }
});

window.addEventListener('DOMContentLoaded', init);
