import React from 'react';
import Checkbox from './index';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import assign from 'object-assign';
export default class CheckboxGroup extends React.Component {
    static defaultProps = {
        options: [],
        prefixCls: 'jgui-checkbox-group',
        orientation: 'horizontal',
        defaultValue: [],
        onChange() {
        },
    }
    static propTypes = {
        defaultValue: React.PropTypes.array,
        value: React.PropTypes.array,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        let value;
        if ('value' in props) {
            value = props.value || [];
        } else if ('defaultValue' in props) {
            value = props.defaultValue || [];
        }
        this.state = {value};
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || [],
            });
        }
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    getOptions() {
        const {options} = this.props;
        return options.map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                };
            }
            return option;
        });
    }

    toggleOption = (option, options) => {
        let newValue = assign([], this.state.value);
        const optionIndex = this.state.value.indexOf(option.value);
        if (optionIndex === - 1) {
            newValue.push(option.value);
        } else {
            newValue.splice(optionIndex, 1);
        }

        let value = [];
        options.map((o)=> {
            let index = newValue.indexOf(o.value);
            if (index >= 0) {
                value.push(newValue[index])
            }
        });
        if (!('value' in this.props)) {
            this.setState({value});
        }

        this.props.onChange(value);
    }

    render() {
        const options = this.getOptions();
        const {prefixCls, orientation} = this.props;
        const classes = classNames({
            [prefixCls]: true,
            [`${prefixCls}-${orientation}`]: true,
        });

        return (
            <div className={classes}>
                {
                    options.map(option =>
                        <Checkbox disabled={'disabled' in option ? option.disabled : this.props.disabled}
                                  checked={this.state.value.indexOf(option.value) !== -1}
                                  onChange={() => this.toggleOption(option, options)}
                                  className="jgui-checkbox-group-item" key={option.value}
                        >
                            {option.label}
                        </Checkbox>
                    )
                }
            </div>
        );
    }
}
