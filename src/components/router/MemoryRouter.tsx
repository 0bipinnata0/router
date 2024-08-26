import { useEffect } from "react";
import routeEmit from "../routeEmit";
import { CourrentRouteProvider } from "../../hook/useCurrentRoute";

const MemoryRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathName) => {
      localStorage.setItem("pathName", pathName);
    });
    return unsubscribe;
  }, []);

  return (
    <CourrentRouteProvider initialValue={localStorage.getItem("pathName") ?? "/"}>
      {children}
    </CourrentRouteProvider>
  );
};

export default MemoryRouter;
