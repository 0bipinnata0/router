const find = (recursionFn, predicateFn, combineFn) => {
  /**
   *
   * @param {Array} list
   * @param {Array} paths
   */
  function _find(list, initVal) {
    return list.reduce(
      (acc, current) => {
        if (acc.find) {
          return acc;
        }
        const result = combineFn(current, initVal);
        if (predicateFn(result)) {
          return { find: true, result };
        }
        return _find(recursionFn(current), result);
      },
      { find: false, result: initVal }
    );
  }

  return _find;
};
export default find;
