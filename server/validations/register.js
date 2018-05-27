const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Vui lòng nhập họ tên từ 2 đến 30 ký tự';
    }
    if(Validator.isEmpty(data.name)){
        errors.name = 'Vui lòng nhập họ tên.';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Vui lòng nhập Email.';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Vui lòng nhập Email đúng định dạng.';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Vui lòng nhập mật khẩu.';
    }
    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Vui lòng nhập xác nhận mật khẩu.';
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Mật khẩu nhập lại không chính xác.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}