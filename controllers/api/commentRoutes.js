const router = require('express').Router();
const { Comment } = require('../../models');


router.post('/:id', async (req, res) => {
    try {
        const newComment = await Comment.create(
            {
                comment: req.body.comment,
                user_id: req.session.user_id,
                blogpost_id: req.params.id
            }
        );
        
        res.status(200).json(newComment);
    } catch (err) {
        console.log('hit err');
        res.status(500).json(err);
    }
});

router.put('/comment/:com_id', async (req, res) => {
    try {
        const updateComment = await Comment.update(
            {
                comment: req.body.comment
            },
            {
                where: {
                    id: req.params.com_id,
                    user_id: req.session.user_id
                }
            }
        );

        if(!updateComment) {
            res.status(400).json({ message: 'Comment was not updated' });
            return;
        }

        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/comment/:com_id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.com_id,
                user_id: req.session.user_id
            },
        });

        if(!commentData) {
            res.status(400).json({ message: 'Comment was not deleted' });
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;