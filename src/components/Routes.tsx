import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import usePathname from "../hook/usePathname";
import pickRoute from "../utils/pickRoute";
import { OutletProvider } from "../hook/useOutlet";

const Empty = () => <></>;

const getX = (
  routeTree: ReturnType<typeof pickRoute>,
  pathName: string,
  excludePathNames: string[] = []
): React.ReactNode => {
  const idx = Array.from(routeTree.keys()).find(
    (aPath) =>
      aPath !== "/" &&
      !excludePathNames.includes(aPath) &&
      pathName.includes(aPath)
  );
  if (!idx) {
    return null;
  }
  const target = routeTree.get(idx);
  if (!target) {
    return null;
  }
  const { el, children } = target;
  if (idx === pathName) {
    return <OutletProvider initialValue={<Empty />}>{el}</OutletProvider>;
  }
  if (!children) {
    return null;
  }

  const initialValue = getX(children, pathName);
  if (initialValue === null) {
    return getX(routeTree, pathName, [...excludePathNames, idx]);
  }
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
