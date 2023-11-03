const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id
        });

        if (!newBlogPost) {
            res.status(400).json({ message: 'server error'})
        }

        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedBlogPost = await BlogPost.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );

        if(!updatedBlogPost) {
            res.status(400).json({ message: 'Blog post was not updated'});
            return;
        }
        res.status(200).json(updatedBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });


        if(!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;