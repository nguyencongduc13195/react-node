const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.location = !isEmpty(data.location) ? data.location : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Vui lòng nhập vị trí.';
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = 'Vui lòng nhập vị trí công ty.';
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Vui lòng nhập tên công ty.';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Vui lòng nhập ngày bắt đầu.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
