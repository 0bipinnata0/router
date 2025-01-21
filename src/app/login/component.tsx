import { useState } from "react";

export function Login() {
  const [count, setCount] = useState(0);
  return (
    <div>
      登陆 {count}
      <button onClick={() => setCount((v) => v + 1)}>+1</button>
    </div>
  );
}
