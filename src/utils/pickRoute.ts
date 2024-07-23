import React from "react";
import { ReactNode } from "react";
import Route from "../components/Route";

function isRouteValidElement(
  object: unknown
): object is React.ReactElement<React.ComponentProps<typeof Route>> {
  return React.isValidElement(object) && object.type === Route;
}

function checkRoleAccess(
  userRole: string | undefined,
  el: React.ReactElement<React.ComponentProps<typeof Route>>
) {
  const { role } = el.props;
  if (!role) {
    return true;
  }
  if (!userRole) {
    return false;
  }
  return role.includes(userRole);
}

function handlePath(aPath: string, root?: string): string {
  if (aPath.startsWith("/")) {
    return aPath;
  }
  return `${root}/${aPath}`;
}

interface RouteElement {
  el: ReactNode;
  role?: string[];
  children?: Map<string, RouteElement>;
}

function pickRoute(
  userRole: string | undefined,
  children: ReactNode,
  root = "/"
): Map<string, RouteElement> {
  return new Map<string, RouteElement>(
    React.Children.toArray(children)
      .filter(isRouteValidElement)
      .filter((el) => checkRoleAccess(userRole, el))
      .map(({ props }) => {
        const { path, element, children } = props;
        const newPath = handlePath(path, root);
        const pair: [string, RouteElement] = [
          newPath,
          {
            el: element,
            children: children
              ? pickRoute(userRole, children, newPath)
              : undefined,
          },
        ];
        return pair;
      })
  );
}

export default pickRoute;
