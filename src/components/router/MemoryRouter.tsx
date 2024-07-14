import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { PathnameProvider } from "../../hook/usePathname";

const MemoryRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      localStorage.setItem("pathName", pathName);
    });
    return unsubscribe;
  }, []);

  return (
    <PathnameProvider initialValue={localStorage.getItem("pathName") ?? "/"}>
      {children}
    </PathnameProvider>
  );
};

export default MemoryRouter;
