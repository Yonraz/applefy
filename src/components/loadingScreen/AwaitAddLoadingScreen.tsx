import { useEffect, useState } from "react";
import loader from "../../assets/images/loader-blue.gif";

export default function AwaitAddLoadingScreen() {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(addDot(dots));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <img src={loader} />
      <h2>Adding tracks{dots}</h2>
    </>
  );
}
function addDot(dots: string) {
  if (dots.length === 3) return ".";
  else return dots + ".";
}
