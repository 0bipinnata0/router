import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { CourrentRouteProvider } from "../../hook/useCurrentRoute";

const HashRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      location.hash = `#${pathName}`;
    });
    return unsubscribe;
  }, []);

  return (
    <CourrentRouteProvider initialValue={location.hash.replace(/^#/g, "")}>
      {children}
    </CourrentRouteProvider>
  );
};

export default HashRouter;
