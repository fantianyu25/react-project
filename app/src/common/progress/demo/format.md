---
order: 6
title: 自定义文字格式
---

`format` 属性指定格式。

````jsx
import { Progress } from 'jgui';

ReactDOM.render(
  <div>
    <Progress type="circle" percent={75} format={percent => `${percent / 10.0}折`} />
    <Progress type="circle" percent={100} format={() => '成功'} />
  </div>
, mountNode);
````

<style>
.jgui-progress-circle,
.jgui-progress-line {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
