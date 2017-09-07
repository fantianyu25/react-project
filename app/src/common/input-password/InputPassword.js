import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import Input from '../input';
import defaultLocale from './locale/zh_CN';
import assign from 'object-assign';

import LevelFilter from './levelFilter';
import Level from './level';
import Constants from './Constants';

function noop() { }

class InputPassword extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            errorTip: '',
            level: Constants.LEVEL_LOW,
            levelLow: false //光标移入，极低级密码显示跟弱密码强度一致. 区分change、focus level
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    static propTypes = {
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        getValidate: PropTypes.func
    }

    static defaultProps = {
        placeholder: '',
        onChange: noop,
        getValidate: noop
    }

    static contextTypes = {
        antLocale: React.PropTypes.object,
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    getLocale() {
        const props = this.props;
        let locale = defaultLocale;
        const context = this.context;
        if (context && context.antLocale && context.antLocale.InputPassword) {
            locale = context.antLocale.InputPassword;
        }
        const result = assign({}, locale, props.locale);
        return result;
    }

    onBlur(event) {
        const locale = this.getLocale();
        var value = event.target.value.trim();
        if (!value) {
            this.setState({
                errorTip: locale.enter_new_password
            });
            return;
        } else if (value.length < Constants.MIN_LENGTH || value.length > Constants.MAX_LENGTH) {
            this.setState({
                errorTip: locale.length_8_20_case_sensitive
            });
            return;
        } else if (/[\u4e00-\u9fa5；，【】《》：、‘“”’！￥……（）——。？]+/g.test(value)) {
            this.setState({
                errorTip: locale.not_allow_chinese
            });
            return;
        } else if (this.state.level === Constants.LEVEL_INIT) {
            this.setState({
                errorTip: locale.increase_password_strength
            });
        } else {
            this.setState({
                errorTip: ''
            })
        }
    }

    onFocus(event) {
        this.setState({
            errorTip: '',
            level: this.state.level > Constants.LEVEL_INIT ? this.state.level : Constants.LEVEL_INIT
        });
    }

    onChange(event) {
        let value = event.target.value.trim();
        let level = Constants.LEVEL_INIT;
        let levelLow = false;
        if (value.length >= Constants.MIN_LENGTH) {
            //确定密码等级
            if (/\d+/.test(value)) {
                level++;
            }
            if (/[a-z]+/.test(value)) {
                level++;
            }
            if (/[A-Z]+/.test(value)) {
                level++;
            }
            if (/[^a-zA-Z\d]+/.test(value)) {
                level++;
            }
            if (LevelFilter[value] === Constants.LEVEL_LOW_STR) {
                level = Constants.LEVEL_INIT;
                levelLow = true;
            }
        }
        this.props.onChange(value, level);
        this.setState({
            value: value,
            level: level,
            levelLow: levelLow
        });
    }

    onValidate(oldPassword) {
        const locale = this.getLocale();
        if (!this.state.value) {
            this.setState({
                errorTip: locale.enter_new_password
            });
            return false;
        } else if (this.state.level <= Constants.LEVEL_INIT) {
            return false;
        } else if (oldPassword === this.state.value) {
            this.setState({
                errorTip: locale.password_same_old
            });
            return false;
        }
        return true;
    }

    render() {
        const { placeholder, getValidate } = this.props;
        const { value, level, errorTip, levelLow } = this.state;

        const locale = this.getLocale();
        getValidate(this.onValidate);

        return (
            <div className={`input-password-wrap ${errorTip ? 'has-error' : ''}`}>
                <Input type="password"
                    maxLength={Constants.MAX_LENGTH}
                    placeholder={placeholder}
                    value={this.state.value}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange} />
                <div className={`warn-tip ${!errorTip && level > Constants.LEVEL_LOW ? ' show' : ''}`}>
                    <Level level={level}
                        locale={locale}
                        levelLow={levelLow}>
                    </Level>
                </div>
                <div className={`error-tip ${errorTip ? 'show' : ''}`}>
                    {errorTip}
                </div>
            </div>
        );

    }
};

export default InputPassword;