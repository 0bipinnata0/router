import { useEffect } from "react";

const Info = () => {
  useEffect(() => {
    console.info("Info装载");
    return () => {
      console.info("Info卸载<<<");
    };
  }, []);
  return <div style={{ backgroundColor: "red" }}>this Dash info</div>;
};

export default Info;
