## 结构
```
    ｜- Canvas          canvas画布，包含所有canvas组件的wrapper
    ｜- CanvasComponent canvas组件，实现了canvas组件的通用功能：拖拽、缩放、自动对齐
    ｜- ReactElement    包裹在canvas组件下的、真实的作为内容的组件，也是最后被渲染到移动端网页APP的在Azeroth的投射，它调用specificComponents中的每一类组件

```
