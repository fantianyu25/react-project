import React, { PropTypes, ReactDOM } from 'react';
import classNames from 'classnames';

export default class Drawer extends React.Component {
  static defaultProps = {
    prefixCls: 'jgui-drawer',
    onClick() {},
    open: true,
  }
  // 定义数据类型
  static propTypes = {
    open: React.PropTypes.bool,
    direction: React.PropTypes.oneOf(['left', 'top','bottom','right']),
    size: React.PropTypes.number,
    onClick: React.PropTypes.func,
    zIndex: React.PropTypes.number,
    transition: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {

    const props = this.props;
    const { prefixCls,children,direction,className} = props;

    // 用户自定义 需要样式覆盖控制的
    const drawerOverlay = {
      width:   props.size || 250,
      height:  props.size || 250,
      zIndex:  props.zIndex || 998,
      position:props.position,
      transition: props.transition,
      className: props.className || '',
    }
    // 用类名控制 样式写在SCSS文件里的
    let classes = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-open`]: props.open,
      [`${prefixCls}-close`]: !props.open,
      [`${prefixCls}-${direction}`]: true,
      [className]: className,
    });

    return (
        <div className={classes}  style= {drawerOverlay}>
          {children}
        </div>
    )
  }
}
