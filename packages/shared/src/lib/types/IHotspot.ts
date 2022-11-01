export interface IHotspot {
  id: string;
  title: string;
  content: string;
  dark: boolean;
  x: number;
  y: number;
  appImageWidth: number;
  appImageHeight: number;
  naturalX: number;
  naturalY: number;
  percentageX: number;
  percentageY: number;
  el?: HTMLElement;
}
