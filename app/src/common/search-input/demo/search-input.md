---
order: 1
title: 搜索框
---

带有搜索按钮的输入框。

````jsx
import { SearchInput } from 'jgui';

ReactDOM.render(<div className="example-search-input">
    <SearchInput placeholder="input search text" size="large"
        onSearch={value => console.log(value)} style={{ width: 200 }}/>

    <SearchInput placeholder="input search text"
        onSearch={value => console.log(value)} style={{ width: 200 }}/>

    <SearchInput placeholder="input search text" size="small"
        onSearch={value => console.log(value)} style={{ width: 200 }}/>

</div>, mountNode);
````


````css
.example-search-input .jgui-search-input-wrapper {
  margin: 0 8px 8px 0;
}
````