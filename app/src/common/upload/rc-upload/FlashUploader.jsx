import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import uid from './uid';
import './swfupload';

const SWFUpload = window.SWFUpload;

const FlashUploader = React.createClass({
    propTypes: {
        component: PropTypes.string,
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        multiple: PropTypes.bool,
        onStart: PropTypes.func,
        data: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
        ]),
        headers: PropTypes.object,
        beforeUpload: PropTypes.func,
        withCredentials: PropTypes.bool,
    },

    componentDidMount() {
        const props = this.props;
        let settings = this.getSwfSettings();
        settings.button_text = props.buttonText || '';
        settings.button_text_style = props.buttonTextStyle || '';
        settings.button_text_left_padding = props.buttonTextLeftPadding || 0;
        settings.button_text_top_padding = props.buttonTextTopPadding || 0;
        settings.file_types = props.fileTypes || '*.*';
        settings.flash_url = props.flashUrl;
        settings.button_image_url = props.buttonImageUrl;
        settings.button_width = props.buttonWidth || settings.button_width;
        settings.button_height = props.buttonHeight || settings.button_height;
        settings.button_placeholder = props.buttonPlaceholder;

        if (!settings.button_placeholder) {
            let childNodes = ReactDOM.findDOMNode(this.refs['uploader_container']).childNodes;
            let placeholderIndex = props.placeholderIndex || 0;
            let index = 0;
            for(var i = 0, len = childNodes.length; i < len; i++) {
                let childNode = childNodes[i];
                if (childNode.nodeType === 1) {
                    if (index === placeholderIndex) {
                        settings.button_placeholder = childNode;
                        break;
                    }
                    index++;
                }
            }
        }

        this.uploader  = new SWFUpload(settings);
    },

    componentWillUnmount() {
        this.uploader && this.uploader.destroy();
    },

    shouldComponentUpdate() {
       return false;
    },

    queue: [],

    getSwfSettings() {
        const props = this.props;
        const me = this;
        return {
            file_post_name: 'formName',
            upload_url: 'uploadUrl',
            file_size_limit: '10MB',
            file_types: '*.*',
            file_types_description: 'All Files',
            file_upload_limit: 10000,
            file_queue_limit: 10000,
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
            debug: false,
            preserve_relative_urls: true,
            button_width: 150,
            button_height: 24,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            file_queued_handler: function (file) { //准备好
                if (!props.beforeUpload) {
                    return me.upload(file)
                } else {
                    const before = props.beforeUpload([file]);
                    if (before && before.then) {
                        before.then(
                            (processedFiles) => {
                                me.upload(processedFiles)
                            });
                    } else if (before !== false) {
                        me.upload(file)
                    }
                }
            },
            upload_start_handler: function (file) {
                props.onStart([file]);
            },
            upload_progress_handler: function (file, loaded, total) { //正在上传
                file.uid = file.id;
                props.onProgress({loaded, percent: loaded / total * 100}, file);
            },
            file_queue_error_handler: function (file) {
                props.onError(file);
            },
            upload_success_handler: function (file, data, response) { //上传成功
                props.onSuccess(data, file);
            },
            upload_complete_handler: function (file) { //上传完成
                me.uploadNext(); //完成后开始上传下一个
            }
        }
    },

    getInitialState() {
        return {

        };
    },

    uploadNext() {
        const {queue} = this;
        for (let i = 0, l =  queue.length; i < l; i++) {
            let nextUploader = queue[i];
            if (!nextUploader.uploaded) {
                nextUploader.uploaded = true;
                this.post(nextUploader.file);
                break;
            }
        }
    },

    upload(file) {
        const {queue} = this;
        if (Object.prototype.toString.call(file) === '[object Array]') {
            file.forEach((f) => {
                queue.push({ file: f, uploaded :false});
            })
        } else {
            queue.push({ file,  uploaded :false});
        }

        if (this.uploader.getStats().in_progress !== 1) {
            this.uploadNext();
        }
    },

    post(file) {
        const props = this.props;
        let data = props.data;
        if (typeof data === 'function') {
            data = data(file);
        }

        const {uploader} = this;
        uploader.setUploadURL(file.action || props.action);
        uploader.startUpload(file.id);
    },

    render() {
        const props = this.props;
        const Tag = this.props.component;
        return (
            <Tag
                onClick={this.onClick}
                role="button"
                tabIndex="0"
                style={this.props.style}
                className={this.state.disabled ? `${this.props.prefixCls} ${props.prefixCls}-disabled` : `${this.props.prefixCls}`}
                ref="uploader_container"
            >
                {props.children || <button>上传文件</button>}
            </Tag>
        );
    },
});

export default FlashUploader;
