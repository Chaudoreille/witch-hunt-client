const debounce = (callback, delay) => {
  let timeout;

  return (...args) => {
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

module.exports = debounce;