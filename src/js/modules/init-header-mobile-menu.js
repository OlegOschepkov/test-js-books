const initHeaderMobileMenu = () => {
  const menuBtn = document.querySelector(`[data-show-menu]`);
  const menuMobile = document.querySelector(`[data-header-mobile-menu]`);

  if (!menuBtn || !menuMobile) {
    return;
  }

  menuBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    menuMobile.classList.toggle(`is-active`);
    menuBtn.classList.toggle(`is-active`);
  });
};

export {initHeaderMobileMenu};
