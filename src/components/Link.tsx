import routeEmit from "./routeEmit";

{
  /* <Link to="/">Home</Link> */
}

const Link: React.FC<{
  to: string;
  children: string;
}> = ({ to, children }) => {
  return (
    <button
      onClick={() => {
        routeEmit.emit("popstate", to);
      }}
    >
      {children}
    </button>
  );
};
export default Link;
