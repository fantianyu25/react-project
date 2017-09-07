import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';

function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

export default class BackTop extends React.Component {

  static propTypes = {
    visibilityHeight: React.PropTypes.number,
  }

  static defaultProps = {
    onClick() {},
    visibilityHeight: 400,
    prefixCls: 'jgui-back-top',
  }

  constructor(props) {
    super(props);
    const scrollTop = getScroll(window, true);
    this.state = {
      visible: scrollTop > this.props.visibilityHeight,
    };
  }

  scrollToTop = (e) => {
    if (e) e.preventDefault();
    this.setScrollTop(0);
    this.props.onClick(e);
  }

  setScrollTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  handleScroll = () => {
    const scrollTop = getScroll(window, true);
    this.setState({
      visible: scrollTop > this.props.visibilityHeight,
    });
  }

  animationEnd = () => {
    const scrollTop = getScroll(window, true);
    this.setState({
      visible: scrollTop > this.props.visibilityHeight,
    });
  }

  componentDidMount() {
    this.scrollEvent = addEventListener(window, 'scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  render() {
    const { prefixCls, className, children, ...restProps } = this.props;
    const classString = classNames({
      [prefixCls]: true,
      [className]: !!className,
    });

    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <Icon className={`${prefixCls}-icon`} type="to-top" />
      </div>
    );

    const style = {
      display: this.state.visible ? 'block' : 'none',
    };

    return (
      <Animate
        showProp="data-show"
        transitionName="fade"
        onEnd={this.animationEnd}
        transitionAppear
      >
        <div data-show={this.state.visible} style={style}>
          <div {...restProps} className={classString} onClick={this.scrollToTop}>
            {children || defaultElement}
          </div>
        </div>
      </Animate>
    );
  }
}
