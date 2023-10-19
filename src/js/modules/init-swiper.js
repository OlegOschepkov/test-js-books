import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';

const initSwiper = () => {
  const similarPosts = document.querySelectorAll(`[data-slider-similar-posts]`);

  if (!similarPosts.length) {
    return;
  }

  similarPosts.forEach((slider) => {
    const pagination = slider.querySelector(`.swiper-pagination`);
    // eslint-disable-next-line
    const swiper = new Swiper(slider, {
      modules: [Pagination],
      breakpoints: {
        320: {
          slidesPerView: 1,
          pagination: {
            el: pagination,
            dynamicBullets: true,
            clickable: true,
            dynamicMainBullets: 2,
          },
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  });
};

const checkBreakpoint = () => {
  const breakpoint = window.matchMedia(`(min-width:768px)`);

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      initSwiper();
    } else {
      initSwiper();
    }
  };

  breakpoint.addListener(breakpointChecker);
};

export {initSwiper, checkBreakpoint};
