---
order: 7
title:
  zh-CN: 日期范围一
  en-US: Date range, case 1
---

## zh-CN

可以设置 `disabledDate` 方法，来约束开始和结束日期。

## en-US

You can use the `disabledDate` property to limit the start and end dates.


````jsx
import { DatePicker } from 'jgui';
const RangeCalendar = DatePicker.RangeCalendar;

ReactDOM.render(
  <RangeCalendar checkStrictly={true} format="yyyy-MM-dd"  defaultValue={[new Date(), new Date()]} onChange={(date, dateString) => { console.log(date, dateString)}}/>
, mountNode);
````
