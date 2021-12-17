locoScroll.destroy();
setTimeout(() => {
    document.querySelector('.page__inner').style.transform = '';
}, 0)

document.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector('.header').classList.add('not-on-top');
    } else {
        document.querySelector('.header').classList.remove('not-on-top');
    }
}
