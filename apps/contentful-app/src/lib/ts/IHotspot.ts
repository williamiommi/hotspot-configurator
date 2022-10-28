export default interface IHotspot {
  id: string;
  title: string;
  content: string;
  dark: boolean;
  x: number;
  y: number;
  naturalX: number;
  naturalY: number;
  percentageX: number;
  percentageY: number;
  el?: HTMLElement;
}
