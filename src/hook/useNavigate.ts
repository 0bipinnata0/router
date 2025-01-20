import { useCallback } from "react";
import routeEmit from "../components/routeEmit";

const useNavigate = () => {
  return useCallback((to: string) => {
    routeEmit.emit("popstate", to);
  }, []);
};

export default useNavigate;
