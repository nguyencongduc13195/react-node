const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('./../../models/User');
const secret = require('./../../config/keys');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validatons = require('./../../validations/register');
const validatonsLogin = require('./../../validations/login');
router.get('/', (req, res) => res.json({ 'msg': 'Users work' }));
router.get('/list', (req, res) => {
    User.find({}).then(users => res.json(users)).catch(err => console.log(err));
});
router.post('/register', (req, res) => {
    let { errors, isValid } = validatons(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.json({ email: 'Email đã được đăng ký!!!' });
        } else {
            let avatar = gravatar.url('emerleite@gmail.com', { s: '200', r: 'pg', d: 'mm' });
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    // if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    })
});
router.post('/login', (req, res) => {
    let { errors, isValid } = validatonsLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            errors.email = 'Không tìm thấy người dùng !!!'
            return res.status(400).json(errors);
        } else {
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    let payload = { id: user._id, name: user.name, avatar: user.avatar };
                    jwt.sign(payload, secret.secretJWT, { expiresIn: 3600 }, (err, token) => {
                        return res.json({ success: true, token: 'Bearer ' + token, msg: 'Đăng nhập thành công !!!' });
                    });
                } else {
                    errors.password = 'Mật khẩu không chính xác !!!';
                    return res.status(400).json(errors);
                }
            });
        }
    })
});
router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user)
    });
module.exports = router;