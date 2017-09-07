---
order: 3
title: 固定状态改变的回调
---

可以获得是否固定的状态。

````jsx
import { Affix, Button } from 'jgui';


const onChange = function (affixed) {
  console.log(affixed); // true or false
};

ReactDOM.render(
  <Affix offsetTop={120} onChange={onChange}>
    <Button>固定在距离顶部 120px 的位置</Button>
  </Affix>
, mountNode);
````
