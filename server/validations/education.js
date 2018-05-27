const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validationEducation(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'Vui lòng nhập tên trường.';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Vui lòng nhập trình độ.';
    }

    if (Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Vui lòng nhập chuyên ngành.';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Vui lòng nhập ngày bắt đầu.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
