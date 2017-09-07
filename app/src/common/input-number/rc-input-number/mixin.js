function noop() {
}

export default {
  getDefaultProps() {
    return {
      max: Infinity,
      min: -Infinity,
      step: 1,
      style: {},
      defaultValue: null,
      onChange: noop,
      onKeyDown: noop,
      onFocus: noop,
      onBlur: noop,
    };
  },

  getInitialState() {
    let value;
    const props = this.props;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    value = this.toPrecisionAsStep(value);
    return {
      inputValue: value,
      value,
      focused: props.autoFocus,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = this.toPrecisionAsStep(nextProps.value);
      this.setState({
        inputValue: value,
        value,
      });
    }
  },

  onChange(e) {
    this.setInputValue(this.getValueFromEvent(e).trim());
  },

  onFocus(...args) {
    this.setState({
      focused: true,
    });
    this.props.onFocus(...args);
  },

  onBlur(e, ...args) {
    this.setState({
      focused: false,
    });
    const value = this.getCurrentValidValue(this.getValueFromEvent(e).trim());
    this.setValue(value);
    this.props.onBlur(e, ...args);
  },

  getCurrentValidValue(value) {
    let val = value;
    const props = this.props;
    if (val === '') {
      val = '';
    } else if (!isNaN(val)) {
      let valNum = Number(val);
      if (valNum < props.min) {
        val = props.min;
      }
      if (valNum > props.max) {
        val = props.max;
      }
    } else {
      val = this.state.value;
    }
    return this.toPrecisionAsStep(val);
  },

  setValue(v) {
    if (!('value' in this.props)) {
      this.setState({
        value: v,
        inputValue: v,
      });
    }
    const newValue = isNaN(v) || v === '' ? undefined : v;
    if (newValue !== this.state.value) {
      this.props.onChange(newValue);
    } else {
      // revert input value
      this.setState({
        inputValue: this.state.value,
      });
    }
  },

  setInputValue(v) {
    this.setState({
      inputValue: v,
    });
  },

  getPrecision() {
    const props = this.props;
    const stepString = props.step.toString();
    if (stepString.indexOf('e-') >= 0) {
      return parseInt(stepString.slice(stepString.indexOf('e-') + 1), 10);
    }
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
      precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
  },

  getPrecisionFactor() {
    const precision = this.getPrecision();
    return Math.pow(10, precision);
  },

  toPrecisionAsStep(num) {
    if (isNaN(num) || num === '') {
      return num;
    }
    const precision = this.getPrecision();
    let inputPrecision = num ? num.toString().split('.') : [];
    inputPrecision = inputPrecision.length > 1 ? inputPrecision[1].length : 0;
    return Number(num).toFixed(Math.min(inputPrecision, Math.abs(precision)));
  },

  upStep(val) {
    const { step, min } = this.props;
    const precisionFactor = this.getPrecisionFactor();
    let result;
    if (!isNaN(val)) {
      val = Number(val);
      result = (precisionFactor * val + precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? step : min;
    }
    return this.toPrecisionAsStep(result);
  },

  downStep(val) {
    const { step, min } = this.props;
    const precisionFactor = this.getPrecisionFactor();
    let result;
    if (!isNaN(val)) {
      val = Number(val);
      result = (precisionFactor * val - precisionFactor * step) / precisionFactor;
    } else {
      result = min === -Infinity ? -step : min;
    }
    return this.toPrecisionAsStep(result);
  },

  step(type, e) {
    if (e) {
      e.preventDefault();
    }
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const value = this.getCurrentValidValue(this.state.value);
    this.setState({ value });
    if (isNaN(value)) {
      return;
    }
    const val = this[`${type}Step`](value);
    if (val > props.max || val < props.min) {
      return;
    }
    this.setValue(val);
    this.setState({
      focused: true,
    });
  },

  down(e) {
    this.step('down', e);
  },

  up(e) {
    this.step('up', e);
  },
};
