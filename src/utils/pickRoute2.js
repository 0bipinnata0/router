import React from "react";
import * as R from "ramda";

const mapReducer = R.curry((mappingFn, combineFn) => {
  return (acc, v) => {
    return combineFn(acc, mappingFn(v));
  };
});
const filterReducer = R.curry((predicateFn, combineFn) => {
  return (acc, v) => {
    if (predicateFn(v)) {
      return combineFn(acc, v);
    }
    return acc;
  };
});

// R.reduceWhile

export const filterInRouteElementReducer = (
  predicateFn,
  mappingFn,
  listCombine,
  defaultValue
) =>
  function handleChildren(reactEl) {
    const children = React.Children.toArray(reactEl);
    const transducer = R.compose(
      filterReducer(predicateFn),
      mapReducer((el) =>
        React.cloneElement(el, { children: handleChildren(el.props.children) })
      ),
      mapReducer(mappingFn)
    );
    return children.reduce(transducer(listCombine), defaultValue);
  };
