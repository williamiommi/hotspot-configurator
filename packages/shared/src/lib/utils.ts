import { v4 as uuidv4 } from 'uuid';
import IHotspot from './types/IHotspot';

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

export const generateEmptyHotspot = (): IHotspot => {
  let hotSpot: IHotspot = {
    id: uuidv4(),
    dark: true,
    title: 'Sample Title',
    content: 'Sample Content',
    x: 0,
    y: 0,
    naturalX: 0,
    naturalY: 0,
    percentageX: 0,
    percentageY: 0,
  };
  return hotSpot;
};

export const stringifyCompare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
