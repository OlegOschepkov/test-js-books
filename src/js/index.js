
// ---------------------------------

import {initHeaderSubmenu} from './modules/init-header-submenu';
import {checkBreakpoint, initSwiper} from './modules/init-swiper';
import {initSelect} from './modules/init-select';
import {initModals} from './modules/init-modals';
import {initHeaderMobileMenu} from './modules/init-header-mobile-menu';
import {initSimplebar} from './modules/init-simplebar';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener(`DOMContentLoaded`, () => {

  // Utils
  // ---------------------------------


  // Modules
  // ---------------------------------
  initHeaderSubmenu();
  initSwiper();
  checkBreakpoint();
  initSelect();
  initModals();
  initHeaderMobileMenu();
  initSimplebar();
});
