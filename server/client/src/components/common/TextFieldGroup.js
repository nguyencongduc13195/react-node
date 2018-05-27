import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                onChange={onChange}
                value={value} type={type}
                className={
                    classNames('form-control form-control-lg',
                        { 'is-invalid': error })
                }
                placeholder={placeholder} name={name}
                disabled={disabled}
            />
            {
                error && 
                <div className="invalid-feedback">
                    {error}
                </div>
            }
            {
                info &&
                <small className="form-text text-muted">
                    {info}
                </small>
            }
        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}
TextFieldGroup.defaultProps={
    type: 'text'
}
export default TextFieldGroup