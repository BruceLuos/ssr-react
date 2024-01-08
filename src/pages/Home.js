import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../store/actions/home";

const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData);
  }, []);

  console.log("dispatch", dispatch);
  console.log("homeData", homeData);
  return (
    <div>
      Home page
      <button onClick={() => console.log("点击事件触发")}>点击事件</button>
      <ul>
        {homeData?.articles?.map((article) => (
          <li key={article?.id}>
            <p>文章标题：{article?.title}</p>
            <p>文章内容：{article?.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 通过getInitialData组件异步数据支持服务端渲染
Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData);
};

export default Home;
