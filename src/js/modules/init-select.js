import Choices from 'choices.js';

const initSelect = () => {
  const selects = document.querySelectorAll(`[data-custom-select] select`);

  if (!selects.length) {
    return;
  }

  selects.forEach((select) => {
    // eslint-disable-next-line
    const choices = new Choices(select, {
      allowHTML: true,
      searchEnabled: false,
    });
  });
};

export {initSelect};
