import { RouteProvider } from "../../../hook/useRoute";
import { useMemoryRouterListener } from "./useMemoryRouterListener";

export const MemoryRouter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const initialRoute = localStorage.getItem("pathName") ?? "/";

  useMemoryRouterListener();

  return <RouteProvider initialValue={initialRoute}>{children}</RouteProvider>;
};
