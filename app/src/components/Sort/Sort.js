/**
 * @file Sort.js
 * @author fanty@jingoal.com
 *
 * 排序组件
 */
import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';
import Icon from '../../common/icon';

export default class Sort extends PureComponent {
    static propTypes = {
        // 默认排序规则
        defaultSortBy: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onChange: PropTypes.func,
        // 按哪个字段排序
        sortField: PropTypes.string.isRequired,
        // 当前排序规则
        sortBy: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        // 指定排序规则
        sortRules: PropTypes.shape({
            asc: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            desc: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        }),
        title: PropTypes.string
    }

    static defaultProps = {
        defaultSortBy: '',
        onChange: noop,
        sortBy: '',
        sortRules: { asc: 1, desc: 0 },
        title: ''
    }

    constructor(props) {
        super(props);

        this.sortChange = this.sortChange.bind(this);
    }

    sortChange() {
        const {
            defaultSortBy,
            onChange,
            sortBy,
            sortField,
            sortRules
        } = this.props;

        let newSortBy;

        switch (sortBy) {
            case sortRules.desc:
                newSortBy = sortRules.asc;
                break;
            case sortRules.asc:
                newSortBy = sortRules.desc;
                break;
            default:
                newSortBy = defaultSortBy;
        }
        onChange(newSortBy, sortField);
    }

    render() {
        const {
            sortBy,
            title,
            defaultSortBy,
            sortRules
        } = this.props;
        const hasSortBy = sortBy === sortRules.asc || sortBy === sortRules.desc;
        const renderBy = hasSortBy ? sortBy : defaultSortBy;

        return (
            <div className="disk-sort" onClick={this.sortChange}>
                <div className="disk-sort-title">
                    {title}
                </div>
                <div className="disk-sort-icon-group">
                    <Icon
                        type="arrow01doble_up"
                        className={classNames('disk-sort-icon-up', {'disk-sort-icon-sorted': renderBy === sortRules.asc && hasSortBy})}
                    />
                    <Icon
                        type="arrow01doble_down"
                        className={classNames('disk-sort-icon-down', {'disk-sort-icon-sorted': renderBy === sortRules.desc && hasSortBy})}
                    />
                </div>
            </div>
        )
    }
}