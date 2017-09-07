import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import RangeCalendar from './RangeCalendar';
import Calendar from './Calendar';

const DatePicker = wrapPicker(createPicker(RcCalendar));
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'yyyy-MM');

DatePicker.Calendar = Calendar;
DatePicker.RangePicker = wrapPicker(RangePicker);
DatePicker.RangeCalendar = wrapPicker(RangeCalendar);
DatePicker.MonthPicker = MonthPicker;

export default DatePicker;