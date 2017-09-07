import Pagination from '../pagination/rc-pagination/src/locale/zh_TW';
import DatePicker from '../date-picker/locale/zh_TW';
import TimePicker from '../time-picker/locale/zh_TW';
import Calendar from '../calendar/locale/zh_TW';
import InputPassword from '../input-password/locale/zh_TW';

export default  {
    Pagination,
    DatePicker,
    TimePicker,
    Calendar,
    InputPassword,
    Table: {
        filterTitle: '篩選',
        filterConfirm: '確定',
        filterReset: '重置',
        emptyText: 'No Data',  // 看這兒： 這裡改為繁體  Demo出現一個 另一個No Data 重疊 問題。
    },
    Modal: {
        okText: '確定',
        cancelText: '取消',
        justOkText: '確定',
    },
    Popconfirm: {
        okText: '確定',
        cancelText: '取消',
    },
    Transfer: {
        notFoundContent: '列表為空',
        searchPlaceholder: '請輸入搜索內容',
        itemUnit: '條 ',
        itemsUnit: '條',
    },
    Select: {
        notFoundContent: '暫無數據',
    },
};