export {};

declare global {
  interface IRoute {
    path: string;
    el: React.ReactNode;
    memo: boolean;
    children: IRoute[];
  }
}
