const debounce = (callback, delay = 1000) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (timeout) clearTimeout(timeout);

      callback(...args);
    }, delay);
  };
};

export default debounce;