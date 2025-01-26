const Blog = require('../models/Blogmodel')

exports.store = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file.filename);
        const img = req.file.filename

        const { Blog_Category, Blog_Title, Contact_number, Message } = req.body

        const existcate = await Blog.findOne({ Blog_Category }).countDocuments().exec()
        if (existcate > 0) {
            res.json("blog category is all ready existed")
        }
        else {
            await Blog.create({

                Blog_Category, Blog_Title, Contact_number, Message, profile_name: img
            })
            res.redirect('/viewcat')
        }
    } catch (error) {
        res.json(error)
    }
}
exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        await Blog.findByIdAndDelete(id)
        res.redirect('/viewcat')
    } catch (error) {
        res.json(error)
    }
}
exports.updateblog = async (req, res) => {
    try {
        const { id } = req.params;
        const { Blog_Category, Blog_Title, Contact_number, Message } = req.body

        var image = ""
        if (req.file) {
            image = req.file.filename
        }else {
            image = req.body.profile_name
        }

        await Blog.findByIdAndUpdate({
            _id: id
        }, {
            Blog_Category, Blog_Title, Contact_number, Message, profile_name: image
        })
        res.redirect('/viewcat')
    } catch (error) {
        res.json(error)
    }
}