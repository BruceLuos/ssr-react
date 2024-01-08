


# React ssr 搭建

## 运行
```
yarn install 
yarn dev
```

## 打包
```
yarn build
```

## 部署后运行
```
node dist/bundle_server.js
```
## Step

```
npm init
```

```
mkdir src
touch server.js
yarn add express

```

```
yarn add react react-dom react-router-dom
mkdir pages
touch Home.js Person.js
yarn add webpack webpack-cli webpack-node-externals -D
yarn add @babel/core @babel/preset-react @babel/preset-env babel-loader -D
yarn add npm-run-all -D
yarn add nodemon -D
```

加入路由
```
touch routes.js use Router
edit server.js 

app.get("*", (req, res) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter>
      <RoutesList />
    </StaticRouter>
  );

  console.log("content", content);

  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root">${content}</div>
    </body>
  </html>
`;

  res.writeHead(200, {
    "content-type": "text/html;charset=utf8",
  });
  res.end(html);
});

```

服务端加入事件
```
touch client.js
ReactDom.hydrate 前端接管服务端渲染的页面
服务端html中引入client.js打包后的bundle_client.js,成功注入事件

```

服务端加入状态管理
```
yarn add redux react-redux redux-thunk
mkdir store
mkdir actions
mkdir reducers
```
home page use store

```
import { useDispatch, useSelector } from "react-redux";

const Home = ()=> {
const dispatch = useDispatch()
const homeData = useSelector(state=> state.home)
}
```
client.js Provider store
```
import { Provider } from "react-redux";
import createStoreInstance from './store';
import Routes from './routes';
import store from './store'
ReactDOM.hydrateRoot(
  document.querySelector("#root"),
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

```
server.js Provider store
```
 const store = createStoreInstance();
  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter>
        <Routes />
      </StaticRouter>
    </Provider>
  );
```

页面组件支持服务端渲染获取异步数据
Home.js
```
Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData);
};
```
server.js
根据组件抛出的getInitialData方法决定数据渲染是否在服务端处理
```
  const promises = routesConfig?.map((route) => {
    const component = route?.component;

    if (route?.path === req?.url && component?.getInitialData) {
      return component?.getInitialData(store);
    } else {
      return null;
    }
  });
```

发现问题-数据已经是在服务端中获取了，但页面展示还是会先空白再显示数据。
这是因为虽然你服务端已经拿到数据了，但是客户端却不知道，仍然按照客户端的渲染方式，再一次获取数据再渲染
这就是csr和ssr没有结合起来，重复做了同一件事

处理方法
store 加入preloadedState用来注入客户端
```
export default function createStoreInstance(preloadedState = {}) {
  console.log(thunk)
  return createStore(reducer, preloadedState, applyMiddleware(thunk));
}

```
服务端注入window.__PRELOAD_STATE__数据
```
  <script>
          window.__PRELOAD_STATE__=${JSON.stringify(preloadedState)}
          </script>
```
客户端的store直接获取window.__PRELOAD_STATE__
```
const store = createStoreInstance(window?.__PRELOAD_STATE__);
```

处理css样式
使用css-loader 开启modules按模块区分并将css内嵌在html上
```
  {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },

```


