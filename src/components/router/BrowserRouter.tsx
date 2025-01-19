import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { RouteProvider } from "../../hook/useRoute";

const BrowserRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      if (pathName !== location.pathname) {
        history.pushState(null, "", pathName);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <RouteProvider initialValue={location.pathname}>
      {children}
    </RouteProvider>
  );
};

export default BrowserRouter;
