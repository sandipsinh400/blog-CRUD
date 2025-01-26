const router = require('express').Router()

const Blogmodel = require('../models/Blogmodel');
const admin = require('../models/Adminmodel')
const { accesspage } = require('../utils/accesspage');
router.get('/', (req, res) => {
    console.log(req.cookies);
    accesspage(req, res, 'pages/index')

})

router.get('/addcat', (req, res) => {
    accesspage(req, res, 'pages/Addblogs')
})

router.get('/viewcat', async (req, res) => {
    if (!req.cookies.admin) {
        res.redirect('/login')
    } else {
        const blog = await Blogmodel.find()
        res.render('pages/Viewblogs', { blog })
    }

})
router.get('/updatecat', async (req, res) => {
    if (!req.cookies.admin) {
        res.redirect('/login')
    } else {
        const { id } = req.query
        const sigleblog = await Blogmodel.findById(id)
        res.render('pages/Updateblogs', { sigleblog })
    }
   
})
router.get('/register', async (req, res) => {
    res.render('pages/register')
})
router.get('/login', async (req, res) => {
    res.render('pages/login')
})
router.get('/logout', async (req, res) => {
    res.clearCookie('admin')
    res.redirect('/login')
})
router.get('/myprofile', async (req, res) => {

    const cookiadmin = req.cookies.admin
    const email = cookiadmin.email
    const sigleadmin = await admin.findOne({ email })
    res.render('pages/myprofile', { sigleadmin })
})
module.exports = router
