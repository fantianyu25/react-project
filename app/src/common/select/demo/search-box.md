---
order: 9
title: 搜索框
---

带有搜索按钮的自动补全输入框。

````jsx
import { Input, Select, Button, Icon } from 'jgui';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://suggest.taobao.com/sug?${str}`, (err, d) => {
      if (currentValue === value) {
        const result = d.result;
        const data = [];
        result.forEach((r) => {
          data.push({
            value: r[0],
            text: r[0],
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
  getInitialState() {
    return {
      data: [],
      value: '',
      focus: false,
    };
  },
  handleChange(value) {
    this.setState({ value });
    fetch(value, (data) => this.setState({ data }));
  },
  handleSubmit() {
    console.log('输入框内容是: ', this.state.value);
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  render() {
    const btnCls = classNames({
      'jgui-search-btn': true,
      'jgui-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'jgui-search-input': true,
      'jgui-search-input-focus': this.state.focus,
    });
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div className="jgui-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.value}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
          >
            {options}
          </Select>
          <div className="jgui-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  },
});

ReactDOM.render(
  <SearchInput placeholder="input search text" style={{ width: 200 }} />
, mountNode);
````
