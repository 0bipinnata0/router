import { useState } from "react";
import createStateContext from "../utils/createStateContext";

const useParamsContext = (params: Record<string, string>) =>
  useState(params)[0];

const [ParamsProvider, useParams] = createStateContext(useParamsContext);

export { ParamsProvider };

export default useParams;

export function generateParams(routes: IRoute[], target: string) {
  const patternList = routes
    .map((route) => route.path.split("/"))
    .flat()
    .filter(Boolean);
  const targetList = target.split("/").filter(Boolean);

  if (targetList.length !== patternList.length) {
    return {};
  }
  return Object.fromEntries(
    patternList
      .map((pattern, idx) => {
        if (!pattern.startsWith(":")) {
          return;
        }
        return [pattern.slice(1), targetList[idx]];
      })
      .filter(Boolean) as [string, string][]
  );
}
