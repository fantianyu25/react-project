import * as React from 'react';
import lodash from 'lodash';

let fileicons = {
    'doc': ['doc', 'docx', 'wps', 'dot', 'dotm', 'wpt'],
    'txt': ['txt'],
    'xls': ['xls', 'xlsx', 'et', 'xlt', 'xltx', 'ett', 'csv'],
    'pdf': ['pdf'],
    'ppt': ['ppt', 'pptx', 'dps', 'pot', 'potx', 'dpt'],
    'music': ['mp3'],
    'apk': ['apk'],
    'zip': ['zip', 'tar', 'gz'],
    'html': ['html'],
    'java': ['java'],
    'image': ['jpg', 'jpeg', 'gif', 'png'],
    'video': ['mp4', 'avi', 'mkv'],
    'damage': ['iso'],
    'rar': ['rar'],
    'jin': ['jin'],
};

export default props => {
    let {type, className = ''} = props;
    if (type.indexOf('color-') === 0) {
        if (type.indexOf('color-file-') === 0) {
            let found = false;
            for (let key in fileicons) {
                if (fileicons.hasOwnProperty(key)) {
                    let item = fileicons[key];
                    let ext = type.split('-')[2];
                    if (item.indexOf(ext) >= 0) {
                        type = `color-file-${key}`;
                        found = true;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (!found) {
                type = 'color-file-unknown';
            }
        }

        let className = `jgicon jgicon-color jgicon-${type}`;
        return (
            <span className={className}>
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
                <span className="path7"></span>
                <span className="path8"></span>
            </span>
        )
    }else {
        return <i {...props} className={`jgicon ${className} jgicon-${type}`.trim()}/>
    }
};
