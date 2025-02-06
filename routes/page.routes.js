const router = require('express').Router()

const Blogmodel = require('../models/Blogmodel');
const admin = require('../models/Adminmodel')
const { accesspage } = require('../utils/accesspage');
router.get('/', accesspage,(req, res) => {
    res.render('pages/index')
})

router.get('/addcat',accesspage, (req, res) => {
    res.render('pages/Addblogs')
})

router.get('/viewcat',accesspage, async (req, res) => {
    const blog = await Blogmodel.find()
    res.render('pages/Viewblogs', { blog })

})
router.get('/updatecat',accesspage, async (req, res) => {
    const { id } = req.query
    const sigleblog = await Blogmodel.findById(id)
    res.render('pages/UpdateBlogs', { sigleblog })
   
})
router.get('/register', async (req, res) => {
    res.render('pages/register',{message:req.flash('info')})
})
router.get('/login', async (req, res) => {
    res.render('pages/login',{message:req.flash('info')})
})
router.get('/logout', async (req, res) => {
    // res.clearCookie('admin')
    req.logout((err)=>{
        if(err){
            console.log(err); 
        }else{
            res.redirect('/login')
        }
    })
  
})
router.get('/myprofile', async (req, res) => {
    const cookiadmin = req.user
    const email = cookiadmin.email
    const sigleadmin = await admin.findOne({ email })
    res.render('pages/myprofile', { sigleadmin })
})
module.exports = router
