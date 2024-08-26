import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import useCurrentRoute from "../hook/useCurrentRoute";
import pickRoute from "../utils/pickRoute";
import find from "../utils/find";
import { OutletProvider } from "../hook/useOutlet";

function resolvePath(acc: string, v: string) {
  if (acc === "") {
    return v;
  }
  const reg = /^\.?\/.*$\//i;
  const pureV = v.replace(reg, "");
  return `${acc}/${pureV}`;
}

function getAbsolutePath(els: Array<{ path: string }>) {
  return els.map((el) => el.path).reduce(resolvePath, "");
}
function recursionFn(item: IRoute) {
  return item.children;
}

function predicateFn(target: string) {
  return (paths: IRoute[]) => {
    return target === getAbsolutePath(paths);
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
  const [currentRoute, setCurrentRoute] = useCurrentRoute();

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", setCurrentRoute);
    return () => {
      unsubscribe();
    };
  }, [setCurrentRoute]);

  const el = useMemo(() => {
    const data: { find: boolean; result: IRoute[] } = find(
      recursionFn,
      predicateFn(currentRoute),
      combineFn
    )(pickRoute(role, children), []);
    if (!data.find) {
      return <div>not found</div>;
    }
    return data.result.reduceRight((acc, val) => {
      return <OutletProvider initialValue={acc}>{val.el}</OutletProvider>;
    }, <Empty />);
  }, [children, currentRoute, role]);

  useEffect(() => {
    base.set(currentRoute, el);
  }, [el, currentRoute]);

  const cache = useMemo(() => {
    !base.has(currentRoute) && base.set(currentRoute, el);
    return base;
  }, [el, currentRoute]);
  // keep-alive
  return useMemo(() => {
    const els: React.ReactNode[] = [];
    cache.forEach((el, key) => {
      els.push(
        key !== currentRoute ? (
          <div style={{ display: "none" }} key={key}>
            {el}
          </div>
        ) : (
          <div key={key}>{el}</div>
        )
      );
    });
    return <div>{els}</div>;
  }, [currentRoute, cache]);
};

export default Routes;
