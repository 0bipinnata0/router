import useOutlet from "../hook/useOutlet";

const Outlet: React.FC = () => {
  const outletEle = useOutlet();
  return <>{outletEle}</>;
};

export default Outlet;
