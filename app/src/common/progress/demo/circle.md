---
order: 1
title: 进度圈
---

圈形的进度。

````jsx
import { Progress } from 'jgui';

ReactDOM.render(
  <div>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </div>
  , mountNode);
````

<style>
.jgui-progress-circle-wrap,
.jgui-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
