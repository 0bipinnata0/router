import React from "react";
import mapReducer from "./mapReducer";
import * as R from "ramda";

const filterInRouteElementReducer = (
  aTransducer,
  mappingFn,
  listCombine,
  defaultValue
) =>
  function handleChildren(reactEl) {
    const children = React.Children.toArray(reactEl);
    const transducer = R.compose(
      aTransducer,
      mapReducer((el) =>
        React.cloneElement(el, { children: handleChildren(el.props.children) })
      ),
      mapReducer(mappingFn)
    );
    return children.reduce(transducer(listCombine), defaultValue);
  };
export default filterInRouteElementReducer;
