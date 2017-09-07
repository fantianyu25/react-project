import React, { Component, PropTypes } from 'react';

import Constants from './Constants';

class Level extends Component {
    static propTypes = {
        level: PropTypes.number,
        locale: PropTypes.object
    }

    static defaultProps = {
        level: -1,
        locale: {}
    }

    render() {
        const { level, levelLow, locale } = this.props;

        let levelShow = level,
            levelTip = locale.length_8_20_case_sensitive;

        if (level === Constants.LEVEL_WEAK || levelLow) {
            levelTip = locale.password_dangerous;
            levelShow = Constants.LEVEL_WEAK;
        } else if (level === Constants.LEVEL_MEDIUM) {
            levelTip = locale.try_strong_password;
        } else if (level >= Constants.LEVEL_STRONG) {
            levelTip = locale.regularly_update_password;
            levelShow = Constants.LEVEL_STRONG;
        }
        const levelItem = (
            <div className={`level-wrap show level${levelShow}`}>
                <div className="icon">
                    <div className="level-list">
                        <span className="level-item item1">{levelShow === Constants.LEVEL_WEAK && locale.weak}</span>
                        <span className="level-item item2">{levelShow === Constants.LEVEL_MEDIUM && locale.medium}</span>
                        <span className="level-item item3">{levelShow >= Constants.LEVEL_STRONG && locale.strong}</span>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="tip">
                    {levelTip}
                </div>
            </div>
        );
        return levelItem;
    }
}

export default Level;