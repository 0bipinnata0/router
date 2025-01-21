export function findMaxMatchRoute(
  routePathsList: Array<IRoute[]>,
  target: string
) {
  const x = routePathsList.map((routePath) =>
    caculateMaxMatchLength(target, routePath)
  );
  const result = x.find((item) => item[404]);
  if (result) {
    return result.value;
  }
  return x
    .map((item) => item.value)
    .reduce((prev, curr) => (curr.length > prev.length ? curr : prev));
}

const reg = /^\.?\/.*$\//i;
function caculateMaxMatchLength(target: string, routePath: IRoute[]) {
  const result = routePath.reduce(
    (prev, route) => {
      if (prev.done) {
        return prev;
      }
      const { count, offset } = prev;

      const normalizedRoutePath = route.path.replace(reg, "");
      const len = normalizedRoutePath.length;
      const startOffset = normalizedRoutePath.startsWith("/") ? 0 : offset + 1;

      if (route.path === "*") {
        return { count: count + 1, offset, done: true, 404: true };
      }

      if (
        target.slice(startOffset, startOffset + len) === normalizedRoutePath &&
        target[startOffset + 1] !== "/"
      ) {
        return {
          count: count + 1,
          offset: startOffset + len,
          done: false,
          404: false,
        };
      }
      return { count, offset, done: true, 404: false };
    },
    {
      count: 0,
      offset: 0,
      done: false,
      404: false,
    }
  );

  return { value: routePath.slice(0, result.count), 404: result[404] };
}
