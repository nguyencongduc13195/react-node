import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group">
            <textarea
                onChange={onChange}
                value={value}
                className={
                    classNames('form-control form-control-lg',
                        { 'is-invalid': error })
                }
                placeholder={placeholder} name={name}
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

TextAreaGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}
export default TextAreaGroup;