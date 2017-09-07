import React, { PropTypes } from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);
import splitObject from '../_util/splitObject';
export default function Col(props) {
  const [{span, order, offset, push, pull, className, children}, others] = splitObject(props,
    ['span', 'order','offset', 'push','pull', 'className','children']);
  let sizeClassObj = {};
  ['xs', 'sm', 'md', 'lg'].forEach(size => {
    let sizeProps = {};
    if (typeof props[size] === 'number') {
      sizeProps.span = props[size];
    } else if (typeof props[size] === 'object') {
      sizeProps = props[size] || {};
    }
    sizeClassObj = assign({}, sizeClassObj, {
      [`jgui-col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`jgui-col-${size}-order-${sizeProps.order}`]: sizeProps.order,
      [`jgui-col-${size}-offset-${sizeProps.offset}`]: sizeProps.offset,
      [`jgui-col-${size}-push-${sizeProps.push}`]: sizeProps.push,
      [`jgui-col-${size}-pull-${sizeProps.pull}`]: sizeProps.pull,
    });
  });
  const classes = classNames(assign({}, {
    [`jgui-col-${span}`]: span !== undefined,
    [`jgui-col-order-${order}`]: order,
    [`jgui-col-offset-${offset}`]: offset,
    [`jgui-col-push-${push}`]: push,
    [`jgui-col-pull-${pull}`]: pull,
    [className]: !!className,
  },sizeClassObj));

  return <div {...others} className={classes}>{children}</div>;
}

Col.propTypes = {
  span: stringOrNumber,
  order: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber,
  className: PropTypes.string,
  children: PropTypes.node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
};
