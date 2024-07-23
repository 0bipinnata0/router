import React, { useEffect, useMemo } from "react";
import routeEmit from "./routeEmit";
import usePathname from "../hook/usePathname";
import pickRoute from "../utils/pickRoute";
import { OutletProvider } from "../hook/useOutlet";

const Empty = () => <></>;

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
  const [pathname, setPathName] = usePathname();
  const routeTree = useMemo(() => pickRoute(role, children), [children, role]);

  useEffect(() => {
    const unsubscribe = routeEmit.on("popstate", (pathname) => {
      setPathName(pathname);
    });
    return () => {
      unsubscribe();
    };
  }, [setPathName]);

  const el = useMemo(
    () => getRenderEle(routeTree, pathname),
    [pathname, routeTree]
  );
  useEffect(() => {
    base.set(pathname, el);
  }, [el, pathname]);

  const x = useMemo(() => {
    !base.has(pathname) && base.set(pathname, el);
    return base;
  }, [el, pathname]);
  // keep-alive
  return useMemo(() => {
    const els: React.ReactNode[] = [];
    x.forEach((ele, key) => {
      els.push(
        key !== pathname ? (
          <div style={{ display: "none" }} key={key}>
            {ele}
          </div>
        ) : (
          <div key={key}>{ele}</div>
        )
      );
    });
    return <div>{els}</div>;
  }, [pathname, x]);
};

export default Routes;
