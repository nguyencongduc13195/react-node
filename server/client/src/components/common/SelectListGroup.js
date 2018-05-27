import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    let selectOptions = options.map((val, i)=> (
        <option value={val.value} key={i}>{val.label}</option>
    ));
    return (
        <div className="form-group">
            <select
                onChange={onChange}
                value={value}
                className={
                    classNames('form-control form-control-lg',
                        { 'is-invalid': error })
                }
                name={name}
            >
                {selectOptions}
            </select>
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

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}
export default SelectListGroup;