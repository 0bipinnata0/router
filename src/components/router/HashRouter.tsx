import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { PathnameProvider } from "../../hook/usePathname";

const HashRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      location.hash = `#${pathName}`;
    });
    return unsubscribe;
  }, []);

  return (
    <PathnameProvider initialValue={location.hash.replace(/^#/g, "")}>
      {children}
    </PathnameProvider>
  );
};

export default HashRouter;
