import {removeActive, toggleActive} from '../utils/toggleActive';

const initHeaderSubmenu = () => {
  const headerSubmenus = document.querySelectorAll(`[data-submenu]`);
  const headerSubmenuBtns = document.querySelectorAll(`[data-submenu-btn]`);

  if (!headerSubmenus.length) {
    return;
  }

  headerSubmenus.forEach((submenu) => {
    const btn = submenu.querySelector(`[data-submenu-btn]`);

    btn.addEventListener(`click`, (e) => {
      e.preventDefault();
      if (btn.classList.contains(`is-active`)) {
        btn.classList.remove(`is-active`);
      } else {
        toggleActive(headerSubmenuBtns, btn);
      }
    })
  })

  document.addEventListener(`click`, (e) => {
    const target = e.target.dataset?.submenuBtn || e.target.closest(`[data-submenu-btn]`)?.dataset?.submenuBtn;
    if (typeof target === `undefined`) {
      removeActive(headerSubmenuBtns)
    };
  });
};

export {initHeaderSubmenu};
