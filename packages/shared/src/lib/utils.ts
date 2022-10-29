export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <F extends (...params: any[]) => void>(
  fn: F,
  delay: number,
  onStart = false
) => {
  let timeoutID: number;
  let startTriggered = false;
  return function (this: any, ...args: any[]) {
    if (onStart && !startTriggered) {
      fn.apply(this, args);
      startTriggered = true;
    }
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => {
      startTriggered = false;
      fn.apply(this, args);
    }, delay);
  } as F;
};
