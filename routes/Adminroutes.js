const router=require('express').Router()
const admincontroller=require('../controller/Admincontroller')
const upload=require('../Middleware/Fileuploads')

router.post('/register',admincontroller.register)
router.post('/login',admincontroller.login)
router.post('/upadateprofile',upload.single('profile_my'),admincontroller.updateprofile)
module.exports=router
