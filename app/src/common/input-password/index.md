---
category: Components
chinese: 密码校验组件
type: Form Controls
english: InputPassword
---

密码校验及强弱级别显示的控件。

何时使用
--------

当用户需要传入onChange、getValidate事件，可以输入标准输入框，显示校验及密码强度。

API
---

```html
<InputPassword />
```

| 参数                 | 说明 | 类型 | 默认值 |
|---------------------|-----|-----|-------|
| placeholder         | 没有值的时候显示的内容 | string | "请输入当前密码" |
| onChange    | 输入框变化 | function(passwordValue, passwordLevel) | function(){} |
| getValidate  | 获取输入框校验方法 | function(func) | function(){} |
