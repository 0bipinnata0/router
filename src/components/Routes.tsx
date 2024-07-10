import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import usePathname from "../hook/usePathname";
import pickRoute from "../utils/pickRoute";

const Routes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [pathname, setPathName] = usePathname();
  const map = useMemo(() => new Map(pickRoute(children)), [children]);
  console.info("map", map);

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathname) => {
      setPathName(pathname);
    });
    return () => {
      unsubscribe();
    };
  }, [setPathName]);
  return useMemo(() => map.get(pathname), [map, pathname]);
};

export default Routes;
