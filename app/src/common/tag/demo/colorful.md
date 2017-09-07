---
order: 1
title: 各种类型
---

四种颜色的标签。

````jsx
import { Tag } from 'jgui';

ReactDOM.render(<div>
  <Tag closable color="blue">蓝色</Tag>
  <Tag closable color="green">绿色</Tag>
  <Tag closable color="yellow"><a href="https://github.com/jgui-design/jgui-design/issues/1862">黄色</a></Tag>
  <Tag closable color="red">红色</Tag>
</div>, mountNode);
````