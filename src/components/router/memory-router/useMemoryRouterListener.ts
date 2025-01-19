import { useEffect } from "react";
import routeEmit from "../../routeEmit";

export const useMemoryRouterListener = () => {
  const routeChangeListener = (pathName: string) => {
    localStorage.setItem("pathName", pathName);
  };
  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", routeChangeListener);
    return unsubscribe;
  }, []);
};
