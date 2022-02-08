window.onload = function () {
  document.body.classList.add('loaded_hiding');
  document.querySelector('body').style.overflow = 'hidden';
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    document.querySelector('body').style.overflow = 'auto';
  }, 500);
};

function menuOpen(menu) {
  menu.classList.add('active');
  const createAnimation = (links, translateY = 0, delay = 0) => {
    links.forEach((link, i) => {
      gsap.from(link, {
        delay: delay + i / 10,
        y: translateY,
        opacity: 0,
      });
    });
  };
  const links1 = menu.querySelectorAll('[data-animation]');

  const links2 = menu.querySelectorAll('[data-animation1]');
  const links3 = menu.querySelectorAll('[data-animation2]');

  const links4 = menu.querySelectorAll('[data-animation3]');
  const links5 = menu.querySelectorAll('[data-animation4]');

  const links6 = menu.querySelectorAll('[data-animation5]');
  const links7 = menu.querySelectorAll('[data-animation6]');

  const links8 = menu.querySelectorAll('[data-animation7]');
  const links9 = menu.querySelectorAll('[data-animation8]');

  createAnimation(links1, 100, 0.5);

  createAnimation(links2, 100, 0.7);
  createAnimation(links3, 100, 0.7);

  createAnimation(links4, 100, 0.9);
  createAnimation(links5, 100, 0.9);

  createAnimation(links6, 100, 1.1);
  createAnimation(links7, 100, 1.1);

  createAnimation(links8, 100, 1.3);
  createAnimation(links9, 100, 1.3);

  menuOpenAnim();
  document.querySelector('body').style.overflow = 'hidden';
}

function menuClose(menu) {
  menu.classList.remove('active');
  menuCloseAnim();
  document.querySelector('body').style.overflow = 'auto';
}

function menuOpenAnim(evt, reverseArg) {
  const menu = document.querySelector('.menu-wrap');
  if  (menu === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.to(menu, { autoAlpha: 1 })
  tl.fromTo(menu,
      {webkitClipPath: 'circle(0% at 93% 6%)' },
      { webkitClipPath: 'circle(150% at 50% 100%)', ease: 'power4.easeInOut', duration: 1.2, clearProps: 'all' }, '<');
  tl.play();
}

function menuCloseAnim(evt, reverseArg) {
  const menu = document.querySelector('.menu-wrap');
  if  (menu === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(menu,
      { autoAlpha: 1, webkitClipPath: 'circle(150% at 50% 100%)', },
      {  webkitClipPath: 'circle(0% at 94% 7%)', ease: 'power4.easeInOut', duration: 0.8, clearProps: 'all' }, '<');
  tl.set(menu, { autoAlpha: 0 });
  tl.play();
}

function menuInit() {
  const menu = document.querySelector('.menu-wrap');
  document.querySelector('[data-open-menu]').addEventListener('click', () => menuOpen(menu));
  document.querySelector('[data-close-menu]').addEventListener('click', () => menuClose(menu));
}

function formOpen(form) {
  form.forEach(el => {
    formOpenAnim();
    document.querySelector('body').style.overflow = 'hidden';
  });
}

function formClose(form) {
  form.forEach(el => {
    formCloseAnim();
    document.querySelector('body').style.overflow = 'auto';
  });
}

function formOpenAnim(evt, reverseArg) {
  const form = document.querySelectorAll('[data-call-popup]');
  const formInfo = document.querySelector('.call-popup-info');
  const formClose = document.querySelector('.popup__close');
  if  (form === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.add(() => {
    form.forEach(el => {
      el.classList.add('active-form');
    });
  });

  tl.fromTo(form, {x: 0, autoAlpha: 0},
      { x: 0, autoAlpha: 1,  ease: 'power4.easeInOut', duration: 0.4, clearProps: 'all' }, '<');
  tl.fromTo(formInfo, {x: 3000},
      { x: 0, ease: 'power4.easeInOut', duration: 0.6, delay: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(formClose, {y: -200},
      { y: 0, ease: 'power4.easeInOut', duration: 0.4, delay: 0.6, clearProps: 'all' }, '<');

  tl.play();
}

function formMobOpenAnim(evt, reverseArg) {
  const form = document.querySelectorAll('.form-header-call');
  const formInfo = document.querySelector('.form-header-call ul');
  if  (form === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(form, {autoAlpha: 0},
      { autoAlpha: 1, ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(formInfo, {autoAlpha: 0, y: 3000},
      { y: 0, autoAlpha: 1, ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all' }, '<');
  tl.play();
}

function formCloseAnim(evt, reverseArg) {
  const form = document.querySelector('[data-call-popup]');
  const formInfo = document.querySelector('.call-popup-info');
  const formClose = document.querySelector('.popup__close');
  if  (form === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(formClose, {y: 0},
      { y: -200,  ease: 'power4.easeInOut', duration: 0.4, clearProps: 'all', autoAlpha: 0 }, '<');
  tl.fromTo(formInfo, {x: 0},
      { x: 3000,  ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all', autoAlpha: 0 }, '<');
  tl.fromTo(form, {x: 0},
      { x: 0,  ease: 'power4.easeInOut', duration: 0.2, autoAlpha: 0 }, '<');

  tl.add(() => {
    form.classList.remove('active-form');
  });

  tl.play();
}

function formMobCloseAnim(evt, reverseArg) {
  const form = document.querySelectorAll('.form-header-call');
  const formInfo = document.querySelector('.form-header-call ul');

  if  (form === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(formInfo, {autoAlpha: 1, y: 0},
      { y: 3000, autoAlpha: 0, ease: 'power4.easeInOut', duration: 1.1 }, '<');
  tl.fromTo(form, { autoAlpha: 1},
      { ease: 'power4.easeInOut', duration: 1.3, delay: 0.3, autoAlpha: 0 }, '<');
  tl.add(() => {
    form.forEach(el => {
      el.classList.remove('sideform-active');
    })
  });
  tl.play();
}

function formInit() {
  const form = document.querySelectorAll('[data-call-popup]');
  document.querySelectorAll('[data-open-call-popup]').forEach(elem => {
    elem.addEventListener('click', () => formOpen(form));
  });
  document.querySelectorAll('[data-close-call-popup]').forEach(elem => {
    elem.addEventListener('click', () => formClose(form));
  });
}


// Mobile phone menu start
const btnCallMobile = document.querySelectorAll('.js-mobile-call');
const btnCloseMobile = document.querySelector('.js-mobile-close');
const formMobile = document.querySelector('.form-header-call');
const formCallMobile = document.querySelector('.js-mobile-form');
const form = document.querySelector('[data-call-popup]');

formCallMobile.addEventListener('click', () => {
  document.querySelector('body').style.overflow = 'hidden';
  formOpenAnim();
  formMobCloseAnim();
});

btnCallMobile.forEach(btn => {
  btn.addEventListener('click', () => {
    formMobile.classList.add('sideform-active');
    formMobOpenAnim();
    document.querySelector('body').style.overflow = 'hidden';
  });
})

btnCloseMobile.addEventListener('click', () => {
  formMobCloseAnim();
  document.querySelector('body').style.overflow = 'auto';
});
// Mobile phone menu end


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
  menuInit();
  formInit();
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
