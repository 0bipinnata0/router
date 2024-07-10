import routeEmit from "./routeEmit";

{
  /* <Link to="/">Home</Link> */
}

const Link: React.FC<{
  to: string;
  children: string;
}> = ({ to, children }) => {
  console.info("abc");
  return (
    <button
      onClick={() => {
        // history.pushState(null, "", to);
        console.info("to", to);
        routeEmit.emit("popstate", to);
      }}
    >
      {children}
    </button>
  );
};
export default Link;
