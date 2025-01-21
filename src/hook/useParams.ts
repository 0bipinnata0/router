import { useEffect, useState } from "react";
import createStateContext from "../utils/createStateContext";

function shadowEqual(a: Record<string, string>, b: Record<string, string>) {
  const mapA = new Map(Object.entries(a));
  const mapB = new Map(Object.entries(b));
  if (mapA.size !== mapB.size) {
    return false;
  }
  const notEqual = [...mapA.keys()].some((key) => {
    return mapA.get(key) !== mapB.get(key);
  });
  return !notEqual;
}

const useParamsContext = (params: Record<string, string>) => {
  const [state, setState] = useState(params);
  useEffect(() => {
    setState((prevState) => {
      if (shadowEqual(prevState, params)) {
        return prevState;
      }
      return params;
    });
  }, [params]);

  return state;
};

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
