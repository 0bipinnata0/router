import { useEffect } from "react";

const Info = () => {
  useEffect(() => {
    console.info("Info装载");
    return () => {
      console.info("InfoDash");
    };
  }, []);
  return <div>Dash info</div>;
};

export default Info;
