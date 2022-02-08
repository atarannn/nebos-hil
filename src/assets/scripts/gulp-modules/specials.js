function sideSwitchArrow(swiper, arrowArgs, conArgs) {
    const arrow = arrowArgs;
    const container = conArgs;
    const mediumCordValue = document.documentElement.clientWidth / 2;
    document.body.append(arrow);
    container.style.cursor = 'none';
    arrow.style.cursor = 'none';
    arrow.style.zIndex = 10;
    arrow.__proto__.hide = function some() {
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        // this.style.transition = 'transform .2s, opacity .4s';
        // this.style.transition = 'opacity .4s';
        // this.style.transitionTimingFunction = 'easy-in';
    };
    arrow.__proto__.show = function some() {
        this.style.opacity = '1';
        // this.style.transition = 'transform .2s, opacity .4s';
        // this.style.transition = 'opacity .4s';
        // this.style.transitionTimingFunction = 'easy-in';
    };
    arrow.dataset.side = 'leftSide';
    arrow.hide();

    container.addEventListener('mousemove', desktopNavButtonHandler);
    container.addEventListener('mouseenter', () => {
        arrow.show();
    });
    container.addEventListener('mouseleave', () => {
        arrow.hide();
    });
    if (document.documentElement.clientWidth < 1024) {
        window.removeEventListener('mousemove', desktopNavButtonHandler);
        arrow.remove();
    }

    function desktopNavButtonHandler(evt) {
        arrow.style.left = `${evt.clientX - 18}px`;
        arrow.style.top = `${evt.clientY - 18}px`;

        // arrow.style.transform = `translate3d(${evt.clientX}px, ${evt.clientY}px, 0)`;
        getCursorSide(evt.clientX);
        // handleArrowVisibility(evt);
    }

    function getCursorSide(x) {
        if (x < (mediumCordValue)) {
            arrow.classList.add('left-side');
            arrow.dataset.side = 'leftSide';
        } else {
            arrow.classList.remove('left-side');
            arrow.dataset.side = 'rightSide';
        }
    }
    container.addEventListener('click', () => {
        switchGallerySlide(arrow.dataset.side);
    });
    if (document.documentElement.clientWidth < 1024) {
        container.removeEventListener('click', clickToChange);
    }
    const navigate = {
        leftSide: () => {
            swiper.slidePrev();
        },
        rightSide: () => {
            swiper.slideNext();
        },
    };

    function switchGallerySlide(side) {
        navigate[side]();
        return navigate.side;
    }
}

const slider = new Swiper('.swiper-cont', {
    loop: true,
    navigation: {
        nextEl: document.querySelector('[data-next]'),
        prevEl: document.querySelector('[data-prev]'),
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    watchSlidesVisibility: true,
});

slider.on('beforeTransitionStart', (obj) => {
    const currentSlide = obj.slides[obj.previousIndex];
    // tlToTop2(currentSlide.querySelector('.right-block-slider-img.specials-slider__img')).play();
    tlToTop(currentSlide.querySelector('.page-blocks__text')).play();
})
slider.on('activeIndexChange', (obj) => {
    const currentSlide = obj.slides[obj.activeIndex];
    // tlFromBottom2(currentSlide.querySelector('.right-block-slider-img.specials-slider__img')).play();
    tlFromBottom(currentSlide.querySelector('.page-blocks__text')).play();
});

document.querySelectorAll(".page-blocks__text").forEach((text) => {
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
                stagger: 0.01,
                duration: 1.5,
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
                stagger: 0.01,
                duration:  1.5,
                autoAlpha: 1,
                ease: "power4.out",
            }
        );
    return tl;
}

// function tlToTop2(image) {
//     let tl = gsap
//         .timeline({
//             paused: true,
//         })
//         .fromTo(
//             image,
//             { yPercent: 0, skewY: 0 },
//             {
//                 yPercent: -300,
//                 skewY: 3,
//                 duration: 3.25,
//                 ease: "power4.out",
//             }
//         );
//     return tl;
// }
//
// function tlFromBottom2(image) {
//     let tl = gsap
//         .timeline({
//             paused: true,
//         })
//         .fromTo(
//             image,
//             { yPercent: 300, skewY: 3 },
//             {
//                 yPercent: 0,
//                 skewY: 0,
//                 duration: 1.25,
//                 autoAlpha: 1,
//                 ease: "power4.out",
//             }
//         );
//     return tl;
// }


const sliderCard = new Swiper('.swiper-card', {
    loop: true,
    preloadImages: false,
    // lazy: true,
    speed: 1000,
    slidesPerView: 'auto',
    freeMode: false,
    centeredSlides: true,
    navigation: {
        nextEl: document.querySelector('.swiper-button-next'),
        prevEl: document.querySelector('.swiper-button-prev'),
    },
    watchSlidesVisibility: true,
});
sliderCard.on('activeIndexChange', (e) => {
    console.log(e.realIndex);
    if (e.realIndex === 1) e.autoplay = false;
})

const currentSlideShow = [
    document.querySelector('[data-first-digit]'),
    document.querySelector('[data-second-digit]'),
];
currentSlideShow[0].textContent = 0;
currentSlideShow[1].textContent = slider.realIndex + 1;
document.querySelector('[data-total]').textContent = document.querySelectorAll('.swiper-cont .swiper-slide:not(.swiper-slide-duplicate)').length;
slider.on('activeIndexChange', (self) => {

    const splitedIndex = (self.realIndex + 1).toString().split('');
    const firstDigit = splitedIndex.length > 1 ? splitedIndex[0] : 0;
    const secondDigit = splitedIndex.length > 1 ? splitedIndex[1] : splitedIndex[0];
    gsap.timeline()
        .fromTo(currentSlideShow[1], { yPercent: 0 }, { yPercent: -100 })
        .add(() => {
            currentSlideShow[1].textContent = secondDigit;
        })
        .fromTo(currentSlideShow[1], { yPercent: 100 }, { yPercent: 0 });
    if (currentSlideShow[0].textContent != firstDigit) {
        gsap.timeline()
            .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: -100 })
            .add(() => {
                currentSlideShow[0].textContent = firstDigit;
            })
            .fromTo(currentSlideShow[0], { yPercent: 100 }, { yPercent: 0 });
    }
});

sideSwitchArrow(
    slider,
    document.querySelector('.moving-arrow'),
    document.querySelector('.swiper-cont'),
);
