import useOutlet from "../hook/useOutlet";

// import { useOutlet } from "react-router-dom";

const Outlet: React.FC = () => {
  const outletEle = useOutlet();
  return <>{outletEle}</>;
};

export default Outlet;
