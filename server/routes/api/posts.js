const express = require('express');
const router = express.Router();
const Post = require('./../../models/Post');
const Profile = require('./../../models/Profile');
const passport = require('passport');
const validatePostInput = require('../../validations/post')
// thêm bài viết
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let post = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });
    post.save().then(post => res.json(post)).catch(err => res.json(err));
});
// danh sách bài viết
router.get('/', (req, res) => {
    Post.find({}).sort({ date: -1 }).then(posts => res.json(posts)).catch(err => res.json(err));
});
// tìm 1 bài viết
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.json({ err: 'Không tìm thấy.' }));
});
// xóa 1 bài viết
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.user.toString() !== req.user.id) {
                return res.status(400).json({ notauthorized: 'Không phải bài viết của bạn' });
            }
            post.remove().then(() => res.json({ success: 'Xóa thành công !!!' }));
        }).catch(err => res.json(err));
    });
});
// thích 1 bài viết
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.find({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(401).json({ alreadyliked: 'Bạn đã thích bài viết.' });
            }
            post.likes.unshift({ user: req.user.id });
            post.save().then(post => res.json(post));
        }).catch(err => res.json(err));
    });
});
// không thích 1 bài viết
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: 'Bạn chưa thích bài viết.' });
            }
            post.likes.forEach((like, index) => {
                if (like.user.toString() === req.user.id) {
                    post.likes.splice(index, 1);
                }
            });
            post.save().then(post => res.json(post));
        }).catch(err => res.json(err));
    });
});
// thêm bình luận bài viết
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then(post => {
        let newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
    }).catch(err => res.json(err));
});
// xóa bình luận bài viết
router.delete('/comment/:idPost/:idComment', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.idPost).then(post => {
        if (!post) {
            return res.json({ notfound: 'Không tìm thấy bài viết.' });
        }
        if (post.comments.filter(comment => comment._id.toString() === req.params.idComment).length === 0) {
            return res.json({ comment: 'Không tìm thấy bình luận.' });
        }
        post.comments.forEach((comment, index) => {
            if (comment._id.toString() === req.params.idComment) {
                post.comments.splice(index, 1);
            }
        });
        post.save().then(post => res.json(post));
    }).catch(err => res.json({ err: 'Không tìm thấy bài viết.' }));
});
module.exports = router;