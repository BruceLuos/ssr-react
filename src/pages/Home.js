import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../store/actions/home";


const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state)=> state.home)

  useEffect(()=>{
    // dispatch(fetchHomeData)
  },[])

  console.log('dispatch', dispatch)
  console.log('homeData', homeData)
  return (
    <div>
      Home page
      <button onClick={() => console.log("点击事件触发")}>点击事件</button>
    </div>
  );
};

export default Home;
