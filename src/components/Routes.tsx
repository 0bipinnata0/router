import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import useRoute from "../hook/useRoute";
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
  const [route, setRoute] = useRoute();

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", setRoute);
    return () => {
      unsubscribe();
    };
  }, [setRoute]);

  const el = useMemo(() => {
    const data: { find: boolean; result: IRoute[] } = find(
      recursionFn,
      predicateFn(route),
      combineFn
    )(pickRoute(role, children), []);
    if (!data.find) {
      return <div>not found</div>;
    }
    return data.result.reduceRight((acc, val) => {
      return <OutletProvider initialValue={acc}>{val.el}</OutletProvider>;
    }, <Empty />);
  }, [children, route, role]);

  useEffect(() => {
    base.set(route, el);
  }, [el, route]);

  const cache = useMemo(() => {
    if (!base.has(route)) {
      base.set(route, el);
    }
    return base;
  }, [el, route]);
  // keep-alive
  return useMemo(() => {
    const els: React.ReactNode[] = [];
    cache.forEach((el, key) => {
      els.push(
        key !== route ? (
          <div style={{ display: "none" }} key={key}>
            {el}
          </div>
        ) : (
          <div key={key}>{el}</div>
        )
      );
    });
    return <div>{els}</div>;
  }, [route, cache]);
};

export default Routes;
