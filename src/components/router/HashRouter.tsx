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

  // useEffect(() => {
  //   const cb = () => {
  //     routeEmit.emit("popstate", location.pathname);
  //   };
  //   window.addEventListener("popstate", cb);
  //   return () => {
  //     window.removeEventListener("popstate", cb);
  //   };
  // }, []);

  return (
    <PathnameProvider initialValue={location.hash.replace(/^#/g, "")}>
      {children}
    </PathnameProvider>
  );
};

export default HashRouter;
