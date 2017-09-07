import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
export default class Tag extends React.Component {
  static defaultProps = {
    prefixCls: 'jgui-tag',
    closable: false,
    onClose() {},
    afterClose() {},
  }

  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false,
    };
  }

  close = (e) => {
    this.props.onClose(e);
    if (e.defaultPrevented) return;
    const dom = ReactDOM.findDOMNode(this);
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    // It's Magic Code, don't know why
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    this.setState({
      closing: true,
    });
  }

  animationEnd = (key, existed) => {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false,
      });
      this.props.afterClose();
    }
  }

  render() {
    const [{
      prefixCls, closable, color, className, children
    },restProps] = splitObject(this.props,
      ['prefixCls', 'closable', 'color','className','children']);
    const close = closable ? <Icon type="cross" onClick={this.close} /> : '';
    const classString = classNames({
      [prefixCls]: true,
      [`${prefixCls}-${color}`]: !!color,
      [`${prefixCls}-close`]: this.state.closing,
      [className]: !!className,
    });
    return (
      <Animate component=""
        showProp="data-show"
        transitionName={`${prefixCls}-zoom`}
        transitionAppear
        onEnd={this.animationEnd}
      >
        {this.state.closed ? null : (
          <div data-show={!this.state.closing} {...restProps} className={classString}>
            <span className={`${prefixCls}-text`}>{children}</span>
            {close}
          </div>
        )}
      </Animate>
    );
  }
}
