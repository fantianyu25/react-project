import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Icon} from 'jgui';
import calculateNodeHeight from './calculateNodeHeight';
import assign from 'object-assign';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

export default class Input extends Component {
    static defaultProps = {
        defaultValue: '',
        disabled: false,
        prefixCls: 'jgui-input',
        type: 'text',
        onPressEnter() {
        },
        onKeyDown() {
        },
        onClear(){},
        withClear: false,
        autosize: false,
    }

    static propTypes = {
        type: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        size: PropTypes.oneOf(['small', 'default', 'large']),
        disabled: PropTypes.bool,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        className: PropTypes.string,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefixCls: PropTypes.string,
        withClear: PropTypes.bool,
        autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        onPressEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onClear: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            textareaStyles: null,
        };
    }

    componentDidMount() {
        this.resizeTextarea();
    }

    componentWillReceiveProps(nextProps) {
        // Re-render with the new content then recalculate the height as required.
        if (this.props.value !== nextProps.value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
        }
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onPressEnter(e);
        }
        this.props.onKeyDown(e);
    }

    handleTextareaChange = (e) => {
        this.resizeTextarea();
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handleClear() {
        this.props.onClear('');
    }

    resizeTextarea = () => {
        const {type, autosize} = this.props;
        if (type !== 'textarea' || !autosize || !this.refs.input) {
            return;
        }
        const minRows = autosize ? autosize.minRows : null;
        const maxRows = autosize ? autosize.maxRows : null;
        const textareaStyles = calculateNodeHeight(this.refs.input, false, minRows, maxRows);
        this.setState({textareaStyles});
    }

    renderLabledInput(children) {
        const props = this.props;
        const wrapperClassName = `${props.prefixCls}-group`;
        const addonClassName = `${wrapperClassName}-addon`;
        const addonBefore = props.addonBefore ? (
            <span className={addonClassName}>
        {props.addonBefore}
      </span>
        ) : null;

        const addonAfter = props.addonAfter ? (
            <span className={addonClassName}>
        {props.addonAfter}
      </span>
        ) : null;

        const className = classNames({
            [`${props.prefixCls}-wrapper`]: true,
            [wrapperClassName]: (addonBefore || addonAfter),
        });

        return (
            <span className={className}>
        {addonBefore}
                {children}
                {addonAfter}
      </span>
        );
    }

    renderInput() {
        const props = assign({}, this.props);
        const prefixCls = props.prefixCls;
        if (!props.type) {
            return props.children;
        }

        const inputClassName = classNames({
            [prefixCls]: true,
            [`${prefixCls}-sm`]: props.size === 'small',
            [`${prefixCls}-lg`]: props.size === 'large',
            [props.className]: !!props.className,
        });

        if ('value' in props) {
            props.value = fixControlledValue(props.value);
            // Input elements must be either controlled or uncontrolled,
            // specify either the value prop, or the defaultValue prop, but not both.
            delete props.defaultValue;
        }

        const wrapperClassName = classNames({
            [`${prefixCls}-withClear`]: props.withClear,
            [`${prefixCls}-noempty`]: !!props.value,
        });

        switch (props.type) {
            case 'textarea':
                return (
                    <textarea
                        {...props}
                        style={assign({}, props.style, this.state.textareaStyles)}
                        className={inputClassName}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        onChange={this.handleTextareaChange.bind(this)}
                        ref="input"
                    />
                );
            default:
                return props.withClear ? (
                    <div className={wrapperClassName}>
                        <input
                            {...props}
                            className={inputClassName}
                            onKeyDown={this.handleKeyDown.bind(this)}
                            ref="input"
                        />
                        <Icon type="cross-circle" onClick={this.handleClear.bind(this)}/>
                    </div>
                ) : (
                    <input
                        {...props}
                        className={inputClassName}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        ref="input"
                    />
                );
        }
    }

    render() {
        return this.renderLabledInput(this.renderInput());
    }
}
