import routeMap from "./routeMap";

const Route: React.FC<
  React.PropsWithChildren<{
    path: string;
    element: React.ReactNode;
  }>
> = ({ path, element }) => {
  routeMap.set(path, element);
  return element;
};

export default Route;
