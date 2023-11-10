const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

//login
router.get('/login', async (req, res) => {
    try {
        if(req.session.logged_in){
            res.render('homepage');
        }
        
        res.render('login');
    } catch (err) {
        res.status(500).json(err)
    }
})

// homepage
router.get('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true}));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a single blogpost via id
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const commentData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogpost = blogpostData.get({ plain: true});
        const comments = commentData.map((comment) => comment.get({ plain: true}));

        res.render('blogpost', {
            ...blogpost,
            comments,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try{
        //blogposts of user
        const blogpostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('dashboard',{
            layout: 'main',
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;