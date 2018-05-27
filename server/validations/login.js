const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Vui lòng nhập Email đúng định dạng.';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Vui lòng nhập Email.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Vui lòng nhập mật khẩu.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
