import React from 'react';
import classNames from 'classnames';

export default class Image extends React.Component {
    static defaultProps = {
        prefixCls: 'jgui-img',
        lazy: false,
        fakeSrc: '',
        onLoad() {},
        onError() {}
    }

    constructor(props) {
        super(props);
        const { lazy } = props;
        let supportLazy = typeof document.body.getBoundingClientRect === 'function';
        this.state = {
            loadimg: !(lazy && supportLazy)
        };
    }

    componentDidMount() {
        if (!this.state.loadimg) {
            this.lazyInterval = setInterval(() => {
                let ele = this.refs.img;
                let eleTop = ele.getBoundingClientRect().top;
                let clientHeight = document.documentElement.clientHeight;
                if (eleTop < clientHeight) {
                    clearInterval(this.lazyInterval);
                    this.setState({
                        loadimg: true,
                    });
                }
            }, 500);
        }
    }

    componentWillUnmount() {
        this.lazyInterval && clearInterval(this.lazyInterval);
    }

    handleImageError(e) {
        this.props.onError(e);
    }

    handleImageLoad(e) {
        this.props.onLoad(e);
    }

    render() {
        const { src, fakeSrc, lazy, className, prefixCls, ...others } = this.props;
        let classes = classNames({
            [prefixCls]: true,
            [className]: className
        });
        if (this.state.loadimg || !lazy) {
            return (
                <img ref="img" className={classes} src={src} {...others} onError={this.handleImageError.bind(this)} onLoad={this.handleImageLoad.bind(this)}/>
            );
        } else {
            return (
                <img ref="img" className={classes} src={fakeSrc} {...others}/>
            );
        }
    }
}