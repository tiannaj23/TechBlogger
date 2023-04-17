const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
  
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req,res) => {
    try {
     const [updatedStuff] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
     });

     if (updatedStuff > 0){
      res.status(200).end();
     }else{
      res.status(404).json(err);
     }
    } catch (err) {
      res.status(500).json(err)
    }
  });
  
  router.delete('/:id', withAuth, async (req, res) => {
    try{
      const [deleteStuff] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });

      if(deleteStuff > 0){
        res.status(200).end();
      }else {
        res.status(404).end();
      }
    }catch (hands){
      res.status(500).json(hands)
    }
  })


module.exports = router;