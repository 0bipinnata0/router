import * as R from "ramda";

const mapReducer = R.curry((mappingFn, combineFn) => {
  return (acc, v) => {
    return combineFn(acc, mappingFn(v));
  };
});

export default mapReducer;
