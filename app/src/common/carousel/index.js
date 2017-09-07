// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
import assign from 'object-assign';
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import SlickCarousel from 'react-slick';
import React from 'react';

export default class Carousel extends React.Component {
  static defaultProps = {
    dots: true,
    arrows: false,
  }

  render() {
    let props = assign({}, this.props);

    if (props.effect === 'fade') {
      props.fade = true;
      props.draggable = false;
    }

    let className = 'jgui-carousel';
    if (props.vertical) {
      className = `${className} jgui-carousel-vertical`;
    }

    return (
      <div className={className}>
        <SlickCarousel {...props} />
      </div>
    );
  }
}
