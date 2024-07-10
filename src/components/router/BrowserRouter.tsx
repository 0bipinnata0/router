import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { PathnameProvider } from "../../hook/usePathname";

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
    <PathnameProvider initialValue={location.pathname}>
      {children}
    </PathnameProvider>
  );
};

export default BrowserRouter;
