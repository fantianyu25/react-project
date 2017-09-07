import React from 'react';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';

const DatePicker = wrapPicker(createPicker(RcCalendar));
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'yyyy-MM');

export default class RangeCalendar extends React.Component {
    static defaultProps = {
        checkStrictly: true,
        prefixCls: 'jgui-range-calender',
        justMonth: false,
        defaultValue: [],
        separator: '~',
        width: 180,
        showTime: false,
        format: 'yyyy-MM-dd HH:mm:ss',
        startTimePlaceHolder: '开始时间',
        endTimePlaceHolder: '结束时间',
        onChange() {
        },
    }

    constructor(props) {
        super(props);
        const { value, defaultValue, parseDateFromValue } = this.props;
        const start = (value && value[0]) || defaultValue[0];
        const end = (value && value[1]) || defaultValue[1];
        this.state = {
            startValue: parseDateFromValue(start),
            endValue: parseDateFromValue(end),
            endOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value || [];
            const start = nextProps.parseDateFromValue(value[0]);
            const end = nextProps.parseDateFromValue(value[1]);
            this.setState({
                startValue: start,
                endValue: end,
            });
        }
    }

    disabledStartDate(startValue) {
        if (!this.props.checkStrictly) {
            return false;
        }
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.getTime() > this.state.endValue.getTime();
    }

    disabledEndDate(endValue) {
        if (!this.props.checkStrictly) {
            return false;
        }
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.getTime() < this.state.startValue.getTime();
    }

    handleChange(field, value) {
        const props = this.props;
        if (!('value' in props)) {
            this.setState({
                [field]: value,
            });
        }
        const state = this.state;
        const {getFormatter, parseDateFromValue} = props;
        const startTime = field === 'startValue' ? value
                                                 : (state.startValue ? new Date(state.startValue.getTime()) : null);
        const endTime = field === 'endValue' ? value
                                             : (state.endValue ? new Date(state.endValue.getTime()) : null);

        const startDateString = startTime ? getFormatter().format(parseDateFromValue(startTime)) : '';
        const endDateString = endTime ? getFormatter().format(parseDateFromValue(endTime)) : '';

        props.onChange(
            [startTime, endTime],
            [startDateString, endDateString]
        )
    }

    onStartChange(value) {
        this.handleChange('startValue', value);
    }

    onEndChange(value) {
        this.handleChange('endValue', value);
    }

    handleStartToggle({open}) {
        if (!open && !this.state.endValue) {
            this.setState({endOpen: true});
        }
    }

    handleEndToggle({open}) {
        this.setState({endOpen: open});
    }

    render() {
        const {startTimePlaceHolder, endTimePlaceHolder, separator, prefixCls, format, width, showTime, justMonth ,disabled} = this.props;
        const {startValue, endValue, endOpen} = this.state;
        let Picker = justMonth ? MonthPicker : DatePicker;
        let showTimeProps = !justMonth && showTime ? { showTime } : {};

        return (
            <div className={`${prefixCls}`}>
                <Picker
                    disabled={disabled}
                    disabledDate={this.disabledStartDate.bind(this)}
                    {...showTimeProps}
                    width={width}
                    format={format}
                    value={startValue}
                    placeholder={startTimePlaceHolder}
                    onChange={this.onStartChange.bind(this)}
                    toggleOpen={this.handleStartToggle.bind(this)}
                />
                <span className={`${prefixCls}-separator`}> {separator} </span>
                <Picker
                    disabled={disabled}
                    disabledDate={this.disabledEndDate.bind(this)}
                    {...showTimeProps}
                    width={width}
                    format={format}
                    value={endValue}
                    placeholder={endTimePlaceHolder}
                    onChange={this.onEndChange.bind(this)}
                    open={endOpen}
                    toggleOpen={this.handleEndToggle.bind(this)}
                />
            </div>
        );
    }
}