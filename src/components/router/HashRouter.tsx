import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { RouteProvider } from "../../hook/useRoute";

const HashRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      location.hash = `#${pathName}`;
    });
    return unsubscribe;
  }, []);

  return (
    <RouteProvider initialValue={location.hash.replace(/^#/g, "")}>
      {children}
    </RouteProvider>
  );
};

export default HashRouter;
