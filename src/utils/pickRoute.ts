import React, { type ReactNode } from "react";
import Route from "../components/Route";
import * as R from "ramda";
import filterInRouteElementReducer from "./filterInRouteElementReducer";
import filterReducer from "./filterReducer";

function isRouteValidElement(
  object: unknown
): object is React.ReactElement<React.ComponentProps<typeof Route>> {
  return React.isValidElement(object) && object.type === Route;
}

const createRoute = ({
  props,
}: React.ReactElement<React.ComponentProps<typeof Route>>): IRoute => {
  const { path, element, children } = props;
  return Object.assign(Object.create(null), {
    path,
    el: element,
    children: R.isEmpty(children) ? [] : children,
  });
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

const listCombine = (list: IRoute[], obj: IRoute) => {
  return [...list, obj];
};

const pickRoute = (userRole: string | undefined, children: ReactNode) => {
  const transducer = R.compose(
    filterReducer(isRouteValidElement),
    filterReducer(R.curryN(2, checkRoleAccess)(userRole))
  );
  return filterInRouteElementReducer(
    transducer,
    createRoute,
    listCombine,
    []
  )(children) as IRoute[];
};
export default pickRoute;
