function init() {
  // eslint-disable-next-line no-undef
  const slider = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: document.querySelector('[data-next]'),
      prevEl: document.querySelector('[data-prev]'),
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
    watchSlidesVisibility: true,
    on: {
      init: (e) => {
        document.querySelector('[data-current]').innerHTML = "0" + e.activeIndex;
        const delay = e.params.autoplay.delay / 1000;
        gsap.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, duration: delay, transformOrigin: '0 0' });
      },
    },
  });

  slider.on('activeIndexChange', (obj) => {
    const realIndex = obj.realIndex + 1;
    console.log(obj);
    document.querySelector('[data-current]').innerHTML = "0" + realIndex;
    const delay = obj.params.autoplay.delay / 1000;
    gsap.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, duration: delay, transformOrigin: '0 0' });
  });
}

document.addEventListener('DOMContentLoaded', init);
