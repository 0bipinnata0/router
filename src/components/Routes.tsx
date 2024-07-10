import React, { useEffect, useMemo } from "react";
import routeMap from "./routeMap";
import Route from "./Route";
import routeEmit from "./routeEmit";
import usePathname from "../hook/usePathname";

function isRouteValidElement(
  object: unknown
): object is React.ReactElement<React.ComponentProps<typeof Route>> {
  return React.isValidElement(object) && object.type === Route;
}

const Routes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [pathname, setPathName] = usePathname();
  useMemo(() => {
    React.Children.toArray(children)
      .filter(isRouteValidElement)
      .map(({ props }) => {
        const { path, element } = props;
        routeMap.set(path, element);
      });
  }, [children]);

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathname) => {
      setPathName(pathname);
    });
    return () => {
      unsubscribe();
    };
  }, [setPathName]);
  return useMemo(() => routeMap.get(pathname), [pathname]);
};

export default Routes;
