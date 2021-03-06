import React, { PropTypes } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/module/Panel';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import classNames from 'classnames';
import defaultLocale from './locale/zh_CN';
import assign from 'object-assign';

export default function wrapPicker(Picker, defaultFormat) {
  const PickerWrapper = React.createClass({
    getDefaultProps() {
      return {
        format: defaultFormat || 'yyyy-MM-dd',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange() {
        },
        onOk() {
        },
        toggleOpen() {
        },
        locale: {},
        align: {
          offset: [0, -9],
        },
      };
    },

    contextTypes: {
      antLocale: PropTypes.object,
    },

    getLocale() {
      const props = this.props;
      let locale = defaultLocale;
      const context = this.context;
      if (context.antLocale && context.antLocale.DatePicker) {
        locale = context.antLocale.DatePicker;
      }
      // 统一合并为完整的 Locale
      const result = assign({}, locale, props.locale);
      result.lang = assign({}, locale.lang, props.locale.lang);
      // comment(zhoulj) 哥仑步临时处理，后端服务统一修改北京时区， 后续优化时区这1行代码可以删除
      result.timezoneOffset =  8 * 60;
      //
      return result;
    },

    getFormatter() {
      const format = this.props.format;
      const formatter = new DateTimeFormat(format, this.getLocale().lang.format);
      return formatter;
    },

    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, {locale: this.getLocale()});
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(this.getLocale());
          date.setTime(+value);
          return date;
        }
      }
      return value;
    },

    toggleOpen ({open}) {
      this.props.toggleOpen({open});
    },

    render() {
      const props = this.props;
      const pickerClass = classNames({
        'jgui-calendar-picker': true,
      });
      const pickerInputClass = classNames({
        'jgui-calendar-range-picker': true,
        'jgui-input': true,
        'jgui-input-lg': props.size === 'large',
        'jgui-input-sm': props.size === 'small',
      });

      const locale = this.getLocale();

      const timeFormat = props.showTime && props.showTime.format;
      const rcTimePickerProps = {
        formatter: new DateTimeFormat(timeFormat || 'HH:mm:ss', locale.timePickerLocale.format),
        showSecond: timeFormat && timeFormat.indexOf('ss') >= 0,
        showHour: timeFormat && timeFormat.indexOf('HH') >= 0,
      };
      const timePicker = props.showTime ? (
          <TimePickerPanel
              {...rcTimePickerProps}
              {...props.showTime}
              prefixCls="jgui-calendar-time-picker"
              placeholder={locale.timePickerLocale.placeholder}
              locale={locale.timePickerLocale}
              transitionName="slide-up"
          />
      ) : null;

      return (
          <Picker
              {...props}
              pickerClass={pickerClass}
              pickerInputClass={pickerInputClass}
              locale={locale}
              timePicker={timePicker}
              toggleOpen={this.toggleOpen}
              getFormatter={this.getFormatter}
              parseDateFromValue={this.parseDateFromValue}
          />
      );
    },
  });
  return PickerWrapper;
}
