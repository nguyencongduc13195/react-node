const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Tên tìm kiếm từ 2-40 ký tự.';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Vui lòng tên tìm kiếm.';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Vui lòng nhập tình trạng.';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Vui lòng nhập kỹ năng';
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Vui lòng nhập đúng đường dẫn';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
