const router = require('express').Router()
const {Post, Comment, User} = require('../models/')

router.get('/',async (req,res)=>{
    try {
        const postData = await Post.findAll({
          include: [User],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render('allposts', { posts });
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.render('signup')
})

module.exports = router;