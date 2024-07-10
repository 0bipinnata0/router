import React from "react";
import { ReactNode } from "react";
import Route from "../components/Route";

function isRouteValidElement(
  object: unknown
): object is React.ReactElement<React.ComponentProps<typeof Route>> {
  return React.isValidElement(object) && object.type === Route;
}
function handlePath(aPath: string, root?: string): string {
  if (aPath.startsWith("/")) {
    return aPath;
  }
  return `${root}/${aPath}`;
}

//  丢失了层级关系
function pickRoute(
  children: ReactNode,
  root = "/"
): Array<[string, React.ReactNode]> {
  return React.Children.toArray(children)
    .filter(isRouteValidElement)
    .map(({ props }) => {
      const { path, element, children } = props;
      const newPath = handlePath(path, root);
      const pair: [string, React.ReactNode] = [newPath, element];
      if (children) {
        return [pair, ...pickRoute(children, newPath)];
      }
      return [pair];
    })
    .flat();
}

export default pickRoute;
