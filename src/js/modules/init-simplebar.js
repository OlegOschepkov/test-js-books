import SimpleBar from 'simplebar';

const initSimplebar = () => {
  const scrollableContainers = document.querySelectorAll(`[data-simplebar-init]`);

  if (!scrollableContainers.length) {
    return;
  }

  scrollableContainers.forEach((container) => {
    // eslint-disable-next-line
    new SimpleBar(container, {
      autoHide: false,
      scrollbarMinSize: 70,
    });
  });
};

export {initSimplebar};
