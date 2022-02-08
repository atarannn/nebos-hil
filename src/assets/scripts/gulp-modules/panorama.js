const panoramaOverlay = document.querySelector('[data-panorama-faq]');
const panoramaWrapper = document.querySelector('[data-panorama-wrapper]');
const panorama = document.querySelector('[data-panorama]');
panoramaWrapper.addEventListener('mouseenter', () => {
    panorama.style.pointerEvents = '';
});
panoramaWrapper.addEventListener('mouseleave', () => {
    panorama.style.pointerEvents = 'none';
    panoramaOverlay.style.display = 'flex';
});
panoramaWrapper.addEventListener('mousedown', () => {
    panorama.style.pointerEvents = 'grabbing';
    panoramaOverlay.style.display = 'none';
});
window.addEventListener('touchstart', (evt) => {
    console.log(evt.target);
    panorama.dispatchEvent(new Event('focus'));
});
