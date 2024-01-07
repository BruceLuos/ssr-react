



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

```