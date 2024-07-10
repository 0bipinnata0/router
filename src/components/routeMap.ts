class RouteMap {
  #map = new Map<string, React.ReactNode>();
  get map() {
    return this.#map;
  }
  set(key: string, value: React.ReactNode) {
    this.#map.set(key, value);
  }
  get(key: string): React.ReactNode {
    return this.#map.get(key);
  }
}

const routeMap = new RouteMap();

export default routeMap;
