import { useState } from "react";
import createStateContext from "../utils/createStateContext";

const useRouteContext = (pathname: string) => useState(pathname);

const [RouteProvider, useRoute] = createStateContext(useRouteContext);

export { RouteProvider };

export default useRoute;
