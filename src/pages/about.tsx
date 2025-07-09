import { useMount } from "ahooks";
import { useMemo, useRef, useState } from "react";

const Home = () => {
  const [a, setA] = useState(0);
  const dRef = useRef(0);
  dRef.current = useMemo(() => {
    return a * 10;
  }, [a]);

  useMount(() => {
    setTimeout(() => {
      console.log(dRef.current);
    }, 3000);

    setA(10);
  });

  return <>{dRef.current}</>;
};

export default Home;
