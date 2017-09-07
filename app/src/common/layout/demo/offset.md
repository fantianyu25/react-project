---
order: 2
title: 左右偏移
---

列偏移。

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

````jsx
import { Row, Col } from 'jgui';

ReactDOM.render(
  <div>
    <Row>
      <Col span={8}>.jgui-col-8</Col>
      <Col span={8} offset={8}>.jgui-col-8</Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>.jgui-col-6 .jgui-col-offset-6</Col>
      <Col span={6} offset={6}>.jgui-col-6 .jgui-col-offset-6</Col>
    </Row>
    <Row>
      <Col span={12} offset={6}>.jgui-col-12 .jgui-col-offset-6</Col>
    </Row>
  </div>,
  mountNode
);
````
