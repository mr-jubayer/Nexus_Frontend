let timeout;
function debounceHandler(callback, delay = 1000) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    callback();
  }, delay);
}

export default debounceHandler;
