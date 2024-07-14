import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import usePathname from "../hook/usePathname";
import pickRoute from "../utils/pickRoute";
import { OutletProvider } from "../hook/useOutlet";

const getX = (
  routeTree: ReturnType<typeof pickRoute>,
  pathName: string
): React.ReactNode => {
  const idx = Array.from(routeTree.keys()).find(
    (aPath) => aPath !== "/" && pathName.includes(aPath)
  );
  if (!idx) {
    return <></>;
  }
  const target = routeTree.get(idx);
  if (!target) {
    return <></>;
  }
  const { el, children } = target;
  const initialValue = children ? getX(children, pathName) : <></>;

  return <OutletProvider initialValue={initialValue}>{el}</OutletProvider>;
};

const Routes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [pathname, setPathName] = usePathname();
  const routeTree = useMemo(() => pickRoute(children), [children]);

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathname) => {
      setPathName(pathname);
    });
    return () => {
      unsubscribe();
    };
  }, [setPathName]);

  return useMemo(() => getX(routeTree, pathname), [pathname, routeTree]);
};

export default Routes;
