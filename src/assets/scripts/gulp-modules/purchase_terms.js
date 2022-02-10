function init() {
    const slider = new Swiper('.swiper-container', {
        loop: true,
        preloadImages: false,
        lazy: true,
        speed: 5000,
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 250,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            waitForTransition: false,
        },
        watchSlidesVisibility: true,

        breakpoints: {
            1600: {
                spaceBetween: 250,
            },
            1024: {
                spaceBetween: 180,
            },
            575: {
                spaceBetween: 80,
            },
            320: {
                spaceBetween: 30,
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
