import React from 'react';
import { Input, Button, Icon } from 'jgui';
import classNames from 'classnames';
const InputGroup = Input.Group;

const SearchInput = React.createClass({
    getDefaultProps() {
        return {
            defaultValue: '',
            onChange() {},
            onFocusBlur() {},
            onSearch() {},
            onClear() {},
        }
    },

    getInitialState() {
        return {
            value: '',
            focus: false,
        };
    },

    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
        this.props.onChange(e.target.value);
    },

    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
        this.props.onFocusBlur(e.target === document.activeElement);
    },

    componentWillReceiveProps(newProps) {
        if (newProps.value !== null && typeof newProps.value !== 'undefined') {
            this.setState({
                value: newProps.value
            })
        }
    },

    handleSearch(e) {
        if (e.which === 13) {
            e.preventDefault();
        }
        this.props.onSearch(this.state.value);
    },

    handleClear(e) {
        this.setState({
            value: '',
        });
        this.props.onClear('');
    },

    render() {
        const { style, size, value, ...restProps } = this.props;
        let notEmpty = !!this.state.value.trim();
        const btnCls = classNames({
            'jgui-search-btn': true,
            'jgui-search-btn-noempty': notEmpty,
        });
        const searchCls = classNames({
            'jgui-search-input': true,
            'jgui-search-input-focus': this.state.focus,
            'jgui-search-input-sm': size === 'small',
            'jgui-search-input-lg': size === 'large',
            'jgui-search-input-noempty': notEmpty,
        });
        return (
            <div className="jgui-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                    <Input {...restProps} value={this.state.value} onChange={this.handleInputChange}
                                          onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
                                          size={size}
                    />
                    <Icon type="cross-circle" onClick={this.handleClear}/>
                    <div className="jgui-input-group-wrap">
                        <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
                    </div>
                </InputGroup>
            </div>
        );
    },
})

export default SearchInput