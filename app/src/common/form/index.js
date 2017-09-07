import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import createDOMForm from 'rc-form/lib/createDOMForm';
import assign from 'object-assign';
Form.create = (o = {}) => {
    const options = assign({}, o, {
        fieldNameProp: 'id',
        fieldMetaProp: 'data-__meta',
    });

    return createDOMForm(options);
};
Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
