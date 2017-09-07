---
order: 7
title: 限制用户上传的文件
---

可以通过 `beforeUpload` 在文件上传之前进行干预，如限制用户只能上传 JPG 文件。

也支持异步检查，`beforeUpload` 的返回值可以是一个 Promise：[示例](http://react-component.github.io/upload/examples/beforeUpload.html)。

````jsx
import { Upload, Button, Icon, message } from 'jgui';

const props = {
  multiple: true,
  domain: 'localhost',
  beforeUpload(files) {
  /*
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只能上传 JPG 文件哦！');
    }
    return isJPG;
    */
     return new Promise((resolve, reject) => {
      let postFiles = Array.prototype.slice.call(files);
      postFiles = postFiles.map((file, index) => {
          file.action = '/upload.do?a=' + index
          return file
      })
         resolve(postFiles)
     })
  },
};

ReactDOM.render(
  <Upload {...props}>
    <Button type="ghost">
      <Icon type="upload" /> 点击上传
    </Button>
  </Upload>
, mountNode);
````
