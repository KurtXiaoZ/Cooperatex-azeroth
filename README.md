# Azeroth开发文档

## 本地部署
```
1. 将你的branch git clone到本地
2. cd至本地项目顶层
3. 执行yarn install
4. 执行yarn start
5. 前往/Home（http://localhost:3000/Home）
```

## 复杂部分的实现

```
1. canvas元素的拖拽、缩放功能
    利用react-draggable这个库，通过其中的Draggable组件，首先包裹实际要渲染的元素，然后根据情况加上四个点/两个点用于缩放
    拖拽 / 缩放元素时，就可以根据Draggable的onDrag事件获取到当前位置的值（xy），然后根据情况更新redux store里这个元素对应的数据就可以
2. canvas元素的辅助线和自动对齐
    都在/src/components/canvas/canvasComponent/LineHor+LineVer，想法就是，我们会在操作一个canvas元素的时候，更新记录在canvasReducer的selectedPosition来记录当前被操作的Canvas元素的位置
    每条辅助线都有一个prop表示它的位置（left / top），每条辅助线根据自己的位置和被操作元素的位置判断需不需要自动对齐
    如果需要，就更新canvasReducer的align，元素监听到align的变化，进行自动对齐
```

## 添加新的元素的流程
```
1. 设计好新元素的数据模版，如果是从左侧菜单栏加入画布，可以参考/src/components/LeftMenu/ThirdColumnText的方式去添加新元素，使用OptionWrapper组件
2. 模版一定要有：
    x -- 元素的left值
    y -- 元素的top值
    type -- 元素的类型
3. 设计新元素相关的一些文件：
    1）元素本身的渲染文件 -- 放在了/src/components/canvas/specificComponents
        其中每个文件夹对应一类元素的渲染，包括它本身的渲染、它编辑器图标的渲染、它的各种编辑器的渲染
    2）元素的编辑器图标渲染
    3）元素的各种编辑器渲染
4. 在/src/components/canvas/specificComponents/index.tsx里
    1）在typeToComponent，把type和元素本身的渲染组件对应起来
    2）在renderSetterIcons，把type和元素的编辑器图标的渲染组件对应起来
5. 在/src/components/canvas/CanvasComponent/Setter/index.tsx里
    1）在Setter中，把type和元素的编辑器组件对应起来
```

## 未完成部分
```
1. 一些优化，包括：
    1）自适应
    2）右侧菜单栏用户体验优化
2. Azeroth在移动端web app的渲染
    解决方案：
        在Azeroth中，canvas上的所有元素都是基于Redux中存储的对应的对象来渲染的，这一点体现在/redux/pagesReducer.tsx中
        表示每一个page的对象都会有components这个属性，它的值就是这一页上的所有元素的数据
        我们渲染每一个元素的时候，就是先读取到redux store保存的这个元素的数据，然后我们依据约定好的渲染每一类元素的规则，进行渲染
        所以其实在移动端的渲染的逻辑是一样的，我们会把redux store保存的所有页面的数据传到服务器或者把这些数据在前端解析build出index.html(npm/yarn build)
        无论哪种方式，我们依照在Azeroth这边规定的元素渲染规则，去把这些元素渲染出来就可以了
        一个例子：
            Text组件的数据结构大概是：
            {
                x: 123,
                y: 456,
                style: {
                    display: 'block',
                    fontFamily: 'Roboto',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#4D4D4D',
                    width: '223px',
                    height: '56px',
                    opacity: 1,
                }
            }
            一种x、y对应的是这个元素的left、top值（绝对定位），style就是它的内联样式，我们在负责渲染它的文件里规定好它如何把拿到的这些数据渲染成元素就可以
            （Text组件的渲染文件在/src/components/canvas/specificComponents/text/Text）
3. Decorative类的组件有很多没完成，由于figma无法提供能够自动拉伸的svg，这部分需要对svg的熟练掌握，直接按照我们写新元素的逻辑一个个加上就可以
4. switcher组件部分完成，目前的逻辑是：
    switcher组件一渲染出来，就先在redux store遍历我们当前所在页面的所有元素，然后记录下在它之上的和之下的所有元素
    这样我们拉伸或者拖拽switcher元素，就直接同步的对我们记录过的元素进行需要的更新
    同时switcher组件也记录自己包含的元素，这样拖拽switcher元素的时候，我们给它包含的元素施加同样的位移
    我们也能通过switcher组件记录下的自己包含的元素，实现分页
    未完成的最复杂的部分是，当switcher刚刚生成，还没确认，拖拽它的时候如果碰撞到其他元素，会禁止switcher的拖拽
        这里可以通过辅助线实现/src/components/canvas/canvasComponent/LineHor+LineVer
        目前，当我们移动或者拉伸一个canvas上的元素，会同步更新canvas reducer的selectedPosition来表示它当前的位置，基于这个位置，辅助线自行判断时候要自动对齐
        如果触发了自动对齐的条件，我们可以在原有代码的基础上，再判断一下现在正在移动的这个元素它有没有碰到任何一个元素，如果碰到了，说明它的边界触碰到另一个元素了
        侦测到碰到另一个元素的话，我们就禁止当前元素的拖拽/拉伸
5. IR组件内容的自动缩放
    这个部分我认为产品也没有完全定下来，如果确认要这样做，其实就是把redux里保存的这个IR组件数据的一些部分变成百分比之类的相对单位就可以，然后渲染的时候或者拖拽/拉伸的候做一个换算即可
6. 其他部分不涉及目前的代码了
```

## 说明
```
最初的工程师没有提供任何注释，导致开发新业务时无法沿用之前的进度，而且很多无效代码难以删除，所以README文档只描述有效代码
```

## 有效部分的directory
```
｜- components
    ｜- canvas      画布元素
    ｜- LeftMenu    左侧菜单栏
    ｜- RightMenu   右侧菜单栏
｜- pages
    ｜- Home        Home这个route的页面
｜- redux           redux reducers

```