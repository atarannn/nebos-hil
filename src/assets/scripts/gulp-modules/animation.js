gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".page__inner", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".page__inner").style.transform ? "transform" : "fixed"
    });

    const paralaxImages = document.querySelectorAll('.main-page-img');
    paralaxImages.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.height = '100%';
        image.parentElement.prepend(wrap);
        gsap.set(image, { scale: 1.1 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.5,
                    scroller: '.page__inner',
                    // markers: true,
                    // onLeave: () => {
                    //     console.log('leave');
                    // },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -70,
                },
                {
                    y: 70,
                    ease: 'linear',
                },
            );
    });

    const paralaxImages2 = document.querySelectorAll('.right-block-img, .page-blocks__hall-logo, .page-blocks__dev-logo');
    paralaxImages2.forEach((image) => {
        if(document.documentElement.clientWidth > 575) {
            let tl = gsap
                .timeline({
                    // paused: true,
                    scrollTrigger: {
                        trigger: image,
                        once: true,
                        scroller: '.page__inner',
                    }
                })
                .fromTo(
                    image,
                    {
                        y: 300,
                        autoAlpha: 0

                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        delay: 0.1,
                        duration: 3,
                        ease: "power4.out",
                    }
                );
            return tl;
        }

        if(document.documentElement.clientWidth < 575) {
            let tl = gsap
                .timeline({
                    // paused: true,
                    scrollTrigger: {
                        trigger: image,
                        scroller: '.page__inner',
                    }
                })
                .fromTo(
                    image,
                    {
                        y: 200,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1
                    }
                );
            // return tl;
        }
    });

    const paralaxBlock = document.querySelectorAll('.location-card, .hall-images, .parking-block-img');
    paralaxBlock.forEach((block) => {
        if (document.documentElement.clientWidth > 575) {
            let tl = gsap
                .timeline({
                    // paused: true,
                    scrollTrigger: {
                        trigger: block,
                        once: true,
                        scroller: '.page__inner',
                    }
                })
                .fromTo(
                    block,
                    {
                        y: 300,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 3.25,
                        ease: "power4.out",
                    }
                );
            // return tl;
        }

        if(document.documentElement.clientWidth < 575) {
            let tl = gsap
                .timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: block,
                        once: true,
                        scroller: '.page__inner',
                    }
                })
                .fromTo(
                    block,
                    {
                        y: 100,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1
                    }
                );
            return tl;
        }
    });

    // для страницы документы
    const spanBezier1 = 'power4.inOut';
    const spanEntries1 = document.querySelectorAll('[data-span-entry1]');
    spanEntries1.forEach(section => {
        gsap.set(section, { overflow: 'visible' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '100%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1.5, delay: 0.5, ease: spanBezier1},
        );
    });

    // const spanBezier2 = 'power4.inOut';
    // const spanEntries2 = document.querySelectorAll('[data-span-entry2]');
    // spanEntries2.forEach(section => {
    //     gsap.set(section, { overflow: 'visible' });
    //     section.innerHTML = `
    //        <div>
    //          ${section.innerHTML}
    //        </div>
    //      `;
    //     const tl = gsap.timeline({
    //         paused: true,
    //         scrollTrigger: {
    //             triggerHook: 1,
    //             trigger: section,
    //             scroller: document.querySelector('.page__inner').classList.contains('no-transform') ?  null : '.page__inner',
    //             start: '0% bottom',
    //             end: '100% bottom',
    //             once: true,
    //         },
    //     });
    //     tl.fromTo(
    //         section.querySelector('div'),
    //         { y: '100%', duration: 0, autoAlpha: 0},
    //         { y: 0, autoAlpha: 1, duration: 1, ease: spanBezier2},
    //     );
    // });

    // стандартное появление без задержки
    const spanBezier3 = 'power4.inOut';
    const spanEntries3 = document.querySelectorAll('[data-span-entry3]');
    spanEntries3.forEach(section => {
        gsap.set(section, { overflow: 'visible' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '100%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1.5, ease: spanBezier3},
        );
    });
});
