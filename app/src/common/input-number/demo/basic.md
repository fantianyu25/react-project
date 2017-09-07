---
order: 0
title: 基本
---

数字输入框。

````jsx
import { InputNumber } from 'jgui';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={-22} max={10} onChange={onChange} placeholder="请输入" />
, mountNode);
````
