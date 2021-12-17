const statusBtn = document.querySelectorAll('.btn-circle');
const circles = document.querySelectorAll('.circle');


statusBtn.forEach((btn, index) => {
    btn.addEventListener('mouseleave', () => {
        gsap.fromTo(circles[index], 1, { strokeDashoffset: 0 }, { strokeDashoffset: 1000 });
    })
})
statusBtn.forEach((btn,index) => {
    btn.addEventListener('mouseenter', () => {
        gsap.fromTo(circles[index], 1, { strokeDashoffset: 1000 }, { strokeDashoffset: 0 });
    })
})
