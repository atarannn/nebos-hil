function init() {
    $(function () {
        if (navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1) {
            $("body").addClass("safari");
        }
    });

  const slider = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: document.querySelector('[data-next]'),
      prevEl: document.querySelector('[data-prev]'),
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    preloadImages: false,
    lazy: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      waitForTransition: false,
    },
    watchSlidesVisibility: true,
    on: {
      init: (e) => {
        const delay = e.params.autoplay.delay / 1000;
        gsap.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, duration: delay, transformOrigin: '0 0' });

        const currentSlide = e.slides[1];
            tlFromBottom(currentSlide.querySelector('.slide__title')).play();
            tlFromBottom3(currentSlide.querySelector('.slide__link')).play();
      },
    },
  });


const msGlSlider = mainScreenGlSlider();
    slider.on('slideNextTransitionStart', (obj) => {
       msGlSlider.nextExtern()
    })
    slider.on('slidePrevTransitionStart', () => {
        msGlSlider.prevExtern()
    })
  slider.on('beforeTransitionStart', (obj) => {
    const currentSlide = obj.slides[obj.previousIndex];
    tlToTop(currentSlide.querySelector('.slide__title')).play();
    tlToTop3(currentSlide.querySelector('.slide__link')).play();
  })
    slider.on('transitionStart', (obj) => {
        obj.navigation.nextEl.style.pointerEvents = 'none';
        obj.navigation.prevEl.style.pointerEvents = 'none';
    })
    slider.on('transitionEnd', (obj) => {
        obj.navigation.nextEl.style.pointerEvents = '';
        obj.navigation.prevEl.style.pointerEvents = '';
    })
  slider.on('activeIndexChange', (obj) => {

    const delay = obj.params.autoplay.delay / 1000;
    gsap.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, duration: delay, transformOrigin: '0 0' });

    const currentSlide = obj.slides[obj.activeIndex];
    tlFromBottom(currentSlide.querySelector('.slide__title')).play();
    tlFromBottom3(currentSlide.querySelector('.slide__link')).play();
  });
  const currentSlideShow = [
    document.querySelector('[data-first-digit]'),
    document.querySelector('[data-second-digit]'),
  ];
  currentSlideShow[0].textContent = 0;
  currentSlideShow[1].textContent = slider.realIndex + 1;
  slider.on('activeIndexChange', (self) => {
      const splitedIndex = (self.realIndex + 1).toString().split('');
      const secondDigit = splitedIndex.length > 1 ? splitedIndex[1] : splitedIndex[0];
      gsap.timeline()
          .fromTo(currentSlideShow[1], { yPercent: 0 }, { yPercent: -100 })
          .add(() => {
              currentSlideShow[1].textContent = secondDigit;
          })
          .fromTo(currentSlideShow[1], { yPercent: 100 }, { yPercent: 0 });
    });
}
document.querySelectorAll(".slide__title").forEach((text) => {
  let mathM = text.innerHTML.match(
      /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g
  );
  mathM = mathM.map(
      (el) => `<span style="display:inline-flex; overflow:hidden"><span>${el}</span></span>`
  );
  text.innerHTML = mathM.join(" ");
  gsap.set(text.children, { overflow: "hidden" });
  gsap.set(text.querySelectorAll("span>span"), {
    overflow: "initial",
    display: "inline-block",
  });
});

function tlToTop(text) {
  let tl = gsap
      .timeline({
        paused: true,
      })
      .fromTo(
          text.querySelectorAll("span>span"),
          { yPercent: 0, skewY: 0 },
          {
            yPercent: 100,
            skewY: 3,
            stagger: 0.05,
            duration: 1.25,
            ease: "power4.out",
          }
      );
  return tl;
}

function tlFromBottom(text) {
  let tl = gsap
      .timeline({
        paused: true,
      })
      .fromTo(
          text.querySelectorAll("span>span"),
          { yPercent: 100, skewY: 3 },
          {
            yPercent: 0,
            skewY: 0,
            stagger: 0.05,
            duration: 1.25,
            autoAlpha: 1,
            ease: "power4.out",
          }
      );
  return tl;
}

function tlToTop3(text) {
    let tl = gsap
        .timeline({
            paused: true,
        })
        .fromTo(
            text.querySelectorAll("span>span"),
            { yPercent: 0, skewY: 0 },
            {
                yPercent: -100,
                skewY: 1,
                duration: 2.25,
                ease: "power4.out",
            }
        );
    return tl;
}

function tlFromBottom3(text) {
    let tl = gsap
        .timeline({
            paused: true,
        })
        .fromTo(
            text,
            { yPercent: 100, skewY: 1 },
            {
                yPercent: 0,
                skewY: 0,
                duration: 2.25,
                autoAlpha: 1,
                ease: "power4.out",
            }
        );
    return tl;
}

document.addEventListener('DOMContentLoaded', init);


function mainScreenGlSlider() {

    const imagesForGl = Array.from(document.querySelectorAll('.home-slider .swiper-slide:not(.swiper-slide-duplicate) .slide__content__right img')).map(img => img.src);

    let sketch = new Sketch({
        debug: true,
        slider: document.querySelector('.animation-for-slider'),
        images: imagesForGl,
        prevClicker: document.querySelector('.home-slider__prev'),
        clicker: document.querySelector('.home-slider__next'),
        duration: 1,
        uniforms: {
            intensity: {value: 1, type:'f', min:0., max:3}
        },
        fragment: `
		uniform float time;
		uniform float progress;
		uniform float intensity;
		uniform float width;
		uniform float scaleX;
		uniform float scaleY;
		uniform float transition;
		uniform float radius;
		uniform float swipe;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform sampler2D displacement;
		uniform vec4 resolution;
		varying vec2 vUv;
		mat2 getRotM(float angle) {
		    float s = sin(angle);
		    float c = cos(angle);
		    return mat2(c, -s, s, c);
		}
		const float PI = 3.1415;
		const float angle1 = PI *0.25;
		const float angle2 = -PI *0.75;


		void main()	{
			vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

			vec4 disp = texture2D(displacement, newUV);
			vec2 dispVec = vec2(disp.r, disp.g);

			vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
			vec4 t1 = texture2D(texture1, distortedPosition1);

			vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
			vec4 t2 = texture2D(texture2, distortedPosition2);

			gl_FragColor = mix(t1, t2, progress);

		}

	`
    });


    return sketch;
}


