## 结构
```
    ｜- canvasReducer.tsx             负责管理画布的状态
    ｜- frontendsReducer.tsx          负责管理右侧菜单栏frontends分页的状态
    ｜- irReducer.tsx                 负责管理IR组件的创建、编辑
    ｜- leftMenuReducer.tsx           负责管理左侧菜单栏的状态
    ｜- rightMenuReducer.tsx          负责管理右侧菜单栏pages的状态
    ｜- rightMenuReducer.tsx          负责管理右侧菜单栏pages分页的状态
    ｜- pagesReducer.tsx              负责管理每个page的所有组件的状态
```

## 整体
```
    Frontends代表App的不同端，App的不同端面向不同的人群，每一个都是一个移动端网页APP
    每个Frontend下，会有n个Pages，也就是一个移动端网页APP的不同页面
    每个Page会包含n个组件，显示在中心区域的画布上，切换page的话，画布的内容也会更新
```

## Redux管理模式
```
    由于Frontends可以重名，pages也可以重名，而且每个组件都是独一无二的，我们采用键值对的方式去管理每个Frontend、每个page、每个组件的状态
    为了确保key的唯一性，我们使用uniqid这个库，详情见npm
```