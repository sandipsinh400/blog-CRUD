const Admin = require('../models/Adminmodel');
const { plainToHash, HashToplain } = require('../utils/password');

exports.register = async (req, res) => {

    try {
        const { Username, email, password } = req.body
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            //    res.json('email id is all ready existed')
            req.flash('info', "email id is all ready existed")
            res.redirect('/register')
        } else {
            req.flash('info', "registration succesfully...!")
            const hash_pass = await plainToHash(password)
            console.log("hash_pass..........");
            console.log(hash_pass)
            await Admin.create({
                Username, email, password: hash_pass,
            })
            res.redirect('/login')
        }
    } catch (error) {
        res.render(error)
    }
}

exports.updateprofile = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const { email, Username } = req.body

        var image = ""
        if (req.file) {
            image = req.file.filename
        } else {
            image = req.body.profile_my
        }
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            await Admin.updateOne(
                { email },
                {
                    Username,
                    profile_my: image
                }

            )
            res.redirect('/myprofile')
        } else {
            res.render('email id is not existed')
        }
    } catch (error) {
        res.render(error)
    }

}