const removeActive = (arr) => {
  arr.forEach((el) => {
    if (el.classList.contains(`is-active`)) {
      el.classList.remove(`is-active`);
    }
  });
};

const toggleActive = (arr, elem) => {
  removeActive(arr);
  elem.classList.add(`is-active`);
};

export {toggleActive, removeActive};
