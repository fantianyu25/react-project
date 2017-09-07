import React, { PropTypes } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import mixin from './mixin';

const InputNumber = React.createClass({
  propTypes: {
    styles: PropTypes.object,
    style: PropTypes.object,
    upStyle: PropTypes.object,
    downStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    max: PropTypes.number,
    min: PropTypes.number,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
  },

  mixins: [mixin],

  onPressIn(type) {
    if (this.props.disabled) {
      return;
    }
    const { styles } = this.props;
    this[type].setNativeProps({
      style: [styles.stepWrap, styles.highlightStepBorderColor],
    });
    this[`${type}Text`].setNativeProps({
      style: [styles.stepText, styles.highlightStepTextColor],
    });
  },

  onPressOut(type) {
    if (this.props.disabled) {
      return;
    }
    const { styles } = this.props;
    this[type].setNativeProps({
      style: [styles.stepWrap],
    });
    this[`${type}Text`].setNativeProps({
      style: [styles.stepText],
    });
  },

  onPressInDown() {
    this.onPressIn('_stepDown');
  },
  onPressOutDown() {
    this.onPressOut('_stepDown');
  },
  onPressInUp() {
    this.onPressIn('_stepUp');
  },
  onPressOutUp() {
    this.onPressOut('_stepUp');
  },

  getValueFromEvent(e) {
    return e.nativeEvent.text;
  },

  render() {
    const { props, state } = this;
    const { style, upStyle, downStyle, inputStyle, styles } = this.props;

    let upDisabledStyle = null;
    let downDisabledStyle = null;
    let upDisabledTextStyle = null;
    let downDisabledTextStyle = null;
    const value = state.value;
    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= props.max) {
        upDisabledStyle = styles.stepDisabled;
        upDisabledTextStyle = styles.disabledStepTextColor;
      }
      if (val <= props.min) {
        downDisabledStyle = styles.stepDisabled;
        downDisabledTextStyle = styles.disabledStepTextColor;
      }
    } else {
      upDisabledStyle = styles.stepDisabled;
      downDisabledStyle = styles.stepDisabled;
      upDisabledTextStyle = styles.disabledStepTextColor;
      downDisabledTextStyle = styles.disabledStepTextColor;
    }

    let inputDisabledStyle = null;
    if (props.disabled) {
      upDisabledStyle = styles.stepDisabled;
      downDisabledStyle = styles.stepDisabled;
      upDisabledTextStyle = styles.disabledStepTextColor;
      downDisabledTextStyle = styles.disabledStepTextColor;
      inputDisabledStyle = styles.disabledStepTextColor;
    }

    let inputDisplayValue;
    if (state.focused) {
      inputDisplayValue = `${state.inputValue}`;
    } else {
      inputDisplayValue = `${state.value}`;
    }

    if (inputDisplayValue === undefined) {
      inputDisplayValue = '';
    }

    return (
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback
          onPress={!downDisabledStyle && this.down || undefined}
          onPressIn={!downDisabledStyle && this.onPressInDown || undefined}
          onPressOut={!downDisabledStyle && this.onPressOutDown || undefined}
        >
          <View
            ref={component => this._stepDown = component}
            style={[styles.stepWrap, downDisabledStyle, downStyle]}
          >
            <Text
              ref={component => this._stepDownText = component}
              style={[styles.stepText, downDisabledTextStyle]}
            >-</Text>
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          style={[styles.input, inputDisabledStyle, inputStyle]}
          ref="input"
          value={inputDisplayValue}
          autoFocus={props.autoFocus}
          editable={!props.readOnly && !props.disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          underlineColorAndroid="transparent"
        />
        <TouchableWithoutFeedback
          onPress={!upDisabledStyle && this.up || undefined}
          onPressIn={!upDisabledStyle && this.onPressInUp || undefined}
          onPressOut={!upDisabledStyle && this.onPressOutUp || undefined}
        >
          <View
            ref={component => this._stepUp = component}
            style={[styles.stepWrap, upDisabledStyle, upStyle]}
          >
            <Text
              ref={component => this._stepUpText = component}
              style={[styles.stepText, upDisabledTextStyle]}
            >+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
});

export default InputNumber;
