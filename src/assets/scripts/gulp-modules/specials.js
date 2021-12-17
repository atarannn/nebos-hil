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
    if (document.documentElement.clientWidth < 769) {
        window.removeEventListener('mousemove', desktopNavButtonHandler);
        arrow.remove();
    }

    function desktopNavButtonHandler(evt) {
        arrow.style.left = `${evt.clientX - 18}px`;
        arrow.style.top = `${evt.clientY - 18}px`;

        // arrow.style.transform = `translate3d(${evt.clientX}px, ${evt.clientY}px, 0)`;
        getCursorSide(evt.clientX);
        handleArrowVisibility(evt);
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
    if (document.documentElement.clientWidth < 576) {
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
    preloadImages: false,
    lazy: true,
    speed: 400,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //     waitForTransition: false,
    // },
    watchSlidesVisibility: true,
});

const currentSlideShow = [
    document.querySelector('[data-first-digit]'),
    document.querySelector('[data-second-digit]'),
];
currentSlideShow[0].textContent = 0;
currentSlideShow[1].textContent = slider.realIndex + 1;
document.querySelector('[data-total]').textContent = document.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
slider.on('activeIndexChange', (self) => {
    const splitedIndex = (self.realIndex + 1).toString().split('');
    const firstDigit = splitedIndex.length > 1 ? splitedIndex[0] : 0;
    const secondDigit = splitedIndex.length > 1 ? splitedIndex[1] : splitedIndex[0];
    gsap.timeline()
        .fromTo(currentSlideShow[1], { yPercent: 0 }, { yPercent: 100 })
        .add(() => {
            currentSlideShow[1].textContent = secondDigit;
        })
        .fromTo(currentSlideShow[1], { yPercent: -100 }, { yPercent: 0 });
    if (currentSlideShow[0].textContent != firstDigit) {
        gsap.timeline()
            .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: 100 })
            .add(() => {
                currentSlideShow[0].textContent = firstDigit;
            })
            .fromTo(currentSlideShow[0], { yPercent: -100 }, { yPercent: 0 });
    }
});

sideSwitchArrow(
    slider,
    document.querySelector('.moving-arrow'),
    document.querySelector('.swiper-cont'),
);
