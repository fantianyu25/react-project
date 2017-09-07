---
category: Components
chinese: 抽屉
type: Views
english: Drawer
---

抽屉组件

## 何时使用

当一个页面需要做从 上 | 下 | 左 | 右 进行侧滑切出的时候,需要用到 可以通过按钮 进行抽屉的开启和关闭

## API


| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| open    | 距离窗口顶部达到指定偏移量后触发  `true`、`false`   | Bool |    true     |
| size | 这里的size 跟direction相关,如果direction是top、 bottom，这里的width相当于height   | Number |    250     |
| direction | 抽屉滑出的方向,可选值： `left` 、 `bottom` 、 `right` 、 `top` | string |    right     |
| zIndex | 抽屉的层级z-index   | Number | 9999   |
| transition | 定义抽屉滑出的过渡效果,跟CSS3的transition写法类似,eg: `transition:'all ease .1s'`   | string | 贝塞尔曲线   |
