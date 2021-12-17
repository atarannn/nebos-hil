function init() {
    const slider = new Swiper('.swiper-container', {
        loop: true,
        preloadImages: false,
        lazy: true,
        speed: 5000,
        slidesPerView:'auto',
        freeMode: true,
        spaceBetween: 150,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            waitForTransition: false,
        },
        watchSlidesVisibility: true,
    });
}

document.addEventListener('DOMContentLoaded', init);
