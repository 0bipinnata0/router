import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { CourrentRouteProvider } from "../../hook/useCurrentRoute";

const BrowserRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      pathName !== location.pathname && history.pushState(null, "", pathName);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const cb = () => {
      routeEmit.emit("popstate", location.pathname);
    };
    window.addEventListener("popstate", cb);
    return () => {
      window.removeEventListener("popstate", cb);
    };
  }, []);

  return (
    <CourrentRouteProvider initialValue={location.pathname}>
      {children}
    </CourrentRouteProvider>
  );
};

export default BrowserRouter;
