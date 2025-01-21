import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import useRoute from "../hook/useRoute";
import pickRoute from "../utils/pickRoute";
import find from "../utils/find";
import { OutletProvider } from "../hook/useOutlet";
import { generateParams, ParamsProvider } from "../hook/useParams";
import { findMaxMatchRoute } from "../utils/findMaxMatchRoute";

function getAbsolutePath(els: Array<{ path: string }>) {
  const result = els
    .map((el) => el.path.replace("./", ""))
    .reduce((prev, curr) => {
      if (curr.startsWith("/")) {
        return [curr.split("/")].flat();
      }
      return [...prev, curr.split("/")].flat();
    }, [] as string[])
    .filter(Boolean)
    .join("/");

  return `/${result}`;
}
function recursionFn(item: IRoute) {
  return item.children;
}

function checkEqual(pattern: string, target: string) {
  const patternList = pattern.split("/");
  const targetList = target.split("/");
  if (targetList.length !== patternList.length) {
    return false;
  }
  return patternList.every((pattern, idx) => {
    if (pattern.startsWith(":")) {
      return true;
    }
    return pattern === targetList[idx];
  });
}

function predicateFn(target: string) {
  return (paths: IRoute[]) => {
    const pattern = getAbsolutePath(paths);
    return checkEqual(pattern, target);
  };
}

function combineFn(current: IRoute, routeList: IRoute[]) {
  return [...routeList, current];
}

const Empty = () => <></>;

const base = new Map<string, React.ReactNode>();

const Routes: React.FC<React.PropsWithChildren<{ role?: string }>> = ({
  children,
  role,
}) => {
  const [route, setRoute] = useRoute();

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", setRoute);
    return () => {
      unsubscribe();
    };
  }, [setRoute]);

  const result = useMemo(() => {
    const data: { find: boolean; result: IRoute[][] } = find(
      recursionFn,
      predicateFn(route),
      combineFn
    )(pickRoute(role, children), []);

    if (!data.find) {
      //
      const routeList = findMaxMatchRoute(data.result, route);
      return {
        el: (
          <ParamsProvider initialValue={generateParams(data.result[0], route)}>
            {routeList.reduceRight((acc, val) => {
              return (
                <OutletProvider initialValue={acc}>{val.el}</OutletProvider>
              );
            }, <div>not found</div>)}
          </ParamsProvider>
        ),
        memo: false,
      };
    }

    return {
      el: (
        <ParamsProvider initialValue={generateParams(data.result[0], route)}>
          {data.result[0].reduceRight((acc, val) => {
            return <OutletProvider initialValue={acc}>{val.el}</OutletProvider>;
          }, <Empty />)}
        </ParamsProvider>
      ),
      memo: data.result[0][data.result.length - 1].memo,
    };
  }, [children, route, role]);

  return result.el;

  const cache = useMemo(() => {
    const { el } = result;
    base.set(route, el);
    return [...base.entries()];
  }, [result, route]);

  // return base.get(route);
  // keep-alive
  return (
    <React.Fragment key="container">
      {cache.map(([key, el]) => {
        console.info("key", key);
        return (
          <React.Fragment key={key}>
            <div style={key !== route ? { display: "none" } : {}}>{el}</div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default Routes;
