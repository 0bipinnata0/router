import React from "react";
import { ReactNode } from "react";
import Route from "../components/Route";
import * as R from "ramda";
import { filterInRouteElementReducer } from "./pickRoute2";

function isRouteValidElement(
  object: unknown
): object is React.ReactElement<React.ComponentProps<typeof Route>> {
  return React.isValidElement(object) && object.type === Route;
}

const mappingFn = ({
  props,
}: React.ReactElement<React.ComponentProps<typeof Route>>) => {
  const { path, element, children } = props;
  return {
    [path]: Object.assign(
      Object.create(null),
      {
        el: element,
      },
      R.isEmpty(children) ? {} : { children }
    ),
  };
};

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

function createAbsolutePath(aPath: string, root?: string): string {
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
  const checkCurrentRoleAccess = R.curryN(2, checkRoleAccess)(userRole);
  return new Map<string, RouteElement>(
    React.Children.toArray(children)
      .filter(isRouteValidElement)
      .filter(checkCurrentRoleAccess)
      .map(({ props }) => {
        const { path, element, children } = props;
        const newPath = createAbsolutePath(path, root);
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

const listCombine = (
  list: Record<string, unknown>,
  obj: Record<string, unknown>
) => {
  return Object.assign(Object.create(null), list, obj);
};

export const pickRoute2 = (
  userRole: string | undefined,
  children: ReactNode
) => {
  return filterInRouteElementReducer(
    (v: unknown) =>
      [isRouteValidElement, R.curryN(2, checkRoleAccess)(userRole)].every(
        (cb) => cb(v)
      ),
    mappingFn,
    listCombine,
    Object.create(null)
  )(children);
};

export default (
  userRole: string | undefined,
  children: ReactNode,
  root = "/"
) => {
  const result = pickRoute(userRole, children, root);
  console.info("route **** ", result);
  return result;
};
