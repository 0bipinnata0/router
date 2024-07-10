import { useState } from "react";
import createStateContext from "../utils/createStateContext";

const usePathnameContext = (pathname: string) => useState(pathname);

const [PathnameProvider, usePathname] = createStateContext(usePathnameContext);

export { PathnameProvider };

export default usePathname;
