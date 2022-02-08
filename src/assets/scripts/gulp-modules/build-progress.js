/* eslint-disable linebreak-style */

/**
 * @param {Object} props
 * @namespace
 * @property {NodeElement}  props.content           - Контент попапа.
 * @property {NodeList}  props.call       - Кнопка вызова попапа
 * @property {Object}  props.styles         - Стили попапа.
 * @property {NodeElement}  [props.close]      - Кнопка закрытия.
 * @property {Function}  props.afterOpenCb - Коллбек после первого открытия попапа.
 */
class Popup {
  constructor(props) {
    this.call = props.call;
    this.overlayClass = 'my-popup-overlay';
    this.uniqueClass = `${this.overlayClass}-${Math.random().toString().replace('.', '')}`;
    this.styles = props.styles || {};
    this.content = props.content;
    this.close = props.close;
    this.afterOpenCb = props.afterOpenCb || function () {};
    this.init();
  }

  init() {
    document.body.insertAdjacentHTML('beforeend', this.preparePopup());
    this.mountedPopup = document.querySelector(`.${this.uniqueClass}`);
    Object.entries(this.styles).forEach((el) => {
      // eslint-disable-next-line prefer-destructuring
      this.mountedPopup.style[el[0]] = el[1];
    });
    this.addContent();
    this.handleCallButton();
    this.mountedPopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this.uniqueClass)) {
        this.closePopup();
      }
    });
    this.close.addEventListener('click', () => {
      this.closePopup();
    });
    this.afterOpenCb();
  }

  handleCallButton() {
    // eslint-disable-next-line no-prototype-builtins
    if (NodeList.prototype.isPrototypeOf(this.call)) {
      this.call.forEach((button) => {
        button.addEventListener('click', () => {
          this.openPopup();
        });
      });
    } else {
      this.call.addEventListener('click', () => {
        this.openPopup();
      });
    }
  }

  // handleOpeningButtons
  addContent() {
    this.mountedPopup
      .querySelector('.my-popup-content')
      .insertAdjacentElement('beforeend', this.content);
  }

  closePopup() {
    gsap.timeline()
      .timeScale(2)
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { autoAlpha: 1},
        { autoAlpha: 0 },
      )
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 1 },
        { autoAlpha: 0 },
      )
      .set(this.mountedPopup, { display: 'none' });
  }

  openPopup() {
    gsap.timeline()
      .timeScale(2)
      .set(this.mountedPopup, { display: 'flex' })
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
      )
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { autoAlpha: 0 },
        { autoAlpha: 1 },
      )
      .add(() => {
        this.afterOpenCb();
      });
  }

  get popupStyles() {
    return `
        <style>
          .my-popup-overlay {
            position:fixed;
            display: none;
            left:0;
            top:0;
            width:100vw;
            height: 100vh;
            justify-content:center;
            align-items: center;
            z-index:1000;
            background: rgba(0, 0, 0, 0.75);
          }
          @media screen and (max-width: 575px){
            .my-popup-overlay {
                background: transparent;
            }
          }
        </style>
      `;
  }

  preparePopup() {
    return `
        <div class="my-popup-overlay ${this.uniqueClass}">
          <div class="my-popup-content">
          </div>
        </div>
        ${this.popupStyles}
      `;
  }
}

const popupContentInit = {
  title: 'Title',
  url: 'https://google.com',
};
const cards = document.querySelectorAll('[data-card]');
const status = document.querySelectorAll('[data-work-status]');

const renderTargets = {
  title: () => {
  },
  text: (val) => {
    document.querySelector('[data-detail-text]').innerHTML = val;
  },
  date: (val) => {
    document.querySelector('[data-detail-date]').innerHTML = val;
  },
  url: (val) => {
    document.querySelector('[data-detail-frame]').src = val;
  },
};

const buildPopup = new Popup({
  call: cards,
  content: document.querySelector('.build-popup'),
  close: document.querySelector('[data-close]'),
});
const popupContent = new Proxy(popupContentInit, {
  set(obj, prop, value) {
    renderTargets[prop](value);
    return true;
  },
});
cards.forEach((card) => {
  card.addEventListener('click', () => {
    requestBuildDetails(card.dataset.id, (response) => {
      popupContent.title = response.title;
      popupContent.text = response.text;
      popupContent.url = response.video;
      popupContent.date = response.date;
    });
    OpenBuildAnim();
    document.body.style.overflow = 'hidden';
  });
});
buildPopup.close.addEventListener('click', () => {
  CloseBuildAnim();
  document.body.style.overflow = 'auto';
});

function OpenBuildAnim(evt, reverseArg) {
  const popupClose = document.querySelector('.build-popup [data-close]');
  const popupBuildInfo = document.querySelector('[data-build-info]');

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(popupBuildInfo, {x: 2000},
      { x: 0, ease: 'power4.easeInOut', duration: 0.6, delay: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(popupClose, {y: -200},
      { y: 0, ease: 'power4.easeInOut', duration: 0.4, delay: 0.6, clearProps: 'all' }, '<');
  tl.play();
}
function CloseBuildAnim(evt, reverseArg) {
  const popupClose = document.querySelector('.build-popup [data-close]');
  const popupBuildInfo = document.querySelector('[data-build-info]');

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(popupBuildInfo, {x: 0},
      { x: 2000, ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(popupClose, {y: 0},
      { y: -200, ease: 'power4.easeInOut', duration: 0.4, clearProps: 'all' }, '<');

  tl.play();
}

const statusPopup = new Popup({
  call: status,
  content: document.querySelector('.status-popup'),
  close: document.querySelector('[data-close]'),
});

status[0].addEventListener('click', () => {
  OpenStatusAnim();
  document.body.style.overflow = 'hidden';
});
statusPopup.close.addEventListener('click', () => {
  CloseStatusAnim();
  document.body.style.overflow = 'auto';
});

function OpenStatusAnim(evt, reverseArg) {
  const popupClose = document.querySelector('.status-popup [data-close]');
  const popupStatusInfo = document.querySelector('.status__wrapper');

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(popupStatusInfo, {x: 2000},
      { x: 0, ease: 'power4.easeInOut', duration: 0.6, delay: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(popupClose, {y: -200},
      { y: 0, ease: 'power4.easeInOut', duration: 0.4, delay: 0.6, clearProps: 'all' }, '<');

  tl.play();
}
function CloseStatusAnim(evt, reverseArg) {
  const popupClose = document.querySelectorAll('.status-popup [data-close]');
  const popupStatusInfo = document.querySelector('.status__wrapper');

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(popupStatusInfo, {x: 0},
      { x: 2000, ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all' }, '<');
  tl.fromTo(popupClose, {y: 0},
      { y: -200, ease: 'power4.easeInOut', duration: 0.4, clearProps: 'all' }, '<');

  tl.play();
}

function requestBuildDetails(id, cb = () => {}) {
  const sendData = new FormData();
  sendData.append('action', 'buildProgress');
  sendData.append('id', id);
  let sendUrl = '/wp-admin/admin-ajax.php';
  if (window.location.href.match(/localhost/)) sendUrl = './static/build-test.php';
  fetch(sendUrl, {
    method: 'POST',
    body: sendData,
  })
    .then(el => el.json())
    .then((el) => {
      cb(el);
    });
}

function horizontalScrolButtons({ forwardButton, backwardButton }, elWithScroll) {
  const delta = 1500;
  const scrollEl = document.querySelector(elWithScroll);
  const right = document.querySelector(forwardButton);
  const left = document.querySelector(backwardButton);
  left.addEventListener('click', () => scrollEl.scrollTo(scrollEl.scrollLeft - delta, 0));
  right.addEventListener('click', () => scrollEl.scrollTo(scrollEl.scrollLeft + delta, 0));
}
horizontalScrolButtons({
  forwardButton: '[data-status-next]',
  backwardButton: '[data-status-prev]',
}, '.statuses-wrapper');

const statusBtn = document.querySelectorAll('[data-work-status]');
const statusCircle = document.querySelectorAll('.circle');
statusBtn.forEach((el,index) => {
  el.addEventListener('mouseleave', () => {
    gsap.fromTo(statusCircle, 1, { strokeDashoffset: 0 }, { strokeDashoffset: 1000 });
  });
  el.addEventListener('mouseenter', () => {
    gsap.fromTo(statusCircle, 1, { strokeDashoffset: 1000 }, { strokeDashoffset: 0 });
  });
})
