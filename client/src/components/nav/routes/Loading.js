import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import lg  from "../../../components/nav/routes/spin.gif";

export default function Loading({path = "login"}) {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();
  const location = useLocation()
  //console.log(location)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate(`${path}`,
      {state:location.pathname}
    );
    return () => clearInterval(interval);
  }, [count]);
  return <div className="d-flex justify-content-center align-item-center vh-100"><img src={lg} alt="loading imges"/></div>
}





