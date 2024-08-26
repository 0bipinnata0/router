export {};

declare global {
  interface IRoute {
    path: string;
    el: React.ReactNode;
    children: IRoute[];
  }
}
