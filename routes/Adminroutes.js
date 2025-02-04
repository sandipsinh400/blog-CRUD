const router=require('express').Router()
const passport = require('passport');
const admincontroller=require('../controller/Admincontroller')
const upload=require('../Middleware/Fileuploads')

router.post('/register',admincontroller.register)
// router.post('/login',admincontroller.login)
// router.post('/login',passport.authenticate('local', { failureRedirect: '/login', successRedirect:'/' }));

//passprot ..........
router.post('/login',passport.authenticate('local', { failureRedirect: '/login', successRedirect:'/' }));

router.post('/upadateprofile',upload.single('profile_my'),admincontroller.updateprofile)
module.exports=router
