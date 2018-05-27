const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('./../../models/Profile');
const User = require('./../../models/User');
const validationEdu = require('./../../validations/education');
const validationExp = require('./../../validations/experience');
const validateProfileInput = require('./../../validations/profile');
router.get('/test', (req, res) => res.json({ 'msg': 'Profile work' }));
// 
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']).then(profile => {
        if (!profile) {
            errors.noprofile = 'Người dùng chưa cập nhật thông tin.';
            return res.status(404).json(errors);
        }
        return res.json(profile);
    }).catch(err => res.json(err));
});
// tất cả
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'Không tìm thấy thông tin.';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'Không tìm thấy thông tin.' }));
});
// thêm / cập nhật thông tin
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle || profileFields.handle;
    profileFields.company = req.body.company || profileFields.company;
    profileFields.website = req.body.website || profileFields.website;
    profileFields.location = req.body.location || profileFields.location;
    profileFields.bio = req.body.bio || profileFields.bio;
    profileFields.status = req.body.status || profileFields.status;
    profileFields.githubusername = req.body.githubusername || profileFields.githubusername;
    // skills
    profileFields.skills = req.body.skills.split(',') || [];
    // socials
    profileFields.social = {};
    profileFields.social.youtube = req.body.youtube || profileFields.social.youtube;
    profileFields.social.facebook = req.body.facebook || profileFields.social.facebook;
    profileFields.social.twitter = req.body.twitter || profileFields.social.twitter;
    profileFields.social.instagram = req.body.instagram || profileFields.social.instagram;
    profileFields.social.linkedin = req.body.linkedin || profileFields.social.linkedin;
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            // tồn tại cập nhật lại thông tin
            profile.set(profileFields).save().then(profile => res.json(profile)).catch(err => res.json(err));
        } else {
            //  tạo mới
            Profile.findOne({ handle: req.body.handle }).then(profile => {
                if (profile) {
                    return res.json({ err: 'Tồn tại' })
                }
                new Profile(profileFields).save().then(profile => res.json(profile));
            })
        }
    })
});
// tìm kiếm người dùng
router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']).then(profile => {
        if (!profile) return res.json({ msg: 'Không tìm thấy thông tin' });
        return res.json(profile);
    }).catch(err => res.json(err));
});
// thêm kinh nghiệm làm việc
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { errors, isValid } = validationExp(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) return res.json({ msg: 'Không tìm thấy thông tin' });
        else {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current || current,
                description: req.body.description
            }
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.json(err));
});
// xóa kinh nghiệm làm việc
router.delete('/experience/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) return res.json({ msg: 'Không tìm thấy thông tin' });
        else {
            for (var index = 0; index < profile.experience.length; index++) {
                if (profile.experience[index]._id == req.params.id) {
                    profile.experience.splice(index, 1);
                    break;
                }
            }
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.json(err));
});
// thêm học vấn
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { errors, isValid } = validationEdu(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) return res.json({ msg: 'Không tìm thấy thông tin' });
        else {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description,
                current: req.body.current || current
            }
            profile.education.unshift(newEducation);
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.json(err));
});
// xóa học vấn
router.delete('/education/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) return res.json({ msg: 'Không tìm thấy thông tin' });
        else {
            for (var index = 0; index < profile.education.length; index++) {
                if (profile.education[index]._id == req.params.id) {
                    profile.education.splice(index, 1);
                    break;
                }
            }
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.json(err));
});
// xóa người dùng + thông tin
router.delete('/delete-user', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findByIdAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
    }).catch(err => res.json(err));
});
module.exports = router;