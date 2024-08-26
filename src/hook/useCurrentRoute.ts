import { useState } from "react";
import createStateContext from "../utils/createStateContext";

const useCurrentRouteContext = (pathname: string) => useState(pathname);

const [CourrentRouteProvider, useCurrentRoute] = createStateContext(useCurrentRouteContext);

export { CourrentRouteProvider };

export default useCurrentRoute;
