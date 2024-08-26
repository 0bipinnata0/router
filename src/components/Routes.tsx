import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import useCurrentRoute from "../hook/useCurrentRoute";
import pickRoute, { pickRoute2 } from "../utils/pickRoute";
import { OutletProvider } from "../hook/useOutlet";

const Empty = () => <></>;

interface RouteEl {
  children?: Record<string, RouteEl>;
  el: React.ReactNode;
}

const find = (pattern: string, el: RouteEl) => {};

const getRenderEle = (
  routeTree: ReturnType<typeof pickRoute>,
  pathName: string,
  excludePathNames: string[] = []
): React.ReactNode => {
  const idx = Array.from(routeTree.keys()).find(
    (aPath) =>
      aPath !== "/" &&
      !excludePathNames.includes(aPath) &&
      pathName.includes(aPath)
  );
  if (!idx) {
    return null;
  }
  const target = routeTree.get(idx);
  if (!target) {
    return null;
  }
  const { el, children } = target;
  if (idx === pathName) {
    return <OutletProvider initialValue={<Empty />}>{el}</OutletProvider>;
  }
  if (!children) {
    return null;
  }

  const initialValue = getRenderEle(children, pathName);
  if (initialValue === null) {
    return getRenderEle(routeTree, pathName, [...excludePathNames, idx]);
  }
  // return React.cloneElement(<>{el}</>, { children: initialValue });
  return <OutletProvider initialValue={initialValue}>{el}</OutletProvider>;
};

const base = new Map<string, React.ReactNode>();

const Routes: React.FC<React.PropsWithChildren<{ role?: string }>> = ({
  children,
  role,
}) => {
  const [currentRoute, setCurrentRoute] = useCurrentRoute();
  const routeTree = useMemo(() => pickRoute(role, children), [children, role]);
  const routeTree2 = useMemo(
    () => pickRoute2(role, children),
    [children, role]
  );

  console.info("routeTree", routeTree);

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", setCurrentRoute);
    return () => {
      unsubscribe();
    };
  }, [setCurrentRoute]);
  const el2 = useMemo(() => {
    console.info(">>> routeTree2", routeTree2);
    // return getRenderEle(routeTree, currentRoute);
  }, [routeTree2]);

  const el = useMemo(() => {
    console.info(">>> currentRoute", currentRoute);
    return getRenderEle(routeTree, currentRoute);
  }, [currentRoute, routeTree]);
  useEffect(() => {
    base.set(currentRoute, el);
  }, [el, currentRoute]);

  const x = useMemo(() => {
    !base.has(currentRoute) && base.set(currentRoute, el);
    return base;
  }, [el, currentRoute]);
  // keep-alive
  return useMemo(() => {
    const els: React.ReactNode[] = [];
    x.forEach((ele, key) => {
      els.push(
        key !== currentRoute ? (
          <div style={{ display: "none" }} key={key}>
            {ele}
          </div>
        ) : (
          <div key={key}>{ele}</div>
        )
      );
    });
    return <div>{els}</div>;
  }, [currentRoute, x]);
};

export default Routes;
